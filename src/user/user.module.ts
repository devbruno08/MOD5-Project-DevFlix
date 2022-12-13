import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/prisma/database.module';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './services/user.service';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    DatabaseModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService],
})
export class UserModule {}
