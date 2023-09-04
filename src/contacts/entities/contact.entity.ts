import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Address } from '../../addresses/entities/address.entity';
import { Email } from '../../emails/entities/email.entity';
import { Phone } from '../../phones/entities/phone.entity';
import { CreateContactDto } from '../dto/create-contact.dto';

@Entity({ name: 'contacts' })
export class Contact {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('boolean', { nullable: false, default: false })
  is_favorite?: boolean;

  @Column('boolean', { nullable: false, default: false })
  is_blocked?: boolean;

  @Column('varchar', { nullable: false, length: 255 })
  full_name!: string;

  @Column('timestamptz', { nullable: true, default: null })
  birth_date?: Date;

  @Column('text', { nullable: true, default: null })
  image?: string;

  @Column('varchar', { nullable: true, length: 255 })
  notes?: string;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at?: Date;

  @OneToMany(() => Phone, (phone) => phone.contact, {
    cascade: true,
    eager: true,
  })
  phone_numbers?: Phone[];

  @OneToMany(() => Email, (email) => email.contact, {
    cascade: true,
    eager: true,
  })
  emails?: Email[];

  @OneToMany(() => Address, (address) => address.contact, {
    cascade: true,
    eager: true,
  })
  addresses?: Address[];

  constructor(contact_dto: CreateContactDto) {
    Object.assign(this, contact_dto);
  }
}
