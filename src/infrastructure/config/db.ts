import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

export const connection = postgres({
    host: Bun.env.NODE_ENV === 'test' ? Bun.env.DATABASE_HOST_MIGRATIONS : Bun.env.DATABASE_HOST,
    database: Bun.env.NODE_ENV === 'test' ? Bun.env.DATABASE_NAME_TESTS : Bun.env.DATABASE_NAME,
    port: Bun.env.NODE_ENV === 'test' ? Number(Bun.env.DATABASE_EXTERNAL_PORT) : Number(Bun.env.DATABASE_PORT),
    password: Bun.env.DATABASE_PASSWORD,
    user: Bun.env.DATABASE_USERNAME,
});

export const db = drizzle(connection);
