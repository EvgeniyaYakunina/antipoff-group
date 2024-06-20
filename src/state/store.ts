import {AnyAction, applyMiddleware, combineReducers, legacy_createStore} from "redux"
import {thunk, ThunkDispatch} from "redux-thunk"
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux"
import {usersReducer} from "../reducers/usersReducer"
import {authReducer} from "../reducers/authReducer"

const rootReducer = combineReducers({
    users: usersReducer,
    auth: authReducer,
})

// @ts-ignore
export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof rootReducer>

export type ThunkType = ThunkDispatch<AppRootStateType, any, AnyAction>
export const useAppDispatch = useDispatch<ThunkType>;
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector;