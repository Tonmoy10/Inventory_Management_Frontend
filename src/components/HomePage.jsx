import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Chart from 'chart.js/auto';
import SalesChart from './SalesChart';


const HomePage = () => {

  const [employeeTotal, setemployeeTotal] = useState(0)
  const [salaryTotal, setSalaryTotal] = useState(0)
  const [itemTotal, setItemTOtal] = useState(0)

  useEffect(() => {
    itemCount();
    employeeCount();
    salaryCount();
  }, [])

  const itemCount = () => {
    axios.get('http://localhost:3000/auth/item_count')
      .then(result => {
        if (result.data.Status) {
          setItemTOtal(result.data.Result[0].item)
        }
      })
  }
  const employeeCount = () => {
    axios.get('http://localhost:3000/auth/employee_count')
      .then(result => {
        if (result.data.Status) {
          setemployeeTotal(result.data.Result[0].employee)
        }
      })
  }
  const salaryCount = () => {
    axios.get('http://localhost:3000/auth/salary_count')
      .then(result => {
        if (result.data.Status) {
          setSalaryTotal(result.data.Result[0].salary)
        } else {
          alert(result.data.Error)
        }
      })
  }

  return (
    <div>
      <div className='p-3 d-flex justify-content-around mt-3'>
        <div className='px-3 pt-2 pb-3 border shadow-sm w-25 bg-light'>
          <div className='text-center pb-1'>
            <h4>Employee</h4>
          </div>
          <hr />
          <div className='d-flex justify-content-between'>
            <h5>Total:</h5>
            <h5>{employeeTotal}</h5>
          </div>
        </div>
        <div className='px-3 pt-2 pb-3 border shadow-sm w-25 bg-light'>
          <div className='text-center pb-1'>
            <h4>Salary</h4>
          </div>
          <hr />
          <div className='d-flex justify-content-between'>
            <h5>Total:</h5>
            <h5>{salaryTotal}</h5>
          </div>
        </div>
        <div className='px-3 pt-2 pb-3 border shadow-sm w-25 bg-light'>
          <div className='text-center pb-1'>
            <h4>Items</h4>
          </div>
          <hr />
          <div className='d-flex justify-content-between'>
            <h5>Total:</h5>
            <h5>{itemTotal}</h5>
          </div>
        </div>
      </div>
      <div className='w-75 p-3 left'>
      <center><SalesChart /></center>
      </div>
    </div>
  )
}

export default HomePage