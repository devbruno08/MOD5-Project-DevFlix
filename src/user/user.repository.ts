import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Exception } from 'src/utils/exceptions/exception';
import { Exceptions } from 'src/utils/exceptions/exceptionsHelper';
import { IUserEntity } from './entities/user.entity';
import { PartialUserDto } from './services/dto/partialUserInput.dto';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(user: IUserEntity): Promise<IUserEntity> {
    try {
      const CreateUser = await this.prisma.user.create({
        data: user,
        include: { profiles: true },
      });
      return CreateUser;
    } catch (err) {
      throw new Exception(
        Exceptions.DatabaseExceptions,
        'Error in create user, data already exist',
      );
    }
  }

  async updateUser(user: PartialUserDto): Promise<IUserEntity> {
    try {
      const UpdateUser = await this.prisma.user.update({
        where: { id: user.id },
        data: user,
        include: { profiles: true },
      });
      return UpdateUser;
    } catch (err) {
      throw new Exception(Exceptions.DatabaseExceptions);
    }
  }

  async deleteUser(id: string): Promise<IUserEntity> {
    try {
      const DeleteUser = await this.prisma.user.delete({
        where: { id: id },
        include: { profiles: true },
      });
      return DeleteUser;
    } catch (err) {
      throw new Exception(Exceptions.DatabaseExceptions, 'User not found!');
    }
  }

  async findAllUsers(): Promise<IUserEntity[]> {
    try {
      const AllUsers = await this.prisma.user.findMany({
        include: { profiles: true },
      });

      return AllUsers;
    } catch (err) {
      throw new Exception(Exceptions.DatabaseExceptions);
    }
  }

  async findUserById(id: string): Promise<IUserEntity> {
    try {
      const UserById = await this.prisma.user.findUniqueOrThrow({
        where: { id: id },
      });
      return UserById;
    } catch (err) {
      throw new Exception(Exceptions.DatabaseExceptions);
    }
  }
}
