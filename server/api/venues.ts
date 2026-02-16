import 'dotenv/config';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Pool } from 'pg';

import type { VenueSummary } from '../venueModels.js';

function mapToSummary(row: any): VenueSummary {
    return {
        id: String(row.id ?? row.venue_id ?? row.venueid ?? row.venueId),
        name: row.name ?? '',
        photoUrl: row.photo_url ?? row.photoUrl ?? ''
    };
}


const connectionString = process.env.DATABASE_URL || process.env.VERCEL_DATABASE_URL || process.env.NEXT_PUBLIC_DATABASE_URL;

if (!connectionString) {
    // Do not throw immediately so environments without DB can still run (tests, local dev).
    console.warn('Warning: no database connection string found in env vars (DATABASE_URL / VERCEL_DATABASE_URL / NEXT_PUBLIC_DATABASE_URL)');
}

export const pool = new Pool({ connectionString });

export default async (req: VercelRequest, res: VercelResponse) => {
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');
    
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    try {
        if (!pool) throw new Error('No DB pool');
        const q = `SELECT id, name, photo_url FROM Venues`;
        const { rows } = await pool.query(q);
        const summaries = rows.map(mapToSummary);
        return res.status(200).json(summaries);
    } catch (err) {
        console.error('DB query failed:', err);
        return res.status(500).json({ error: 'Failed to fetch venues' });
    }
};
