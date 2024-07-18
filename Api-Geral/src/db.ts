// src/db.ts
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const dbName = process.env.DB_NAME || 'default_db';
const dbUser = process.env.DB_USER || 'default_user';
const dbPassword = process.env.DB_PASSWORD || 'default_password';
const dbHost = process.env.DB_HOST || 'localhost';
const dbPort = process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432;

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  dialect: 'postgres',
  port: dbPort,
  logging: false,
});

export default sequelize;
