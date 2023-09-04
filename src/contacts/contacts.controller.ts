import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Filtering, Filtrate } from '../shared/decorators/filtrate.decorator';
import { Ordenate, Ordering } from '../shared/decorators/ordenate.decorator';
import { Paginate, Pagination } from '../shared/decorators/paginate.decorator';
import { IResponsePaginate } from '../shared/interfaces/response-paginate.interface';
import { IResponse } from '../shared/interfaces/response.interface';
import { HttpResponse } from '../shared/messages/http-response';
import { ContactsService } from './contacts.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { Contact } from './entities/contact.entity';
import { IContactFilter } from './interfaces/contact-filter.interface';

@Controller('contacts')
export class ContactsController {
  constructor(private readonly _contactsService: ContactsService) {}

  @Get()
  async findAll(
    @Filtrate() contactFilter: Filtering<IContactFilter>,
    @Paginate() pagination: Pagination,
    @Ordenate() ordering: Ordering,
  ): Promise<IResponsePaginate<Contact>> {
    return this._contactsService.findAll(
      contactFilter.filter,
      ordering,
      pagination,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Contact> {
    return this._contactsService.findOne(id);
  }

  @Post()
  async create(
    @Body() createContactDto: CreateContactDto,
  ): Promise<IResponse<Contact>> {
    console.log(createContactDto);
    const data = await this._contactsService.create(createContactDto);

    return new HttpResponse(data).onCreated();
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateContactDto: UpdateContactDto,
  ): Promise<IResponse<Contact>> {
    const data = await this._contactsService.update(id, updateContactDto);

    return new HttpResponse(data).onUpdated();
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<IResponse<string>> {
    await this._contactsService.remove(id);
    return new HttpResponse('').onDeleted();
  }
}
