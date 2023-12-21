import React, { forwardRef } from 'react'
import { Form } from 'react-bootstrap'

const CustomSearch = forwardRef((props, ref) => {
    const { field, value, onChange, disabled } = props

    return (
        <div className='custom-search'>
            <Form.Control
                {...field}
                type="text"
                placeholder="Search"
                maxLength={30}
                value={value}
                onChange={onChange}
                disabled={disabled}
            />
        </div>
    )
})

export default CustomSearch