import clientPromise from "../../../lib/mongodb";
import type { NextApiRequest, NextApiResponse } from "next";
import { getAllGroups } from "../../../lib/groups";
import { computeGraph } from "../../../lib/compute";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    switch (req.method) {
      case "POST":
        const client = await clientPromise;
        const db = client.db("secret_santa");
        const { name, members } = req.body;
        console.log("okoko", members);
        const membersSanta = computeGraph(members);

        // if graph compute fails => too much constrains
        if (!membersSanta) {
          res.status(400).json({
            error: { message: "Distribution des cadeaux impossible ! Modifiez vos contraintes de groupe" },
          });
        }

        if (name && members) {
          if (await db.collection("groups").findOne({ name: name })) {
            res.status(409).json({ error: { message: "Nom de groupe déjà existant !" } });
          }

          const membersResponse = await db.collection("members").insertMany(members);
          const membersNumber = membersSanta.length;

          for (let i = 0; i < membersNumber - 1; i++) {
            await db
              .collection("members")
              .updateOne({ name: membersSanta[i] }, { $set: { secret: membersSanta[i + 1] } });
          }
          await db
            .collection("members")
            .updateOne({ name: membersSanta[membersNumber - 1] }, { $set: { secret: membersSanta[0] } });

          const groupResponse = await db.collection("groups").insertOne({ name, members });

          res.status(200).json({
            // data: await db.collection("groups").findOne({ _id: groupResponse.insertedId }),
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
    console.log(e);
    res.status(400).json({ error: { message: "Error" } });
  }
};
