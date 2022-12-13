import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Exception } from 'src/utils/exceptions/exception';
import { Exceptions } from 'src/utils/exceptions/exceptionsHelper';
import { CreateChannelDto } from './dto/create-channel.dto';
import { UpdateChannelDto } from './dto/update-channel.dto';
import { IChannel } from './entities/channel.entity';

@Injectable()
export class ChannelRepository {
  private dataToReturn = {
    subscribed: true,
  };

  constructor(private readonly prismaService: PrismaService) {}

  async createChannel(
    { name, lesson }: CreateChannelDto,
    id: string,
  ): Promise<IChannel> {
    try {
      return await this.prismaService.channel.create({
        data: {
          id: id,
          name: name,
          lesson: lesson,
        },
        include: this.dataToReturn,
      });
    } catch (err) {
      throw new Exception(
        Exceptions.DatabaseExceptions,
        'Error in create user, data already exist',
      );
    }
  }

  async updateChannel(updateData: UpdateChannelDto): Promise<IChannel> {
    try {
      const subscribedIds = updateData.profileIds;

      delete updateData.profileIds;

      return await this.prismaService.channel.update({
        where: { id: updateData.id },
        data: {
          subscribed: {
            connect: subscribedIds?.map((id) => ({ id: id })),
          },
        },
        include: this.dataToReturn,
      });
    } catch (err) {
      throw new Exception(Exceptions.DatabaseExceptions);
    }
  }

  async deleteChannel(id: string): Promise<IChannel> {
    try {
      return await this.prismaService.channel.delete({
        where: { id: id },
        include: this.dataToReturn,
      });
    } catch (err) {
      throw new Exception(Exceptions.DatabaseExceptions, 'User not found!');
    }
  }

  async findAllChannels(): Promise<IChannel[]> {
    try {
      return await this.prismaService.channel.findMany({
        include: this.dataToReturn,
      });
    } catch (err) {
      throw new Exception(Exceptions.DatabaseExceptions);
    }
  }

  async getChannelById(id: string): Promise<IChannel> {
    try {
      return await this.prismaService.channel.findUnique({
        where: { id: id },
        include: this.dataToReturn,
      });
    } catch (err) {
      throw new Exception(Exceptions.DatabaseExceptions);
    }
  }
}
