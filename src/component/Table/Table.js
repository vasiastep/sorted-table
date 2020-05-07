import React from 'react'

export const Table = props => {
    try {
        return (
            <div>
                <table className="table">
                    <thead className="thead-dark">
                        <tr>
                        <th scope="col" onClick={() => props.sortHandler('id')}>#</th>
                        <th scope="col" onClick={() => props.sortHandler('fname')}>Name</th>
                        <th scope="col" onClick={() => props.sortHandler('lname')}>Surname</th>
                        <th scope="col" onClick={() => props.sortHandler('address.city')}>City</th>
                        <th scope="col" onClick={() => props.sortHandler('tel')}>Phone</th>
                        </tr>
                    </thead>
                    <tbody>
                        { props.data.map(person => (
                            <tr 
                                key={person.id + person.tel}
                                onClick={() => props.showInfo(person)}>
                                <th scope="row">{person.id}</th>
                                <td>{person.fname}</td>
                                <td>{person.lname}</td>
                                <td>{person.address.city}</td>
                                <td>{person.tel}</td>
                            </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        )
    } catch (e) {
        return (
            <div className="no-matches">
                <p>No matches</p>
            </div>
        )
    }
    
}
