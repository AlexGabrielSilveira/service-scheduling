import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { JobModule } from './job/job.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }),
  PrismaModule, AuthModule, JobModule],
})
export class AppModule {}
