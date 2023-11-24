import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';

const connectionMigration = postgres({
    host: Bun.env.DATABASE_HOST_MIGRATIONS,
    database: Bun.env.DATABASE_NAME,
    port: Number(Bun.env.DATABASE_EXTERNAL_PORT),
    password: Bun.env.DATABASE_PASSWORD,
    user: Bun.env.DATABASE_USERNAME,
    max: 1,
});

const dbMigration = drizzle(connectionMigration);

await migrate(dbMigration, { migrationsFolder: 'drizzle' });
console.info('Migration ran successfully :)');

await connectionMigration.end();
