import {useParams} from 'react-router-dom'
import s from './personalCardPage.module.css'
import {useEffect} from "react"
import {useAppDispatch, useAppSelector} from "../../state"
import {setUserByIdTC} from "../../reducers"
import {CardHeader, HeaderLogout} from "../../components"

export const PersonalCardPage = () => {

    const { id } = useParams()
    const dispatch = useAppDispatch()
    const users = useAppSelector(state => state.users.users)
    const numberId = Number(id)
    const user = users.find(user => user.id === numberId)
    const PARAGRAPHS = [
        {
            id: 'p1',
            text: 'Клиенты видят в нем эксперта по вопросам разработки комплексных решений финансовых продуктов, включая такие аспекты, как организационная структура, процессы, аналитика и ИТ-компоненты. Он помогает клиентам лучше понимать структуру рисков их бизнеса, улучшать процессы за счет применения новейших технологий и увеличивать продажи, используя самые современные аналитические инструменты.',
        },
        {
            id: 'p2',
            text: 'В работе с клиентами недостаточно просто решить конкретную проблему или помочь справиться с трудностями. Не менее важно уделять внимание обмену знаниями: "Один из самых позитивных моментов — это осознание того, что ты помог клиенту перейти на совершенно новый уровень компетентности, уверенность в том, что после окончания проекта у клиента есть все необходимое, чтобы дальше развиваться самостоятельно".',
        },
        {
            id: 'p3',
            text: 'Помимо разнообразных проектов для клиентов финансового сектора, Сорин ведет активную предпринимательскую деятельность. Он является совладельцем сети клиник эстетической медицины в Швейцарии, предлагающей инновационный подход к красоте, а также инвестором других бизнес-проектов.',
        },
    ]

        useEffect(() => {
            if (numberId) {
                dispatch(setUserByIdTC(numberId))
            }
        }, [numberId, dispatch]);

        if (!user) {
            return <div>Загрузка...</div>
        }

    return (
        <>
                <HeaderLogout>
                    <CardHeader user={user}/>
                </HeaderLogout>
                <section className={s.cardText}>
                    <div className={s.paragraphs}>
                        {PARAGRAPHS.map((p) => (
                            <p key={p.id}>{p.text}</p>
                        ))}
                    </div>
                    <div className={s.contacts}>
                        <a
                            href="tel:+7(954)333-44-55"
                            target="_blank"
                            rel="noreferrer"
                            className={s.link}
                        >
                            <div className={s.phoneIcon}/>
                            <span>+7 (954) 333-44-55</span>
                        </a>
                        <a
                            href={`mailto:${user.email}`}
                            target="_blank"
                            rel="noreferrer"
                            className={s.link}
                        >
                            <div className={s.mailIcon}/>
                            <span>{user.email}</span>
                        </a>
                    </div>
                </section>
        </>
    )
}
