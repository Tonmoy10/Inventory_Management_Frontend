import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'


const InventoryPage = () => {

  const [item, setItem] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    axios.get('http://localhost:3000/auth/item')
      .then(result => {
        if (result.data.Status) {
          setItem(result.data.Result);
        } else {
          alert(result.data.Error)
        }
      }).catch(err => console.log(err))
  }, [])

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3000/auth/delete_item/${id}`)
    .then(result => {
      if(result.data.Status) {
        // navigate("/dashboard/employee")
        window.location.reload()
      }
      else {
        alert(result.data.Error)
      }
    }).catch(err => console.log(err))
  }
  return (
    <div className="px-5 mt-3">
      <div className="d-flex justify-content-center">
        <h3>Item List</h3>
      </div>
      <Link to="/dashboard/add_item" className="btn btn-success">
        Add Item
      </Link>
      <Link to="/dashboard/sort_item" className="btn btn-warning m-2">
        View Stock By Date
      </Link>
      <div className='mt-3'>
        <table className='table'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Stock</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
              item.map(i => (
                <tr>
                  <td>{i.item_name}</td>
                  <td>{i.stock+" "}{i.unit}</td>
                  <td>
                    <Link to={`/dashboard/update_item/` + i.item_id} className='btn btn-outline-info m-1 btn-sm'>Update</Link >
                    <button className='btn btn-outline-danger btn-sm' onClick={() => { handleDelete(i.item_id) }}>Delete</button>
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

export default InventoryPage