import createHttpError from 'http-errors';
import nodemailer from 'nodemailer';
import { GlobalMessageError } from '../enums/message.enum';

export function sendEmail(
  from: string,
  to: string,
  subject: string,
  text: string
): object {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.ADMINEMAIL,
      pass: process.env.ADMINEMAILPASSWORD,
    },
  });
  const mailOPtion = {
    from,
    to,
    subject,
    text,
  };
  transporter.sendMail(mailOPtion, function (error, info) {
    if (error) {
      console.log(error);
      throw createHttpError.ServiceUnavailable(
        GlobalMessageError.ServiceUnavailable
      );
    } else {
      console.log(`email send: ${info.response}`);
    }
  });
  return { message: 'ایمیل با موفقیت ارسال شد' };
}
