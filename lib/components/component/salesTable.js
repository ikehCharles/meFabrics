import React, { useEffect, useState } from 'react';
import getSalesHelper from '../helpers/getSales';
import './productTable.css'
import deleteSalesHelper from '../helpers/deleteSales';
import { toast } from 'react-toastify';



export default function ProductsTable({ setRefreshSales, refreshSales }) {
  const [sales, getSales] = useState([]);
  
  const [productDetails, getProductDetails] = useState([]);
  useEffect(() => {
    getSalesHelper()
      .then(({ data }) => {
        console.log(data)
        if (data.status) {
          getSales(data.data)
        } else {
          toast(data.message);
        }
      });
  }, [refreshSales]);

  const deleteSales = (e, id) => {
    e.preventDefault();
    deleteSalesHelper(id)
    .then(({data})=>{
     if(data.status){
       toast(data.message);
       setRefreshSales(!refreshSales)
     }
    })
  }

  return (
    <div className="productTable">
      <table>
        <thead>
          <tr>
          <th>Product Image</th>
          <th>Name</th>
          <th>Category</th>
          <th>Measurement</th>
          <th>Yards</th>
          <th>Selling At</th>
          <th>Sold At</th>
          <th>Selling (Total)</th>
          <th>Sold At (Total)</th>
          <th>Mode of Sale</th>
          <th>Paid</th>
          <th>Received</th>
          <th>Customer Name</th>
          <th>Customer Phone</th>
          <th>Date</th>
          <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {sales.map((d, key) => (
            <tr key={key} style={{ fontWeight: 600, fontSize: "0.9em" }}>
              <td>
                <img width="50px" height="50px" src={d.fabric[0].imageUrl} />
              </td>
              <td>
                {d.fabric[0].name}
              </td>
              <td>
                {d.fabric[0].category}
              </td>
              <td>
                {d.measurement}
              </td>
              <td>
                {d.quantity}
              </td>
              <td>
                {d.sellingAt}
              </td>
              <td>
                {d.soldAt}
              </td>
              <td>
                {d.sellingAtTotal}
              </td>
              <td>
                {d.soldAtTotal}
              </td>
              <td>
                {d.mode}
              </td>
              <td>
                {d.paid==="true"? "full": "part"}
              </td>
              <td>
                {d.received? "true": "false"}
              </td>
              <td>
                {d.customer[0].name.first + " " + d.customer[0].name.last}
              </td>
              <td>
                {d.customer[0].phone}
              </td>
              <td>
                {d.date}
              </td>
              <td>
                <a href="" style={{color: 'red'}} onClick={(e)=>deleteSales(e, d._id)}>Delete</a>
              </td>
            </tr>
          ))}
          <tr>
            <td>Total</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>{sales.map(d=>d.sellingAtTotal).reduce((a,b)=> a+b, 0)}</td>
            <td>{sales.map(d=>d.soldAtTotal).reduce((a,b)=> a+b, 0)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )

}