'use client';

import MarkerClusterGroup from 'react-leaflet-cluster';
import VoiceMarker from './VoiceMarker';
import createClusterIcon from './ClusterIcon';

// Voice pin data interface
interface VoicePinData {
    id: string | number;
    coords: [number, number];
    title?: string;
    location?: string;
    date?: string;
    imageUrl?: string;
    audioUrl?: string;
}

interface VoiceClusterGroupProps {
    pins: VoicePinData[];
    /** Maximum radius of cluster in pixels (default: 80) */
    maxClusterRadius?: number;
    /** Zoom level at which clustering is disabled (default: 17) */
    disableClusteringAtZoom?: number;
    /** Whether to animate cluster splitting/merging (default: true) */
    animate?: boolean;
    /** Whether to show cluster coverage area on hover (default: false) */
    showCoverageOnHover?: boolean;
}

/**
 * VoiceClusterGroup - Groups nearby voice pins into clusters when zoomed out
 * 
 * Features:
 * - Dynamic clustering based on zoom level
 * - Color-coded clusters (blue → purple → orange → red) based on pin count
 * - Smooth animations when splitting/merging clusters
 * - Custom cluster icons with count badges
 */
export default function VoiceClusterGroup({
    pins,
    maxClusterRadius = 80,
    disableClusteringAtZoom = 17,
    animate = true,
    showCoverageOnHover = false,
}: VoiceClusterGroupProps) {

    return (
        <MarkerClusterGroup
            // Clustering behavior
            maxClusterRadius={maxClusterRadius}
            disableClusteringAtZoom={disableClusteringAtZoom}
            spiderfyOnMaxZoom={true}
            showCoverageOnHover={showCoverageOnHover}

            // Animation settings
            animate={animate}
            animateAddingMarkers={true}

            // Custom cluster icon
            iconCreateFunction={(cluster) => {
                const count = cluster.getChildCount();
                return createClusterIcon(count);
            }}

            // Spiderfy settings for overlapping markers at max zoom
            spiderfyDistanceMultiplier={1.5}

            // Chunk loading for performance
            chunkedLoading={true}
            chunkDelay={50}
        >
            {pins.map((pin) => (
                <VoiceMarker key={pin.id} data={pin} />
            ))}
        </MarkerClusterGroup>
    );
}

export type { VoicePinData, VoiceClusterGroupProps };
