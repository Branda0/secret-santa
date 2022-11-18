import clientPromise from "../../../lib/mongodb";
import type { NextApiRequest, NextApiResponse } from "next";
import { getAllGroups } from "../../../lib/groups";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    switch (req.method) {
      case "POST":
        const client = await clientPromise;
        const db = client.db("secret_santa");
        const { name, members } = req.body;
        if (name && members) {
          if (await db.collection("groups").findOne({ name: name })) {
            res.status(409).json({ error: { message: "Nom de groupe déjà existant !" } });
          }

          const membersResponse = await db.collection("members").insertMany(members);
          const groupResponse = await db.collection("groups").insertOne({ name, members });

          res.status(200).json({
            data: await db.collection("groups").findOne({ _id: groupResponse.insertedId }),
          });
          break;
        } else {
          res.status(400).json({ error: { message: "Erreur de création de groupe, veuillez réessayer" } });
        }

      case "GET":
        const allGroups = await getAllGroups();
        res.status(200).json(allGroups);
        break;
    }
  } catch (e) {
    res.status(400).json({ error: { message: "Erreur de création de groupe, veuillez réessayer" } });
  }
};
