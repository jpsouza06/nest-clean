import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { envSchema } from './env'
import { PrismaService } from './prisma/prisma.service'
import { CreateAccountController } from './controllers/create-account.controller'
import { AuthModule } from './auth/auth.module'
import { AuthenticateAccountController } from './controllers/authenticate-account.controller'

@Module({
  controllers: [
    CreateAccountController,
    AuthenticateAccountController
  ],
  providers: [PrismaService],
  imports: [
    ConfigModule.forRoot({
      validate: env => envSchema.parse(env),
      isGlobal: true,
    }),
    AuthModule
  ],
})
export class AppModule {}
