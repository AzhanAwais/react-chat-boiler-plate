import React, { forwardRef } from 'react'
import { Form } from 'react-bootstrap'

const CustomCheckbox = forwardRef((props, ref) => {
    const { field, label, value, onChange, checked, disabled } = props
    return (
        <Form.Group className="custom-check-box">
            <Form.Check
                type="checkbox"
                label={label}
                value={value}
                onChange={onChange}
                checked={checked}
                disabled={disabled}
            />
        </Form.Group>
    )
})

export default CustomCheckbox