import clientPromise from "../../../lib/mongodb";
import type { NextApiRequest, NextApiResponse } from "next";

import { ObjectId } from "mongodb";
import Member from "../../[groupId]/[memberId]";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.query; // dynamic id for group specific endpoint
    const client = await clientPromise;
    const db = client.db("secret_santa");

    if (!id) return res.status(400).json({ message: "Missing body parameters" });

    switch (req.method) {
      case "GET":
        const user = await db.collection("members").findOne({ _id: new ObjectId(id) });
        if (!user) return res.status(400).json({ message: "User not found" });

        if (user.account) {
          return res
            .status(200)
            .json({ member: { _id: user._id, name: user.name, group: user.group }, status: "signed" });
        } else {
          return res.status(200).json({
            member: { _id: user._id, name: user.name, group: user.group },
            status: "awaiting signup",
          });
        }
    }
  } catch (e) {
    res.status(400).json({ error: { message: "Error" } });
  }
}
