import twilio from "twilio";
import client from "@libs/server/client";
import withHandler, { IResponse } from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";

const formData = require("form-data");
const Mailgun = require("mailgun.js");
const mailgun = new Mailgun(formData);
const mailgunClient = mailgun.client({
  username: "api",
  key: process.env.MAILGUN_API_KEY,
});

const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

async function handler(req: NextApiRequest, res: NextApiResponse<IResponse>) {
  const { email, phone } = req.body;
  const user = phone ? { phone: +phone } : email ? { email } : null;
  if (!user) return res.status(400).json({ ok: false });
  const payload = Math.floor(Math.random() * 900000 + 100000) + "";
  const token = await client.token.create({
    data: {
      payload,
      user: {
        connectOrCreate: {
          where: {
            ...user,
          },
          create: {
            ...user,
            name: "Anonymous",
          },
        },
      },
    },
  });
  if (phone) {
    // const message = await twilioClient.messages.create({
    //   messagingServiceSid: process.env.TWILIO_MSID,
    //   to: process.env.MY_PHONE!,
    //   body: `Your login token is ${payload}`,
    // });
    // console.log(message);
  }
  //email
  else if (email) {
    // const email = await mailgunClient.messages.create(
    //   process.env.MAILGUN_DOMAIN,
    //   {
    //     from: "jonkim0309@gmail.com",
    //     to: "jonkim0309@gmail.com",
    //     subject: "Your Carrot Market Verification Email",
    //     text: `Your login token is ${payload}`,
    //     html: `Your login token is <strong>${payload}</strong>`,
    //   }
    // );
    // console.log(email);
  }

  return res.json({ ok: true });
}

export default withHandler("POST", handler);
