import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";

@Injectable()
export class AuthTokenGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService){}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request: Request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request)

        if(!token) throw new UnauthorizedException('You need to create an account first!');

        try
        {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: process.env.JWT_SECRET
            })
            request['user'] = payload;
        }catch(err)
        {
            console.log(err)
            throw new UnauthorizedException('Login failed!')
        }
        return true;
    }
    extractTokenFromHeader(request: Request): string | undefined {
        const authorization = request.headers?.authorization

        if(!authorization || typeof authorization !== 'string') {
            return;
        }
        return authorization.split(' ')[1];
    }
}