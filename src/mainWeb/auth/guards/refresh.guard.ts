import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class JwtRefreshGuard implements CanActivate {
  constructor(private jwtService: JwtService, private prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    const token = this.getToken(request);
    const userId = this.getUserId(request);

    if (!token || !userId) {
      throw new UnauthorizedException('Missing token, userId, or device');
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET_REFRESH || "default_refresh_secret_key"
      });

      if (!payload) throw new UnauthorizedException('Invalid token payload');

      if (userId !== payload.id) throw new UnauthorizedException('User ID does not match token');

      return true;
    } catch (error) {
      console.error(error);
      throw new UnauthorizedException('Unauthorized access');
    }
  }

  private getToken(request: Request): string | undefined {
    const authorizationHeader = request.headers.authorization;
    if (!authorizationHeader) return undefined;
    const [type, token] = authorizationHeader.split(' ');
    return type === 'Refresh' ? token : undefined;
  }

  private getUserId(request: Request): string | undefined {
    const userIdHeader = request.headers.userid as string;
    if (!userIdHeader) return undefined;
    const [type, token] = userIdHeader.split('&');
    return type === 'hasses' ? token : undefined;
  }
}
