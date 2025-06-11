import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { ScheduleDto } from "./DTOs/schedule.dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class ScheduleService {
  constructor(private readonly prisma: PrismaService) {}

  async create(scheduleDto: ScheduleDto, clientId: number) {

    if(scheduleDto.providerId == clientId) throw new UnauthorizedException("Não pode agendar um horario com você mesmo!")

      const newAppointment  = await this.prisma.schedule.create({
        data: {
          scheduleAt: scheduleDto.scheduleAt,
          providerId: scheduleDto.providerId,
          clientId: clientId,
          jobId: scheduleDto.jobId
        }
      })
      return newAppointment;
  }

 async getClientAppointments(clientId: number) {
  return this.prisma.schedule.findMany({
    where: { clientId },
    include: {
      job: true,
      provider: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
    orderBy: {
      scheduleAt: 'asc',
    },
  });
}


 async getProviderAppointments(providerId: number) {
  return this.prisma.schedule.findMany({
    where: { providerId },
    include: {
      job: true,
      client: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
    orderBy: {
      scheduleAt: 'asc',
    },
  });
}

}
