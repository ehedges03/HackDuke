import cfg from "./config";
import express from "express";
import loader from "loaders";

async function startServer() {
  const app = express();

  await loader(app);

  app.listen(cfg.port, () => {
    console.log(`Listening on port ${cfg.port}`);
  });
}

startServer();