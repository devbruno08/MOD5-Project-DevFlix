import { Body, Controller, Get, Post } from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { IUserEntity } from 'src/user/entities/user.entity';
import { HandleException } from 'src/utils/exceptions/exceptionsHelper';
import { AuthService } from './auth.service';
import { UserLoginDto } from './dto/user-login.dto';
import { userLogged } from './decorators/user-logged.decorator';
import { IsAdminAuthorization } from './decorators/is-admin.decorator';

@Controller('Authorization')
@ApiTags('Auth')
export class Auth {
  constructor(private readonly authservice: AuthService) {}

  @Post('login')
  async login(@Body() data: UserLoginDto) {
    try {
      return await this.authservice.validateUser(data);
    } catch (error) {
      HandleException(error);
    }
  }

  @Get()
  @ApiBearerAuth()
  async getUser(@userLogged() user: IUserEntity) {
    return user;
  }
}

