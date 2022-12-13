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
import { HandleException } from 'src/utils/exceptions/exceptionsHelper';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ChannelService } from './channel.service';
import { UpdateChannelDto } from './dto/update-channel.dto';
import { AuthGuard } from '@nestjs/passport';
import { IsAdminAuthorization } from 'src/auth/decorators/is-admin.decorator';
import { CreateChannelDto } from './dto/create-channel.dto';

@Controller('Channel')
@ApiTags('Channel')
export class ChannelController {
  constructor(private readonly channelService: ChannelService) {}

  @ApiBearerAuth()
  @Get()
  async getAllChannels() {
    try {
      return await this.channelService.getAllChannels();
    } catch (err) {
      HandleException(err);
    }
  }

  @ApiBearerAuth()
  @Get(':id')
  async getChannelId(@Param('id') Id: string) {
    try {
      return await this.channelService.getChannelById(Id);
    } catch (err) {
      HandleException(err);
    }
  }

  @ApiBearerAuth()
  @Post()
  async createChannel(@Body() createChannelDto: CreateChannelDto) {
    try {
      return await this.channelService.createChannel(createChannelDto);
    } catch (err) {
      HandleException(err);
    }
  }

  @ApiBearerAuth()
  @Patch()
  async updateChannel(@Body() updateChannelDto: UpdateChannelDto) {
    try {
      return await this.channelService.updateChannel(updateChannelDto);
    } catch (err) {
      HandleException(err);
    }
  }

  @ApiBearerAuth()
  @Delete(':id')
  async deleteChannelById(@Param('id') Id: string) {
    try {
      return await this.channelService.deleteChannelById(Id);
    } catch (err) {
      HandleException(err);
    }
  }
}
