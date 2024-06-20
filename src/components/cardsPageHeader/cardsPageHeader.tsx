import s from './cardsPageHeader.module.css'

export const CardsPageHeader = () => {
    return (
        <div className={s.textContainer}>
            <h1 className={s.title}>Наша команда</h1>
            <h2 className={s.text}>
                Это опытные специалисты, хорошо разбирающиеся во всех задачах, которые
                ложатся на их плечи, и умеющие находить выход из любых, даже самых
                сложных ситуаций.{' '}
            </h2>
        </div>
    );
};