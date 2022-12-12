import { PartialType } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { CreateChannelDto } from './create-channel.dto';

export class UpdateChannelDto extends PartialType(CreateChannelDto) {
  @IsString()
  id: string;
}
