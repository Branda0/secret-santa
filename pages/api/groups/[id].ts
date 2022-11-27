import clientPromise from "../../../lib/mongodb";
import type { NextApiRequest, NextApiResponse } from "next";
import { getGroup } from "../../../lib/groups";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.query; // dynamic id for group specific endpoint

    switch (req.method) {
      case "POST":

      case "GET":
        const group = await getGroup(id as string);
        console.log(group);
        res.status(200).json(group);
        break;
    }
  } catch (e) {
    res.status(400).json({ error: { message: "Error" } });
  }
}
