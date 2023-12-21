import React, { forwardRef } from 'react'
import { Form } from 'react-bootstrap'

const CustomInput = forwardRef((props, ref) => {
    const { field, label, placeholder, type, required, minLength, maxLength, value, onChange, disabled } = props
    
    return (
        <Form.Group className="custom-input" >
            <Form.Label>
                {label}
                <span className={`${required ? "d-inline-block text-pink ms-1" : "d-none"}`}>*</span>
            </Form.Label>
            <Form.Control
                {...field}
                type={type}
                placeholder={placeholder}
                minLength={minLength}
                maxLength={maxLength}
                value={value}
                onChange={onChange}
                disabled={disabled}
            />
        </Form.Group >
    )
})

export default CustomInput