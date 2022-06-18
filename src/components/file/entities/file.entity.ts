import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  Index,
  BeforeInsert,
} from 'typeorm';
import { Allow } from 'class-validator';
import { Field, ObjectType } from '@nestjs/graphql';

@Entity({ name: 'files' })
@ObjectType()
export class FileEntity extends BaseEntity {
  
  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => String)
  @Allow()
  @Column()
  url: string;

  @Field(() => String)
  @Column()
  @Index()
  userId: string;

  @Field(() => Date)
  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @BeforeInsert()
  setCreatedAt() {
    this.createdAt = new Date();
  }
}
