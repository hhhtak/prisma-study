import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UsersService } from 'src/users/users.service'
import { User } from 'src/@generated/prisma-nestjs-graphql/user/user.model'
import * as bcrypt from 'bcrypt'
import { LoginResponse } from 'src/auth/dto/login-response'

@Injectable()
export class AuthService {
  constructor(private userService: UsersService, private jwtService: JwtService) {}

  validateUser = async (email: string, password: string): Promise<User | null> => {
    const user = await this.userService.findUnique({ where: { email: email } })

    if (user && bcrypt.compareSync(password, user.password)) {
      return user
    }
    return null
  }

  login = async (user: User): Promise<LoginResponse> => {
    const payload = { email: user.email, sub: user.id }
    return {
      access_token: this.jwtService.sign(payload),
      user: user,
    }
  }
}
