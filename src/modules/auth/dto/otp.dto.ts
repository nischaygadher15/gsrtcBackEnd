import { IsString, Matches } from 'class-validator';

export class OtpDto {
  @IsString()
  @Matches(/^\d{6}$/, {
    message: 'OTP must be string and must have exactly 6 digits.',
  })
  userLoginOTP: string;
}
