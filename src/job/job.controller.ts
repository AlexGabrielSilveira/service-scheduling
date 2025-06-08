import { Body, Controller, Get, Post, Request, UseGuards } from "@nestjs/common";
import { JobService } from "./job.service";
import { JobDto } from "./DTOs/job.dto";
import { AuthTokenGuard } from "src/auth/guards/auth-token.guard";


@Controller()
export class JobController {
    constructor(private readonly jobService: JobService) {}

    @UseGuards(AuthTokenGuard)
    @Post('post/service')
    async toSchedule(@Body() jobDto: JobDto, @Request() req: any) {
        const userId = req.user.sub;
        return await this.jobService.postJob(jobDto, userId);
    }
    
    @Get('services/all')
    async listAllServices() {
        return await this.jobService.listAllJobs();
    }
}