import client from "@libs/server/client";
import withHandler, { IResponse } from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse<IResponse>) {
  const { token } = req.body;
  //   if (!token) return res.status(400).json({ ok: false });
  console.log(token);
  res.status(200).end();

  //   return res.json({ ok: true });
}

export default withHandler("POST", handler);
