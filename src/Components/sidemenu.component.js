import React, { useState } from "react";
import {
    FaBars,
} from 'react-icons/fa';
import {
    BsFileEarmarkCheckFill,
    BsFillClipboard2MinusFill,
    BsFileEarmarkBarGraphFill,
} from 'react-icons/bs'
import {
    IoIosAlbums,
    IoIosFunnel,
    IoIosMailOpen,
    IoMdHelpCircle,
    IoMdSettings,
} from 'react-icons/io';

import {
    RiFileSearchFill,
    RiPieChartFill
} from 'react-icons/ri'
import { NavLink } from "react-router-dom";

const SideMenuBar = ({children}) => {
        const [isOpen, setIsOpen] = useState(true);
        const toggle = () => setIsOpen(!isOpen);


        const menuItems = [
            {
                endPoint: '/',
                desc: 'Dashboard',
                icon: <RiPieChartFill />
            },
            {
                endPoint: '/risk-register',
                desc: 'Risk Register',
                icon: <BsFileEarmarkBarGraphFill />
            },
            {
                endPoint: '/my-risks',
                desc: 'My Risk',
                icon: <BsFillClipboard2MinusFill />
            },
            {
                endPoint: '/controls',
                desc: 'Controls',
                icon: <IoIosFunnel />
            },
            {
                endPoint: '/assessments',
                desc: 'Assessments',
                icon: <BsFileEarmarkCheckFill />
            },
            {
                endPoint: '/report',
                desc: 'Report',
                icon: <IoIosAlbums />
            },
            {
                endPoint: '/messages',
                desc: 'Messages',
                icon: <IoIosMailOpen />,
                num: 1
            },
            {
                endPoint: '/audit-trail',
                desc: 'Audit Trail',
                icon: <RiFileSearchFill />
            },
            {
                endPoint: '/setting',
                desc: 'Settings',
                icon: <IoMdSettings />
            },
            {
                endPoint: '/info',
                desc: 'Help and Resources',
                icon: <IoMdHelpCircle />
            },
        ]
        return (

            <section className="main-container">
                <p className="intro">Risk Owner.</p>
                <div className="main-content">
                    <div className="sidebar">
                        <div className="top_section">
                            <h1 className="logo">Logo</h1>
                            <div className="bars">
                                <FaBars onClick={ toggle }/>
                            </div>
                        </div>
                        <div className="menu_items">
                            {
                                menuItems.map((el, i) => (
                                    <NavLink to={el.endPoint} key={i} className="link" activeClassName="active">
                                        <div className="icon">{el.icon}</div>
                                        <div className="link_text">{el.desc}</div>
                                        {el.num ? <p className="notify">{el.num}</p> : <p className="empty">{el.num}</p>}
                                    </NavLink>
                                ))
                            }
                        </div>
                    </div>
                    <main> {children}</main>
                </div>
            </section>
        )
}

export default SideMenuBar;