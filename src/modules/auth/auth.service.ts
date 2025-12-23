import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { LoginWithMobDto } from './dto/loginWithMob.dto';

@Injectable()
export class AuthService {
  async loginWithMobile(loginWithMobDto: LoginWithMobDto) {
    const { mobileNo } = loginWithMobDto;

    console.log('mobileNo: ', mobileNo);

    if (!mobileNo) {
      throw new BadRequestException('Mobile no. is require');
    }

    const accountSid = process.env.TWILIO_ACC_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const client = require('twilio')(accountSid, authToken);

    if (!process.env.TWILIO_ACC_SID || !process.env.TWILIO_AUTH_TOKEN) {
      throw new InternalServerErrorException('ENV file do not found!');
    }

    const generateOTP = () => {
      let otp: number[] = [];

      for (let i = 1; i <= 6; i++) {
        const randomDigit = Math.floor(Math.random() * 10);
        otp.push(randomDigit);
      }

      return otp.join('');
    };

    const OTP = generateOTP();

    console.log('OTP: ', OTP);

    try {
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
}
