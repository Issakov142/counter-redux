import { RootState } from './app/store'; // Import your RootState type

export const loadState = (): any => {
    try {
        const serializedStart = localStorage.getItem('start');
        const serializedMax = localStorage.getItem('max');
        if (serializedStart === null || serializedMax === null) {
            return undefined; // Use default state from reducers
        }

        return {
            app: {
                start: JSON.parse(serializedStart),
                max: JSON.parse(serializedMax),
                num: JSON.parse(serializedStart), // Initialize num to start
            },
        };
    } catch (err) {
        console.error("Failed to load state:", err);
        return undefined;
    }
};
