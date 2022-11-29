import clientPromise from "../../../lib/mongodb";
import type { NextApiRequest, NextApiResponse } from "next";
import { ObjectId } from "mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.query; // dynamic id for group specific endpoint
    const authToken = req?.headers?.authorization?.replace("Bearer ", "");

    if (!id || !authToken) {
      res.status(400).json({ message: "Missing parameters" });
    }

    switch (req.method) {
      case "GET":
        if (!id) return res.status(400).json({ message: "Missing body parameters" });

        const client = await clientPromise;
        const db = client.db("secret_santa");
        const user = await db.collection("members").findOne({ _id: new ObjectId(id as string) });

        if (!user) {
          return res.status(400).json({ message: "No user found" });
        }

        if (user.account.token && user.account.token === authToken) {
          return res.status(200).json({
            _id: user._id,
            name: user.name,
            subGroup: user.subGroup,
            secret: user.secret,
            account: { token: user.account.token },
          });
        }
        return res.status(401).json({ message: "Unauthorized acces" });

        break;
    }
  } catch (e) {
    res.status(400).json({ error: { message: "Error" } });
  }
}
