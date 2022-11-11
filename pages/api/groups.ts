import clientPromise from "../../lib/mongodb";
import type { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const client = await clientPromise;
    const db = client.db("secret_santa");

    switch (req.method) {
      case "POST":
        const { name } = req.body;
        console.log(req.body);
        const response = await db
          .collection("groups")
          .insertOne({ name: name, members: ["tania", "gabriel", "kelly"] });

        res.status(200).json({
          data: await db.collection("groups").findOne({ _id: response.insertedId }),
        });
        break;

      case "GET":
        const allGroups = await db.collection("groups").find({}).toArray();
        console.log(allGroups);
        res.status(200).json(allGroups);
        break;
    }
  } catch (e) {
    console.error(e);
  }
};
