import { PrismaService } from 'src/prisma/prisma.service';
import { IUserEntity } from './entities/user.entity';
import { PartialUserDto } from './services/dto/partialUserInput.dto';

export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(user: IUserEntity): Promise<IUserEntity> {
    const CreateUser = await this.prisma.user.create({ data: user });
    return CreateUser;
  }

  async updateUser(user: PartialUserDto): Promise<IUserEntity> {
    const UpdateUser = await this.prisma.user.update({
      where: { id: user.id },
      data: user,
    });
    return UpdateUser;
  }

  async deleteUser(id: string): Promise<IUserEntity> {
    const DeleteUser = await this.prisma.user.delete({
      where: { id: id },
    });
    return DeleteUser;
  }

  async findAllUser(): Promise<IUserEntity[]> {
    const AllUsers = await this.prisma.user.findMany();
    return AllUsers;
  }

  async findUserByIdUser(id: string): Promise<IUserEntity> {
    const UserById = await this.prisma.user.findUniqueOrThrow({
      where: { id: id },
    });
    return UserById;
  }
} 
