import { Module } from '@nestjs/common';
import { DatabaseModule } from './prisma/database.module';
import { ProfileModule } from './profile/profile.module';
import { ChannelModule } from './channel/channel.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [DatabaseModule, AuthModule, UserModule, ProfileModule, ChannelModule],

})
export class AppModule {}
