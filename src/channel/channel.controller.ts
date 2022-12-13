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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ChannelService } from './channel.service';
import { IChannel } from './entities/channel.entity';
import { UpdateChannelDto } from './dto/update-channel.dto';
import { AuthGuard } from '@nestjs/passport';
import { IsAdminAuthorization } from 'src/auth/decorators/is-admin.decorator';

@Controller('Channel')
@ApiTags('Channel')
export class ChannelController {
  constructor(private service: ChannelService) {}

  @ApiBearerAuth()
  @Get()
  async getAllChannels(): Promise<IChannel[]> {
    return await this.service.getAllChannels();
  }

  @ApiBearerAuth()
  @Get(':id')
  async getChannelId(@Param('id') Id: string): Promise<IChannel> {
    try {
      return await this.service.getChannelById(Id);
    } catch (err) {
      HandleException(err);
    }
  }

  @ApiBearerAuth()
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

  @ApiBearerAuth()
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

  @ApiBearerAuth()
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
