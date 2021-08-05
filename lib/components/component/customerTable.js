import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import deleteCustomerHelper from '../helpers/deleteCustomer';
import getCustomersHelper from '../helpers/getCustomers';
import './productTable.css'



export default function ProductsTable () {
  const [customers, getCustomers] = useState([]);
  const [isAllProducts, switchIsAllProduct] = useState(true);
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    getCustomersHelper()
      .then(({ data }) => {
        console.log(data)
        if (data.status) {
          getCustomers(data.data);
        } else {
          toast(data.message);
        }
      });
  }, [refresh]);

  const deleteCustomer = (e, id)=> {
    e.preventDefault()
    deleteCustomerHelper(id)
    .then(({data})=>{
      if(data.status){
        toast(data.message)
        setRefresh(!refresh)
      }
    })
  }

  return (
    <div className="productTable">
      <table>
        <thead>
          <th>Name</th>
          <th>Phone</th>
          <th>Email</th>
          <th>Social</th>
          <th>Mode</th>
          <th>Month</th>
          <th>Year</th>
          <th>Delete</th>
        </thead>
        <tbody>
          {customers.map((d,key)=>(
            <tr key={key}>
              <td>{d.name.first + d.name.last}</td>
              <td>{d.phone}</td>
              <td>{d.email}</td>
              <td>{d.social}</td>
              <td>{d.mode}</td>
              <td>{d.month}</td>
              <td>{d.year}</td>
              <td><a href="" onClick={(e)=>deleteCustomer(e, d._id)}>Delete</a></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )

}