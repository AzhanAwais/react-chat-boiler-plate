import React from 'react'

const Loader = ({ style }) => {
    return (
        <div className={`loader ${style ? style : "white"}`}></div>
    )
}

export default Loader