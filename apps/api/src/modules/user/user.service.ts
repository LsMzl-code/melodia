import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) { }

  //*** GET ALL USERS ***//
  async getUsers() {
    const users = await this.prismaService.user.findMany({
      select: {
        id: true,
        username: true,
        email: true
      }
    })

    return users;
  }

  //*** GET UNIQUE USER ***//
  async getUser(userId: string) {
    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        username: true,
        email: true,
        currentAvatar: true,
        instrument: true,
        role: true
      }
    })

    return user;
  }
}
