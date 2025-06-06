import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JobDto } from "./DTOs/job.dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class JobService {
    constructor(private readonly prismaService: PrismaService) {}
    async postJob(jobDto: JobDto, userId: number) {
          const user = await this.prismaService.user.findUnique({
            where: {
                id: userId
            }
        })
        if(user?.role == "provider") {
             const newPostJob = await this.prismaService.job.create({
            data: {
                name: jobDto.name,
                description: jobDto.description,
                duration: jobDto.duration,
                price: jobDto.price, 
                providerId: userId
            }
        })

        return newPostJob;
    }else {
        throw new UnauthorizedException('Just providers can create a Job!')
    }
    
    }
    async listAllJobs() {
        return await this.prismaService.job.findMany()
    }
}