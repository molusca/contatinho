import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ordering } from '../shared/decorators/ordenate.decorator';
import { Pagination } from '../shared/decorators/paginate.decorator';
import {
  getWhereClauseBoolean,
  getWhereClauseNumber,
  getWhereClauseString,
} from '../shared/helpers/sql-query-helper';
import { IResponsePaginate } from '../shared/interfaces/response-paginate.interface';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { Contact } from './entities/contact.entity';
import { IContactFilter } from './interfaces/contact-filter.interface';

@Injectable()
export class ContactsService {
  constructor(
    @InjectRepository(Contact)
    private readonly _contactRepository: Repository<Contact>,
  ) {}

  async findAll(
    filter: IContactFilter,
    ordering: Ordering,
    paging: Pagination,
  ): Promise<IResponsePaginate<Contact>> {
    const where = this.buildWhereClause(filter);
    const limit = paging.limit;
    const offset = paging.offset * limit || 0;
    const sort = `"${ordering.column}"`;
    const order = ordering.dir.toUpperCase() as 'ASC' | 'DESC';

    const [result, count] = await this._contactRepository
      .createQueryBuilder()
      .where(where)
      .offset(offset)
      .limit(limit)
      .orderBy(sort, order)
      .getManyAndCount();

    return {
      data: result,
      count: +count,
      pageSize: +count,
    };
  }

  async create(createContactDto: CreateContactDto): Promise<Contact> {
    return this._contactRepository.save(new Contact(createContactDto));
  }

  async findOne(id: number): Promise<Contact> {
    return this._contactRepository.findOneOrFail({ where: { id } });
  }

  async update(
    id: number,
    updateContactDto: UpdateContactDto,
  ): Promise<Contact> {
    const foundContact = await this._contactRepository.findOneByOrFail({ id });
    const mergedContact = Object.assign(foundContact, updateContactDto);

    return this._contactRepository.save(mergedContact);
  }

  async remove(id: number): Promise<void> {
    await this._contactRepository.delete(id);
  }

  private buildWhereClause(filter: IContactFilter): string {
    let whereClause = '1 = 1 ';

    if (Object.entries(filter).length > 0) {
      whereClause += getWhereClauseNumber(filter.id, 'id');
      whereClause += getWhereClauseBoolean(filter.is_favorite, 'is_favorite');
      whereClause += getWhereClauseBoolean(filter.is_blocked, 'is_blocked');
      whereClause += getWhereClauseString(filter.name, 'name');
    }

    return whereClause;
  }
}
