import { PartialType } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { CreateProfileDto } from './create-profile.dto';

export class UpdateProfileDto extends PartialType(CreateProfileDto) {
    @IsString()
    id: string;
}
