import { UserSerializer, getUserSerializer } from "src/modules/users/entities/user.serializer";
import { UserWithRoles } from "src/modules/users/entities/user.entity";

export interface TokenSerializer {
    expireIn : number;
    accessToken : string;
    refreshToken : string;
}


export class UserWithTokenSerializer extends UserSerializer {
    
    public token : TokenSerializer;
}

export function getUserWithTokenSerializer(user : UserWithRoles, token : TokenSerializer) : UserWithTokenSerializer {
    return {
        ... getUserSerializer(user),
        token : token,
    }
}