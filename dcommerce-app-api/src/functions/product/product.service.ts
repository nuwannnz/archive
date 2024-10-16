import { ProductRepository } from '../../shared/repositories/product/product-repository';
import { CreateProductDto } from 'src/shared/dto/product/create-product.dto';
import { UpdateProductDto } from 'src/shared/dto/product/update-product.dto';
import { v4 as uuidv4 } from 'uuid';
import { S3 } from 'aws-sdk';

export class ProductService {
  constructor(private productRepository: ProductRepository) {}

  async createProduct(createProductDto: CreateProductDto, sharp: any) {
    createProductDto.images = await this.uploadImages(
      createProductDto.images,
      sharp,
    );
    return this.productRepository.create(createProductDto);
  }

  async updateProduct(updateProductDto: UpdateProductDto, sharp: any) {
    updateProductDto.images = await this.uploadImages(
      updateProductDto.images,
      sharp,
    );
    updateProductDto.images = [
      ...updateProductDto.images,
      ...updateProductDto.existingImages,
    ];
    return this.productRepository.update(updateProductDto);
  }

  getAllProducts(
    limit: number,
    pageNumber: number,
    searchKey: string,
    sortKey: string,
    sortOrder: string,
    domain: string,
    productCategory: string,
  ) {
    return this.productRepository.findAll(
      limit,
      pageNumber,
      searchKey,
      sortKey,
      sortOrder,
      domain,
      productCategory,
    );
  }

  getProductById(id: string, domainId: string) {
    return this.productRepository.findOne(id, domainId);
  }

  deleteProduct(id: string) {
    return this.productRepository.delete(id);
  }

  async uploadImages(images: string[], sharp) {
    const s3 = new S3();
    const BUCKET_NAME = process.env.PRODUCT_IMAGE_S3_BUCKET;
    const imageSizes = [200, 400, 800];
    let urls = [];
    for (const image of images) {
      const fileName = `${uuidv4()}.jpg`;
      const promises = imageSizes.map(async (size) => {
        const key = `resized/${size}/${fileName}`;
        const imageBuffer = Buffer.from(
          image.split(';base64,').pop(),
          'base64',
        );
        const resizedImage = await new Promise((res) => {
          sharp(imageBuffer)
            .resize(size)
            .toBuffer()
            .then((image) => {
              res(image);
            });
        });

        const params = {
          Bucket: BUCKET_NAME,
          Key: key,
          Body: resizedImage,
          ACL: 'public-read',
          ContentType: 'image/jpeg',
        };
        const { Location } = await s3.upload(params).promise();
        return Location;
      });
      const results = await Promise.all(promises);
      urls = [...urls, ...results];
    }
    return urls;
  }
}
