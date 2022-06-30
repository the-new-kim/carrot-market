import client from "@libs/server/client";
import withHandler from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { email, phone } = req.body;
  const payload = phone ? { phone: +phone } : { email };

  const token = await client.token.create({
    data: {
      payload: "11324223142323",
      user: {
        connectOrCreate: {
          where: {
            ...payload,
          },
          create: {
            ...payload,
            name: "Anonymous",
          },
        },
      },
    },
  });
  console.log("looooooooooog", token);
  return res.status(200).end();
}

export default withHandler("POST", handler);
