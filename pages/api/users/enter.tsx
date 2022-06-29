import client from "@libs/server/client";
import withHandler from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { email, phone } = req.body;
  const payload = phone ? { phone: +phone } : { email };

  let user;

  user = await client.user.upsert({
    where: {
      ...payload,
    },
    create: {
      ...payload,
      name: "Anonymous",
    },
    update: {},
  });

  console.log("user data", user);
  return res.status(200).end();
}

export default withHandler("POST", handler);
