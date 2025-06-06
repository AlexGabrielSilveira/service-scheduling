import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { RegisterDto } from "./DTOs/register.dto";
import { HashService } from "./hashing/hash.service";
import { LoginDto } from "./DTOs/login.dto";

@Injectable()
export class AuthService{
    constructor(private readonly prismaService: PrismaService, private readonly hashService: HashService) {}

    async register(registerDto: RegisterDto) {
        const user = registerDto;
        const passwordHash = await this.hashService.hashPassword(user.password);

        const existingUser = await this.prismaService.user.findUnique({
            where: {
                email: user.email,
            },
        });

        if (existingUser) {
            throw new UnauthorizedException('User already exists');
        }

        const newUser = await this.prismaService.user.create({
            data: {
                name: user.name,
                email: user.email,
                password: passwordHash,
                role: user.role
            },
        });

        return newUser;
    }
    async login(loginDto: LoginDto) {
        const user = await this.prismaService.user.findUnique({
            where: {
                email: loginDto.email,
            },
        });

        if (!user) {
            throw new UnauthorizedException('User not found');
        }

        const isPasswordValid = await this.hashService.comparePassword(loginDto.password, user.password);

        if (!isPasswordValid) {
            throw new UnauthorizedException('password or email is incorrect');
        }

        // generate JWT later
        return { message: 'Login successful', name: user.name };
    }
} 