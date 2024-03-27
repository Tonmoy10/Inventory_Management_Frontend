import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const UpdateItem = () => {

  const { id } = useParams()


  const [item, setItem] = useState({
    item_name: '',
    stock: '',
    unit: '',
    quantity: ''
  })

  const navigate = useNavigate()

  useEffect(() => {
    axios.get(`http://localhost:3000/auth/get_item/${id}`)
      .then(result => {
        setItem({
          ...item,
          item_name: result.data.result[0].item_name,
          stock: result.data.result[0].stock,
          unit: result.data.result[0].unit,
        })
      })
      .catch(err => console.log(err))
  }, [])


  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post(`http://localhost:3000/auth/update_item/${id}`, item)
      .then(result => {
        if (result.data.Status) {
          // console.log("HEHE")
          // window.location.href("/dashboard/employee")
          navigate("/dashboard/inventory")
        } else {
          alert(result.data.Error)
        }
      })
      .catch(err => console.log(err))
  }

  return (
    <div className='d-flex justify-content-center align-items-center h-75 top-buffer'>
      <div className='p-3 rounded w-25 border bg-light'>
        <h4><center>Update Item Stock</center></h4>
        <form className="row g-1" onSubmit={handleSubmit}>
          <div className="col-12">
            <div className='text-lg-center'>
              <strong className='m-1 text-body'>Name: </strong><em>{item.item_name}</em>
              <div className='col-12'>
                <strong className='m-1 text-body'>Current Stock: </strong> <em> {item.stock + " "}{item.unit}</em>
              </div>
            </div><br/><br/>
            <label for="inputQuantity" className="form-label">Quantity</label>
            <input
              type="text"
              className="form-control rounded-3"
              id="inputQuantity"
              placeholder="Example: -30 or +80"
              onChange={(e) =>
                setItem({ ...item, quantity: e.target.value })
            }
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

export default UpdateItem