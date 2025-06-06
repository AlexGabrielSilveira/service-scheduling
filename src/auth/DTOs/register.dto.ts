import { Role } from "@prisma/client";
import { IsEmail, IsEnum, IsString, IsStrongPassword, MinLength } from "class-validator";

export class RegisterDto {
    @IsString({ message: 'Name must be a string' })
    @MinLength(3, { message: 'Name must be at least 3 characters long' })
    name: string;

    @IsEmail({}, { message: 'Invalid email address' })
    email: string;

    @IsString()
    @IsStrongPassword()
    password: string;

    @IsEnum(Role)
    role: Role
}