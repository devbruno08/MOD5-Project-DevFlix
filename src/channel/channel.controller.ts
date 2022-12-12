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
import { ApiTags } from '@nestjs/swagger';
import { ChannelService } from './channel.service';
import { IChannel } from './entities/channel.entity';
import { UpdateChannelDto } from './dto/update-channel.dto';

@ApiTags('Profile')
@Controller()
export class ChannelController {
  constructor(private service: ChannelService) {}

  @Get()
  async getAllChannels(): Promise<IChannel[]> {
    return await this.service.getAllChannels();
  }

  @Get(':id')
  async getChannelId(@Param('id') Id: string): Promise<IChannel> {
    try {
      return await this.service.getChannelById(Id);
    } catch (err) {
      HandleException(err);
    }
  }

  @Post()
  async createChannel(
    @Body() { name, lesson }: IChannel,
    @Res() response: Response,
  ): Promise<void> {
    try {
      const result = await this.service.createChannel({
        name,
        lesson,
      });

      response.status(201).send(result);
    } catch (err) {
      HandleException(err);
    }
  }

  @Patch()
  async updateChannel(
    @Body() channelData: UpdateChannelDto,
  ): Promise<IChannel> {
    try {
      return await this.service.updateChannel(channelData);
    } catch (err) {
      HandleException(err);
    }
  }

  @Delete(':id')
  async deleteChannelById(@Param('id') Id: string): Promise<string> {
    const channelIsDeleted = await this.service.deleteChannelById(Id);
    if (channelIsDeleted) {
      return 'Deleted successfully';
    } else {
      return 'User not found';
    }
  }
}
