import { Body, Controller, Get, Post, Request, UnauthorizedException, UseGuards } from "@nestjs/common";
import { AuthTokenGuard } from "src/auth/guards/auth-token.guard";
import { ScheduleDto } from "./DTOs/schedule.dto";
import { ScheduleService } from "./schedule.service";

@UseGuards(AuthTokenGuard)
@Controller('schedule')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  
  @Post('/new/appointment')
  async schedule(@Request() req: any, @Body() scheduleDto: ScheduleDto) {
    const clientId = req.user.sub;
    return this.scheduleService.create(scheduleDto, clientId);
  }

  @Get('my/appointments')
  async myAppointments(@Request() req: any) {
    const userId = req.user.sub;
    const role = req.user.role;

    if (role === 'client') {
      return this.scheduleService.getClientAppointments(userId);
    } else if (role === 'provider') {
      return this.scheduleService.getProviderAppointments(userId);
    } else {
      throw new UnauthorizedException('Usuário não autorizado');
    }
  }
}
