import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Exception } from 'src/utils/exceptions/exception';
import { Exceptions } from 'src/utils/exceptions/exceptionsHelper';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { IProfile } from './entities/profile.entity';

@Injectable()
export class ProfileRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createProfile(profile: IProfile): Promise<IProfile> {
    try {
      const CreateProfile = await this.prisma.profile.create({
        data: profile,
      });
      return CreateProfile;
    } catch (err) {
      throw new Exception(
        Exceptions.DatabaseExceptions,
        'Error in create user, data already exist',
      );
    }
  }

  async updateProfile(profile: UpdateProfileDto): Promise<IProfile> {
    try {
      const UpdateProfile = await this.prisma.profile.update({
        where: { id: profile.id },
        data: profile,
      });
      return UpdateProfile;
    } catch (err) {
      throw new Exception(Exceptions.DatabaseExceptions);
    }
  }

  async deleteProfile(id: string): Promise<IProfile> {
    try {
      const DeleteProfile = await this.prisma.profile.delete({
        where: { id: id },
      });
      return DeleteProfile;
    } catch (err) {
      throw new Exception(Exceptions.DatabaseExceptions, 'User not found!');
    }
  }

  async findAllProfiles(): Promise<IProfile[]> {
    try {
      const AllProfiles = await this.prisma.profile.findMany();
      return AllProfiles;
    } catch (err) {
      throw new Exception(Exceptions.DatabaseExceptions);
    }
  }

  async getProfileById(id: string): Promise<IProfile> {
    try {
      const ProfileById = await this.prisma.profile.findUniqueOrThrow({
        where: { id: id },
      });
      return ProfileById;
    } catch (err) {
      throw new Exception(Exceptions.DatabaseExceptions);
    }
  }
}
