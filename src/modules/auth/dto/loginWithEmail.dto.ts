import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginWithEmailDto {
  @IsNotEmpty()
  @IsEmail()
  userEmail: string;

  @IsString()
  @IsNotEmpty()
  userPass: string;
}
