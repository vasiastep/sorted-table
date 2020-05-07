import React from 'react'

export const ChooseCount = props => {
    return (
        <div className="choose-number">
            <button onClick={() => props.modeHandler(30)} type="button" className="btn btn-success">30 people</button>
            <button onClick={() => props.modeHandler(1000)} type="button" className="btn btn-danger">1000 people</button>
        </div>
    )
}
