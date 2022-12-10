import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/services/user.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class ProfileService {
  constructor(private readonly userService: UserService){}
  async create(createProfileDto: CreateProfileDto) {
    await this.userService.getUserById(createProfileDto.userId)
  }

  async findAll() {
    return `This action returns all profile`;
  }

  async findOne(id: number) {
    return `This action returns a #${id} profile`;
  }

  async update(id: number, updateProfileDto: UpdateProfileDto) {
    return `This action updates a #${id} profile`;
  }

  async remove(id: number) {
    return `This action removes a #${id} profile`;
  }
}
