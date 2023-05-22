import React, {useState} from 'react';
//import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Routes, Route, Outlet, Link} from "react-router-dom";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem
} from 'reactstrap';

const About = React.lazy(() => import("./Pages/About"));
const Carreras = React.lazy(() => import("./Pages/Carreras"));
const Subjects = React.lazy(() => import("./Pages/Subjects"));
export default function App() {
    return (
        <div>
            <Router>
                <Routes>
                    <Route path="/" element={<Layout/>}>
                        <Route index element={<Home/>}/>
                        <Route
                            path="carreras"
                            element={
                                <React.Suspense fallback={<>...</>}>
                                    <Carreras/>
                                </React.Suspense>
                            }
                        />
                        <Route
                            path="materias"
                            element={
                                <React.Suspense fallback={<>...</>}>
                                    <Subjects/>
                                </React.Suspense>
                            }
                        />
                        <Route
                            path="about"
                            element={
                                <React.Suspense fallback={<>...</>}>
                                    <About/>
                                </React.Suspense>
                            }
                        />
                        <Route path="*" element={<NoMatch/>}/>
                    </Route>
                </Routes>
            </Router>
        </div>
    );
}

function Layout() {
    const [collapsed, setCollapsed] = useState(true);
    const toggleNavbar = () => setCollapsed(!collapsed);
    return (
        <>
            <div className={"container"}>
                <Navbar color="success" light className={"mx-3"}>
                    <NavbarBrand href="#" className="me-auto text-success fw-bold">
                        Menu
                    </NavbarBrand>
                    <NavbarToggler onClick={toggleNavbar} className="me-2 bg-danger"/>
                    <Collapse isOpen={!collapsed} navbar>
                        <Nav navbar>
                            <NavItem>
                                <Link to="/" className={"text-decoration-none text-dark"}>INICIO</Link>
                            </NavItem>
                            <NavItem>
                                <Link to="/carreras" className={"text-decoration-none text-dark"}>CARRERAS</Link>
                            </NavItem>
                            <NavItem>
                                <Link to="/materias" className={"text-decoration-none text-dark"}>MATERIAS</Link>
                            </NavItem>
                            <NavItem>
                                <Link to="/about" className={"text-decoration-none text-dark"}>ACERCA DE...</Link>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
            <hr className={"text-light"}/>
            <Outlet/>
        </>
    );
}

function Home() {
    return (
        <>
            <div className={"container"}>
                <h1 className={"text-center mt-5 text-success fw-bold text-decoration-underline"}>TESJI</h1>
                <div className={"mx-5 mt-4"}>
                    <p className={"mx-5 text-dark"}>Ser la Institución de Educación Superior Tecnológica líder en la región norte del Estado de México, con reconocimiento en la generación de Talento Humano, competente en la solución de problemas y satisfacción de necesidades del sector laboral</p>
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
                                 src="https://tesji.edomex.gob.mx/sites/tesji.edomex.gob.mx/files/images/Acerca%20del%20TESJI/Antecedentes/Antecedentes.png"
                                 alt="..."/>
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carousel-controls"
                            data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carousel-controls"
                            data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
        </>
    );
}

function NoMatch() {
    return (
        <>
            <div className={"d-flex align-items-center flex-column nomatch pt-5 mt-5"}>
                <h2 className={"pt-5"}>NOTHING TO SE HERE!</h2>
                <p className={"mt-3"}>
                    <Link to="/">Go to the home page</Link>
                </p>
            </div>
        </>
    );
}