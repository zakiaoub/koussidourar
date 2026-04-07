export function getTag(tag: string): { icon: string; color: string } {
    switch (tag) {
        case 'destinations':
            return { icon: 'geo-alt-fill', color: 'blue-text' };

        case 'travel_guides':
            return { icon: 'compass-fill', color: 'orange-text' };

        case 'tips':
            return { icon: 'lightbulb-fill', color: 'green-text' };

        case 'experiences':
            return { icon: 'suitcase-fill', color: 'red-text' };

        case 'inspirations':
            return { icon: 'camera-fill', color: 'purple-text' };

        default:
            return null;
    }
}
