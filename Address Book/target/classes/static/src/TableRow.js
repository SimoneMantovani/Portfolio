

function TableRow(value) {
    return (<tr>
        <td>{value.id}</td>
        <td>{value.first_name}</td>
        <td>{value.last_name}</td>
        <td>{value.age}</td>
        <td>{value.email}</td>
        <td>{value.phone}</td>

    </tr>)
}

export default TableRow