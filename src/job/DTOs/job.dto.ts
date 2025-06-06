import { IsNotEmpty, IsNumber, IsString, Min } from "class-validator"

export class JobDto {

    @IsString()
    @IsNotEmpty()
    name: string

    @IsString()
    description: string

    @IsNumber()
    @IsNotEmpty()
    duration: number

    @IsNumber()
    @Min(20)
    @IsNotEmpty()
    price: number

    @IsNumber()
    providerId: number

}