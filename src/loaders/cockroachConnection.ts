import path from "path";
import cfg from "config";
import { DataSource, DataSourceOptions } from "typeorm";
import Disease from '../entities/Disease';
import Report from '../entities/Report';
import Symptom from '../entities/Symptom';

const config: DataSourceOptions = {
  type: "cockroachdb",
  // dropSchema:true,
  synchronize: true,
  logging: true,
  entities: [Disease, Report, Symptom],
  subscribers: [],
  migrations: [],
  host: cfg.database.host,
  port: cfg.database.port,
  username: cfg.database.username,
  password: cfg.database.password,
  database: cfg.database.database,
  ssl: true,
  extra: {
    options: cfg.database.options,
  },
};

export const appDataSource: DataSource = new DataSource(config);

export default async (): Promise<DataSource> => {
  return await appDataSource.initialize();
};

