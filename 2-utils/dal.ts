import * as dotenv from 'dotenv'
// dotenv.config({ path: process.env.NODE_ENV === "dev" ? ".env" : ".env.prod" });
dotenv.config({ path: process.env.NODE_ENV === "dev" ? ".env" : ".env" });

import mysql, { RowDataPacket } from "mysql2/promise";

const pool = mysql.createPool({
    host:  process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    port: +process.env.DB_PORT,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD
  });

  export function execute<T>(query: string, params?: any[]){
    return pool.execute<T & RowDataPacket[]>(query, params)
  }

