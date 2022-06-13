import { Field, InputType } from '@nestjs/graphql';
import {  IsNotEmpty, IsEmail, MinLength } from 'class-validator';

@InputType()
export class AuthLoginInput {
  @Field(() => String, { description: 'email of the user' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Field(() => String, { description: 'password of the user' })
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
