import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import 'dayjs/locale/es'

const SortedItems = () => {

  const [item, setItem] = useState([])
  const [date, setDate] = useState({
    date: ''
  })
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post('http://localhost:3000/auth/item_record', date)
      .then(result => {
        if (result.data.Status) {
          setItem(result.data.Result)
          // console.log(result.data.Result)
        } else {
          alert(result.data.Error)
        }
      })
      .catch(err => console.log(err))
  }


  return (
    <div className="px-5 mt-3">
      <div className="d-flex justify-content-center">
      </div>
      <center>
        <div className='p-3 rounded w-25 border bg-light bg-gradient bg-dark-subtle justify-content-center'>
          <h4><center>Search Bar</center></h4>
          <form className="row g-1" onSubmit={handleSubmit}>
            <div className="col-12">
              <input
                type="date"
                className="form-control rounded-3"
                id="inputDate"
                autoComplete="off"
                onChange={(e) =>
                  setDate({ ...date, date: e.target.value })
                }
              />
              <center><button type="submit" className="btn btn-dark btn-sm w-100 mt-2">Search</button></center>
            </div>
          </form>
        </div>
      </center> <br />
      <div className='mt-3'>
        <table className='table'>
          <thead>
            <tr>
              <th>Date</th>
              <th>Name</th>
              <th>Quantity</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
              item.map(i => (
                <tr>
                  <td>{i.date}</td>
                  <td>{i.item_name}</td>
                  <td>{i.quantity+" "}{i.unit}</td>
                  <td></td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default SortedItems