import s from './cardHeader.module.css'
import {useNavigate} from 'react-router-dom'
import {UserType} from "../../types"

type Props = {
    user: UserType
}
export const CardHeader = ({user}: Props) => {
    const navigate = useNavigate()

    const handleClickBack = () => {
        navigate(-1);
    }


    return (
        <div className={s.cardHeader}>
            <button className={s.buttonBack} onClick={() => handleClickBack()}>
                Назад
            </button>
            <div className={s.profileContainer}>
                <img
                    src={user.avatar}
                    alt={`${user.first_name} ${user.last_name}`}
                    className={s.avatar}
                />
                <div className={s.textBlock}>
                    <h1 className={s.name}>{`${user.first_name} ${user.last_name}`}</h1>
                    <p className={s.position}>Партнер</p>
                </div>
            </div>
        </div>
    );
}
