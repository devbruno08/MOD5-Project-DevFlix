import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { IUserEntity } from './entities/user.entity';
import { PartialUserDto } from './services/dto/partialUserInput.dto';
import { UserDto } from './services/dto/userInput.dto';
import { UserService } from './services/user.service';
import { Response } from 'express';
import { HandleException } from 'src/utils/exceptions/exceptionsHelper';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { IsAdminAuthorization } from 'src/auth/decorators/is-admin.decorator';

@ApiTags('User')
@Controller('User')
export class UserController {
  constructor(private service: UserService) {}

  @UseGuards(AuthGuard(), IsAdminAuthorization)
  @ApiBearerAuth()
  @Get()
  async getAllUser(): Promise<IUserEntity[]> {
    return await this.service.getAllUsers();
  }

  @UseGuards(AuthGuard(), IsAdminAuthorization)
  @ApiBearerAuth()
  @Get(':id')
  async getUserById(@Param('id') Id: string): Promise<IUserEntity> {
    try {
      return await this.service.getUserById(Id);
    } catch (err) {
      HandleException(err);
    }
  }

  @UseGuards(AuthGuard(), IsAdminAuthorization)
  @ApiBearerAuth()
  @Post()
  async createUser(
    @Body() { cpf, email, password, name, role }: UserDto,
    @Res() response: Response,
  ): Promise<void> {
    try {
      const result = await this.service.createUser({
        cpf,
        email,
        password,
        name,
        role,
      });

      response.status(201).send(result);
    } catch (err) {
      HandleException(err);
    }
  }

  @UseGuards(AuthGuard(), IsAdminAuthorization)
  @Patch()
  async updateUser(@Body() userData: PartialUserDto): Promise<IUserEntity> {
    try {
      return await this.service.updateUser(userData);
    } catch (err) {
      HandleException(err);
    }
  }

  @UseGuards(AuthGuard(), IsAdminAuthorization)
  @ApiBearerAuth()
  @Delete(':id')
  async deleteUserById(@Param('id') Id: string): Promise<string> {
    const userIsDeleted = await this.service.deleteUserById(Id);
    if (userIsDeleted) {
      return 'Deleted successfully';
    } else {
      return 'User not found';
    }
  }
}
