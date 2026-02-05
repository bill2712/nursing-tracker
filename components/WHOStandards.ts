// Simplified WHO Child Growth Standards (0-24 months)
// Source: https://www.who.int/tools/child-growth-standards/standards

export interface WHODataPoint {
    month: number;
    p3: number;
    p50: number;
    p97: number;
}

export interface WHOStandards {
    weightForAge: {
        boys: WHODataPoint[];
        girls: WHODataPoint[];
    };
    lengthForAge: {
        boys: WHODataPoint[];
        girls: WHODataPoint[];
    };
    headCircumferenceForAge: {
        boys: WHODataPoint[];
        girls: WHODataPoint[];
    };
}

export const WHO_STANDARDS: WHOStandards = {
    weightForAge: { // kg
        boys: [
            { month: 0, p3: 2.5, p50: 3.3, p97: 4.3 },
            { month: 1, p3: 3.4, p50: 4.5, p97: 5.8 },
            { month: 2, p3: 4.3, p50: 5.6, p97: 7.1 },
            { month: 3, p3: 5.0, p50: 6.4, p97: 8.0 },
            { month: 4, p3: 5.6, p50: 7.0, p97: 8.7 },
            { month: 5, p3: 6.0, p50: 7.5, p97: 9.3 },
            { month: 6, p3: 6.4, p50: 7.9, p97: 9.8 },
            { month: 7, p3: 6.7, p50: 8.3, p97: 10.3 },
            { month: 8, p3: 6.9, p50: 8.6, p97: 10.7 },
            { month: 9, p3: 7.1, p50: 8.9, p97: 11.0 },
            { month: 10, p3: 7.4, p50: 9.2, p97: 11.4 },
            { month: 11, p3: 7.6, p50: 9.4, p97: 11.7 },
            { month: 12, p3: 7.7, p50: 9.6, p97: 12.0 },
            { month: 15, p3: 8.3, p50: 10.3, p97: 12.8 },
            { month: 18, p3: 8.8, p50: 10.9, p97: 13.7 },
            { month: 21, p3: 9.2, p50: 11.5, p97: 14.5 },
            { month: 24, p3: 9.7, p50: 12.2, p97: 15.3 }
        ],
        girls: [
            { month: 0, p3: 2.4, p50: 3.2, p97: 4.2 },
            { month: 1, p3: 3.2, p50: 4.2, p97: 5.5 },
            { month: 2, p3: 3.9, p50: 5.1, p97: 6.6 },
            { month: 3, p3: 4.5, p50: 5.8, p97: 7.5 },
            { month: 4, p3: 5.0, p50: 6.4, p97: 8.2 },
            { month: 5, p3: 5.4, p50: 6.9, p97: 8.8 },
            { month: 6, p3: 5.7, p50: 7.3, p97: 9.3 },
            { month: 7, p3: 6.0, p50: 7.6, p97: 9.8 },
            { month: 8, p3: 6.3, p50: 7.9, p97: 10.2 },
            { month: 9, p3: 6.5, p50: 8.2, p97: 10.5 },
            { month: 10, p3: 6.7, p50: 8.5, p97: 10.9 },
            { month: 11, p3: 6.9, p50: 8.7, p97: 11.2 },
            { month: 12, p3: 7.0, p50: 8.9, p97: 11.5 },
            { month: 15, p3: 7.6, p50: 9.6, p97: 12.4 },
            { month: 18, p3: 8.1, p50: 10.2, p97: 13.2 },
            { month: 21, p3: 8.6, p50: 10.9, p97: 14.0 },
            { month: 24, p3: 9.0, p50: 11.5, p97: 14.8 }
        ]
    },
    lengthForAge: { // cm
        boys: [
            { month: 0, p3: 46.1, p50: 49.9, p97: 53.7 },
            { month: 1, p3: 50.8, p50: 54.7, p97: 58.6 },
            { month: 2, p3: 54.4, p50: 58.4, p97: 62.4 },
            { month: 3, p3: 57.3, p50: 61.4, p97: 65.5 },
            { month: 4, p3: 59.7, p50: 63.9, p97: 68.0 },
            { month: 5, p3: 61.7, p50: 65.9, p97: 70.1 },
            { month: 6, p3: 63.3, p50: 67.6, p97: 71.9 },
            { month: 7, p3: 64.8, p50: 69.2, p97: 73.5 },
            { month: 8, p3: 66.2, p50: 70.6, p97: 75.0 },
            { month: 9, p3: 67.5, p50: 72.0, p97: 76.5 },
            { month: 10, p3: 68.7, p50: 73.3, p97: 77.9 },
            { month: 11, p3: 69.9, p50: 74.5, p97: 79.2 },
            { month: 12, p3: 71.0, p50: 75.7, p97: 80.5 },
            { month: 15, p3: 74.1, p50: 79.1, p97: 84.2 },
            { month: 18, p3: 76.9, p50: 82.3, p97: 87.7 },
            { month: 21, p3: 79.4, p50: 85.1, p97: 90.9 },
            { month: 24, p3: 81.7, p50: 87.8, p97: 93.9 }
        ],
        girls: [
            { month: 0, p3: 45.4, p50: 49.1, p97: 52.9 },
            { month: 1, p3: 49.8, p50: 53.7, p97: 57.6 },
            { month: 2, p3: 53.0, p50: 57.1, p97: 61.1 },
            { month: 3, p3: 55.6, p50: 59.8, p97: 64.0 },
            { month: 4, p3: 57.8, p50: 62.1, p97: 66.4 },
            { month: 5, p3: 59.6, p50: 64.0, p97: 68.5 },
            { month: 6, p3: 61.2, p50: 65.7, p97: 70.3 },
            { month: 7, p3: 62.7, p50: 67.3, p97: 71.9 },
            { month: 8, p3: 64.0, p50: 68.7, p97: 73.5 },
            { month: 9, p3: 65.3, p50: 70.1, p97: 75.0 },
            { month: 10, p3: 66.5, p50: 71.5, p97: 76.4 },
            { month: 11, p3: 67.7, p50: 72.8, p97: 77.8 },
            { month: 12, p3: 68.9, p50: 74.0, p97: 79.2 },
            { month: 15, p3: 72.0, p50: 77.5, p97: 83.0 },
            { month: 18, p3: 74.9, p50: 80.7, p97: 86.5 },
            { month: 21, p3: 77.5, p50: 83.7, p97: 89.8 },
            { month: 24, p3: 80.0, p50: 86.4, p97: 92.9 }
        ]
    },
    headCircumferenceForAge: { // cm
        boys: [
            { month: 0, p3: 31.9, p50: 34.5, p97: 37.0 },
            { month: 3, p3: 38.3, p50: 40.8, p97: 43.4 },
            { month: 6, p3: 41.0, p50: 43.6, p97: 46.2 },
            { month: 9, p3: 42.6, p50: 45.3, p97: 47.9 },
            { month: 12, p3: 43.9, p50: 46.5, p97: 49.2 },
            { month: 18, p3: 45.4, p50: 48.1, p97: 50.8 },
            { month: 24, p3: 46.5, p50: 49.3, p97: 52.0 }
        ],
        girls: [
            { month: 0, p3: 31.5, p50: 33.9, p97: 36.2 },
            { month: 3, p3: 37.4, p50: 39.8, p97: 42.1 },
            { month: 6, p3: 40.0, p50: 42.5, p97: 45.0 },
            { month: 9, p3: 41.5, p50: 44.1, p97: 46.7 },
            { month: 12, p3: 42.7, p50: 45.4, p97: 48.0 },
            { month: 18, p3: 44.3, p50: 47.0, p97: 49.7 },
            { month: 24, p3: 45.4, p50: 48.2, p97: 51.0 }
        ]
    }
};
