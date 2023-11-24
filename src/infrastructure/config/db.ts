import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

export const connection = postgres({
    host: Bun.env.DATABASE_HOST,
    database: Bun.env.DATABASE_NAME,
    port: Number(Bun.env.DATABASE_PORT),
    password: Bun.env.DATABASE_PASSWORD,
    user: Bun.env.DATABASE_USERNAME,
});

export const db = drizzle(connection);
