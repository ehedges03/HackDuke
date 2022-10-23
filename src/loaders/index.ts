import {Express} from "express";
import expressLoader from "./express";
import cockroachLoader from "./cockroachConnection";


export default async (app: Express): Promise<void> => {
  await cockroachLoader();

  expressLoader(app);
};