import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';

export const connection: mysql.Connection = await mysql.createConnection({
    host: Bun.env.DATABASE_HOST,
    database: Bun.env.DATABASE_NAME,
    port: Number(Bun.env.DATABASE_PORT),
    password: Bun.env.DATABASE_PASSWORD,
    user: Bun.env.DATABASE_USERNAME,
});

export const db = drizzle(connection);