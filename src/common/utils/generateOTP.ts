export const generateOTP = () => {
  let otp: number[] = [];

  for (let i = 1; i <= 6; i++) {
    const randomDigit = Math.floor(Math.random() * 10);
    otp.push(randomDigit);
  }

  return otp.join('');
};
