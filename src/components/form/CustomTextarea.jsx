import React from 'react'
import { Form } from 'react-bootstrap'

const CustomTextarea = ((props, ref) => {
    const { field, label, placeholder, required, minLength, maxLength, value, onChange, disabled } = props

    return (
        <Form.Group className="custom-textarea">
            <Form.Label>
                {label}
                <span className={`${required ? "d-inline-block text-pink" : "d-none"}`}>&nbsp;*</span>
            </Form.Label>
            <Form.Control
                {...field}
                as="textarea"
                placeholder={placeholder}
                minLength={minLength}
                maxLength={maxLength}
                value={value}
                onChange={onChange}
                disabled={disabled}
            />
        </Form.Group>
    )
})

export default CustomTextarea