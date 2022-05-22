import React, { useContext, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import navbarContext from '../context/navbar/navbarContext'

const Navbar = () => {
    let nbContext = useContext(navbarContext)

    let location = useLocation();
    useEffect(() => {
       // console.log(location);
       // eslint-disable-next-line
    }, [location]);

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
                    <form className="d-flex" role="search">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success" type="submit">Search</button>
                    </form>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
