import { DomainRepository } from '../../shared/repositories/domain/domain-repository';
import { CreateDomainDto } from '../../shared/dto/domain/create-domain.dto';
import { UpdateDomainDto } from '../../shared/dto/domain/update-domain.dto';

export class DomainService {
  constructor(private domainRepository: DomainRepository) {}

  createDomain(createDomainDto: CreateDomainDto) {
    return this.domainRepository.create(createDomainDto);
  }

  updateDomain(updateDomainDto: UpdateDomainDto) {
    return this.domainRepository.update(updateDomainDto);
  }

  getAllDomains(limit: number, pageNumber: number) {
    return this.domainRepository.findAll(limit, pageNumber);
  }

  getDomainById(id: string) {
    return this.domainRepository.findOne(id);
  }

  deleteDomain(id: string) {
    return this.domainRepository.delete(id);
  }
}
