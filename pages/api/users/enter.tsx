import client from "@libs/server/client";
import withHandler from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { email, phone } = req.body;

  let user;

  user = await client.user.upsert({
    where: {
      ...(email && { email }),
      ...(phone && { phone: +phone }),
    },
    create: {
      ...(email && { email }),
      ...(phone && { phone: +phone }),
      name: "Anonymous",
    },
    update: {},
  });

  console.log("user data", user);
  return res.status(200).end();
}

export default withHandler("POST", handler);
