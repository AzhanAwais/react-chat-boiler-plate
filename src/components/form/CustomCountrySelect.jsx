import React, { forwardRef } from 'react'
import { Form } from 'react-bootstrap';
import ReactFlagsSelect from "react-flags-select";

const CustomCountrySelect = forwardRef((props, ref) => {
    const { field, label, selected, onSelect, placeholder, required, disabled } = props

    return (
        <Form.Group className="custom-country-select">
            <Form.Label>
                {label}
                <span className={`${required ? "d-inline-block text-pink" : "d-none"}`}>&nbsp;*</span>
            </Form.Label>

            <ReactFlagsSelect
                {...field}
                className="react-flag-select"
                placeholder={placeholder}
                searchable={true}
                selectedSize={12}
                optionsSize={12}
                selected={selected}
                onSelect={onSelect}
                disabled={disabled}
            />
        </Form.Group>
    )
})

export default CustomCountrySelect