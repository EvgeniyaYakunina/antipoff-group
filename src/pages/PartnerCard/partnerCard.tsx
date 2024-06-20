import s from "./partnerCard.module.css"
import {useNavigate} from "react-router-dom"
import React, {useEffect, useState} from "react"
import {UserType} from "../../types"

type Props = {
    user: UserType
}
export const PartnerCard = ({user}: Props) => {

    const navigate = useNavigate()

    const handleClickCard = () => {
        navigate(`/card/${user.id}`)
    }
// Так как в api нет соответствующего функционала, сохранение статуса лайка осуществляется через localStorage
    const [isLiked, setIsLiked] = useState(false)

    useEffect(() => { // Получение сохраненного статуса
        const savedLikeStatus = localStorage.getItem(`like-${user.id}`)
        if (savedLikeStatus) {
            setIsLiked(JSON.parse(savedLikeStatus))
        }
    }, [user.id])

    useEffect(() => { // Сохранение статуса лайка
        localStorage.setItem(`like-${user.id}`, JSON.stringify(isLiked))
    }, [isLiked, user.id])

    const handleLike = (event: any) => {
        event.stopPropagation();
        setIsLiked(!isLiked)
    }

    return (
        <div className={s.card} onClick={handleClickCard}>
            <img src={user.avatar} alt={`avatar`} className={s.avatar}/>
            <h2 className={s.name}>{`${user.first_name} ${user.last_name}`}</h2>
            <div className={isLiked ? s.likedButton : s.likeButton} onClick={handleLike}/>
        </div>
    )
}