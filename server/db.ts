import { Pool } from 'pg';

const connectionString = process.env.DATABASE_URL || process.env.VERCEL_DATABASE_URL || process.env.NEXT_PUBLIC_DATABASE_URL;

if (!connectionString) {
    // Do not throw immediately so environments without DB can still run (tests, local dev).
    console.warn('Warning: no database connection string found in env vars (DATABASE_URL / VERCEL_DATABASE_URL / NEXT_PUBLIC_DATABASE_URL)');
}

export const pool = new Pool({ connectionString });

export default pool;
