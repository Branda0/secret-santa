import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../lib/mongodb";

const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
const uid2 = require("uid2");

import { getGroup } from "../../../lib/groups";
import { ObjectId } from "mongodb";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    switch (req.method) {
      case "POST":
        const { id, password } = req.body;

        if (!id || !password) return res.status(400).json({ message: "Missing body parameters" });

        const client = await clientPromise;
        const db = client.db("secret_santa");
        const user = await db.collection("members").findOne({ _id: new ObjectId(id) });

        if (user === null) return res.status(400).json({ message: "No user found" });

        if (user.account) return res.status(400).json({ message: "User already signed up" });

        const userSalt = uid2(64);
        const userToken = uid2(64);
        await db.collection("members").updateOne(
          { _id: new ObjectId(id) },
          {
            $set: {
              account: {
                token: userToken,
                salt: userSalt,
                hash: SHA256(password + userSalt).toString(encBase64),
              },
            },
          }
        );

        return res.status(200).json({
          _id: user._id,
          name: user.name,
          subGroup: user.subGroup,
          secret: user.secret,
          account: { token: userToken },
        });
    }
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: "Error" });
  }
};
