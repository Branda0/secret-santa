import clientPromise from "../../../lib/mongodb";
import type { NextApiRequest, NextApiResponse } from "next";
import { getAllGroups } from "../../../lib/groups";
import { computeGraph } from "../../../lib/compute";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    switch (req.method) {
      case "POST":
        const client = await clientPromise;
        const db = client.db("secret_santa");
        const { name, members } = req.body;

        const membersSanta = computeGraph(members);
        const membersNumber = membersSanta.length;

        // if graph compute fails => too much constrains
        if (!membersSanta) {
          res.status(400).json({
            error: { message: "Distribution des cadeaux impossible ! Modifiez vos contraintes de groupe" },
          });
          break;
        }

        // body parameters missing
        if (!name || !members) {
          res.status(400).json({ error: { message: "Erreur de création de groupe, veuillez réessayer" } });
          break;
        }

        // group name already in DB
        if (await db.collection("groups").findOne({ name: name })) {
          res.status(409).json({ error: { message: "Nom de groupe déjà existant !" } });
          break;
        }

        const groupResponse = await db.collection("groups").insertOne({ name, members: members });

        const membersResponse = await db.collection("members").insertMany(members);
        console.log(Object.values(membersResponse.insertedIds));
        await db
          .collection("members")
          .updateMany(
            { _id: { $in: Object.values(membersResponse.insertedIds) } },
            { $set: { group: groupResponse.insertedId } }
          );

        for (let i = 0; i < membersNumber - 1; i++) {
          await db
            .collection("members")
            .updateOne(
              { group: groupResponse.insertedId, name: membersSanta[i] },
              { $set: { secret: membersSanta[i + 1] } }
            );
        }
        await db
          .collection("members")
          .updateOne(
            { group: groupResponse.insertedId, name: membersSanta[membersNumber - 1] },
            { $set: { secret: membersSanta[0] } }
          );

        await db.collection("groups").updateOne({ name: name }, { $set: { members } });

        res.status(200).json({
          data: await db.collection("groups").findOne({ _id: groupResponse.insertedId }),
        });
        break;

      case "GET":
        const allGroups = await getAllGroups();
        res.status(200).json(allGroups);
        break;
    }
  } catch (e) {
    console.log(e);
    res.status(400).json({ error: { message: "Error" } });
  }
}
