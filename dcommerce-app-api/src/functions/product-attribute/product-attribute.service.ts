import { CreateProductAttributeDto } from 'src/shared/dto/product-attribute/create-product-attribute.dto';
import { ProductAttributeRepository } from 'src/shared/repositories/product-attribute/product-attribute-repository';
import { UpdateProductAttributeDto } from 'src/shared/dto/product-attribute/update-product-attribute.dto';
import { v4 as uuidv4 } from 'uuid';

export class ProductAttributeService {
  constructor(private productAttributeRepository: ProductAttributeRepository) {}

  createProductAttribute(createProductAttributeDto: CreateProductAttributeDto) {
    // populate ids for the options
    createProductAttributeDto.options = createProductAttributeDto.options.map(
      (option) => {
        option.id = uuidv4();
        return option;
      },
    );
    return this.productAttributeRepository.create(createProductAttributeDto);
  }

  updateProductAttribute(updateProductAttributeDto: UpdateProductAttributeDto) {
    updateProductAttributeDto.options = updateProductAttributeDto.options.map(
      (option) => {
        option.isActive = option.id ? option.isActive : true;

        // assign ids for new options
        option.id = option.id ?? uuidv4();

        // mark deleted options as deactivated
        if (updateProductAttributeDto.deletedOptionIds.includes(option.id)) {
          option.isActive = false;
        }

        return option;
      },
    );
    return this.productAttributeRepository.update(updateProductAttributeDto);
  }

  getAllProductAttributes(limit: number, pageNumber: number, domainId: string) {
    return this.productAttributeRepository.findAll(limit, pageNumber, domainId);
  }

  getProductAttributeById(id: string, domainId: string) {
    return this.productAttributeRepository.findOne(id, domainId);
  }

  deleteProductAttribute(id: string, domainId: string) {
    return this.productAttributeRepository.delete(id, domainId);
  }
}
