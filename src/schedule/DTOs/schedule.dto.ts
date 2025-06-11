import { IsDate, IsISO8601, IsNumber, IsPositive } from "class-validator";

export class ScheduleDto {
    @IsNumber()
    @IsPositive()
    jobId: number;
    @IsISO8601()
    scheduleAt: Date;

    @IsNumber()
    @IsPositive()
    providerId: number;
}