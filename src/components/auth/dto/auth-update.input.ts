import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, IsString, MinLength } from 'class-validator';

@InputType()
export class AuthUpdateInput {
  @Field(() => String, { description: 'name of the user', nullable: true })
  @IsOptional()
  @IsString()
  name?: string;

  @Field(() => String, { description: 'password name of the user', nullable: true })
  @IsOptional()
  @MinLength(6)
  password?: string;

  @Field(() => String, { description: 'current password of the user', nullable: true })
  @MinLength(6)
  currentPassword?: string;
}
