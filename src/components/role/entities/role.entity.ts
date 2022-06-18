import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';


@Entity({name: 'roles'})
@ObjectType()
export class Role extends BaseEntity {
  
  @Field(() => String)
  @PrimaryColumn()
  id: number;

  @Field(() => String)
  @Column()
  name?: string;
}
