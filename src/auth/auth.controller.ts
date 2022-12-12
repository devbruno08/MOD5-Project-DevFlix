import { Body, Controller, Get, Post } from '@nestjs/common';
import { Request, UseGuards } from '@nestjs/common/decorators';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { UserLoginDto } from './dto/user-login.dto';

@Controller('Authorization')
@ApiTags('Authorization')
export class Auth {
  constructor(private readonly authservice: AuthService) {}

  @Post('login')
  async login(@Body() data: UserLoginDto) {
    return await this.authservice.validateUser(data);
  }

  @UseGuards(AuthGuard())
  @Get()
  @ApiBearerAuth()
  async getUser(@Request() req) {
    console.log(req);
  }
}
