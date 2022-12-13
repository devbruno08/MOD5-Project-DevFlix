import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Exception } from 'src/utils/exceptions/exception';
import { Exceptions } from 'src/utils/exceptions/exceptionsHelper';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { IProfile } from './entities/profile.entity';

@Injectable()
export class ProfileRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createProfile(profile: IProfile): Promise<IProfile> {
    try {
      const CreateProfile = await this.prisma.profile.create({
        data: profile,
        include: { Channel: true },
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
        include: { Channel: true },
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
        include: { Channel: true },
      });
      return DeleteProfile;
    } catch (err) {
      throw new Exception(Exceptions.DatabaseExceptions, 'User not found!');
    }
  }

  async findAllProfiles(): Promise<IProfile[]> {
    try {
      const AllProfiles = await this.prisma.profile.findMany({
        include: { Channel: true },
      });

      return AllProfiles;
    } catch (err) {
      throw new Exception(Exceptions.DatabaseExceptions);
    }
  }

  async getProfileById(id: string): Promise<IProfile> {
    try {
      const ProfileById = await this.prisma.profile.findUniqueOrThrow({
        where: { id: id },
        include: { Channel: true },
      });
      return ProfileById;
    } catch (err) {
      throw new Exception(Exceptions.DatabaseExceptions);
    }
  }
}
