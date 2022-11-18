import clientPromise from "./mongodb";
import { ObjectId } from "mongodb";

export const getAllGroups = async () => {
  try {
    const client = await clientPromise;
    const db = client.db("secret_santa");

    return await db.collection("groups").find({}).toArray();
  } catch (error) {
    console.log(error);
  }
};

export const getGroup = async (id: string) => {
  try {
    const client = await clientPromise;
    const db = client.db("secret_santa");

    return await db.collection("groups").findOne({ _id: new ObjectId(id) });
  } catch (error) {
    console.log(error);
  }
};
