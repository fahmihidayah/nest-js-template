import { Prisma } from "@prisma/client";

export type TokenWithUser = Prisma.UserTokenGetPayload<{
    include : {
        user : true
    }
}>