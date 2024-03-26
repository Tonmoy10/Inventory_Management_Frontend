import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AddItem = () => {
    const [item, setItem] = useState({
        item_name: '',
        stock: '',
        unit: ''
    })

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:3000/auth/add_item', item)
        .then(result => {
            if (result.data.Status) {
                navigate("/dashboard/inventory")
              } else {
                alert(result.data.Error)
              }
        })
        .catch(err => console.log(err))
    }

    
    return (
        <div className='d-flex justify-content-center align-items-center h-75 top-buffer'>
            <div className='p-3 rounded w-25 border'>
                <h2><center>Add Item</center></h2>
                <form className="row g-1" onSubmit={handleSubmit}>
                    <div className="col-12">
                        <label for="inputName" className="form-label">Name</label>
                        <input
                            type="text"
                            className="form-control rounded-3"
                            id="inputName"
                            placeholder="Enter Name"
                            onChange={(e) =>
                                setItem({ ...item, item_name: e.target.value })
                            }
                        />
                    </div>
                    <div className="col-12">
                        <label for="inputPosition" className="form-label">Stock</label>
                        <input
                            type="text"
                            className="form-control rounded-3"
                            id="inputStock"
                            placeholder="Enter Amount"
                            autoComplete="off"
                            onChange={(e) =>
                                setItem({ ...item, stock : e.target.value })
                            }
                        />
                    </div>
                    <div className="col-12">
                        <label for="inputName" className="form-label">Unit</label>
                        <input
                            type="text"
                            className="form-control rounded-3"
                            id="inputUnit"
                            placeholder="Enter Unit"
                            autoComplete="off"
                            onChange={(e) =>
                                setItem({ ...item, unit : e.target.value })
                            }
                        />
                    </div>
                    <div className="col-12">
                        <button type="submit" className="btn btn-primary w-100 mt-2">
                            Add Item
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddItem