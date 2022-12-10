import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { IChannel } from "src/channel/entities/channel.entity";
import { CreateProfileDto } from "../dto/create-profile.dto";

export class IProfile extends CreateProfileDto {
    
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    id: string;

    // @ApiProperty()
    // channelinscribe: IChannel[]
}
