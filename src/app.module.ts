import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { JobModule } from './job/job.module';
import { ScheduleModule } from './schedule/schedule.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }),
  PrismaModule, AuthModule, JobModule, ScheduleModule],
})
export class AppModule {}
