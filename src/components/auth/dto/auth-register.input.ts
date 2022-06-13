import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, MinLength, Validate } from 'class-validator';
import { IsNotExist } from 'src/utils/validator';

@InputType()
export class AuthRegisterInput {
    
  @Field(() => String, { description: 'name of the user' })
  @IsNotEmpty()
  name: string;

  @Field(() => String, { description: 'email of the user' })
  @Validate(IsNotExist, ['UserEntity'])
  email: string;
  
  @Field(() => String, { description: 'role of the user' })
  @IsNotEmpty()
  role: string;

  @Field(() => String, { description: 'password of the user' })
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}