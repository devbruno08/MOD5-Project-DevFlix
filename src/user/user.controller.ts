import { Body, Controller, Get, Post } from '@nestjs/common';
import { IUserEntity } from './entities/user.entity';
import { UserService } from './services/user.service';

@Controller()
export class UserController {
  constructor(private service: UserService) {}

  @Get()
  async getAllUser(): Promise<IUserEntity[]> {
    return await this.service.getAllUsers();
  }

  @Post()
  async createUser(
    @Body() { cpf, email, password, name }: UserDto,
  ): Promise<IUserEntity> {}
}
