import { RootState } from './app/store'; // Import your RootState type

export const loadState = (): any => {
    try {
        const serializedStart = localStorage.getItem('start');
        const serializedMax = localStorage.getItem('max');
        const state = localStorage.getItem('app-state')
        if (serializedStart === null || serializedMax === null || state === null) {
            return undefined; // Use default state from reducers
        }

        return JSON.parse(state)

    } catch (err) {
        console.error("Failed to load state:", err);
        return undefined;
    }
};
