import { defineConfig } from 'drizzle-kit';

export default defineConfig({
    schema: './src/infrastructure/entities/*.entity.ts',
    out: './drizzle',
    driver: 'pg',
    dbCredentials: {
        host: process.env.DATABASE_HOST || 'database',
        database: process.env.DATABASE_NAME || 'app',
        port: Number(process.env.DATABASE_PORT),
        password: process.env.DATABASE_PASSWORD,
        user: process.env.DATABASE_USERNAME,
    },
});
