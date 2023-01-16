import { getTOTPTokens, TOTPToken } from "@/libs/vault";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";

export default async function handler(req: any, res: any) {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (session && req.method === "GET") {
    const totpTokens: Array<TOTPToken> = await getTOTPTokens();
    res.status(200).json({ tokens: totpTokens });
  } else {
    res.status(401);
  }
  res.end();
}
