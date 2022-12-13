import { Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { ChannelRepository } from './channel.repository';
import { CreateChannelDto } from './dto/create-channel.dto';
import { UpdateChannelDto } from './dto/update-channel.dto';
import { IChannel } from './entities/channel.entity';

@Injectable()
export class ChannelService {
  constructor(private readonly channelRepository: ChannelRepository) {}

  async createChannel(createChannelDto: CreateChannelDto): Promise<IChannel> {
    const id = randomUUID();
    return await this.channelRepository.createChannel(createChannelDto, id);
  }

  async updateChannel(Channel: UpdateChannelDto): Promise<IChannel> {
    const updatedChannel = await this.channelRepository.updateChannel(Channel);
    return updatedChannel;
  }

  async getAllChannels(): Promise<IChannel[]> {
    return await this.channelRepository.findAllChannels();
  }

  async deleteChannelById(channelId: string): Promise<boolean> {
    try {
      const Channel = await this.channelRepository.deleteChannel(channelId);
      if (Channel) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  async getChannelById(channelId: string): Promise<IChannel> {
    const ChannelById = await this.channelRepository.getChannelById(channelId);
    return ChannelById;
  }
}
