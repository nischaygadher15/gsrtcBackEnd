import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { LoginWithMobDto } from './dto/loginWithMob.dto';
import { OtpDto } from './dto/otp.dto';
import { generateOTP } from 'src/common/utils/generateOTP';
import { LoginWithEmailDto } from './dto/loginWithEmail.dto';
import bcrypt from 'bcrypt';
import { LoginWithGoogleDto } from './dto/loginWithGoogle.dto';
import axios from 'axios';

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

  async loginWithEmail(loginWithEmailDto: LoginWithEmailDto) {
    const { userEmail, userPass } = loginWithEmailDto;

    // find email registered or not

    //Check password
    const saltRounds = 10;
    const hash = await bcrypt.hash(userPass, saltRounds);

    const isMatching = await bcrypt.compare(userPass, hash);

    if (isMatching) {
      return { status: true, message: 'You have logged in successfully' };
    } else {
      return { status: false, message: 'Invalid credentials!' };
    }
  }

  async loginWithGoogle(loginWithGoogleDto: LoginWithGoogleDto) {
    const { authCode } = loginWithGoogleDto;

    if (
      !process.env.GOOGLE_CLIENT_ID ||
      !process.env.GOOGLE_CLIENT_SECRET ||
      !process.env.GOOGLE_REDIRECT_URI
    ) {
      throw new InternalServerErrorException('Env file do not found!');
    }

    const payload = {
      code: authCode,
      client_id: process.env.GOOGLE_CLIENT_ID!,
      client_secret: process.env.GOOGLE_CLIENT_SECRET!,
      redirect_uri: 'postmessage',
      grant_type: 'authorization_code',
    };

    try {
      // Exchange Auth-code with Access_token
      const googleAccessTokenRes = await axios.post(
        'https://oauth2.googleapis.com/token',
        payload,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      );
      // console.log('googleAccessTokenRes: ', googleAccessTokenRes.data);

      // Get Userinfo from google
      const UserInfoRes = await axios.get(
        'https://www.googleapis.com/oauth2/v3/userinfo',
        {
          headers: {
            Authorization: `Bearer ${googleAccessTokenRes.data.access_token}`,
          },
        },
      );

      return {
        status: true,
        message: 'You have logged in successfully',
      };
    } catch (error) {
      console.log('error: ', error);
    }
  }

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
