import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt/dist";
import { PassportModule } from "@nestjs/passport";
import { DatabaseModule } from "src/prisma/database.module";
import { UserService } from "src/user/services/user.service";
import { UserRepository } from "src/user/user.repository";
import { Auth } from "./auth.controller";
import { AuthService } from "./auth.service";

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt'}),
        JwtModule.register({
            secret: process.env.SECRET_KEY,
            signOptions: { expiresIn: '24h'},
        }),
        ConfigModule.forRoot(),
        DatabaseModule,
    ],
    controllers: [Auth],
    providers: [AuthService, UserService, UserRepository],

})
    

export class AuthModule {}