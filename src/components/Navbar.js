import React, { useContext, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import navbarContext from '../context/navbar/navbarContext'

const Navbar = () => {
    const navigator= useNavigate();

    let nbContext = useContext(navbarContext)

    let location = useLocation();
    const handleLogout =()=>{
        localStorage.removeItem('token');
        navigator('/login')
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">{nbContext.appName}</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {
                            nbContext.menuItem.map(k =>
                                <li key={k.name} className="nav-item">
                                    <Link className={`nav-link ${location.pathname === k.link ? "active" : ""}`} aria-current="page" to={k.link}>{k.name}</Link>
                                </li>

                            )
                        }


                    </ul>
                    {!localStorage.getItem('token') ? <form className="d-flex" role="search">                        
                        <Link className="btn btn-primary mx-1" to="/login" role="button">Login</Link>
                        <Link className="btn btn-primary mx-1" to="/signup" role="button">Signup</Link>
                    </form> : <button className="btn btn-primary mx-1" onClick={handleLogout}>Logout</button>}
                </div>
            </div>
        </nav>
    )
}

export default Navbar
