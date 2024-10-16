import { HEADERS } from 'src/shared/constants/headers';
import { ResponseDto } from 'src/shared/dto/response.dto';
import { DomainService } from './domain.service';
import { DomainRepository } from '../../shared/repositories/domain/domain-repository';
import { UpdateDomainDto } from '../../shared/dto/domain/update-domain.dto';
import connectToDb from 'src/db/mongodb.service';

const domainRepository = new DomainRepository();
const domainService = new DomainService(domainRepository);

exports.handler = async (event) => {
  console.log('event', event);
  await connectToDb();
  try {
    const { id } = event.pathParameters;
    const body = JSON.parse(event.body);
    const dto: UpdateDomainDto = { ...body, id };
    const domain = await domainService.updateDomain(dto);
    return new ResponseDto(200, domain, HEADERS);
  } catch (error) {
    return new ResponseDto(500, error.message, HEADERS);
  }
};
