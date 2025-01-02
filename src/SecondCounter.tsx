import React, {useEffect, useRef, useState} from 'react';
import './App.css';
import {Button} from "./Button"
import {Input} from "./Input";

function App() {




    let [num, setNum] = useState(0);
    let [max, setMax] = useState(5)
    let [start, setStart] = useState(num)
    let [error, setError] = useState(false)
    let [editMode, setEditMode] = useState(false)
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    const isFirstRender = useRef(true);

    useEffect(() => {
        const retrievedStart = JSON.parse(localStorage.getItem('start') || '0');
        const retrievedMax = JSON.parse(localStorage.getItem('max') || '3');
        setNum(retrievedStart)
        setStart(retrievedStart)
        setMax(retrievedMax)
    }, []);


    useEffect(() => {

        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

            localStorage.setItem('start', JSON.stringify(start));
            localStorage.setItem('max', JSON.stringify(max));

    }, [start,max]);



    useEffect(() => {
        if (max <= start || start < 0) {
            setError(true);
        } else {
            setError(false);
        }
    }, [max, start]);

    useEffect(() => {
        setIsButtonDisabled(false); // Button becomes enabled when max or start changes
    }, [max, start]);

    useEffect(() => {
        setIsButtonDisabled(true)
    }, []);

    console.log(error)

    const incValueSetter = () => {
        setNum(num + 1)
    }
    const resetValueSetter = () => {
        setNum(start)
    }
    const setValueSetter = () => {
        setNum(start)

        setIsButtonDisabled(true)
        setEditMode(false)
    }
    const turnSetMode = () => {
        setEditMode(true)
    }
    const startValueChanger = (e: number) => {
        setStart(e)
        // setNum(start)
    }
    const maxValueChanger = (e: number) => {

        setMax(e)
        // setNum(start)
    }


    return (
        <div className="App">

            { !editMode

            ?

            <div className={"mainTablet"}>
                <div className={"mainWindow"}>
                    {error ? <span>Enter valid values , please!</span> :
                        <h1 style={num == max ? {color: "red"} : {}}>{!editMode ? num : "Edit mode"}</h1>}
                </div>
                <div className={"buttonsArea"}>
                    <Button title={"inc"} callBack={incValueSetter} disableMarker={num >= max || editMode}/>
                    <Button title={"reset"} callBack={resetValueSetter} disableMarker={num === start || editMode}/>
                    <Button title={"set"} callBack={turnSetMode} disableMarker={false}/>
                </div>
            </div>

            :

            <div className={"mainTablet"}>
                <div className={"mainWindow"}>

                    <Input title={"max"} value={max} callBack={maxValueChanger} setEditMode={setEditMode}/>
                    <Input title={"start"} value={start} callBack={startValueChanger} setEditMode={setEditMode}/>

                </div>
                <div className={"buttonsArea"}>
                    <Button title={"set"} callBack={setValueSetter} disableMarker={error}/>
                </div>
            </div>

            }

        </div>
    );
}

export default App;
