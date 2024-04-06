import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { format } from 'date-fns';

const EditEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState({
    name: '',
    position: '',
    salary: '',
    phone: '',
    nid: '',
    address: '',
    join_date: '',
    status: '',
  });

  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3000/auth/get_employee/${id}`)
      .then(result => {
        const employeeData = result.data.result[0];
        console.log(employeeData.status)
        setEmployee({
          ...employeeData,
          join_date: format(new Date(employeeData.join_date), 'yyyy-MM-dd') // Adjust join_date
        });
      })
      .catch(err => console.log(err));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(employee.status)
    axios.post(`http://localhost:3000/auth/edit_employee/${id}`, employee)
      .then(result => {
        if (result.data.Status) {
          navigate("/dashboard/employee");
        } else {
          setError(result.data.Error);
        }
      })
      .catch(err => console.log(err));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  return (
    <div className='d-flex justify-content-center align-items-center h-75 top-buffer'>
      <div className='rounded w-50 border m-2'>
        <h6><center>Update Employee Info</center></h6>
        <form onSubmit={handleSubmit}>
          <div className='p-3 d-flex justify-content-around'>
            <div className="mb-3">
              <label htmlFor="inputName" className="form-label">Name</label>
              <input
                type="text"
                readOnly
                className="form-control bg-dark-subtle"
                id="inputName"
                name="name"
                value={employee.name}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="inputPosition" className="form-label">Position</label>
              <input
                type="text"
                className="form-control"
                id="inputPosition"
                name="position"
                value={employee.position}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className='p-3 d-flex justify-content-around' >
            <div className="mb-3">
              <label htmlFor="inputSalary" className="form-label">Salary</label>
              <input
                type="number"
                className="form-control"
                id="inputSalary"
                name="salary"
                value={employee.salary}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="inputPhone" className="form-label">Phone</label>
              <input
                type="text"
                className="form-control"
                id="inputPhone"
                name="phone"
                value={employee.phone}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className='p-3 d-flex justify-content-around'>
            <div className="mb-3">
              <label htmlFor="inputNid" className="form-label">NID Number</label>
              <input
                type="text"
                readOnly
                minLength={10}
                maxLength={10}
                className="form-control bg-dark-subtle"
                id="inputNid"
                name="address"
                value={employee.nid}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="inputAddress" className="form-label">Address</label>
              <input
                type="text"
                className="form-control"
                id="inputAddress"
                name="address"
                value={employee.address}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className='p-3 d-flex justify-content-around'>
            <div className="mb-3">
              <label htmlFor="inputJoinDate" className="form-label">Joining Date</label>
              <input
                type="text"
                readOnly
                className="form-control bg-dark-subtle"
                id="inputJoinDate"
                name="join_date"
                value={employee.join_date}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className='form-label' >
                Current Employee Status : 
                <select name="status" value={employee.status} onChange={handleChange} className='form-control form-select mt-2'>
                  <option value="Active">Active</option>
                  <option value="Removed">Removed</option>
                </select>
              </label>
            </div>
          </div>
          <center><button type="submit" className="btn btn-primary w-50">Update</button></center>
          {error && <div className='text-danger mt-3'><center><strong>{error}</strong></center></div>}
        </form>
      </div>
    </div>
  );
};

export default EditEmployee;
