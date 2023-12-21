import React, { forwardRef } from 'react'
import { Form } from 'react-bootstrap'
import Select from 'react-select'

const CustomSelect = forwardRef((props, ref) => {
    const { field, label, placeholder, required, isMulti, options, value, onChange, disabled } = props

    return (
        <Form.Group className="custom-select">
            <Form.Label>
                {label}
                <span className={`${required ? "d-inline-block text-pink" : "d-none"}`}>&nbsp;*</span>
            </Form.Label>
            <Select
                {...field}
                className="react-select-container w-100"
                classNamePrefix="react-select"
                placeholder={placeholder}
                options={options}
                value={value}
                onChange={onChange}
                isMulti={isMulti}
                disabled={disabled}
            />
        </Form.Group>
    )
})

export default CustomSelect