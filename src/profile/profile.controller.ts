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
import { Response } from 'express';
import { HandleException } from 'src/utils/exceptions/exceptionsHelper';
import { IProfile } from './entities/profile.entity';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ProfileService } from './profile.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { IsAdminAuthorization } from 'src/auth/decorators/is-admin.decorator';

@Controller('Profile')
@ApiTags('Profile')
export class ProfileController {
  constructor(private service: ProfileService) {}

  @ApiBearerAuth()
  @Get()
  async getAllProfiles(): Promise<IProfile[]> {
    return await this.service.getAllProfiles();
  }

  @ApiBearerAuth()
  @Get(':id')
  async getProfileById(@Param('id') Id: string): Promise<IProfile> {
    try {
      return await this.service.getProfileById(Id);
    } catch (err) {
      HandleException(err);
    }
  }

  @ApiBearerAuth()
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

  @ApiBearerAuth()
  @Patch()
  async updateProfile(
    @Body() profileData: UpdateProfileDto,
  ): Promise<IProfile> {
    try {
      return await this.service.updateProfile(profileData);
    } catch (err) {
      HandleException(err);
    }
  }

  @ApiBearerAuth()
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
