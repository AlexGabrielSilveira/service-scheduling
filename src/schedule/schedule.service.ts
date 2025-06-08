import { Injectable, NotFoundException } from "@nestjs/common";
import { ScheduleDto } from "./DTOs/schedule.dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class ScheduleService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: ScheduleDto, clientId: number) {
   // to do
  }

  async getClientAppointments(clientId: number) {
   //to do
  }

  async getProviderAppointments(providerId: number) {
   // to do
  }
}
