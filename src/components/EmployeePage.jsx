import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

const EmployeePage = () => {
  const [employee, setEmployee] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3000/auth/employee')
      .then(result => {
        if (result.data.Status) {
          setEmployee(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      }).catch(err => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3000/auth/delete_employee/${id}`)
      .then(result => {
        if (result.data.Status) {
          window.location.reload();
        } else {
          alert(result.data.Error);
        }
      }).catch(err => console.log(err));
  };

  return (
    <div className="px-5 mt-3">
      <div className="d-flex justify-content-center">
        <h3>Employee List</h3>
      </div>
      <Link to="/dashboard/add_employee" className="btn btn-success">
        Add Employee
      </Link>
      <div className='mt-3'>
        <table className='table table-striped'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Position</th>
              <th>Salary</th>
              <th>Phone</th>
              <th>NID Number</th>
              <th>Address</th>
              <th>Joining Date</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
              employee.map(e => (
                <tr key={e.id}>
                  <td>{e.name}</td>
                  <td>{e.position}</td>
                  <td>{e.salary}</td>
                  <td>{e.phone}</td>
                  <td>{e.nid}</td>
                  <td>{e.address}</td>
                  <td>{format(new Date(e.join_date), 'yyyy-MM-dd')}</td>
                  <td>{e.status}</td>
                  <td>
                    <Link to={`/dashboard/edit_employee/${e.id}`} className='btn btn-outline-info m-1 btn-sm'>Edit</Link >
                    <button className='btn btn-outline-danger btn-sm' onClick={() => { handleDelete(e.id) }}>Delete</button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default EmployeePage;
