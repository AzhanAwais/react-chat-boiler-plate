import React, { forwardRef } from 'react'

const CustomSelectRole = forwardRef((props, ref) => {
    const { field, icon, id, title, description, value, onChange, checked } = props

    return (
        <label className='box w-100' htmlFor={id}>
            <div className='d-flex align-items-center justify-content-between'>
                <div className='content-wrapper'>
                    <h6>{title}</h6>
                    <p className='mt-15'>{description}</p>
                </div>
                {icon}
            </div>

            <input
                {...field}
                id={id}
                name="role"
                type="radio"
                className='d-none'
                value={value}
                onChange={onChange}
                checked={checked}
            />
        </label>
    )
})

export default CustomSelectRole