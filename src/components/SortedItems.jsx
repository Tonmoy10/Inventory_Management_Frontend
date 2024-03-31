import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SortedItems = () => {
  const [item, setItem] = useState([]);
  const [date, setDate] = useState({
    date: ''
  });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3000/auth/item_record', date)
      .then(result => {
        if (result.data.Status) {
          const adjustedItems = result.data.Result.map(i => ({
            ...i,
            date: adjustDate(i.date)
          }));
          setItem(adjustedItems);
        } else {
          alert(result.data.Error);
        }
      })
      .catch(err => console.log(err));
  };

  // Function to adjust date based on timezone
  const adjustDate = (dateString) => {
    const dateObj = new Date(dateString);
    const adjustedDate = new Date(dateObj.getTime() - dateObj.getTimezoneOffset() * 60000);
    return adjustedDate.toISOString().split('T')[0];
  };

  return (
    <div className="px-5 mt-3">
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
              <th>Old Stock</th>
              <th>New Stock</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {
              item.map(i => (
                <tr key={i.id}>
                  <td>{i.date}</td>
                  <td>{i.item_name}</td>
                  <td>{(i.quantity < 0 ? i.quantity * -1 : i.quantity) + " "}{i.unit}</td>
                  <td>{i.previous}</td>
                  <td>{i.current}</td>
                  <td><em>{i.quantity < 0 ? "REMOVED" : "ADDED"}</em></td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SortedItems;
