import React, {useState} from "react";
import {Link, Outlet, Route, Routes} from "react-router-dom";
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, Table} from 'reactstrap';
import './style.css'

export default function Users() {
    return (
        <Routes>
            <Route path="/" element={<UsersLayout/>}>
                <Route index element={<UsersAlumns/>}/>
                <Route path="teachers" element={<UsersTeachers/>}/>
            </Route>
        </Routes>
    );
}

function UsersLayout() {
    return (
        <>
            <div className={"d-flex justify-content-around"}>
                <Link to="/users"><Button color={"success"} outline>ALUMNOS</Button></Link>
                <Link to="/users/teachers"><Button color={"success"} outline>MAESTROS</Button></Link>
            </div>
            <Outlet/>
        </>
    );
}

function UsersAlumns() {
    const [id, setId] = useState('')
    const [name, setName] = useState('')
    const [career, setCareer] = useState('ISIC')
    const [imageUrl, setImageUrl] = useState('')

    const handleIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setId(event.target.value)
    }
    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value)
    }
    const handleCareerChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setCareer(event.target.value)
    }
    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        const reader = new FileReader()
        reader.addEventListener('load', () => {
            setImageUrl(reader.result as string)
        })
        if (file) {
            reader.readAsDataURL(file)
        }
    }

    const alumnos: Array<{ id: string, name: string, career: string, image: string }> = []
    const [alumn, setAlumn] = useState(alumnos)
    const [showModal, setShowModal] = useState(false)
    const handleShowModal = () => {
        setShowModal(true)
    }
    const handleCloseModal = () => {
        setShowModal(false)
        setButtonSubmitText('AGREGAR')
        setNull()
    }
    const [edit, setEdit] = useState(false)
    const [buttonSubmitText, setButtonSubmitText] = useState('AGREGAR')
    const [indexToEdit, setIndexToEdit] = useState(0)
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (imageUrl === '') {
            alert('Select an Image')
        } else {
            if (edit === false) {
                setAlumn([...alumn, {id: id, name: name, career: career, image: imageUrl}])
            } else {
                alumn[indexToEdit] = {...alumn[indexToEdit], id: id, name: name, career: career, image: imageUrl}
                setAlumn(alumn)
                setButtonSubmitText('AGREGAR')
                setEdit(false)
            }
            setShowModal(false)
            setNull()
        }
    }

    const deleteElement = (id: string) => {
        setAlumn(alumn.filter(obj => obj.id !== id))
    }
    const editElement = (index: number) => {
        setId(alumn[index].id)
        setName(alumn[index].name)
        setCareer(alumn[index].career)
        setImageUrl(alumn[index].image)
        setEdit(true)
        setButtonSubmitText('EDITAR')
        setIndexToEdit(index)
        handleShowModal()
    }
    const setNull = () => {
        setId('')
        setName('')
        setCareer('ISIC')
        setImageUrl('')
    }
    return (
        <>
            <div className={"container"}>
                <h2 className={"text-center mt-5 text-primary fw-bold text-decoration-underline"}>ALUMNOS</h2>
                <div className={"fondo"}>
                    <div className={"text-center py-4"}>
                        <Button color={"info"} outline onClick={() => handleShowModal()}>AGREGAR</Button>
                    </div>
                    <div>
                        {showModal &&
                            <Modal isOpen={showModal} toggle={() => handleShowModal()}>
                                <form onSubmit={handleSubmit}>
                                    <ModalHeader style={{backgroundColor: "#347094"}}>ALUMNO</ModalHeader>
                                    <ModalBody style={{backgroundColor: "#4e86a9"}}>
                                        <label>
                                            NUMERO DE CONTROL:<input className={"ms-3"} type={"number"} value={id}
                                                      onChange={handleIdChange} required/>
                                        </label>
                                        <br/><br/>
                                        <label>
                                            NOMBRE:<input className={"ms-3"} type={"text"} value={name}
                                                        onChange={handleNameChange} required/>
                                        </label>
                                        <br/><br/>
                                        <label>
                                            CARRERA:
                                            <select className={"ms-3"} value={career} onChange={handleCareerChange}>
                                                <option value={"ISIC"}>ISIC</option>
                                                <option value={"Quimica"}>Quimica</option>
                                                <option value={"TICs"}>TICs</option>
                                                <option value={"Civil"}>Civil</option>
                                                <option value={"Industrial"}>Industrial</option>
                                                <option value={"Administracion"}>Administracion</option>
                                                <option value={"Mecatronica"}>Mecatronica</option>
                                                <option value={"Logistica"}>Logistica</option>
                                            </select>
                                        </label>
                                        <br/><br/>
                                        <input type={"file"} accept={"image/*"} onChange={handleImageUpload}/>
                                    </ModalBody>
                                    <ModalFooter style={{backgroundColor: "#347094"}}>
                                        <Button color={"success"} type={"submit"}>{buttonSubmitText}</Button>
                                        <Button color={"danger"} onClick={() => handleCloseModal()}>CANCELAR</Button>
                                    </ModalFooter>
                                </form>
                            </Modal>
                        }
                    </div>
                    <div className={"mx-5 fondo-tabla border border-5 border-secondary rounded-5"}>
                        <Table className={"text-center table table-striped"}>
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>NUMERO DE CONTROL</th>
                                <th>NOMBRE</th>
                                <th>CARRERA</th>
                                <th>IMAGEN</th>
                                <th></th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                alumn.map((item, index: number) => (
                                    <tr className={"align-middle"}>
                                        <td>{index}</td>
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                        <td>{item.career}</td>
                                        <td><img src={item.image} width={"200px"} height={"100px"}
                                                 className={"border border-4 border-secondary rounded-pill"}
                                                 alt={"uploaded"}/></td>
                                        <td><Button color={"success"}
                                                    onClick={() => editElement(index)}>EDITAR</Button></td>
                                        <td><Button color={"danger"}
                                                    onClick={() => deleteElement(item.id)}>ELIMINAR</Button></td>
                                    </tr>
                                ))
                            }
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>

            <div id="carousel-controls" className="carousel slide mt-4" data-bs-ride="carousel">
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img height={"350px"} className="d-block w-100 border border-4 border-secondary rounded-5"
                                 src="https://cdn.discordapp.com/attachments/831740786638192653/1109180157513715772/t1.png"
                                 alt="..."/>
                        </div>
                        <div className="carousel-item">
                            <img height={"350px"} className="d-block w-100 border border-4 border-secondary rounded-5"
                                 src="data:image/jpeg;base64,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"
                                 alt="..."/>
                        </div>
                        <div className="carousel-item">
                            <img height={"350px"} className="d-block w-100 border border-4 border-secondary rounded-5"
                                 src="data:image/jpeg;base64,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"
                                 alt="..."/>
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carousel-controls"
                            data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">ANTERIOR</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carousel-controls"
                            data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">SIGUIENTE</span>
                    </button>
                </div>
                    
            

        </>
    );
}

