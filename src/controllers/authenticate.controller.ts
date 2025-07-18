import { Body, Controller, Post, UnauthorizedException, UsePipes } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { compare } from 'bcryptjs'
import { Public } from 'src/auth/public'
import { ZodValidationPipe } from 'src/pipes/zod-validation-pipe'
import { PrismaService } from 'src/prisma/prisma.service'
import {z} from 'zod'

const authenticateControllerBodySchema = z.object({
  email: z.email(),
  password: z.string()
})

type AuthenticateControllerBodySchema = z.infer<typeof authenticateControllerBodySchema>

@Controller('/sessions')
@Public()
export class AuthenticateController {
  constructor(
    private jwt: JwtService,
    private prisma: PrismaService
  ) {}

  @Post()
  @UsePipes(new ZodValidationPipe(authenticateControllerBodySchema))
  async handle(@Body() body: AuthenticateControllerBodySchema) {
    const { email, password } = body

    const user = await this.prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      throw new UnauthorizedException('User credentials do not match')
    }

    const isPasswwordValid = await compare(password, user.password)

       if (!isPasswwordValid) {
      throw new UnauthorizedException('User credentials do not match')
    }

    const acessToken = await this.jwt.sign({
      sub: user.id,
    })

      return {
        acess_token: acessToken
      }
  }
}