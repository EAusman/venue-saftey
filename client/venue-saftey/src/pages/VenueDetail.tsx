import { useEffect, useState } from 'react';
import type { Venue } from '../types/venueModels';
import { venueApi } from '../services/venueApi';
import '../styles/VenueDetail.css';

interface VenueDetailProps {
    venueId: string;
    onBack: () => void;
}

export function VenueDetail({ venueId, onBack }: VenueDetailProps) {
    const [venue, setVenue] = useState<Venue | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function loadVenue() {
            setLoading(true);
            setError(null);
            const result = await venueApi.getVenue(venueId);
            if (!result) {
                setError('Failed to load venue details');
            } else {
                setVenue(result);
            }
            setLoading(false);
        }
        loadVenue();
    }, [venueId]);

    if (loading) {
        return (
            <div className="venue-detail-container">
                <button className="back-button" onClick={onBack}>← Back</button>
                <p className="loading">Loading venue details...</p>
            </div>
        );
    }

    if (error || !venue) {
        return (
            <div className="venue-detail-container">
                <button className="back-button" onClick={onBack}>← Back</button>
                <p className="error">{error || 'Venue not found'}</p>
            </div>
        );
    }

    return (
        <div className="venue-detail-container">
            <button className="back-button" onClick={onBack}>← Back</button>
            
            {venue.photoUrl && (
                <img src={venue.photoUrl} alt={venue.name} className="detail-image" />
            )}
            
            <div className="detail-content">
                <h1 className="detail-title">{venue.name}</h1>
                
                {venue.websiteUrl && (
                    <div className="detail-section">
                        <h3>Website</h3>
                        <a 
                            href={venue.websiteUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="website-link"
                        >
                            {venue.websiteUrl}
                        </a>
                    </div>
                )}
                
                {venue.safetyFeatures && venue.safetyFeatures.length > 0 && (
                    <div className="detail-section">
                        <h3>Safety Features</h3>
                        <ul className="safety-list">
                            {venue.safetyFeatures.map((feature: string, index: number) => (
                                <li key={index}>{feature}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}
