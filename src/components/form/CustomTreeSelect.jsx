import React from 'react'
import { Form } from 'react-bootstrap'
import DropdownTreeSelect from 'react-dropdown-tree-select'
import 'react-dropdown-tree-select/dist/styles.css'

const CustomTreeSelect = ((props, ref) => {
    const { field, label, placeholder, required, data, onChange, disabled } = props

    return (
        <Form.Group className="custom-tree-select">
            <Form.Label>
                {label}
                <span className={`${required ? "d-inline-block text-pink" : "d-none"}`}>&nbsp;*</span>
            </Form.Label>
            <DropdownTreeSelect
                {...field}
                placeholder={placeholder}
                data={data}
                onChange={onChange}
                disabled={disabled}
            />
        </Form.Group>
    )
})

export default CustomTreeSelect