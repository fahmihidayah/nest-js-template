import { IsEmail, MinLength } from "class-validator";

export class AuthFormDto {

    @IsEmail()
    public email : string;

    @MinLength(6)
    public password : string;
}