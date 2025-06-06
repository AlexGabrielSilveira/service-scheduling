import { Module } from "@nestjs/common";
import { JobService } from "./job.service";
import { JobController } from "./job.controller";
import { AuthModule } from "src/auth/auth.module";
import { PrismaModule } from "src/prisma/prisma.module";

@Module({
    imports: [AuthModule, PrismaModule],
    providers: [JobService],
    controllers: [JobController]
})
export class JobModule {}