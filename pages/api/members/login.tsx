import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../lib/mongodb";

const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");

import { ObjectId } from "mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    switch (req.method) {
      case "POST":
        const { id, password } = req.body;

        if (!id || !password) {
          return res.status(400).json({ message: "Missing body parameters" });
        }

        const client = await clientPromise;
        const db = client.db("secret_santa");

        const user = await db.collection("members").findOne({ _id: new ObjectId(id) });

        //
        if (!user || !user.account) return res.status(400).json({ message: "No User found" });

        if (SHA256(password + user.account.salt).toString(encBase64) === user.account.hash) {
          return res.status(200).json({
            _id: user._id,
            name: user.name,
            subGroup: user.subGroup,
            secret: user.secret,
            account: { token: user.account.token },
          });
        }

        return res.status(400).json({ message: "auth Error" });
    }
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: "Error" });
  }
}
