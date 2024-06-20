import s from './headerLogout.module.css'
import {useNavigate} from "react-router-dom"
import {ReactNode} from "react"
import {useAppDispatch} from "../../state"
import {logoutTC} from "../../reducers"

type Props = {
    children: ReactNode
}
export const HeaderLogout = ({children}: Props) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const handleClickLogOut = () => {
        dispatch(logoutTC())
        navigate('/login')
    }

    return (
        <section className={s.section}>
            <div className={s.wrapper}>
                {children}
                    <button className={s.button} onClick={handleClickLogOut}>
                        Выход
                    </button>
            </div>
        </section>
    )
}