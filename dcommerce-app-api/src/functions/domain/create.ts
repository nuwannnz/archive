import { HEADERS } from 'src/shared/constants/headers';
import { ResponseDto } from 'src/shared/dto/response.dto';
import { DomainService } from './domain.service';
import { DomainRepository } from '../../shared/repositories/domain/domain-repository';
import { CreateDomainDto } from '../../shared/dto/domain/create-domain.dto';
import connectToDb from 'src/db/mongodb.service';

const domainRepository = new DomainRepository();
const domainService = new DomainService(domainRepository);

exports.handler = async (event) => {
  console.log('event', event);

  await connectToDb();

  try {
    const dto: CreateDomainDto = JSON.parse(event.body);
    const domain = await domainService.createDomain(dto);

    return new ResponseDto(200, domain, HEADERS);
  } catch (error) {
    console.log(error);
    return new ResponseDto(500, error.message, HEADERS);
  }
};
