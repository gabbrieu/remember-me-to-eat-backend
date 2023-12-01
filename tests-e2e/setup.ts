import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';

const connectionToTest = postgres({
    host: Bun.env.DATABASE_HOST_MIGRATIONS,
    database: Bun.env.DATABASE_NAME_TESTS,
    port: Number(Bun.env.DATABASE_EXTERNAL_PORT),
    password: Bun.env.DATABASE_PASSWORD,
    user: Bun.env.DATABASE_USERNAME,
    onnotice: () => '',
    max: 1,
});

const dbToTest = drizzle(connectionToTest);

await migrate(dbToTest, { migrationsFolder: 'drizzle' });
