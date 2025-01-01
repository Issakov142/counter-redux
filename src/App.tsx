import React, {useEffect, useState} from 'react';
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
    }
    const startValueChanger = (e: number) => {
        setStart(e)
        setNum(start)
    }
    const maxValueChanger = (e: number) => {
        setMax(e)
        setNum(start)
    }


    return (
        <div className="App">

            <div className={"mainTablet"}>
                <div className={"mainWindow"}>
                    {error ? <span>Enter valid values , please!</span> :
                        <h1 style={num == max ? {color: "red"} : {}}>{!editMode ? num : "Edit mode"}</h1>}
                </div>
                <div className={"buttonsArea"}>
                    <Button title={"inc"} callBack={incValueSetter} disableMarker={num >= max || editMode}/>
                    <Button title={"reset"} callBack={resetValueSetter} disableMarker={num === start || editMode}/>
                </div>
            </div>

            <div className={"mainTablet"}>
                <div className={"mainWindow"}>
                    {/*<div className={"inputAndSpan"}>*/}
                    {/*    <span>max value:</span>*/}
                    {/*    <input type={"number"}*/}
                    {/*           value={max}*/}
                    {/*           className={error ? "Error" : ""}*/}
                    {/*           onChange={(e) => onChangeMaxValueHandler(+e.target.value)}/>*/}
                    {/*</div>*/}

                    <Input title={"max"} value={max} callBack={maxValueChanger} setEditMode={setEditMode}/>
                    <Input title={"start"} value={start} callBack={startValueChanger} setEditMode={setEditMode}/>

                </div>
                <div className={"buttonsArea"}>
                    <Button title={"set"} callBack={setValueSetter} disableMarker={error || isButtonDisabled}/>
                </div>
            </div>

        </div>
    );
}

export default App;
