import { useEffect, useState } from 'react';
import type { VenueSummary } from '../types/venueModels';
import { venueApi } from '../services/venueApi';
import '../styles/VenuesList.css';

interface VenuesListProps {
    onVenueSelect: (venueId: string) => void;
}

export function VenuesList({ onVenueSelect }: VenuesListProps) {
    const [venues, setVenues] = useState<VenueSummary[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function loadVenues() {
            setLoading(true);
            setError(null);
            const result = await venueApi.getAllVenues();
            if (result.length === 0) {
                setError('Failed to load venues');
            } else {
                setVenues(result);
            }
            setLoading(false);
        }
        loadVenues();
    }, []);

    if (loading) {
        return <div className="venues-container"><p className="loading">Loading venues...</p></div>;
    }

    if (error) {
        return <div className="venues-container"><p className="error">{error}</p></div>;
    }

    return (
        <div className="venues-container">
            <h1 className="venues-title">Venues</h1>
            <div className="venues-grid">
                {venues.map((venue) => (
                    <div
                        key={venue.id}
                        className="venue-tile"
                        onClick={() => onVenueSelect(venue.id)}
                    >
                        {venue.photoUrl && (
                            <img src={venue.photoUrl} alt={venue.name} className="venue-image" />
                        )}
                        <div className="venue-info">
                            <h2 className="venue-name">{venue.name}</h2>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
