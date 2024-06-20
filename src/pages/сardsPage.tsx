import React, {useEffect} from "react"
import {Cards, CardsPageHeader, HeaderLogout} from "../components";
import {useAppDispatch, useAppSelector} from "../state";
import {UserType} from "../types";
import {getUsersTC} from "../reducers";

export const CardsPage=()=>{

    const dispatch = useAppDispatch()
    const users = useAppSelector<UserType[]>(state => state.users.users)
    const totalPages = useAppSelector(state => state.users.paginationData.total_pages)

    useEffect(() => {
        dispatch(getUsersTC())
    }, [dispatch])

    return(
        <>
            <HeaderLogout>
                <CardsPageHeader/>
            </HeaderLogout>
            <Cards users={users} totalPages={totalPages}/>
        </>
    )
}