import React, { useEffect, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import Search from '../chat/Search'
import { IoSend } from "react-icons/io5";
import Assets from '../../constants/images';
import { VALIDATIONS_TEXT } from '../../constants/app-constants';
import { Controller, useForm } from 'react-hook-form';
import CustomCheckbox from '../form/CustomCheckbox';
import UserBox from '../chat/UserBox';
import { FaTimes } from 'react-icons/fa';

const CreateGroupPopup = ({ createGroupPopup, setCreateGroupPopup }) => {
    const { handleSubmit, register, control, reset, watch, setValue, getValues, formState: { errors } } = useForm({ mode: 'onChange' })
    const [searchText, setSearchText] = useState("")
    const hobbiesList = [{ id: 1, name: 'Reading' }, { id: 2, name: 'Coding' }, { id: 3, name: 'Traveling' }];

    const onSubmit = async (data) => {
        console.log(data)
    }

    useEffect(()=>{
        reset()
    },[createGroupPopup])

    return (
        <Modal
            className='theme-popup create-group-popup'
            show={createGroupPopup}
            onHide={() => setCreateGroupPopup(false)}
            size="md"
            centered
            aria-labelledby="contained-modal-title-vcenter"
        >
            <Modal.Body>
                <div className='d-flex align-items-center justify-content-between mb-4'>
                    <h6><b>Create Group</b></h6>
                    <FaTimes className='cursor' onClick={() => setCreateGroupPopup(false)} />
                </div>
                <div>
                    <Search searchText={searchText} setSearchText={setSearchText} />
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <div className="users-listing border-top py-2 mt-4">
                            <Controller
                                name="users"
                                control={control}
                                defaultValue={[]}
                                rules={{
                                    required: {
                                        value: true,
                                        message: VALIDATIONS_TEXT.SELECT_USER_REQUIRED
                                    }
                                }}
                                render={({ field }) => (
                                    <Form.Check
                                        className='mb-4'
                                        type="checkbox"
                                        label={<UserBox />}
                                        checked={field.value && field.value.includes("21321321312")}
                                        value="21321321312"
                                        onChange={(e) => {
                                            const checked = e.target.checked;
                                            const value = e.target.value;
                                            field.onChange(checked ? [...(field.value || []), value] : (field.value || []).filter((val) => val !== value))
                                        }}
                                    />
                                )}
                            />
                            {errors.users && <small className='text-start d-block text-danger mt-1'>{errors.users.message}</small>}
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


export default CreateGroupPopup