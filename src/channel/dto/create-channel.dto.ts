import { IProfile } from "src/profile/entities/profile.entity";
import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateChannelDto {

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    lesson: string;

    @ApiProperty()
    subscribed: IProfile[];
}
