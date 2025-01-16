import {combineReducers, legacy_createStore, Store, AnyAction, applyMiddleware} from 'redux';
import { appReducer } from './app-reducer';
import {loadState} from '../loadToStorageFunction';
import {thunk} from 'redux-thunk';

// Define the root reducer
const rootReducer = combineReducers({
    app: appReducer,
});

// Define the type of the entire state
export type RootState = ReturnType<typeof rootReducer>;

// Load the preloaded state (with proper type)
const preloadedState: RootState = loadState()

// Create the Redux store with the preloaded state

// @ts-ignore
export const store: Store<RootState, AnyAction> = legacy_createStore(rootReducer, preloadedState, applyMiddleware(thunk));
// export const store: Store<RootState> = legacy_createStore(rootReducer);
// Subscribe to store changes and save to local storage
store.subscribe(() => {
    const state = store.getState();
    // localStorage.setItem('start', JSON.stringify(state.app.start));
    // localStorage.setItem('max', JSON.stringify(state.app.max));
    // localStorage.setItem('app-state', JSON.stringify(state))
});

// Export types for dispatch
export type AppDispatch = typeof store.dispatch;
export type AppStateType = ReturnType<typeof rootReducer>

// Allow debugging in the browser console
// @ts-ignore
window.store = store;
