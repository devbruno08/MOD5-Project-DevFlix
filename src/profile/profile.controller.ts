import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { HandleException } from 'src/utils/exceptions/exceptionsHelper';
import { IProfile } from './entities/profile.entity';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Profile')
@Controller()
export class ProfileController {
  constructor(private service: ProfileService) {}

  @Get()
  async getAllProfiles(): Promise<IProfile[]> {
    return await this.service.getAllProfiles();
  }

  @Get(':id')
  async getProfileById(@Param('id') Id: string): Promise<IProfile> {
    try {
      return await this.service.getProfileById(Id);
    } catch (err) {
      HandleException(err);
    }
  }

  @Post()
  async createProfile(
    @Body() { name, image, userId }: IProfile,
    @Res() response: Response,
  ): Promise<void> {
    try {
      const result = await this.service.createProfile({
        name,
        image,
        userId,
      });

      response.status(201).send(result);
    } catch (err) {
      HandleException(err);
    }
  }

  @Patch()
  async updateProfile(@Body() profileData: UpdateProfileDto): Promise<IProfile> {
    try {
      return await this.service.updateProfile(profileData);
    } catch (err) {
      HandleException(err);
    }
  }

  @Delete(':id')
  async deleteProfileById(@Param('id') Id: string): Promise<string> {
    const profileIsDeleted = await this.service.deleteProfileById(Id);
    if (profileIsDeleted) {
      return 'Deleted successfully';
    } else {
      return 'User not found';
    }
  }
}
