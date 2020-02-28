import { Injectable } from '@nestjs/common';
import * as sgMail from '@sendgrid/mail';

@Injectable()
export class EmailService {
  constructor() {
    sgMail.setApiKey(process.env.API_KEY);
  }
  public sendEmail(type: number, data: any) {
    let msg: any = {
      to: data.email,
      from: 'gabo.alejandro.huitron@gmail.com',
    };
    if (type === 0) {
      // New account
      let html = 'Hello world from a new account';
      msg = {
        ...msg,
        subject: 'You have created an account',
        html: html,
      };
    } else if (type === 1) {
      // Account modified
      let html = 'Hello world from a modified account';
      msg = {
        ...msg,
        subject: 'You have modified your account',
        html: html,
      };
    } else if (type === 2) {
      // Account deleted
      let html = 'Hello world from a deleted account';
      msg = {
        ...msg,
        subject: 'You have deleted your account',
        html: html,
      };
    }

    sgMail.send(msg);
  }
}
