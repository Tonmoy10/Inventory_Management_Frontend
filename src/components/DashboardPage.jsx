import React from "react";
import axios from "axios";
import { Link, Outlet, useNavigate } from 'react-router-dom'
import 'bootstrap-icons/font/bootstrap-icons.css'

const DashboardPage = () => {

    const navigate = useNavigate()

    const handleLogout = () => {
        axios.get('http://localhost:3000/auth/logout')
            .then(result => {
                if (result.data.Status) {
                    localStorage.removeItem("logged")
                    navigate("/login")
                } else {
                    alert(result.data.Error)
                }
            })
            .catch(err => console.log(err))
    }
    return (
        <div className="container-fluid">
            <div className="row flex-nowrap">
                <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
                    <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                        <Link to="/dashboard" className="d-flex align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto text-white text-decoration-none">
                            <span className="fs-4 fw-bolder d-none d-sm-inline text-xl-center">Welcome, Tapan</span>
                        </Link>
                        <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                            <li className='w-100'>
                                <Link to={"/dashboard"} data-bs-toggle="collapse" className="nav-link text-white px-0 align-middle">
                                    <i className="fs-4 bi-speedometer2"></i>
                                    <span className="ms-1 d-none d-sm-inline">Dashboard</span>
                                </Link>
                            </li>
                            <li className='w-100'>
                                <Link to={"/dashboard/employee"} className="nav-link px-0 align-middle text-white">
                                    <i className="fs-4 bi-people"></i>
                                    <span className="ms-1 d-none d-sm-inline">Manage Employees</span>
                                </Link>
                            </li>
                            <li className='w-100'>
                                <Link to={"/dashboard/inventory"} className="nav-link px-0 align-middle text-white">
                                    <i className="fs-4 bi-columns"></i>
                                    <span className="ms-2 d-none d-sm-inline">Manage Stock</span>
                                </Link>
                            </li>
                            <li className='w-100'>
                                <Link to={"/dashboard/add_sale"} className="nav-link px-0 align-middle text-white">
                                    <i className="fs-4 bi-currency-exchange"></i>
                                    <span className="ms-2 d-none d-sm-inline">Add Sales</span>
                                </Link>
                            </li>
                            <li className='w-100' onClick={handleLogout}>
                                <Link to={"/dashboard"} className="nav-link px-0 align-middle text-white">
                                    <i className="fs-4 bi-power"></i>
                                    <span className="ms-1 d-none d-sm-inline">Logout</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className='col p-0 m-0'>
                    <div className='p-2 d-flex justify-content-center shadow bg-dark-subtle'>
                        <div className='head'></div>
                    </div>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default DashboardPage