function UsersTeachers() {
    const [name, setName] = useState('')
    const [career, setCareer] = useState('ISIC')
    const [imageUrl, setImageUrl] = useState('')

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value)
    }
    const handleCareerChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setCareer(event.target.value)
    }
    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        const reader = new FileReader()
        reader.addEventListener('load', () => {
            setImageUrl(reader.result as string)
        })
        if (file) {
            reader.readAsDataURL(file)
        }
    }
    const teachers: Array<{ name: string, career: string, image: string }> = []
    const [teacher, setTeacher] = useState(teachers)
    const [showModal, setShowModal] = useState(false)
    const handleShowModal = () => {
        setShowModal(true)
    }
    const handleCloseModal = () => {
        setShowModal(false)
        setButtonSubmitText('Add')
        setNull()
    }
    const [edit, setEdit] = useState(false)
    const [buttonSubmitText, setButtonSubmitText] = useState('AGREGAR')
    const [indexToEdit, setIndexToEdit] = useState(0)

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (imageUrl === '') {
            alert('Select an Image')
        } else {
            if (edit === false) {
                setTeacher([...teacher, {name: name, career: career, image: imageUrl}])
            } else {
                teacher[indexToEdit] = {...teacher[indexToEdit], name: name, career: career, image: imageUrl}
                setTeacher(teacher)
                setButtonSubmitText('AGREGAR')
                setEdit(false)
            }
            setShowModal(false)
            setNull()
        }
    }

    const deleteElement = (name: string) => {
        setTeacher(teacher.filter(obj => obj.name !== name))
    }
    const editElement = (index: number) => {
        setName(teacher[index].name)
        setCareer(teacher[index].career)
        setImageUrl(teacher[index].image)
        setEdit(true)
        setButtonSubmitText('Edit')
        setIndexToEdit(index)
        handleShowModal()
    }
    const setNull = () => {
        setName('')
        setCareer('ISIC')
        setImageUrl('')
    }
    return (
        <>
            <div className={"container"}>
                <h2 className={"text-center mt-5 text-primary fw-bold text-decoration-underline"}>MAESTROS</h2>
                <div className={"fondo"}>
                    <div className={"text-center py-4"}>
                        <Button color={"info"} outline onClick={() => handleShowModal()}>AGREGAR</Button>
                    </div>
                    <div>
                        {showModal &&
                            <Modal isOpen={showModal} toggle={() => handleShowModal()}>
                                <form onSubmit={handleSubmit}>
                                    <ModalHeader style={{backgroundColor: "#347094"}}>MAESTROS</ModalHeader>
                                    <ModalBody style={{backgroundColor: "#4e86a9"}}>
                                        <label>
                                            NOMBRE:<input className={"ms-3"} type={"text"} value={name}
                                                        onChange={handleNameChange} required/>
                                        </label>
                                        <br/><br/>
                                        <label>
                                            CARRERA:
                                            <select className={"ms-3"} value={career} onChange={handleCareerChange}>
                                                <option value={"ISIC"}>ISIC</option>
                                                <option value={"Quimica"}>Quimica</option>
                                                <option value={"TICs"}>TICs</option>
                                                <option value={"Civil"}>Civil</option>
                                                <option value={"Industrial"}>Industrial</option>
                                                <option value={"Administracion"}>Administracion</option>
                                                <option value={"Mecatronica"}>Mecatronica</option>
                                                <option value={"Logistica"}>Logistica</option>
                                            </select>
                                        </label>
                                        <br/><br/>
                                        <input type={"file"} accept={"image/*"} onChange={handleImageUpload}/>
                                    </ModalBody>
                                    <ModalFooter style={{backgroundColor: "#347094"}}>
                                        <Button color={"success"} type={"submit"}>{buttonSubmitText}</Button>
                                        <Button color={"danger"} onClick={() => handleCloseModal()}>CANCELAR</Button>
                                    </ModalFooter>
                                </form>
                            </Modal>
                        }
                    </div>
                    <div className={"mx-5 fondo-tabla border border-5 border-secondary rounded-5"}>
                        <Table className={"text-center table table-striped"}>
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>NOMBRE</th>
                                <th>CARRERA</th>
                                <th>FOTOGRAFIA</th>
                                <th></th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                teacher.map((item, index: number) => (
                                    <tr className={"align-middle"}>
                                        <td>{index}</td>
                                        <td>{item.name}</td>
                                        <td>{item.career}</td>
                                        <td><img src={item.image} width={"200px"} height={"100px"}
                                                 className={"border border-4 border-secondary rounded-pill"}
                                                 alt={"uploaded"}/></td>
                                        <td><Button color={"success"}
                                                    onClick={() => editElement(index)}>Edit</Button></td>
                                        <td><Button color={"danger"}
                                                    onClick={() => deleteElement(item.name)}>Delete</Button></td>
                                    </tr>
                                ))
                            }
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
            
            <div id="carousel-controls" className="carousel slide mt-4" data-bs-ride="carousel">
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img height={"350px"} className="d-block w-100 border border-4 border-secondary rounded-5"
                                 src="https://cdn.discordapp.com/attachments/831740786638192653/1109180157513715772/t1.png"
                                 alt="..."/>
                        </div>
                        <div className="carousel-item">
                            <img height={"350px"} className="d-block w-100 border border-4 border-secondary rounded-5"
                                 src="data:image/jpeg;base64,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"
                                 alt="..."/>
                        </div>
                        <div className="carousel-item">
                            <img height={"350px"} className="d-block w-100 border border-4 border-secondary rounded-5"
                                 src="data:image/jpeg;base64,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"
                                 alt="..."/>
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carousel-controls"
                            data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">ANTERIOR</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carousel-controls"
                            data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">SIGUIENTE</span>
                    </button>
                </div>
        </>
    );
}