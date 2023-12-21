import React from 'react'
import { Form } from 'react-bootstrap'

const Search = ({searchText , setSearchText}) => {
    return (
        <div className="chat-search">
            <Form.Control
                type="text"
                placeholder="Search..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
            />
        </div>
    )
}

export default Search