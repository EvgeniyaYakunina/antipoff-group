import React, {useState} from 'react'
import s from './register.module.css'
import {Link, useNavigate} from "react-router-dom"
import {FieldValues, SubmitHandler, useForm} from "react-hook-form"
import {ErrorMessage} from "@hookform/error-message"
import {useAppDispatch} from "../../state";
import {registerTC} from "../../reducers";

export const Register = () => {

    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const [isPassHidden, setIsPassHidden] = useState(true)
    const [isConfirmPassHidden, setIsConfirmPassHidden] = useState(true)

    const validateEmail =
        /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu

    const {
        register,
        handleSubmit,
        watch,
        formState: {errors},
    } = useForm({mode: 'all'})

    const onSubmit = ({password, email}: { email: string, password: string }) => {
        dispatch(registerTC(email, password))
        navigate('/cards')
    }

    const handleShowPassword = () => {
        setIsPassHidden(!isPassHidden);
    }
    const handleShowConfirmPassword = () => {
        setIsConfirmPassHidden(!isConfirmPassHidden);
    }
    return (
        <section className={s.register}>
            <form action="" onSubmit={handleSubmit(onSubmit as SubmitHandler<FieldValues>)} className={s.form}>
                <h1 className={s.title}>Регистрация</h1>
                <label htmlFor="name" className={s.label}>
                    <span>Имя</span>
                    <input
                        className={errors.name ? s.inputError : s.input}
                        type={"text"}
                        id={"name"}
                        placeholder={"Ваше имя"}
                        maxLength={15}
                        autoFocus
                        {...register('name', {
                            required: 'Поле обязательно для заполнения'
                        })}
                    />
                    <ErrorMessage
                        errors={errors}
                        name={'name'}
                        render={({message}) => <p className={s.error}>{message}</p>}
                    />
                </label>
                <label htmlFor="email" className={s.label}>
                    <span>Электронная почта</span>
                    <input
                        className={errors.email ? s.inputError : s.input}
                        type={"email"}
                        id={"email"}
                        placeholder={"example@example.ru"}
                        maxLength={30}
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
                        id={"passowrd"}
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
                    <div
                        className={s.showPassword}
                        onClick={handleShowPassword}
                    />
                </label>
                <label htmlFor="confirmation" className={s.label}>
                    <span>Подтвердите пароль</span>
                    <input
                        className={errors.confirmation ? s.inputError : s.input}
                        id={"confirmation"}
                        placeholder={"******"}
                        type={isConfirmPassHidden ? 'password' : 'text'}
                        {...register('confirmation', {
                            required: 'Поле обязательно для заполнения',
                            minLength: {
                                value: 5,
                                message: 'Не менее 5 символов',
                            },
                            validate: (val) => {
                                if (watch('password') !== val) {
                                    return 'Пароли не совпадают';
                                }
                            },
                        })}
                    />
                    <ErrorMessage
                        errors={errors}
                        name={'password'}
                        render={({message}) => <p className={s.error}>{message}</p>}
                    />
                    <div className={s.showPassword} onClick={handleShowConfirmPassword}/>
                </label>
                <button type={'submit'} className={s.submit}>
                    Зарегистрироваться
                </button>
                <span className={s.span}>
                    Уже зарегистрированы?{' '}
                    <Link to="/login" className={s.link}>
                        Войти
                    </Link>{' '}
                </span>

            </form>
        </section>
    )

}