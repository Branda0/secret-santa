import { ObjectId } from "mongodb";

export type GroupType = {
  _id: ObjectId;
  name: string;
  members: [MemberType];
};

export type MemberType = {
  _id: ObjectId;
  name: string;
  subGroup: string;
};
