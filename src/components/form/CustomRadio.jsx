import React, { forwardRef } from 'react'
import { Form } from 'react-bootstrap'

const CustomRadio = forwardRef((props, ref) => {
    const { field, label, value, onChange, name, checked, disabled } = props
    return (
        <Form.Group className="custom-check-radio">
            <Form.Check
                {...field}
                type="radio"
                label={label}
                value={value}
                name={name}
                onChange={onChange}
                checked={checked}
                disabled={disabled}
            />
        </Form.Group>
    )
})

export default CustomRadio