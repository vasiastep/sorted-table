import React, {useState} from 'react'

export const Search = props => {

    const [value, setValue] = useState('')

    const handleSubmit = e => {
        e.preventDefault()
        props.submitHandler(value)
        setValue('')
    }

    return (
        <form onSubmit={handleSubmit} className="input-group mb-3 mt-4">
            <input 
                type="text" 
                className="form-control" 
                onChange={e => setValue(e.target.value)}
                value={value}
            />
            <div className="input-group-append">
                <button className="btn btn-outline-secondary" type="submit" id="button-addon2">Button</button>
            </div>
        </form>
    )
}
