import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Exception } from 'src/utils/exceptions/exception';
import { Exceptions } from 'src/utils/exceptions/exceptionsHelper';
import { UpdateChannelDto } from './dto/update-channel.dto';
import { IChannel } from './entities/channel.entity';

@Injectable()
export class ChannelRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createChannel(channel: IChannel): Promise<IChannel> {
    try {
      const CreateChannel = await this.prisma.channel.create({
        data: channel,
        include: { subscribed: true },
      });
      return CreateChannel;
    } catch (err) {
      throw new Exception(
        Exceptions.DatabaseExceptions,
        'Error in create user, data already exist',
      );
    }
  }

  async updateChannel(channel: UpdateChannelDto): Promise<IChannel> {
    try {
      const UpdateChannel = await this.prisma.channel.update({
        where: { id: channel.id },
        data: channel,
        include: { subscribed: true },
      });
      return UpdateChannel;
    } catch (err) {
      throw new Exception(Exceptions.DatabaseExceptions);
    }
  }

  async deleteChannel(id: string): Promise<IChannel> {
    try {
      const DeleteChannel = await this.prisma.channel.delete({
        where: { id: id },
        include: { subscribed: true },
      });
      return DeleteChannel;
    } catch (err) {
      throw new Exception(Exceptions.DatabaseExceptions, 'User not found!');
    }
  }

  async findAllChannels(): Promise<IChannel[]> {
    try {
      const AllChannels = await this.prisma.channel.findMany({
        include: { subscribed: true },
      });

      return AllChannels;
    } catch (err) {
      throw new Exception(Exceptions.DatabaseExceptions);
    }
  }

  async getChannelById(id: string): Promise<IChannel> {
    try {
      const ChannelById = await this.prisma.channel.findUniqueOrThrow({
        where: { id: id },
      });
      return ChannelById;
    } catch (err) {
      throw new Exception(Exceptions.DatabaseExceptions);
    }
  }
}
