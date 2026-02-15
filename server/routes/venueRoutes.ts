import express from 'express';
import type { VenueSummary, Venue } from '../../shared/venueModels.js';
import { pool } from '../db.js';

const router = express.Router();

// Helper to map DB row to VenueSummary
function mapToSummary(row: any): VenueSummary {
    return {
        id: String(row.id ?? row.venue_id ?? row.venueid ?? row.venueId),
        name: row.name ?? '',
        photoUrl: row.photo_url ?? row.photoUrl ?? ''
    };
}

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

// GET /api/venues - returns list of VenueSummary
router.get('/venues', async (req, res) => {
    try {
        if (!pool) throw new Error('No DB pool');
        const q = `SELECT id, name, photo_url FROM Venues`;
        const { rows } = await pool.query(q);
        const summaries = rows.map(mapToSummary);
        return res.json(summaries);
    } catch (err) {
        console.warn('DB query failed, falling back to empty list or mock:', err);
        return res.json([]);
    }
});

// GET /api/venues/:id - returns single Venue
router.get('/venues/:id', async (req, res) => {
    const venueId = req.params.id;
    try {
        if (!pool) throw new Error('No DB pool');
        const q = `SELECT id, name, photo_url, website_url, safety_features FROM Venues WHERE id = $1`;
        const { rows } = await pool.query(q, [venueId]);
        if (!rows || rows.length === 0) return res.status(404).json({ error: 'Venue not found' });
        const venue = mapToVenue(rows[0]);
        return res.json(venue);
    } catch (err) {
        console.warn('DB query failed for single venue:', err);
        return res.status(500).json({ error: 'Failed to fetch venue' });
    }
});

export default router;