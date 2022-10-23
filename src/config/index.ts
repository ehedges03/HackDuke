/* eslint-disable node/no-process-env */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import dotenv from 'dotenv';

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (envFound.error) {
  // This error should crash whole process

  throw new Error('Couldn\'t find .env file');
}

const properties = [
  'DB_USER',
  'DB_PASSWORD',
  'DB_HOST',
  'DB_PORT',
  'DB_NAME',
  'DB_OPTIONS',
];

const missing = properties.filter((property) => !process.env[property]);

if (missing.length > 0) {
  throw new Error(`Missing env variables: ${missing.join(', ')}`);
}

export const cfg = {
  /**
   * Environment
   */
  env: process.env.NODE_ENV || "development",
  /**
   * Port the server will run on
   */
  port: parseInt(process.env.PORT!, 10) || 8080,

  /**
   * Database configuration
   */
  database: {
    host: process.env.DB_HOST!,
    port: parseInt(process.env.DB_PORT!),
    username: process.env.DB_USER!,
    password: process.env.DB_PASSWORD!,
    database: process.env.DB_NAME!,
    options: process.env.DB_OPTIONS!,
  },
  /**
   * SSL configuration
   */
  ssl: {
    cert: /*process.env.SSL_CERT || */"./server.crt",
    key: /*process.env.SSL_KEY || */"./server.key",
  },
} as const;

export default cfg;