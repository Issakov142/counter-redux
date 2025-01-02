import React, {useEffect, useRef, useState} from 'react';
import './App.css';
import {Button} from "./Button"
import {Input} from "./Input";
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState, store} from './app/store';
import {changeMaxAC, changeNumAC, changeStartAC, initialState} from './app/app-reducer';

function App() {
    const dispatch = useDispatch<AppDispatch>();
    const { start, max, num } = useSelector((state: RootState) => state.app);
    const hah = useSelector((state: RootState) => state.storage);

    if (hah){
        console.log(hah.start2)
    }

    const [editMode, setEditMode] = React.useState(false);
    // const [num, setNum] = React.useState(start);
    const [error, setError] = React.useState(false);

    // Load from localStorage when the app initializes
    useEffect(() => {
        const retrievedStart = JSON.parse(localStorage.getItem('start') || '0');
        const retrievedMax = JSON.parse(localStorage.getItem('max') || '6');

        dispatch(changeStartAC(retrievedStart));
        dispatch(changeMaxAC(retrievedMax));
        dispatch(changeNumAC(retrievedStart));
    }, [dispatch]);

    // Save to localStorage whenever start or max changes
    useEffect(() => {
        localStorage.setItem('start', JSON.stringify(start));
        localStorage.setItem('max', JSON.stringify(max));
    }, [start, max]);

    // Handle error state when max <= start or start < 0
    useEffect(() => {
        if (max <= start || start < 0) {
            setError(true);
        } else {
            setError(false);
        }
    }, [start, max]);

    const incValueSetter = () => {
        if (num < max) {
            dispatch(changeNumAC(num+1));
        }
    };

    const resetValueSetter = () => {
        dispatch(changeNumAC(start));
    };

    const setValueSetter = () => {
        dispatch(changeNumAC(start));
        setEditMode(false);
    };

    const startValueChanger = (value: number) => {
        dispatch(changeStartAC(value));
    };

    const maxValueChanger = (value: number) => {
        dispatch(changeMaxAC(value));
    };

    console.log(loadState())

    return (
        <div className="App">
            {!editMode ? (
                <div className={"mainTablet"}>
                    <div className={"mainWindow"}>
                        {error ? (
                            <span>Enter valid values, please!</span>
                        ) : (
                            <h1 style={num === max ? { color: "red" } : {}}>{num}</h1>
                        )}
                    </div>
                    <div className={"buttonsArea"}>
                        <Button title={"inc"} callBack={incValueSetter} disableMarker={num >= max || editMode} />
                        <Button title={"reset"} callBack={resetValueSetter} disableMarker={num === start || editMode} />
                        <Button title={"set"} callBack={() => setEditMode(true)} disableMarker={false} />
                    </div>
                </div>
            ) : (
                <div className={"mainTablet"}>
                    <div className={"mainWindow"}>
                        <Input title={"max"} value={max} callBack={maxValueChanger} setEditMode={setEditMode} />
                        <Input title={"start"} value={start} callBack={startValueChanger} setEditMode={setEditMode} />
                    </div>
                    <div className={"buttonsArea"}>
                        <Button title={"set"} callBack={setValueSetter} disableMarker={error} />
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;

export const loadState = () => {
    try {
        const serializedState = localStorage.getItem('start');
        const serializedState2 = localStorage.getItem('max');
        if (serializedState === null || serializedState2 === null) {
            return undefined;
        }

        return {
            start2: JSON.parse(serializedState),
            max2: JSON.parse(serializedState2),
        }
    } catch (err) {
        return undefined;
    }
};

// // localStorage.js
// export const saveState = (state: any) => {
//     try {
//         localStorage.setItem('start', JSON.stringify(store.getState().storage.start2));
//         localStorage.setItem('start', JSON.stringify(start));
//     } catch {
//         // ignore write errors
//     }
// };