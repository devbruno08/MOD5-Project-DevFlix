import { Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { IProfile } from './entities/profile.entity';
import { ProfileRepository } from './profile.repository';

@Injectable()
export class ProfileService {
  constructor(private readonly profileRepository: ProfileRepository) {}
  async createProfile(profile: CreateProfileDto): Promise<IProfile> {
    const profileEntity = { ...profile, id: randomUUID() };
    const createdProfile = await this.profileRepository.createProfile(
      profileEntity,
    );
    return createdProfile;
  }

  async updateProfile(Profile: UpdateProfileDto): Promise<IProfile> {
    const updatedProfile = await this.profileRepository.updateProfile(Profile);
    return updatedProfile;
  }

  async getAllProfiles(): Promise<IProfile[]> {
    return await this.profileRepository.findAllProfiles();
  }

  async deleteProfileById(profileId: string): Promise<boolean> {
    try {
      const Profile = await this.profileRepository.deleteProfile(profileId);
      if (Profile) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  async getProfileById(profileId: string): Promise<IProfile> {
    const ProfileById = await this.profileRepository.getProfileById(profileId);
    return ProfileById;
  }
}
