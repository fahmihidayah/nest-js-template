import { Prisma } from "@prisma/client";

export type UserFindManyArgs = Prisma.UserFindManyArgs & {
	include: {
		roles: true;
	};
};

export type UserCountArgs = Prisma.UserCountArgs;

export type UserCreateArgs = Prisma.UserCreateArgs & {
	include: {
		roles: true;
	};
};
