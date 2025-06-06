import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { HashService } from './hashing/hash.service';
import { BcryptService } from './hashing/bcrypt.service';

@Module({
  imports: [JwtModule.register({
    secret: process.env.JWT_SECRET,
    signOptions: { expiresIn: process.env.EXPIRES_IN }, 
    }),
    
    PrismaModule],
  providers: [
    {
      provide: HashService,
      useClass: BcryptService
    },
    AuthService],
  controllers: [AuthController],
  exports: [JwtModule]
})
export class AuthModule {}
