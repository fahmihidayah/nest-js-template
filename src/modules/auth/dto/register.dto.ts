import { IsEmail, MinLength } from "class-validator";

export class RegisterFormDto {
    @MinLength(4)
    public firstName : string;

    public lastName : string;

    @IsEmail() 
    public email : string;

    @MinLength(6)
    public password : string;

    
}