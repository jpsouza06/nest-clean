import { PipeTransform, BadRequestException } from '@nestjs/common'
import { ZodError, ZodObject  } from 'zod'

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodObject) {}

  transform(value: unknown) {
    try {
      const parsedValue = this.schema.parse(value)
      return parsedValue
    } catch (error) {
      if (error instanceof ZodError) {
        throw new BadRequestException(error.issues.map(issue => ({
          statusCode: 400,
          message: issue.message
        })))
      }
    }
  }
}
