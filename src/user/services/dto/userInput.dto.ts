import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsNotEmpty } from 'class-validator';
import { IProfile } from 'src/profile/entities/profile.entity';

export class UserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  cpf: string;
  
  @ApiProperty()
  profiles: IProfile[];

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  role: string;
}
