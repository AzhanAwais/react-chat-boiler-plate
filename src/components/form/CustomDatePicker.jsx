import React, { forwardRef } from 'react'
import ReactDatePicker from 'react-datepicker'
import { Form } from 'react-bootstrap'
import "react-datepicker/dist/react-datepicker.css"

const CustomDatePicker = forwardRef((props, ref) => {
    const { field, label, value, onChange, placeholder, required, maxDate, isClearable, disabled, } = props

    return (
        <Form.Group className="custom-date-picker">
            <Form.Label>
                {label}
                <span className={`${required ? "d-inline-block text-pink" : "d-none"}`}>&nbsp;*</span>
            </Form.Label>

            <ReactDatePicker
                {...field}
                className="w-100"
                maxDate={maxDate}
                dateFormat="MMMM dd, yyyy"
                placeholderText={placeholder}
                isClearable={isClearable}
                showTimeSelect={false}
                autoComplete="off"
                selected={value}
                onChange={(value) => onChange(value)}
                onKeyDown={(e) => e.preventDefault()}
                disabled={disabled}
            />
        </Form.Group>
    )
})

export default CustomDatePicker
