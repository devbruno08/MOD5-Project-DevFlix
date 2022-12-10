import { Module } from '@nestjs/common';
import { DatabaseModule } from './prisma/database.module';
import { ProfileModule } from './profile/profile.module';
import { ChannelModule } from './channel/channel.module';
import { UserModule } from './user/user.module';


@Module({
  imports: [DatabaseModule, UserModule, ProfileModule, ChannelModule],

})
export class AppModule {}
