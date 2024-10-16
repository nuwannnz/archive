import { HEADERS } from 'src/shared/constants/headers';
import { ResponseDto } from 'src/shared/dto/response.dto';
import { DomainService } from './domain.service';
import { DomainRepository } from '../../shared/repositories/domain/domain-repository';
import connectToDb from 'src/db/mongodb.service';

const domainRepository = new DomainRepository();
const domainService = new DomainService(domainRepository);

exports.handler = async (event) => {
  console.log('event', event);
  await connectToDb();
  try {
    const { limit, pageNumber } = event.queryStringParameters;
    const domains = await domainService.getAllDomains(limit, pageNumber);
    return new ResponseDto(200, domains, HEADERS);
  } catch (error) {
    console.log(error);
    return new ResponseDto(500, error.message, HEADERS);
  }
};
