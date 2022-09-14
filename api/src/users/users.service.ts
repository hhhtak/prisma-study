import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { User } from 'src/@generated/prisma-nestjs-graphql/user/user.model'
import { FindFirstUserArgs } from 'src/@generated/prisma-nestjs-graphql/user/find-first-user.args'
import { CreateOneUserArgs } from 'src/@generated/prisma-nestjs-graphql/user/create-one-user.args'
import { FindUniqueUserArgs } from 'src/@generated/prisma-nestjs-graphql/user/find-unique-user.args'

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  findFirst = async (args: FindFirstUserArgs): Promise<User | null> => {
    return this.prisma.user.findFirst(args)
  }

  findUnique = async (args: FindUniqueUserArgs): Promise<User | null> => {
    return this.prisma.user.findUnique(args)
  }

  createUser = async (args: CreateOneUserArgs): Promise<User> => {
    return this.prisma.user.create(args)
  }
}
