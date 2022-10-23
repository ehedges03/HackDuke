import { Express } from 'express';
import Routes from 'api';
import path from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

export default (app: Express) => {
  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, 'client/build')));

  app.use("/api", Routes());

  app.use("/", (req, res) => {
    res.send("Hello World!");
  });
};