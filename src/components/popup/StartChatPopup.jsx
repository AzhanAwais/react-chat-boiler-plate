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

const StartChatPopup = ({ startChatPopup, setStartChatPopup }) => {
    const { handleSubmit, register, control, reset, watch, setValue, getValues, formState: { errors } } = useForm({ mode: 'onChange' })
    const [searchText, setSearchText] = useState("")

    const onSubmit = async (data) => {
        console.log(data)
    }

    useEffect(()=>{
        reset()
    },[startChatPopup])

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
                                        <CustomRadio
                                            {...field}
                                            name="user"
                                            label={<UserBox />}
                                            value={"user1"}
                                            onChange={field.onChange}
                                            disabled={false}
                                            checked={field.value === 'user1'}
                                        />
                                        <CustomRadio
                                            {...field}
                                            name="user"
                                            label={<UserBox />}
                                            value={"user2"}
                                            onChange={field.onChange}
                                            disabled={false}
                                            checked={field.value === 'user2'}
                                        />
                                    </>
                                )}
                            />
                            {errors.user && <small className='text-start d-block text-danger mt-1'>{errors.user.message}</small>}
                        </div>

                        <div className="d-flex align-items-center justify-content-end">
                            <Button type='submit' className='submit-btn'>
                                <IoSend />
                            </Button>
                        </div>
                    </Form>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default StartChatPopup