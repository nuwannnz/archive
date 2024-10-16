export class CreateProductAttributeDto {
  name: string;
  domainId: string;
  options: { id?: string; name: string }[];
}
