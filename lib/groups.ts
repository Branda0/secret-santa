import clientPromise from "./mongodb";

export const getAllGroups = async () => {
  try {
    const client = await clientPromise;
    const db = client.db("secret_santa");

    return await db.collection("groups").find({}).toArray();
  } catch (error) {
    console.log(error);
  }
};
