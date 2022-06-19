import React from 'react'

const Table = ({ data, index }) => {
    return (
        <>
            <tr key={index}>
                <td>{index + 1}</td>
                <td>{data.name}</td>
                <td>{data.email}</td>
                <td>{data.phone}</td>
                <td>{data.address}</td>
                <td className={data.status === "active" ? "is-active" : "is-inactive"}><p>{data.status}</p></td>
            </tr>
        </>
    )
}

export default Table