import {
  AfterLoad,
  BeforeInsert,
  BeforeUpdate,
  Column,
  DeleteDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn
} from 'typeorm';
import { AbstractEntity } from 'src/base';
import { Field, ObjectType } from '@nestjs/graphql';
import * as bcrypt from 'bcrypt';

@Entity({name: 'users'})
@ObjectType()
export class UserEntity extends AbstractEntity {

  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => String)
  @Column({ nullable: false })
  name: string;

  @Field(() => String)
  @Column({ nullable: false })
  @Index()
  email: string | null;

  @Field(() => String)
  @Column()
  @Index()
  role?: string;

  @Column()
  password: string;

  public previousPassword: string;

  @AfterLoad()
  public loadPreviousPassword(): void {
    this.previousPassword = this.password;
  }

  @BeforeInsert()
  @BeforeUpdate()
  async setPassword() {
    if (this.previousPassword !== this.password && this.password) {
      const salt = await bcrypt.genSalt();
      this.password = await bcrypt.hash(this.password, salt);
    }
  }

  @DeleteDateColumn()
  deletedAt?: Date;
  
}
