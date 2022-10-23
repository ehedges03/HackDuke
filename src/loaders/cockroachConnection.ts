import path from "path";
import cfg from "config";
import { DataSource, DataSourceOptions } from "typeorm";

const config: DataSourceOptions = {
  type: "cockroachdb",
  synchronize: true,
  logging: true,
  entities: [path.join(__dirname, '../Entities/*.ts')],
  subscribers: [],
  migrations: [],
  // eslint-disable-next-line max-len
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
  url: cfg.database.url,
};

export const appDataSource: DataSource = new DataSource(config);

export default async (): Promise<DataSource> => {
  return appDataSource.initialize();
};

