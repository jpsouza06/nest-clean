import { Controller, Post } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

// const createAccountBodySchema = z.object({
//   name: z.string(),
//   email: z.email(),
//   password: z.string()
// })

// type CreateAccountBodySchema = z.infer<typeof createAccountBodySchema>

@Controller('/sessions')
export class AuthenticateAccountController {
  constructor(private jwt: JwtService) {}

  @Post()
  // @HttpCode(201)
  // @UsePipes(new ZodValidationPipe(createAccountBodySchema))
  async handle() {
    const token = await this.jwt.sign({
      sub: 'user-id',})

      return token
  }
}