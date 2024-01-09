import React, { useEffect, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import Search from '../chat/Search'
import { IoSend } from "react-icons/io5";
import Assets from '../../constants/images';
import { VALIDATIONS, VALIDATIONS_TEXT } from '../../constants/app-constants';
import { Controller, useForm } from 'react-hook-form';
import CustomCheckbox from '../form/CustomCheckbox';
import UserBox from '../chat/UserBox';
import { FaTimes } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { GetAuthUserLocalStorage } from '../../services/localStorage/localStorage';
import { useCreateGroupMutation, useLazySearchUsersQuery } from '../../store/apis/chatApi';
import { useDebounce } from 'use-debounce';
import { setChatsUserList, setSearchUsers, setSelectedChat } from '../../store/slices/chatSlice';
import { errorMsg, successMsg } from '../../constants/msg';
import CustomTextarea from '../form/CustomTextarea';
import CustomInput from '../form/CustomInput';
import Loader from '../loader/Loader';
import { createImagePreview } from '../../utils/helper';
import { useUploadFileMutation } from '../../store/apis/uploadFileApi';

const CreateGroupPopup = ({ createGroupPopup, setCreateGroupPopup , socket}) => {
    const { handleSubmit, register, control, reset, watch, setValue, getValues, formState: { errors } } = useForm({ mode: 'onChange' })
    const dispatch = useDispatch()
    const [groupImage] = watch(['groupImage'])
    const currUser = GetAuthUserLocalStorage()
    const { searchUsers , chatsUserList} = useSelector((state) => state?.chat)
    const [searchText, setSearchText] = useState("")
    const [search] = useDebounce(searchText, 800)
    const [allSearchUsers, { isLoading }] = useLazySearchUsersQuery()
    const [createGroup, { isLoading: isCreateGroupLoading }] = useCreateGroupMutation()
    const [uploadFile] = useUploadFileMutation()

    const uploadImage = async (formData) => {
        const formdata = new FormData()
        formdata.append("file", formData?.groupImage)
        const { data, error } = await uploadFile(formdata)
        if (data) {
            formData.groupImage = data?.data
        }
        return formData
    }

    const onSubmit = async (formData) => {
        formData.userIds = [...formData?.userIds, currUser?._id]

        if (formData?.groupImage) {
            formData = await uploadImage(formData)
        }
        const { data, error } = await createGroup(formData)
        if (data) {
            socket.emit("groupCreated", { group: data?.data })
            socket.emit('joinRoom', currUser)
            let temp = [...chatsUserList?.data]
            temp.push( data?.data )
            dispatch(setChatsUserList({ data: temp, user: null }))
            dispatch(setSelectedChat({ data: data?.data, user: null }))
            successMsg(data.message)
            setCreateGroupPopup(false)
            reset()
        }
        else {
            errorMsg(error.data.message)
        }
    }

    useEffect(() => {
        reset()
    }, [createGroupPopup])

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
                        <div className='border-top py-2 mt-4'>
                            {/* IMAGE INPUT */}
                            <div className='mb-4'>
                                <Controller
                                    control={control}
                                    name="groupImage"
                                    rules={{
                                        required: {
                                            value: false,
                                            message: VALIDATIONS_TEXT.GROUP_NAME_REQUIRED,
                                        },
                                    }}
                                    render={({ field }) => (
                                        <div>
                                            <Form.Label className='d-block'>Upload Image</Form.Label>
                                            <label htmlFor="groupImage" className='file-uploader-wrapper'>
                                                <input accept='image/*' onChange={(e) => field.onChange(e.target.files[0])} className='d-none' type="file" id='groupImage' />
                                                <img src={groupImage ? createImagePreview(groupImage) : Assets.GeneralPlaceholder} alt="" />
                                            </label>
                                        </div>
                                    )}
                                />
                                {errors.groupImage && <small className='text-start d-block text-danger mt-1'>{errors.groupImage.message}</small>}
                            </div>

                            {/* GROUP NAME INPUT */}
                            <div className='mb-4'>
                                <Controller
                                    control={control}
                                    name="groupName"
                                    rules={{
                                        required: {
                                            value: true,
                                            message: VALIDATIONS_TEXT.GROUP_NAME_REQUIRED,
                                        },
                                        minLength: {
                                            value: VALIDATIONS_TEXT.GROUP_NAME_MIN,
                                            message: VALIDATIONS_TEXT.GROUP_NAME_MIN
                                        },
                                        maxLength: {
                                            value: VALIDATIONS.GROUP_NAME_MAX,
                                            message: VALIDATIONS_TEXT.GROUP_NAME_MAX
                                        },
                                    }}
                                    render={({ field }) => (
                                        <CustomInput
                                            {...field}
                                            label="Group Name"
                                            placeholder="Enter group name"
                                            type="text"
                                            required={true}
                                            minLength={VALIDATIONS.GROUP_NAME_MIN}
                                            maxLength={VALIDATIONS.GROUP_NAME_MAX}
                                            value={field.value}
                                            onChange={field.onChange}
                                            disabled={false}
                                        />
                                    )}
                                />
                                {errors.groupName && <small className='text-start d-block text-danger mt-1'>{errors.groupName.message}</small>}
                            </div>

                            {/* GROUP DESCRIPTION INPUT */}
                            <div className='mb-4'>
                                <Controller
                                    control={control}
                                    name="groupDescription"
                                    rules={{
                                        required: {
                                            value: false,
                                        },
                                        maxLength: {
                                            value: VALIDATIONS.GROUP_DESCRIPTION_MAX,
                                            message: VALIDATIONS_TEXT.GROUP_DESCRIPTION_MAX
                                        },
                                    }}
                                    render={({ field }) => (
                                        <CustomTextarea
                                            {...field}
                                            label="Group Description"
                                            placeholder="Enter group description"
                                            type="text"
                                            required={false}
                                            maxLength={VALIDATIONS.GROUP_DESCRIPTION_MAX}
                                            value={field.value}
                                            onChange={field.onChange}
                                            disabled={false}
                                        />
                                    )}
                                />
                                {errors.groupDescription && <small className='text-start d-block text-danger mt-1'>{errors.groupDescription.message}</small>}
                            </div>
                        </div>

                        <div className="users-listing">
                            {
                                isLoading ?
                                    <Loader />
                                    :
                                    <>
                                        <Controller
                                            name="userIds"
                                            control={control}
                                            defaultValue={[]}
                                            rules={{
                                                required: {
                                                    value: true,
                                                    message: VALIDATIONS_TEXT.SELECT_USER_REQUIRED
                                                }
                                            }}
                                            render={({ field }) => (
                                                <>
                                                    {
                                                        searchUsers?.data?.map((item, index) => (
                                                            <Form.Check
                                                                key={index}
                                                                className='mb-4'
                                                                type="checkbox"
                                                                label={<UserBox data={item} />}
                                                                checked={field.value && field.value.includes(item?._id)}
                                                                value={item?._id}
                                                                onChange={(e) => {
                                                                    const checked = e.target.checked;
                                                                    const value = e.target.value;
                                                                    field.onChange(checked ? [...(field.value || []), value] : (field.value || []).filter((val) => val !== value))
                                                                }}
                                                            />
                                                        ))

                                                    }
                                                </>
                                            )}
                                        />
                                        {errors.userIds && <small className='text-start d-block text-danger mt-1'>{errors.userIds.message}</small>}
                                    </>
                            }
                        </div>
                        <div className="d-flex align-items-center justify-content-end">
                            <Button disabled={isCreateGroupLoading} type='submit' className='submit-btn'>
                                {isCreateGroupLoading ? <Loader /> : <IoSend />}
                            </Button>
                        </div>
                    </Form>
                </div>
            </Modal.Body>
        </Modal>
    )
}


export default CreateGroupPopup