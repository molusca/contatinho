import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Contact } from '../../contacts/entities/contact.entity';
import { CreatePhoneDto } from '../dto/create-phone.dto';

@Entity({ name: 'phones' })
export class Phone {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('varchar', { nullable: false, length: 7 })
  country_code!: string;

  @Column('varchar', { nullable: false, length: 20 })
  number!: string;

  @ManyToOne(() => Contact, (contact) => contact.phone_numbers, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  @JoinColumn({ name: 'contact_id' })
  contact!: Contact;

  constructor(phone_dto: CreatePhoneDto) {
    Object.assign(this, phone_dto);
  }
}
