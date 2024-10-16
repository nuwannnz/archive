import { Types } from 'mongoose';
import { DomainModal } from 'src/shared/modals/domain.modal';
import { CreateDomainDto } from '../../dto/domain/create-domain.dto';
import { UpdateDomainDto } from '../../dto/domain/update-domain.dto';

export class DomainRepository {
  async create(domain: CreateDomainDto) {
    const domainObj = await DomainModal.create({ name: domain.name });
    return domainObj.toJSON();
  }

  async update(domain: UpdateDomainDto) {
    const updatedDomain = await DomainModal.findOneAndUpdate(
      { _id: new Types.ObjectId(domain.id), isActive: true },
      {
        name: domain.name,
      },
      {
        new: true,
      },
    );
    return updatedDomain.toJSON();
  }

  async findAll(limit: number, pageNumber: number) {
    const domains = await DomainModal.find()
      .where({ isActive: true })
      .limit(limit)
      .skip((pageNumber - 1) * limit)
      .exec();

    const totalCount = await DomainModal.count({ isActive: true });
    return {
      data: domains,
      totalCount,
      currentPage: pageNumber,
      totalPages: Math.ceil(totalCount / limit),
    };
  }

  async findOne(id: string) {
    const domain = await DomainModal.findOne({
      _id: new Types.ObjectId(id),
      isActive: true,
    });
    return domain;
  }

  async delete(id: string) {
    await DomainModal.findOneAndUpdate(
      { _id: new Types.ObjectId(id) },
      { isActive: false },
    );
  }
}
