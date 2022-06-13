import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/services';
import { AuthLoginInput, AuthUpdateInput } from './dto';
import * as bcrypt from 'bcrypt';
import { UserEntity } from '../user/entities';

@Injectable()
export class AuthService {
  constructor(
    public userService: UserService,
    private jwtService: JwtService
  ) { }

  /**
   *
   * @param params
   * @param isModerator
   * @returns
   */
  async login(
    params: AuthLoginInput
  ) {
    try {
      const { email, password } = params;
      let user = await this.userService.findOne({ where: { email } });
      if (!user) {
        throw new HttpException(
          {
            status: HttpStatus.UNPROCESSABLE_ENTITY,
            errors: {
              email: 'notFound',
            },
          },
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }

      const isValidPassword = await bcrypt.compare(
        password,
        user.password,
      );
      const {name, id, role} = user

      if (isValidPassword) {
        const token = await this.jwtService.sign({
          id, email, name, role
        });
  
        return { accessToken: token, user };
      } else {
        throw new HttpException(
          {
            status: HttpStatus.UNPROCESSABLE_ENTITY,
            errors: {
              password: 'request.incorrectPassword',
            },
          },
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }
    } catch (error) {  
      throw error
    }
  }

  /**
   * 
   * @param id 
   * @param params 
   * @returns 
   */
  public async updateProfile(
    id: string,
    params: AuthUpdateInput
  ): Promise<UserEntity> {
    const { name, password, currentPassword } = params;
    if(password && currentPassword) {
      const user = await this.userService.findById(id);
      const isValidOldPassword = await bcrypt.compare(
        currentPassword,
        user.password,
      );
      if (!isValidOldPassword) {
        throw new HttpException(
          {
            status: HttpStatus.UNPROCESSABLE_ENTITY,
            errors: {
              oldPassword: 'incorrectOldPassword',
            },
          },
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }
    }else {
      return this.userService.update(id, params);
    }
  }
}
