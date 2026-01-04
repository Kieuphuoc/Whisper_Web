'use client';

import L from 'leaflet';

/**
 * Get cluster color based on pin count
 * Golden/Amber for small → Orange → Hot Red for large clusters
 */
function getClusterColor(count: number): { glow1: string; glow2: string; glow3: string } {
    if (count <= 5) {
        // Golden/Amber (coolest)
        return { glow1: '#fbbf24', glow2: '#f59e0b', glow3: '#d97706' };
    } else if (count <= 15) {
        // Orange
        return { glow1: '#fb923c', glow2: '#f97316', glow3: '#ea580c' };
    } else if (count <= 30) {
        // Deep Orange/Red-Orange
        return { glow1: '#f97316', glow2: '#ea580c', glow3: '#dc2626' };
    } else {
        // Hot Red (hottest)
        return { glow1: '#ef4444', glow2: '#dc2626', glow3: '#b91c1c' };
    }
}

/**
 * Get cluster size based on pin count
 */
function getClusterSize(count: number): number {
    if (count <= 5) return 40;
    if (count <= 15) return 48;
    if (count <= 30) return 56;
    return 64;
}

/**
 * Generate HTML string for cluster icon
 * Uses custom cluster image with shadow blur effect
 */
function generateClusterHtml(count: number): string {
    const colors = getClusterColor(count);
    const size = getClusterSize(count);
    const displayCount = count > 99 ? '99+' : count.toString();

    return `
        <div style="
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            filter: drop-shadow(0 0 8px ${colors.glow1}) drop-shadow(0 0 16px ${colors.glow2}) drop-shadow(0 0 24px ${colors.glow3}80);
        ">
            <!-- Cluster Image -->
            <img 
                src="/assets/images/cluster-nobg.png" 
                alt="cluster"
                style="
                    width: ${size}px;
                    height: ${size}px;
                    object-fit: contain;
                "
            />
            
            <!-- Count Badge Top-Right (Notification Style) -->
            <div style="
                position: absolute;
                top: -8px;
                right: -8px;
                color: #ffffff;
                font-weight: 800;
                font-size: 12px;
                font-family: system-ui, -apple-system, sans-serif;
                text-shadow: 
                    0 0 4px ${colors.glow1},
                    0 0 8px ${colors.glow1},
                    0 0 12px ${colors.glow2},
                    0 0 16px ${colors.glow2},
                    0 0 24px ${colors.glow3},
                    1px 1px 2px rgba(0,0,0,0.8);
                min-width: 18px;
                text-align: center;
            ">${displayCount}</div>
        </div>
    `;
}

/**
 * Create a Leaflet DivIcon for cluster markers
 */
export function createClusterIcon(count: number): L.DivIcon {
    const size = getClusterSize(count);
    const html = generateClusterHtml(count);
    const badgeHeight = 20; // Height for the count badge below

    return L.divIcon({
        html,
        className: 'voice-cluster-icon',
        iconSize: L.point(size, size + badgeHeight),
        iconAnchor: L.point(size / 2, (size + badgeHeight) / 2),
    });
}

export { getClusterColor, getClusterSize, generateClusterHtml };

export default createClusterIcon;
