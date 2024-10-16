export class UpdateProductAttributeDto {
  id: string;
  name: string;
  domainId: string;
  options: { id?: string; name: string; isActive?: boolean }[];
  deletedOptionIds: string[];
}
