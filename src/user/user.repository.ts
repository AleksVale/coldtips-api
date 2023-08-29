import { PrismaClient } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }
  create(createUserDto: CreateUserDto) {
    const user = this.prisma.user.create({
      data: createUserDto,
    });
    return user;
  }
  get(email: string) {
    return this.prisma.user.findFirst({ where: { email } });
  }
}
