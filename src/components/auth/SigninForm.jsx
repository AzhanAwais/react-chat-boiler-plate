import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { VALIDATIONS, VALIDATIONS_TEXT } from '../../constants/app-constants'
import { Button, Form } from 'react-bootstrap'
import CustomInput from '../form/CustomInput'
import { IoEye, IoEyeOff } from "react-icons/io5"
import { useLoginMutation } from '../../store/apis/authApi'
import Loader from '../loader/Loader'
import { errorMsg, successMsg } from '../../constants/msg'
import { SetAuthUserLocalStorage, SetTokenLocalStorage } from '../../services/localStorage/localStorage'
import { useNavigate } from 'react-router-dom'
import { getChatSocket } from '../../socket'

const SigninForm = () => {
    const { handleSubmit, register, control, reset, watch, setValue, getValues, formState: { errors } } = useForm({ mode: 'onChange' })
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false)
    const [login, { isLoading }] = useLoginMutation()

    const onSubmit = async (formData) => {
        const { data, error } = await login(formData)
        if (data) {
            const socket = getChatSocket()
            socket.emit("getOnlineUser")
            SetTokenLocalStorage(data.data.token)
            SetAuthUserLocalStorage(data.data.user)
            navigate("/chat")
            successMsg(data.message)
        }
        else {
            errorMsg(error.data.message)
        }
    }

    return (
        <div className='auth signin-form'>
            <div className='content mb-5'>
                <h2 className='mb-4'>Sign in</h2>
                <h6>Let’s get into the Chat App</h6>
            </div>

            <Form onSubmit={handleSubmit(onSubmit)}>
                {/* EMAIL INPUT */}
                <div className='mb-4'>
                    <Controller
                        control={control}
                        name="email"
                        rules={{
                            required: {
                                value: true,
                                message: VALIDATIONS_TEXT.EMAIL_REQUIRED,
                            },
                            maxLength: {
                                value: VALIDATIONS.EMAIL,
                                message: VALIDATIONS_TEXT.EMAIL
                            },
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: VALIDATIONS_TEXT.EMAIL_FORMAT
                            }
                        }}
                        render={({ field }) => (
                            <CustomInput
                                {...field}
                                label="Email Address"
                                placeholder="Enter your email"
                                type="email"
                                required={true}
                                maxLength={VALIDATIONS.EMAIL}
                                value={field.value}
                                onChange={field.onChange}
                                disabled={false}
                            />
                        )}
                    />
                    {errors.email && <small className='text-start d-block text-danger mt-1'>{errors.email.message}</small>}
                </div>

                {/* PASSWORD INPUT */}
                <div className='mb-4'>
                    <Controller
                        control={control}
                        name="password"
                        rules={{
                            required: {
                                value: true,
                                message: VALIDATIONS_TEXT.PASSWORD_REQUIRED,
                            },
                            minLength: {
                                value: VALIDATIONS.PASSWORD_MIN,
                                message: VALIDATIONS_TEXT.PASSWORD_MIN
                            },
                            maxLength: {
                                value: VALIDATIONS.PASSWORD_MAX,
                                message: VALIDATIONS_TEXT.PASSWORD_MAX
                            },
                            pattern: {
                                value: /^(?=.*?[A-Z])(?=.*?[a-z]).{8,}$/,
                                message: VALIDATIONS_TEXT.PASSWORD_FORMAT
                            }
                        }}
                        render={({ field }) => (
                            <div className="password-input">
                                <CustomInput
                                    {...field}
                                    label="Password"
                                    placeholder="Enter your password"
                                    type={showPassword ? "text" : "password"}
                                    required={true}
                                    minLength={VALIDATIONS.PASSWORD_MIN}
                                    maxLength={VALIDATIONS.PASSWORD_MAX}
                                    value={field.value}
                                    onChange={field.onChange}
                                    disabled={false}
                                />
                                <span className='eye-icon' onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <IoEye /> : <IoEyeOff />}
                                </span>
                            </div>
                        )}
                    />
                    {errors.password && <small className='text-start d-block text-danger mt-1'>{errors.password.message}</small>}
                </div>

                <Button className="btn-solid btn-green w-100 mt-3" disabled={isLoading} type="submit">
                    {isLoading ? <Loader /> : "Sign In"}
                </Button>
            </Form>
        </div>
    )
}

export default SigninForm