import 'dotenv/config';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { pool } from '../db.js';
import type { Venue } from '../../venueModels.js';

function mapToVenue(row: any): Venue {
    const safety = row.safety_features ?? row.safetyFeatures ?? row.safety ?? [];
    const safetyFeatures = Array.isArray(safety) ? safety : (typeof safety === 'string' ? JSON.parse(safety) : []);
    return {
        venueId: String(row.id ?? row.venue_id ?? row.venueId ?? row.venueid),
        name: row.name ?? '',
        photoUrl: row.photo_url ?? row.photoUrl ?? '',
        websiteUrl: row.website_url ?? row.websiteUrl ?? '',
        safetyFeatures
    };
}

export default async (req: VercelRequest, res: VercelResponse) => {
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');
    
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    const { id } = req.query;
    const venueId = Array.isArray(id) ? id[0] : id;

    try {
        if (!pool) throw new Error('No DB pool');
        const q = `SELECT id, name, photo_url, website_url, safety_features FROM Venues WHERE id = $1`;
        const { rows } = await pool.query(q, [venueId]);
        if (!rows || rows.length === 0) return res.status(404).json({ error: 'Venue not found' });
        const venue = mapToVenue(rows[0]);
        return res.status(200).json(venue);
    } catch (err) {
        console.error('DB query failed:', err);
        return res.status(500).json({ error: 'Failed to fetch venue' });
    }
};
