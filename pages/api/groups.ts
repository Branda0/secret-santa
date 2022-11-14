import clientPromise from "../../lib/mongodb";
import type { NextApiRequest, NextApiResponse } from "next";
import { getAllGroups } from "../../lib/groups";

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
        const allGroups = await getAllGroups();
        res.status(200).json(allGroups);
        break;
    }
  } catch (e) {
    console.error(e);
  }
};
