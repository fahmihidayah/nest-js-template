import { DynamicModule, Global, Module } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import prisma from "./client";

@Module({
	providers: [PrismaClient],
})
export class DatabaseModule {
	static forRoot(): DynamicModule {
		return {
			global: true,
			module: DatabaseModule,

			providers: [
				{
					provide: PrismaClient,
					useValue: prisma,
				},
			],
			exports: [PrismaClient],
		};
	}
}
