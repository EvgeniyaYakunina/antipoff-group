import React, {useState} from 'react'
import s from './login.module.css'
import {Link, useNavigate} from "react-router-dom"
import {FieldValues, SubmitHandler, useForm} from "react-hook-form"
import {ErrorMessage} from "@hookform/error-message"
import {useAppDispatch} from "../../state"
import {loginTC} from "../../reducers"

export const Login = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const [isPassHidden, setIsPassHidden] = useState(true)
    const validateEmail =
        /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm({
        mode: 'all',
    })

    const onSubmit = ({password, email}: { email: string, password: string }) => {
        dispatch(loginTC(email, password))
        navigate('/cards')
    }
    const handleShowPass = () => {
        setIsPassHidden(!isPassHidden)
    }
    return (
        <section className={s.login}>
            <form onSubmit={handleSubmit(onSubmit as SubmitHandler<FieldValues>)} className={s.form}>
                <h1 className={s.title}>Войти</h1>
                <label htmlFor="email" className={s.label}>
                    <span>Электронная почта</span>
                    <input
                        className={errors.email ? s.inputError : s.input}
                        type={"email"}
                        id={"email"}
                        placeholder={"example@example.ru"}
                        maxLength={30}
                        autoFocus
                        {...register('email', {
                            required: 'Поле обязательно для заполнения',
                            pattern: {
                                value: validateEmail,
                                message: 'Введите корректный email',
                            },
                        })}
                    />
                    <ErrorMessage
                        errors={errors}
                        name={'email'}
                        render={({message}) => <p className={s.error}>{message}</p>}
                    />
                </label>
                <label htmlFor="passowrd" className={s.label}>
                    <span>Пароль</span>
                    <input
                        className={errors.password ? s.inputError : s.input}
                        id={"password"}
                        placeholder={"******"}
                        type={isPassHidden ? 'password' : 'text'}
                        {...register('password', {
                            required: 'Поле обязательно для заполнения',
                            minLength: {
                                value: 5,
                                message: 'Не менее 5 символов',
                            },
                        })}
                    />
                    <ErrorMessage
                        errors={errors}
                        name={'password'}
                        render={({message}) => <p className={s.error}>{message}</p>}
                    />
                    <button
                        className={s.showPassword}
                        type={"button"}
                        onClick={handleShowPass}
                    />
                </label>
                <button type={'submit'} className={s.button}>
                    Войти
                </button>
                <div className={s.span}>
                    Еще не зарегистрированы?{' '}
                    <Link to="/register" className={s.link}>
                        Регистрация
                    </Link>{' '}
                </div>
            </form>
        </section>
    )
}