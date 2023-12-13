import { IsDefined, IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class AuthFormDto {
  @IsEmail()
  @IsNotEmpty()
  @IsDefined()
  public email?: string;

  @MinLength(6)
  @IsDefined()
  public password?: string;
}


