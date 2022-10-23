import {Express} from "express";
import expressLoader from "./express";
import cockroachLoader from "./cockroachConnection";
import initialOptions from "./initialOptions";


export default async (app: Express): Promise<void> => {
  await cockroachLoader();

  await initialOptions();

  expressLoader(app);
};