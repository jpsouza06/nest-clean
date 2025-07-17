import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { PrismaClient } from 'generated/prisma'

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy{

  constructor() {
    super({
      log: ['warn', 'error'],
    })
  }
  onModuleInit() {
    this.$connect()
      .catch((error) => console.error('Prisma connection error:', error))
  }
  onModuleDestroy() {
    this.$disconnect()
      .catch((error) => console.error('Prisma connection error:', error))
  }
}