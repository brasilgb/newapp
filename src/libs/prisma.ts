import { PrismaClient } from "@prisma/client";


declare global {
  var prisma: PrismaClient | undefined;
}

export const prisma = global.prisma || new PrismaClient();

if (process.env.NODE !== "production") global.prisma = prisma;



declare global {
    interface BigInt {
      toJSON(): string
    }
  }
  
BigInt.prototype.toJSON = function () {
    return String(this)
}