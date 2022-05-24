import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import alertContext from '../context/alerts/alertContext';

export default function Signup() {
    
    //Used Context
    let aContext = useContext(alertContext);
    const { showAlert } = aContext;
    
    const host = "http://localhost:5000";
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", confirmpassword: "" });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password } = credentials;
        const response = await fetch(`${host}/api/auth/createuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name:credentials.name, email: credentials.email, password: credentials.password })
        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
            //Saving token into local storage
            localStorage.setItem('token', json.authtoken);
            navigate("/");
        }
        else {
            showAlert("danger","Invalid Credentials");
        }
    }

    const onChange = (e) => {
        //[e.target.name]:e.target.value means to say get the value from name attribute like name="description" | name="title"
        //Spread syntax (...) allows an iterable such as an array expression or string to be expanded in places where zero or more arguments (for function calls) or elements (for array literals) are expected, or an object expression to be expanded in places where zero or more key-value pairs (for object literals) are expected.
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <div className='container mt-2'>
            <h2>Signup to use iNotebook</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" name="name" className="form-control" id="name" aria-describedby="emailHelp" value={credentials.name} onChange={onChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" name="email" className="form-control" id="email" aria-describedby="emailHelp" value={credentials.email} onChange={onChange} required />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" name="password" className="form-control" id="password" value={credentials.password} onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="confirmpassword" className="form-label">Confirm Password</label>
                    <input type="password" name="confirmpassword" className="form-control" id="confirmpassword" value={credentials.confirmpassword} onChange={onChange} required />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}
