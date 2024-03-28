import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'


const AddSales = () => {

    const [sale, setSale] = useState({
        sale: ''
    })

    const [error, setError] = useState(null)

    const navigate = useNavigate()


    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:3000/auth/add_sale', sale)
            .then(result => {
                if (result.data.Status) {
                    navigate("/dashboard")
                } else {
                    setError(result.data.Error)
                }
            })
            .catch(err => console.log(err))
    }
    return (
        <div className='d-flex justify-content-center align-items-center h-75 top-buffer'>
            <div className='p-3 rounded w-25 border bg-light'>
                <h4><center>Add Today's Sale</center></h4>
                <form className="row g-1" onSubmit={handleSubmit}>
                    <div className="col-12">
                        <label for="inputSale" className="form-label"></label>
                        <input
                            type="text"
                            className="form-control rounded-3"
                            id="inputSale"
                            onChange={(e) =>
                                setSale({ ...sale, sale: e.target.value })
                            }
                        />
                    </div>
                    <div className="col-12">
                        <button type="submit" className="btn btn-primary w-100 mt-2">
                            Confirm
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

export default AddSales