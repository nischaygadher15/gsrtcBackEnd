import { IsString, Matches } from 'class-validator';

export class LoginWithMobDto {
  @IsString()
  @Matches(/^[6-9]\d{9}$/, {
    message: 'Mobile number must be a valid 10-digit Indian mobile number',
  })
  mobileNo: string;
}
