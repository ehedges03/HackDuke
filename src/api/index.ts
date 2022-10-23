import { Router } from "express";
import report from "./report";

// guaranteed to get dependencies
export default () => {
  const app = Router();
  
  report(app);

  return app;
};