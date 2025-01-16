export const initialState = {
    start: 0,
    max: 5,
    num: 0,
}
// export const initialState = {
//     start: JSON.parse(localStorage.getItem('start') || '0'),
//     max: JSON.parse(localStorage.getItem('max') || '0'),
//     num: JSON.parse(localStorage.getItem('start') || '0'),
// }
// export const initialState = {}


export const appReducer = (state: InitialState = initialState, action: ActionsType): InitialState => {

    switch (action.type) {
        case 'change_start': {
            return {...state, start: action.payload.num}
        }

        case 'change_max': {
            return {...state, max: action.payload.num}
        }
        case 'change_num': {
            return {...state, num: action.payload.num}
        }

        default:
            return state
    }

}

//Action Creators

export const changeStartAC = (num: number) => {
    return {
        type: 'change_start',
        payload: {num}
    } as const
}
export const changeMaxAC = (num: number) => {
    return {
        type: 'change_max',
        payload: {num}
    }
}
export const changeNumAC = (num: number) => {
    return {
        type: 'change_num',
        payload: {num}
    }
}


//types for AC

export type ChangeStartActionType = ReturnType<typeof changeStartAC>
export type ChangeMaxActionType = ReturnType<typeof changeMaxAC>
export type ChangeNumActionType = ReturnType<typeof changeNumAC>

type ActionsType = ChangeStartActionType | ChangeMaxActionType | ChangeNumActionType

export type InitialState = typeof initialState