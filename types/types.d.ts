import { ObjectId } from "mongodb";

export interface IGroup {
  _id: ObjectId;
  name: string;
  members: [IMember];
}

export interface IMember {
  _id: ObjectId;
  name: string;
  subGroup: string;
  secret?: string;
  account?: {
    hash?: string;
    salt?: string;
    token?: string;
  };
}

export interface IUser {
  userId: string;
  token: string;
}
