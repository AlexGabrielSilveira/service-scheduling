import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { RegisterDto } from "./DTOs/register.dto";
import { HashService } from "./hashing/hash.service";
import { LoginDto } from "./DTOs/login.dto";
import { JwtService } from "@nestjs/jwt";
import { RefreshTokenDto } from "./DTOs/refresh-token.dto";
import { User } from "@prisma/client";

@Injectable()
export class AuthService{
    constructor(private readonly prismaService: PrismaService, private readonly hashService: HashService, private readonly jwtService: JwtService) {}

    public async register(registerDto: RegisterDto) {
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
    public async login(loginDto: LoginDto) {
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
        return this.createTokens(user)
    }   
    public async refreshTokens(refreshTokenDto: RefreshTokenDto) {
        try {
            const { sub } = await this.jwtService.verifyAsync(refreshTokenDto.refreshToken);
            
            const user = await this.prismaService.user.findUnique({
                where: {
                    email: sub.email,
                }
            });
            if(!user) throw new Error('User not found!');

            return this.createTokens(user)
        } 
        catch (error) {
            throw new UnauthorizedException(error.message)
        }
    }

    private async createTokens(user: User) {
        
        const accessTokenPromise =  this.signJwtAsync(user.id, Number(process.env.EXPIRES_IN), { email: user.email, role: user.role})
        const refreshTokenPromise  = this.signJwtAsync(user.id, Number(process.env.REFRESH_TOKEN), { email: user.email, role: user.role})

        const [accessToken, refreshToken] = await Promise.all([accessTokenPromise, refreshTokenPromise])

        return { accessToken, refreshToken };
    }
    async signJwtAsync(id: number, expiresIn: number, payload?: { email: string, role: string}) {
        return await this.jwtService.signAsync({
            sub: id,
            ...payload
        },
        {
            secret: process.env.JWT_SECRET,
            expiresIn: expiresIn
        });
    }
} 