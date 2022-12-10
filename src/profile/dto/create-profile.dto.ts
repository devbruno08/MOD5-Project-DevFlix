import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, isString } from 'class-validator';
import { IChannel } from 'src/channel/entities/channel.entity';

export class CreateProfileDto {

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    userId: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    image: string;

    @ApiProperty()
    channelinscribe: IChannel[]
}
