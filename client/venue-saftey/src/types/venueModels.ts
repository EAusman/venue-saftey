// venueSummary object definition
export interface VenueSummary {
    id: string;
    name: string;
    photoUrl: string;
}

// Venue object definition
export interface Venue {
    venueId: string;
    name: string;
    photoUrl: string;
    websiteUrl: string;
    safetyFeatures: string[];
}
