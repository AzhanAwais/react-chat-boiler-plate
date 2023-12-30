import React, { useEffect, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import Search from '../chat/Search'
import { IoSend } from "react-icons/io5";
import Assets from '../../constants/images';
import CustomRadio from '../form/CustomRadio';
import { VALIDATIONS_TEXT } from '../../constants/app-constants';
import { Controller, useForm } from 'react-hook-form';
import UserBox from '../chat/UserBox';
import { FaTimes } from 'react-icons/fa';
import { useLazySearchUsersQuery, useStartChatMutation } from '../../store/apis/chatApi';
import { useDispatch, useSelector } from 'react-redux';
import { useDebounce } from 'use-debounce';
import Loader from '../loader/Loader';
import { errorMsg, successMsg } from '../../constants/msg';
import { setSearchUsers, setSelectedChat } from '../../store/slices/chatSlice';
import { GetAuthUserLocalStorage } from '../../services/localStorage/localStorage';

const StartChatPopup = ({ startChatPopup, setStartChatPopup }) => {
    const { handleSubmit, register, control, reset, watch, setValue, getValues, formState: { errors } } = useForm({ mode: 'onChange' })
    const dispatch = useDispatch()
    const currUser = GetAuthUserLocalStorage()
    const { searchUsers } = useSelector((state) => state?.chat)
    const [searchText, setSearchText] = useState("")
    const [search] = useDebounce(searchText, 800)
    const [allSearchUsers, { isLoading }] = useLazySearchUsersQuery()
    const [startChat, { isLoading: isStartChatLoading }] = useStartChatMutation()

    const onSubmit = async (formData) => {
        const apiData = {
            receiver: formData?.user,
            sender: currUser?._id
        }
        const { data, error } = await startChat(apiData)
        if (data) {
            let user = data?.data?.sender?._id == currUser?._id ? data?.data?.receiver : data?.data?.sender
            dispatch(setSelectedChat({ data: data?.data, user: user }))
            successMsg(data.message)
            setStartChatPopup(false)
            reset()
        }
        else {
            errorMsg(error.data.message)
        }
    }

    useEffect(() => {
        reset()
    }, [startChatPopup])

    useEffect(() => {
        const getSearchUsers = async () => {
            const params = {
                sort: 'asc',
                sortBy: 'fullname',
                search: search
            }
            const { data, error } = await allSearchUsers(params)
            if (data) {
                dispatch(setSearchUsers({ data: data?.data?.data, pagination: null }))
            }
            else {
                errorMsg(error.data.message)
            }
        }

        getSearchUsers()
    }, [search])

    return (
        <Modal
            className='theme-popup start-chat-popup'
            show={startChatPopup}
            onHide={() => setStartChatPopup(false)}
            size="md"
            centered
            aria-labelledby="contained-modal-title-vcenter"
        >
            <Modal.Body>
                <div className='d-flex align-items-center justify-content-between mb-4'>
                    <h6><b>Start Chat</b></h6>
                    <FaTimes className='cursor' onClick={() => setStartChatPopup(false)} />
                </div>

                <div>
                    <Search searchText={searchText} setSearchText={setSearchText} />
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <div className="users-listing border-top py-2 mt-4">
                            {
                                isLoading ?
                                    <Loader />
                                    :
                                    <>
                                        <Controller
                                            control={control}
                                            name="user"
                                            rules={{
                                                required: {
                                                    value: true,
                                                    message: VALIDATIONS_TEXT.SELECT_USER_REQUIRED,
                                                },
                                            }}
                                            render={({ field }) => (
                                                <>
                                                    {
                                                        searchUsers?.data?.map((item, index) => (
                                                            <CustomRadio
                                                                {...field}
                                                                key={index}
                                                                name="user"
                                                                label={<UserBox data={item} />}
                                                                value={item?._id}
                                                                onChange={field.onChange}
                                                                disabled={false}
                                                                checked={field.value === item?._id}
                                                            />
                                                        ))
                                                    }
                                                </>
                                            )}
                                        />
                                        {errors.user && <small className='text-start d-block text-danger mt-1'>{errors.user.message}</small>}
                                    </>
                            }
                        </div>

                        <div className="d-flex align-items-center justify-content-end">
                            <Button disabled={isStartChatLoading} type='submit' className='submit-btn'>
                                {isStartChatLoading ? <Loader /> : <IoSend />}
                            </Button>
                        </div>
                    </Form>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default StartChatPopup