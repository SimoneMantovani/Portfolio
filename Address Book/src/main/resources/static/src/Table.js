import React, { useState, useEffect } from "react"
import TableRow from "./TableRow"
import TableTitle from "./TableTitle"
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from "reactstrap"



function Table() {
    const [users, setUsers] = useState([])
    const [result, setResult] = useState(false)
    const [singleUser, setSingleUser] = useState([])
    const [inputFirstName, setInputFirstName] = useState("")
    const [InputLastName, setInputLastName] = useState("")
    const [inputAge, setInputAge] = useState("")
    const [inputEmail, setInputEmail] = useState("")
    const [inputPhone, setInputPhone] = useState("")
    const [inputID, setInputID] = useState("")
    const [openModalSearch, setOpenModalSearch] = useState(false)
    const [openModalDelete, setOpenModalDelete] = useState(false)
    const [openModalUpdate, setOpenModalUpdate] = useState(false)
    const [openModalInsert, setOpenModalInsert] = useState(false)

    useEffect(() => {
        async function fetchAddressBook() {
            let call = await fetch("http://localhost:8080/allUsers")
            let tmp = await call.json()
            setUsers(tmp)
        }
        fetchAddressBook()
    }, [])

    function deleteUser() {
        fetch("http://localhost:8080/deletePersona?delete=" + inputID)
    }

    function click() {
        async function fetchUserSearch() {
            let call = await fetch("http://localhost:8080/findPersona?first_name=" + inputFirstName + "&last_name=" + InputLastName)
            let tmp = await call.json()
            setSingleUser(tmp)
            setResult(true)
        }
        fetchUserSearch()
    }

    function updateUser() {
        fetch("http://localhost:8080/updatePersona?id="+ inputID + "&first_name=" + inputFirstName + "&last_name=" + InputLastName + "&age=" + inputAge + "&email=" + inputEmail + "&phone=" + inputPhone)
    }

    function insertUser() {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        };
        fetch("http://localhost:8080/insertPersona?first_name=" + inputFirstName + "&last_name=" + InputLastName + "&age=" + inputAge + "&email=" + inputEmail + "&phone=" + inputPhone, requestOptions)
    }

    return (
        <>
            <h2>RUBRICA</h2>
            <div className="table-wrapper">
                <table className="fl-table">
                    <TableTitle />
                    <tbody>
                        {users.slice(0, 20).map(row => (
                            <TableRow
                                id={row.id}
                                first_name={row.first_name}
                                last_name={row.last_name}
                                age={row.age}
                                email={row.email}
                                phone={row.phone} />
                        ))}
                    </tbody>
                </table>
                <span className="button-justify">
                    <Button
                        color="danger"
                        onClick={function openSearch() { setOpenModalSearch(true) }}
                    >
                        Ricerca contatto
                    </Button>
                    <Button
                        color="danger"
                        onClick={function openDelete() { setOpenModalDelete(true) }}
                    >
                        Elimina contatto
                    </Button>
                    <Button
                        color="danger"
                        onClick={function openUpdate() { setOpenModalUpdate(true) }}
                    >
                        Aggiorna contatto
                    </Button>
                    <Button
                        color="danger"
                        onClick={function openInsert() { setOpenModalInsert(true) }}
                    >
                        Inserisci contatto
                    </Button>
                </span>
                <Modal isOpen={openModalSearch}
                    external={<button className="close" onClick={function noRefCheck() { }} style={{ position: 'absolute', right: '15px', top: '15px' }}>×</button>}
                    toggle={function noRefCheck() { }}
                >
                    <ModalHeader>
                        <h3 style={{ textAlign: "center" }}>Ricerca contatto</h3>
                    </ModalHeader>
                    <ModalBody>
                        <input type="text" placeholder="Nome" onChange={e => setInputFirstName(e.target.value)}></input>
                        <input type="text" placeholder="Cognome" onChange={e => setInputLastName(e.target.value)}></input>
                        <button onClick={click}>Cerca</button>
                        {(result) ? (
                            <div className="table-wrapper-modal">
                                <br></br>
                                <table className="fl-table">
                                    <TableTitle />
                                    <tbody>
                                        {singleUser.map(row => {
                                            return (
                                                <TableRow
                                                    id={row.id}
                                                    first_name={row.first_name}
                                                    last_name={row.last_name}
                                                    age={row.age}
                                                    email={row.email}
                                                    phone={row.phone} />
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>) : null}
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={function noRefCheck() { setOpenModalSearch(false) }}>
                            Chiudi
                        </Button>
                    </ModalFooter>
                </Modal>
                <Modal isOpen={openModalDelete}
                    external={<button className="close" onClick={function noRefCheck() { }} style={{ position: 'absolute', right: '15px', top: '15px' }}>×</button>}
                    toggle={function noRefCheck() { }}
                >
                    <ModalHeader>
                        <h3 style={{ textAlign: "center" }}>Elimina contatto</h3>
                    </ModalHeader>
                    <ModalBody>
                        <input type="text" placeholder="Nome" onChange={e => setInputFirstName(e.target.value)}></input>
                        <input type="text" placeholder="Cognome" onChange={e => setInputLastName(e.target.value)}></input>
                        <button onClick={click}>Cerca</button>
                        {(result) ? (
                            <div className="table-wrapper-modal">
                                <br></br>
                                <table className="fl-table">
                                    <TableTitle />
                                    <tbody>
                                        {singleUser.map(row => {
                                            return (
                                                <TableRow
                                                    id={row.id}
                                                    first_name={row.first_name}
                                                    last_name={row.last_name}
                                                    age={row.age}
                                                    email={row.email}
                                                    phone={row.phone} />
                                            )
                                        })}
                                    </tbody>
                                </table>
                                <hr></hr>
                                <input type="text" placeholder="Inserisci l'ID" onChange={e => setInputID(e.target.value)} />
                                <Button onClick={deleteUser()} >Elimina contatto</Button>

                            </div>) : null}
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={function noRefCheck() { setOpenModalDelete(false) }}>
                            Chiudi
                        </Button>
                    </ModalFooter>
                </Modal>
                <Modal isOpen={openModalUpdate}
                    external={<button className="close" style={{ position: 'absolute', right: '15px', top: '15px' }}></button>}
                >
                    <ModalHeader>
                        <h3>Ricerca l'utente da modificare</h3>
                    </ModalHeader>
                    <ModalBody><input type="text" placeholder="Nome" onChange={e => setInputFirstName(e.target.value)}></input>
                        <input type="text" placeholder="Cognome" onChange={e => setInputLastName(e.target.value)}></input>
                        <button onClick={click}>Cerca</button>
                        {(result) ? (
                            <div className="table-wrapper-modal">
                                <br></br>
                                <table className="fl-table" style={{ marginBottom: "10px" }}>
                                    <TableTitle />
                                    <tbody>
                                        {singleUser.map(row => {
                                            return (
                                                <TableRow
                                                    id={row.id}
                                                    first_name={row.first_name}
                                                    last_name={row.last_name}
                                                    age={row.age}
                                                    email={row.email}
                                                    phone={row.phone} />
                                            )
                                        })}
                                    </tbody>
                                </table>


                            </div>) : null}
                        <hr></hr>
                        <div style={{ textAlign: "center" }}>
                            <h3>Inserisci l'ID dell'utente da modificare e i nuovi dati</h3>
                            <input type="text" placeholder="ID" onChange={e => setInputID(e.target.value)} />
                            <input type="text" placeholder="Nome" onChange={e => setInputFirstName(e.target.value)} />
                            <input type="text" placeholder="Cognome" onChange={e => setInputLastName(e.target.value)} />
                            <input type="text" placeholder="Età" onChange={e => setInputAge(e.target.value)} />
                            <input type="text" placeholder="Email" onChange={e => setInputEmail(e.target.value)} />
                            <input type="text" placeholder="Telefono" onChange={e => setInputPhone(e.target.value)} />
                            <br></br>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={updateUser} style={{ marginTop: "7px" }}>Aggiorna utente</Button>
                        <Button onClick={function closeModal() { setOpenModalUpdate(false) }}>
                            Chiudi
                        </Button>
                    </ModalFooter>
                </Modal>
                <Modal isOpen={openModalInsert}
                    external={<button className="close" style={{ position: 'absolute', right: '15px', top: '15px' }}></button>}
                >
                    <ModalHeader>
                        <h3 style={{ textAlign: "center" }}>Inserisci un nuovo contatto</h3>
                    </ModalHeader>
                    <ModalBody>
                        <div style={{ textAlign: "center" }}>
                            <input type="text" placeholder="Nome" onChange={e => setInputFirstName(e.target.value)} />
                            <input type="text" placeholder="Cognome" onChange={e => setInputLastName(e.target.value)} />
                            <input type="text" placeholder="Età" onChange={e => setInputAge(e.target.value)} />
                            <input type="text" placeholder="Email" onChange={e => setInputEmail(e.target.value)} />
                            <input type="text" placeholder="Telefono" onChange={e => setInputPhone(e.target.value)} />
                            <br></br>
                        </div>
                    </ModalBody>
                    <ModalFooter>

                        <Button onClick={insertUser} style={{ marginTop: "7px" }}>Inserisci Utente</Button>
                        <Button onClick={function closeModal() { setOpenModalInsert(false) }}>
                            Chiudi
                        </Button>
                    </ModalFooter>
                </Modal>
            </div>
            <div>
            </div>
        </>
    )
}

export default Table