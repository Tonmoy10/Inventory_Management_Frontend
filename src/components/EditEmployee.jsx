import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const EditEmployee = () => {

    const {id} = useParams()


    const [employee, setEmployee] = useState({
        name: '',
        position: '',
        salary: '',
        phone: '',
        address: '',
        join_date: ''
    })

    const navigate = useNavigate()

    useEffect(() => {
        axios.get(`http://localhost:3000/auth/get_employee/${id}`)
          .then(result => {
            console.log(result.data.result[0])
            setEmployee({
                ...employee,
                name: result.data.result[0].name,
                position: result.data.result[0].position,
                salary: result.data.result[0].salary,
                phone: result.data.result[0].phone,
                address: result.data.result[0].address,
                join_date: result.data.result[0].join_date
            })
          })
          .catch(err => console.log(err))
      }, [])


    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post(`http://localhost:3000/auth/edit_employee/${id}`, employee)
        .then(result => {
            if (result.data.Status) {
                navigate("/dashboard/employee")
              } else {
                alert(Result.data.Error)
              }
        })
        .catch(err => console.log(err))
    }

    return (
        <div className='d-flex justify-content-center align-items-center h-75 top-buffer'>
            <div className='p-3 rounded w-25 border'>
                <h4><center>Update Employee Info</center></h4>
                <form className="row g-1" onSubmit={handleSubmit}>
                    <div className="col-12">
                        <label for="inputName" className="form-label">Name</label>
                        <input
                            type="text"
                            readOnly
                            className="form-control rounded-3"
                            id="inputName"
                            placeholder={employee.name}
                            style={{backgroundColor:'gainsboro'}}
                        />
                    </div>
                    <div className="col-12">
                        <label for="inputPosition" className="form-label">Designation</label>
                        <input
                            type="text"
                            className="form-control rounded-3"
                            id="inputPosition"
                            placeholder= {employee.position}
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
                            placeholder= {employee.salary}
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
                            placeholder= {employee.phone}
                            minLength={11}
                            maxLength={11}
                            autoComplete="off"
                            onChange={(e) =>
                                setEmployee({ ...employee, phone: e.target.value })
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
                            placeholder= {employee.address}
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
                            type="text"
                            readOnly
                            className="form-control rounded-3"
                            id="inputDuration"
                            placeholder={employee.join_date.split('T')[0]}
                            autoComplete="off"
                            style={{backgroundColor:'gainsboro'}}
                        />
                    </div>
                    <div className="col-12">
                        <button type="submit" className="btn btn-primary w-100 mt-2">
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditEmployee