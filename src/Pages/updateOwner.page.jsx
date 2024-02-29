import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom'
import swal from 'sweetalert2';
import axios from 'axios';

export const UpdateOwnerInfo = () => {

        const [fullName, setFullName] = useState();
        const [title, setTitle] = useState();
        const [email, setEmail] = useState();
        const role = "Owner";
        const { id = 1 } = useParams()

        useEffect(() => {
            if (id) {
                fetchOwnerInfo();
                displayOwnerInfo();
            }

        }, [id]); 

        const fetchOwnerInfo = async () => {
            try {
                const info = await axios.get(`http://127.0.0.1:4500/api/v1/owner/${id}`);
                if (!info || info.data.status !== 'success') {
                    swal.fire(info.data.status, 'Something went wrong.', info.data.status);
                    return;
                }
        
                const { fullname, title, email } = info.data.data;
                
                setFullName(fullname);
                setTitle(title);
                setEmail(email);

            } catch (error) {
                swal.fire('Error', error.message, 'error');
                console.log(error);
            }
        };

        const displayOwnerInfo = () => {

            document.getElementById('name').value = fullName;
            document.getElementById('title').value = title;
            document.getElementById('email').value = email;
        
        }

        const submitUpdatedChanges = async () => {
            if(!fullName || !title || !email || !role) {
                swal.fire('Error', 'Please profile all inputs.', 'error');
                return;
            }

            const objData = {
                name: fullName,
                title,
                email,
                role
            }
            document.querySelector('.btn-lg').textContent = 'Processing...';
            
            try {
                const res = await axios({
                    method: 'patch',
                    url: `http://127.0.0.1:4500/api/v1/owner/${id}`,
                    data: objData
                })

                if(!res || res.data.status !== 'success') {
                    swal.fire('Fail', 'something went wrong, Try again later.', 'fail');
                    setTimeout(() => {
                        window.location.replace('/')
                    }, 5000);

                    return;
                }
    
                setTimeout(() => {
                    swal.fire('Success', 'Successfully updated risk owner information.', 'success');
                    window.location.replace('/')
                }, 5000);

            } catch (err) {
                swal.fire('Error', err.message, 'error');
            }

        }

        return (
            <section className="container">
                <div className="row">
                    <div className="col-lg-6 mx-auto mt-4">
                        <div className="card shadow">
                            <div className="card-header bg-primary">
                                <h3 className="text-light">Add New <span>Risk Owner</span></h3>
                            </div>
                            <div className="card-body p-4">
                                <div className="add-new" id="add-form">
                                    <div className="mb-3">
                                        <label htmlFor="name">Full Name:</label>
                                        <input className="form-control form-control-lg" id="name" placeholder="Enter Full Name..." onChange={(e) => setFullName(e.target.value)} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="title">Title:</label>
                                        <input className="form-control form-control-lg" id="title" placeholder="Enter title..." onChange={(e) => setTitle(e.target.value)} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="email">Email:</label>
                                        <input className="form-control form-control-lg" id="email" placeholder="Enter email..." onChange={(e) => setEmail(e.target.value)} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="fullName">Role:</label>
                                        <input className="form-control form-control-lg" value="OWNER" disabled />
                                    </div>
                                    <div className="mb-3" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <button className="btn btn-primary btn-lg" onClick={() => submitUpdatedChanges()}>Save Changes</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    
}