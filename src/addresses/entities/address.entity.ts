import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Contact } from '../../contacts/entities/contact.entity';
import { CreateAddressDto } from '../dto/create-address.dto';

@Entity({ name: 'addresses' })
export class Address {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('varchar', { nullable: true, length: 60 })
  label?: string;

  @Column('varchar', { nullable: false, length: 255 })
  street!: string;

  @Column('int', { nullable: false })
  number!: number;

  @Column('varchar', { nullable: true, length: 255 })
  complement?: string;

  @Column('varchar', { nullable: false, length: 60 })
  city!: string;

  @Column('varchar', { nullable: false, length: 60 })
  state!: string;

  @Column('varchar', { nullable: false, length: 30 })
  country!: string;

  @Column('varchar', { nullable: true, length: 30 })
  zip_code?: string;

  @ManyToOne(() => Contact, (contact) => contact.addresses, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  @JoinColumn({ name: 'contact_id' })
  contact!: Contact;

  constructor(address_dto: CreateAddressDto) {
    Object.assign(this, address_dto);
  }
}
