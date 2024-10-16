import { Types } from 'mongoose';
import { CreateProductDto } from 'src/shared/dto/product/create-product.dto';
import { UpdateProductDto } from 'src/shared/dto/product/update-product.dto';
import { ProductVariantModal } from 'src/shared/modals/product-variant.modal';
import { ProductModal } from 'src/shared/modals/product.modal';

export class ProductRepository {
  async create(product: CreateProductDto) {
    const productObj = await ProductModal.create({
      name: product.name,
      quantity: product.quantity,
      price: product.price,
      cost: product.cost,
      description: product.description,
      briefDescription: product.briefDescription,
      images: product.images,
      productCategoryId: new Types.ObjectId(product.productCategoryId),
      domainId: new Types.ObjectId(product.domainId),
    });

    await ProductVariantModal.insertMany([
      // default variant
      {
        productId: productObj._id,
        quantity: product.quantity,
        price: product.price,
        isDefault: true,
        attributes: [],
      },
      // custom variants
      ...product.variations.map(
        (variation) =>
          new ProductVariantModal({
            productId: productObj._id,
            quantity: variation.quantity,
            price: variation.price,
            attributes: variation.attributes,
          }),
      ),
    ]);

    return productObj.toJSON();
  }

  async update(product: UpdateProductDto) {
    let updatedProduct = await ProductModal.findOneAndUpdate(
      { _id: new Types.ObjectId(product.id), isActive: true },
      {
        name: product.name,
        quantity: product.quantity,
        price: product.price,
        cost: product.cost,
        description: product.description,
        briefDescription: product.briefDescription,
        images: product.images,
        productCategoryId: new Types.ObjectId(product.productCategoryId),
        domainId: new Types.ObjectId(product.domainId),
      },
      {
        new: true,
      },
    );

    // update default variation
    const defaultVariation = await ProductVariantModal.findOne({
      productId: updatedProduct._id,
      isDefault: true,
    });

    defaultVariation.quantity = product.quantity;
    defaultVariation.price = product.price;

    await defaultVariation.save();

    // remove deleted variations
    if (product.deletedVariationIds.length > 0) {
      await ProductVariantModal.updateMany(
        {
          _id: { $in: product.deletedVariationIds },
        },
        {
          isActive: false,
        },
      );
    }

    // update updated variations
    await ProductVariantModal.bulkSave(
      product.variations.map(
        (variation) =>
          new ProductVariantModal({
            _id: variation.id ? new Types.ObjectId(variation.id) : undefined,
            productId: new Types.ObjectId(product.id),
            quantity: variation.quantity,
            price: variation.price,
            attributes: variation.attributes,
          }),
      ),
    );

    updatedProduct = await ProductModal.findOne({
      id: updatedProduct._id,
    }).populate('productCategoryId');

    return updatedProduct.toJSON();
  }

  async findAll(
    limit: number,
    pageNumber: number,
    searchKey: string,
    sortKey: string,
    sortOrder: string,
    domain: string,
    productCategory: string,
  ) {
    const sort = {};
    sort[sortKey ?? 'updatedAt'] = sortOrder ?? 'desc';
    const whereStatement: { [key: string]: any } = {
      domainId: new Types.ObjectId(domain),
      isActive: true,
      name: { $regex: searchKey ?? '', $options: 'i' },
    };
    if (productCategory) {
      whereStatement.productCategoryId = new Types.ObjectId(productCategory);
    }
    const products = await ProductModal.find()
      .where(whereStatement)
      .sort(sort)
      .limit(limit)
      .skip((pageNumber - 1) * limit)
      .populate('productCategoryId')
      .exec();

    const totalCount = await ProductModal.count(whereStatement);
    return {
      data: products,
      totalCount,
      currentPage: pageNumber,
      totalPages: Math.ceil(totalCount / limit),
    };
  }

  async findOne(id: string, domainId: string) {
    const productResult = await ProductModal.aggregate([
      {
        $match: {
          _id: new Types.ObjectId(id),
          domainId: new Types.ObjectId(domainId),
        },
      },
      {
        $lookup: {
          from: 'productvariants',
          localField: '_id',
          foreignField: 'productId',
          pipeline: [
            {
              $unwind: '$attributes',
            },
            {
              $lookup: {
                from: 'productattributes',
                let: {
                  attributeId: {
                    $toObjectId: '$attributes.productAttributeId',
                  },
                  attributes: '$attributes',
                },
                pipeline: [
                  {
                    $match: {
                      $expr: {
                        $eq: ['$_id', '$$attributeId'],
                      },
                    },
                  },
                  {
                    $replaceRoot: {
                      newRoot: {
                        $mergeObjects: ['$$attributes', '$$ROOT'],
                      },
                    },
                  },
                ],
                localField: 'attributes.productAttributeId',
                foreignField: '_id',
                as: 'attributes',
              },
            },
          ],
          as: 'variations',
        },
      },
    ]);
    return productResult.pop();
  }

  async delete(id: string) {
    await ProductModal.findOneAndUpdate(
      { _id: new Types.ObjectId(id) },
      { isActive: false },
    );
  }
}
