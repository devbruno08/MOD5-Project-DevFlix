import { Module } from '@nestjs/common';
// import { PassportModule } from "@nestjs/passport";
import { DatabaseModule } from 'src/prisma/database.module';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './services/user.service';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [UserService, UserRepository],
})
export class UserModule {}
