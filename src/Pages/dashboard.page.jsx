import React, { useState, useEffect } from "react";
import axios from 'axios';
import swal from 'sweetalert2';
import './../App.css';
import { NavbarSection } from "../Components/Navbar.component";
import { IoIosEye, IoIosTrash, IoMdCreate } from 'react-icons/io';

export const Dashboard = () => {
        const [riskOwner, setRiskOwner] = useState([]);
          
        useEffect(() => {
          fetchOwnerData();
        }, []);
        
        const fetchOwnerData = async () => {
            try {
                const docs = await axios.get('http://127.0.01:4500/api/v1/owner');
                setRiskOwner(docs.data.data);
            } catch (error) {
                swal.fire('Error', error.message, 'error');
            }
        };

        const UpdateRiskOwner = async (id) => {
            window.location.replace(`/update/${id}`);
        }
        const DeleteRiskOwner = async (id) => {
            if(!id) {
                swal.fire('Fail', 'Failed deleting risk owner.', 'fail');
                return;
            }

            try {
                const del = await axios.delete(`http://127.0.0.1:4500/api/v1/owner/${id}`);
                if(del.data.status === 'success') {
                    swal.fire('Success', 'Owner deleted successfully', 'success');
                    setTimeout(() => {
                        window.location.reload();
                    }, 5000)
                }else swal.fire('Fail', 'Failed deleting risk owner.', 'fail');
                
            } catch (err) {
                swal.fire('Error', err.message, 'error');
            }
        }

        return (
            <section className="tbl-section">
                <NavbarSection />
                <div className="right-section-content">
                    <div className="risk-owner-welcome">
                        <h1>Risk Owner</h1>
                        <a href="/add" className="add-risk-owner">Add Risk Owner</a>
                    </div>
                    <div className="table-section">
                        {riskOwner.length === 0 ? (
                            <p style={{ textAlign: 'center', fontSize: '20px', fontWeight: '600' }}>No Risk Owner available.</p>
                        ) : (
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Title</th>
                                        <th>Email</th>
                                        <th>Role</th>
                                        <th>Options</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {riskOwner.map(el => (
                                        <tr key={el._id}>
                                            <th>{el.fullname}</th>
                                            <td>{el.title}</td>
                                            <td>{el.email}</td>
                                            <td>{el.role}</td>
                                            <td>
                                                <button className="delete" onClick={() => DeleteRiskOwner(`${el._id}`)}><i><IoIosTrash /></i></button>
                                                <button className="edit" onClick={() => UpdateRiskOwner(`${el._id}`)}><i><IoMdCreate /></i></button>
                                                <button className="check"><i><IoIosEye /></i></button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </section>
        );
        
}