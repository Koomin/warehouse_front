import React from "react";

import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import './Navbar.css';
import { IconContext } from 'react-icons';

const Navbar = (props) => {
    return (
        <>
        <IconContext.Provider value={{color: 'black'}}>
            < div className="navbar">
                
            </div>
            <nav className='nav-menu'>
                <ul className='nav-menu-items'>
                <li className='navbar-toggle'>
                    <Link to="/" className='menu-bars'>
                        <img className='logo' src={require ('./logo2016.png')} alt='scigala logo'></img>
                    </Link>
                </li>
                {SidebarData.map((item, index) => {
                    return (
                        <li key={index} className={item.cName}>
                            <Link to={item.path}>
                                {item.icon}
                                <span>{item.title}</span>
                            </Link>
                        </li>
                    )
                })}
                </ul>
                
            </nav>
            <div className="body-content">
                {props.children}
            </div>
        </IconContext.Provider>
        
        </>
    )
}

export default Navbar