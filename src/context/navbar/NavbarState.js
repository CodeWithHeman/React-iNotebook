import React, { useState } from 'react'
import navbarContext from './navbarContext';

//Arrow Funtions
const NavbarState = (props) => {   
    const [appName] = useState("iNotebook");     
    const mItem = [
        { "name": "Home", "link": "/" },
        { "name": "About", "link": "/about" }        
    ];
    const [menuItem] = useState(mItem);   
    return (
        <navbarContext.Provider value={{ appName, menuItem }}>
            {props.children}
        </navbarContext.Provider>
    )
}

export default NavbarState;


