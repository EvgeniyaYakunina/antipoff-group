import {useState} from "react"
import s from './cards.module.css'
import {UserType} from "../../types"
import {useAppDispatch} from "../../state"
import {setCurrentPageAC} from "../../reducers"
import {PartnerCard} from "../../pages"
import {Pagination} from "../pagination"

type Props={
    users: UserType[]
    totalPages: number
}
export const Cards=({users, totalPages}: Props)=>{
    const dispatch = useAppDispatch()

    const usersPerPage = 6
    const [currentPage, setCurrentPage] = useState(1) //состояние для текущей страницы
    const [visibleUsers, setVisibleUsers] = useState<UserType[]>(users.slice(0, usersPerPage))

    const updatePage = (pageNumber: number) => {
        dispatch(setCurrentPageAC(pageNumber))
        setCurrentPage(pageNumber)
        const startIndex = (pageNumber - 1) * usersPerPage
        setVisibleUsers(users.slice(startIndex, startIndex + usersPerPage)) // Обновление видимых пользователей
    }
    const showMoreUsers = () => {
        setVisibleUsers(prevUsers => [
            ...prevUsers,
            ...users.slice(prevUsers.length, prevUsers.length + usersPerPage)
        ])
    }

    return(
        <section className={s.cards}>
            <div className={s.list}>
                {visibleUsers.map(u => <PartnerCard key={u.id} user={u}/>)}
            </div>
            <Pagination totalPages={totalPages} updatePage={updatePage}/>
            {currentPage === 1 && (
                <button className={s.button} onClick={showMoreUsers}>
                    Показать еще <div className={s.buttonArrow} />
                </button>
            )}
        </section>
    )
}