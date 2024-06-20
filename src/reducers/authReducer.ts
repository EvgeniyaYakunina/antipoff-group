import { Dispatch } from 'redux'
import {authAPI, usersAPI} from "../api/api";

const initialState = {
    isLoggedIn: false,
    userId: null as null | number,
    error: null as null | string,
    token: '' as null | string
}
type InitialStateAuthType = typeof initialState

export const authReducer = (state: InitialStateAuthType = initialState, action: ActionsType): InitialStateAuthType => {
    switch (action.type) {
        case 'SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        case 'SET-USER-ID':
            return {...state, userId: action.userId}
        case 'SET-ERROR':
            return {...state, error: action.error}
        case 'SET-TOKEN':
            return {...state, token: action.token}
        default:
            return state
    }
}
// actions
export const setIsLoggedInAC = (value: boolean) =>
    ({type: 'SET-IS-LOGGED-IN', value} as const)
export const setErrorAC = (error: string) =>
    ({ type: 'SET-ERROR', error }as const)
export const setUserIdAC = (userId: number) =>
    ({ type: 'SET-USER-ID', userId } as const)
export const setTokenAC = (token: string | null) =>
    ({ type: 'SET-TOKEN', token } as const);

// thunks
export const registerTC = (email: string, password: string) => (dispatch: Dispatch<ActionsType>) => {
    authAPI.register(email, password)
        .then(res=>{
            if (res.data.token && res.data.userId) {
                dispatch(setUserIdAC(res.data.userId))
                dispatch(setIsLoggedInAC(true))
                dispatch(setTokenAC(res.data.token))
                localStorage.setItem('token', res.data.token)
            } else {
                dispatch(setErrorAC(res.data.message ? res.data.message[0] : "Registration failed"))
            }
        })
        .catch((error)=>{
            dispatch(setErrorAC(error.message))
        })
}
export const loginTC = (email: string, password: string) => (dispatch: Dispatch<ActionsType>) => {
    authAPI.login(email, password)
        .then(res=>{
            if (res.data.token) {
                dispatch(setIsLoggedInAC(true))
                localStorage.setItem('token', res.data.token)
                if (res.data.userId) {
                    dispatch(setUserIdAC(res.data.userId))
                }
            } else {
                // dispatch(setErrorAC(res.data.message[0]))
                dispatch(setErrorAC("login failed"))
            }
        })
        .catch((error)=>{
            dispatch(setErrorAC(error.message))
        })
}
export const logoutTC = () => (dispatch: Dispatch<ActionsType>) => {
    authAPI.logout()
        .then(res=>{
            if (res.data.resultCode === 0) {
                localStorage.removeItem('token')
                dispatch(setTokenAC(null))
                dispatch(setIsLoggedInAC(false))
            } else {
                dispatch(setErrorAC(res.data.message[0]))
            }
        })
        .catch((error)=>{
            dispatch(setErrorAC(error.message))
        })
}
export const setUserByIdTC = (userId: number) => (dispatch: Dispatch<ActionsType>) => {
    usersAPI.getUsersId(userId)
        .then(res=>{
            if (res.data.resultCode === 0) {
                dispatch(setUserIdAC(userId))
            } else {
                dispatch(setErrorAC(res.data.message[0]))
            }
        })
        .catch((error)=>{
            dispatch(setErrorAC(error.message))
        })
}

// types
type ActionsType =
    |ReturnType<typeof setIsLoggedInAC>
    |ReturnType<typeof setErrorAC>
    |ReturnType<typeof setUserIdAC>
    |ReturnType<typeof setTokenAC>
    |ReturnType<typeof setUserIdAC>
