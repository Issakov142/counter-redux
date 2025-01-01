import React from "react";


type InputPropsType = {
    title: string
    value: number
    callBack: (e: number) => void
    setEditMode: (val:boolean) => void
}

export const Input: React.FC<InputPropsType> = (props: InputPropsType) => {

    const onChangeHandler = (e: number) => {
        props.callBack(e)
    }
    const onFocusHandler = ()=>{
        props.setEditMode(true)
    }
    const onBlurHandler = ()=>{
        props.setEditMode(false)
    }


    return (
        <div className={"inputAndSpan"}>
            <span>{props.title} value:</span>
            <input type={"number"}
                   value={props.value}
                   onFocus={onFocusHandler}
                   onBlur={onBlurHandler}
                   onChange={(e) => onChangeHandler(+e.target.value)}/>
        </div>
    )

}