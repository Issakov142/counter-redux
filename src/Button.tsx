
type ButtonPropsType = {
    title: string
    callBack: ()=>void
    disableMarker: boolean
}

export const Button: React.FC<ButtonPropsType> = (props: ButtonPropsType) => {

    const onClickHandler = () => {
        props.callBack()
    }

    return <button onClick={onClickHandler} disabled={props.disableMarker}>{props.title}</button>
}