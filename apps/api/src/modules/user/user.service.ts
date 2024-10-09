import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) { }

  //*** GET ALL USERS ***//
  async getUsers() {
    const users = await this.prismaService.user.findMany({
      select: {
        id: true,
        username: true,
        email: true,
        currentAvatar: true
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
        role: true,
        avatar: {
          select: {
            name: true,
            imgUrl: true,
            createdAt: true
          }
        }
      }
    })

    return user;
  }

  //*** UPDATE USER ***//
  async updateUser(userId: string, data: UpdateUserDto) {
    const user = await this.prismaService.user.update({
      where: { id: userId },
      data: data
    })

    return user;
  }
}
