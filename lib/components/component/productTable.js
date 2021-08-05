import React, { useEffect, useState } from 'react';
import getProductsHelper from '../helpers/getProducts';
import './productTable.css'



export default function ProductsTable({ refresh }) {
  const [products, getProducts] = useState([]);
  const [isAllProducts, switchIsAllProduct] = useState(true);
  useEffect(() => {
    getProductsHelper()
      .then(({ data }) => {
        console.log(data)
        if (data.status) {
          getProducts(data.data);
        } else {
          toast(data.message);
        }
      });
  }, [refresh]);

  return (
    <div className="productTable">
      <table>
        <thead>
          <tr>
            <th>Quarter</th>
            <th>Date(Last restocked)</th>
            <th>Remaining Yards</th>
            <th>Name</th>
            <th>Category</th>
            <th>Year</th>
            <th>Yards</th>
            <th>Cost</th>
            <th>Selling Per Yard</th>
            <th>Selling Per Trouser</th>
            <th>Cost Total</th>
            <th>Selling Total</th>
          </tr>
        </thead>
        <tbody>
          {products.map((d, key) => (
            <tr key={key}>
              <td>{d.purchase[0].quarter}</td>
              <td>{d.purchase[0].date}</td>
              <td>{d.remains}</td>
              <td>{d.name}</td>
              <td>{d.category}</td>
              <td>{d.purchase[0].year}</td>
              <td>{d.yards}</td>
              <td>{d.purchase[0].cost}</td>
              <td>{d.purchase[0].sellingPerYard}</td>
              <td>{d.purchase[0].sellingPerTrouser}</td>
              <td>{d.purchase[0].cost * d.yards}</td>
              <td>{d.purchase[0].sellingPerYard * d.yards}</td>
            </tr>
          ))}
          <tr style={{ fontWeight: 800 }}>
            <td>Total</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>{products.map(d => d.yards).reduce((a, b) => a + b, 0)}</td>
            <td>{products.map(d => parseInt(d.purchase[0].cost)).reduce((a, b) => a + b, 0)}</td>
            <td>{products.map(d => d.purchase[0].sellingPerYard).reduce((a, b) => a + b, 0)}</td>
            <td></td>
            <td>{products.map(d => d.purchase[0].cost * d.yards).reduce((a, b) => a + b, 0)}</td>
            <td>{products.map(d => d.purchase[0].sellingPerYard * d.yards).reduce((a, b) => a + b, 0)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )

}