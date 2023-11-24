import { drizzle } from 'drizzle-orm/mysql2';
import { migrate } from 'drizzle-orm/mysql2/migrator';
import mysql from 'mysql2/promise';

const connectionMigration: mysql.Connection = await mysql.createConnection({
    host: Bun.env.DATABASE_HOST_MIGRATIONS,
    database: Bun.env.DATABASE_NAME,
    port: Number(Bun.env.DATABASE_EXTERNAL_PORT),
    password: Bun.env.DATABASE_PASSWORD,
    user: Bun.env.DATABASE_USERNAME,
});

const dbMigration = drizzle(connectionMigration);

await migrate(dbMigration, { migrationsFolder: 'drizzle' });
console.info('Migration ran successfully :)');

await connectionMigration.end();
