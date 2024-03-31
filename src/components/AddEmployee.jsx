import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'


const AddEmployee = () => {

    const [employee, setEmployee] = useState({
        name: '',
        position: '',
        salary: '',
        phone: '',
        nid: '',
        address: '',
        join_date: ''
    })

    const [error, setError] = useState(null)


    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:3000/auth/add_employee', employee)
            .then(result => {
                if (result.data.Status) {
                    navigate("/dashboard/employee")
                } else {
                    setError(result.data.Error)
                  }
            })
            .catch(err => console.log(err))
    }


    return (
        <div className='d-flex justify-content-center align-items-center h-75 top-buffer'>
            <div className='p-3 rounded w-25 border'>
                <h2><center>Add Employee</center></h2>
                <form className="row g-1" onSubmit={handleSubmit}>
                    <div className="col-12">
                        <label for="inputName" className="form-label">Name</label>
                        <input
                            type="text"
                            className="form-control rounded-3"
                            id="inputName"
                            placeholder="Enter Name"
                            onChange={(e) =>
                                setEmployee({ ...employee, name: e.target.value })
                            }
                        />
                    </div>
                    <div className="col-12">
                        <label for="inputPosition" className="form-label">Designation</label>
                        <input
                            type="text"
                            className="form-control rounded-3"
                            id="inputPosition"
                            placeholder="Enter Designation"
                            autoComplete="off"
                            onChange={(e) =>
                                setEmployee({ ...employee, position: e.target.value })
                            }
                        />
                    </div>
                    <div className="col-12">
                        <label for="inputSalary" className="form-label">
                            Salary
                        </label>
                        <input
                            type="int"
                            className="form-control rounded-3"
                            id="inputSalary"
                            placeholder="Enter Salary"
                            autoComplete="off"
                            onChange={(e) =>
                                setEmployee({ ...employee, salary: e.target.value })
                            }
                        />
                    </div>
                    <div className="col-12">
                        <label for="inputPhone" className="form-label">
                            Phone
                        </label>
                        <input
                            type="text"
                            className="form-control rounded-3"
                            id="inputPhone"
                            placeholder="01XXXXXXXXX"
                            minLength={11}
                            maxLength={11}
                            autoComplete="off"
                            onChange={(e) =>
                                setEmployee({ ...employee, phone: e.target.value })
                            }
                        />
                    </div>
                    <div className="col-12">
                        <label for="inputNid" className="form-label">
                            NID Number
                        </label>
                        <input
                            type="text"
                            className="form-control rounded-3"
                            id="inputNid"
                            placeholder="XXXXXXXXXX"
                            minLength={10}
                            maxLength={10}
                            autoComplete="off"
                            onChange={(e) =>
                                setEmployee({ ...employee, nid: e.target.value })
                            }
                        />
                    </div>
                    <div className="col-12">
                        <label for="inputAddress" className="form-label">
                            Address
                        </label>
                        <input
                            type="text"
                            className="form-control rounded-3"
                            id="inputAddress"
                            placeholder="Uttara, Dhaka."
                            autoComplete="off"
                            onChange={(e) =>
                                setEmployee({ ...employee, address: e.target.value })
                            }
                        />
                    </div>
                    <div className="col-12">
                        <label for="inputDate" className="form-label">
                            Joining Date
                        </label>
                        <input
                            type="date"
                            className="form-control rounded-3"
                            id="inputDate"
                            autoComplete="off"
                            onChange={(e) =>
                                setEmployee({ ...employee, join_date: e.target.value })
                            }
                        />
                    </div>
                    <div className="col-12">
                        <button type="submit" className="btn btn-primary w-100 mt-2">
                            Add Employee
                        </button>
                    </div>
                    <div className='text-danger mt-3'>
                        <center><strong>{error && error}</strong></center>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddEmployee