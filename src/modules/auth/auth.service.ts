import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { LoginWithMobDto } from './dto/loginWithMob.dto';
import { OtpDto } from './dto/otp.dto';
import { generateOTP } from 'src/common/utils/generateOTP';

@Injectable()
export class AuthService {
  async loginWithMobile(loginWithMobDto: LoginWithMobDto) {
    const { userMobileNo } = loginWithMobDto;

    console.log('mobileNo: ', userMobileNo);

    if (!userMobileNo) {
      throw new BadRequestException('Mobile no. is require');
    }

    const accountSid = process.env.TWILIO_ACC_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const client = require('twilio')(accountSid, authToken);

    if (!process.env.TWILIO_ACC_SID || !process.env.TWILIO_AUTH_TOKEN) {
      throw new InternalServerErrorException('ENV file do not found!');
    }

    const OTP = generateOTP();

    console.log('OTP: ', OTP);

    try {
      //Sending the OTP
      //   const messageResp = await client.messages.create({
      //     body: `${OTP} is your Account Login OTP. DO NOT SHARE this with bus operator or anyone. OTP valid for 15 mins. - GSRTC-DEV`,
      //     from: '+18049068918',
      //     to: `+91${mobileNo}`,
      //   });
      //   console.log('messageResp: ', messageResp);

      //   return messageResp;
      return { message: 'success' };
    } catch (error) {
      throw new InternalServerErrorException(error.messages);
    }
  }

  async loginWithEmail() {}

  async loginWithGoogle() {}

  async verifyOTP(otpDto: OtpDto) {
    const { userLoginOTP } = otpDto;

    if (userLoginOTP) {
      return { message: 'success' };
    } else {
      return { message: 'failed' };
    }
  }

  async sendTheOTP(loginWithMobDto: LoginWithMobDto) {
    const { userMobileNo } = loginWithMobDto;

    console.log('mobileNo: ', userMobileNo);

    if (!userMobileNo) {
      throw new BadRequestException('Mobile no. is require');
    }

    const accountSid = process.env.TWILIO_ACC_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const client = require('twilio')(accountSid, authToken);

    if (!process.env.TWILIO_ACC_SID || !process.env.TWILIO_AUTH_TOKEN) {
      throw new InternalServerErrorException('ENV file do not found!');
    }

    const OTP = generateOTP();

    console.log('Resend-OTP: ', OTP);

    try {
      //Sending the OTP
      //   const messageResp = await client.messages.create({
      //     body: `${OTP} is your Account Login OTP. DO NOT SHARE this with bus operator or anyone. OTP valid for 15 mins. - GSRTC-DEV`,
      //     from: '+18049068918',
      //     to: `+91${mobileNo}`,
      //   });
      //   console.log('messageResp: ', messageResp);

      //   return messageResp;
      return { message: 'success' };
    } catch (error) {
      throw new InternalServerErrorException(error.messages);
    }
  }
}
