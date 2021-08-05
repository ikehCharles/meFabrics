import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import {Button} from '@material-ui/core';
import getProductsHelper from '../helpers/getProducts';
import './getProducts.css';

export default function GetProductsComponent({refresh, deleteProduct, editProduct}) {
  const [products, getProducts] = useState([]);
  const [isAllProducts, switchIsAllProduct] = useState(true);
  useEffect(() => {
    getProductsHelper()
      .then(({ data }) => {
        if (data.status) {
          getProducts(data.data);
        } else {
          toast(data.message);
        }
      });
  }, [refresh]);



  return (
    <div>
      {!products.length && <h2>Fetching products....</h2>}
      <div className="products">
        {isAllProducts && products.length && products.map((d, key) => (
          <div className="product" key={key}>
            <Button style={{textAlign: "left"}} variant="outlined" size="small" color="primary" onClick={(e)=>editProduct(e, d)}>Edit</Button>
            <Button style={{textAlign: "right"}} variant="outlined" size="small" color="secondary" onClick={(e)=>deleteProduct(e, d._id)}>Delete</Button>
            <div className="imgWrapper">
              <img src={d.imageUrl} alt={d.name} />
            </div>
            <p>{d.category}</p>
            <h2>{d.name}</h2>
            <div className="price">
              Per Yard ₦{d.purchase[0].sellingPerYard}
            </div>
            <div className="price">
              Per Trouser ₦{d.purchase[0].sellingPerTrouser}
            </div>
          </div>
        ))}
        {!isAllProducts && products.length && products.filter((d, key) => d.category === filterByCategory).map(d => (
          <div className="product" key={key}>
            <Button onClick={editProduct}>Edit</Button>
            <Button onClick={deleteProduct}>Delete</Button>
            <div className="imgWrapper">
              <img src={d.imageUrl} alt={d.name} />
            </div>
            <p>{d.category}</p>
            <h2>{d.name}</h2>
            <div className="price">
              Per Yard ₦{d.purchase[0].sellingPerYard}
            </div>
            <div className="price">
              Per Trouser ₦{d.purchase[0].sellingPerTrouser}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}