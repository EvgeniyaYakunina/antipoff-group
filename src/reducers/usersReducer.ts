import {Dispatch} from "redux";
import {usersAPI} from "../api/api";
import {CommonType, UserType} from "../types";

export type InitialStateUsersType = typeof initialState
const initialState ={
    users: [] as UserType[],
    paginationData: {
        page: 1,
        per_page: 6,
        total: 12,
        total_pages: 2,
        data: []
    } as CommonType
}

export const usersReducer = (state: InitialStateUsersType = initialState, action: ActionsType): InitialStateUsersType=> {

    switch (action.type) {
        case 'SET-USERS':
            return {...state, users: action.users}
        case 'SET-CURRENT-PAGE':
            return { ...state,paginationData: {...state.paginationData, page: action.page} }
        case 'SET-PAGINATION-DATA':
            return { ...state, paginationData: action.paginationData }
        default:
            return state
    }
}

// actions
export const setUsersAC = (users: UserType[]) => ({type: 'SET-USERS', users} as const)
export const setCurrentPageAC = (page: number)=> ({ type: 'SET-CURRENT-PAGE', page } as const)
export const setPaginationDataAC = (paginationData: CommonType)=> ({ type: 'SET-PAGINATION-DATA', paginationData } as const)

//thunks
export const getUsersTC =()=> (dispatch: Dispatch<ActionsType>, getState: any, extrArg: any)=>{
    usersAPI.getUsers()
        .then((res)=>{
            dispatch(setUsersAC(res.data.data))
        })
        .catch(error=>{

        })
}

// types
export type ActionsType =
    |ReturnType<typeof setUsersAC>
    |ReturnType<typeof setCurrentPageAC>
    |ReturnType<typeof setPaginationDataAC>
