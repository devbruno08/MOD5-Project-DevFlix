import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ChannelService } from './channel.service';
import { ChannelController } from './channel.controller';
import { ChannelRepository } from './channel.repository';

@Module({
  controllers: [ChannelController],
  providers: [ChannelService, ChannelRepository, PrismaService],
})
export class ChannelModule {}
