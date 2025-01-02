import { combineReducers, legacy_createStore } from 'redux'

import {appReducer} from './app-reducer';
import {loadState} from '../CounterOnRedux';

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
    app: appReducer,
    storage: loadState
})
// непосредственно создаём store
export const store = legacy_createStore(rootReducer)

store.subscribe(()=>{

        localStorage.setItem('start', JSON.stringify(store.getState().storage?.start2));
        localStorage.setItem('max', JSON.stringify(store.getState().storage?.max2));

    })

// определить автоматически тип всего объекта состояния
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store