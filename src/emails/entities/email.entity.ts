import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Contact } from '../../contacts/entities/contact.entity';
import { CreateEmailDto } from '../dto/create-email.dto';

@Entity({ name: 'emails' })
export class Email {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('text', { nullable: false })
  email!: string;

  @ManyToOne(() => Contact, (contact) => contact.emails, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  @JoinColumn({ name: 'contact_id' })
  contact!: Contact;

  constructor(email_dto: CreateEmailDto) {
    Object.assign(this, email_dto);
  }
}
