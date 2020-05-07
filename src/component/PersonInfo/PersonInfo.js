import React from 'react'

export const PersonInfo = ({person}) => {
    console.log(person);
    
    return (
        <div className="detaied-person-wrap">
            <div>
                <p>Name: <b>{person.fname}</b></p>
                <p>Surname: <b>{person.lname}</b></p>
                <p>State: <b>{person.address.state}</b></p>
                <p>City: <b>{person.address.city}</b></p>
                <p>Address: <b>{person.address.streetAdress}</b></p>
                <p>Phone: <b>{person.tel}</b></p>
                <p>Post: <b>{person.address.zip}</b></p>
            </div>
        </div>
    )
}
