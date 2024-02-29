import React from "react";
import { IoSearchSharp  } from 'react-icons/io5'
import { FaBell } from 'react-icons/fa'

export const NavbarSection = () => {
    return (
        <div className="navbar-section">
            <div className="nav-content">
                <div className="searching">
                    <span><IoSearchSharp /></span>
                    <input className="search" type="search" placeholder="Search..." />
                </div>
                <div className="profile">
                    <a href="#" className="logout">Logout</a>
                    <a href="#" className="logout"><i><FaBell /></i></a>
        
                    <img src="/img/Thabang Mabena.jpg"/>
                </div>
            </div>
        </div>
    )
}