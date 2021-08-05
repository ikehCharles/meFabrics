import React, { useEffect, useState } from 'react';
import { FormGroup, Button, FormControl, InputLabel, Input } from '@material-ui/core';
import updateProductHelper from '../helpers/updateProduct';
import "./addProductComponent.css";

export default function UpdateProductComponent({setRefresh, refresh, val, switchShowProducts, switchShouldUpdateProduct, switchshowAddProductButton}) {
  const updateProduct = (e) => updateProductHelper(e, setRefresh, refresh, val, switchShowProducts, switchShouldUpdateProduct, switchshowAddProductButton);
  const [value, setValue] = useState(val)

  const updateValue = (e) => {
    let title = e.target.name;
    setValue(d => {
      console.log(d)
      let newValue = { ...d};
      newValue[title] = e.target.value;
      return newValue;
    })
    
  }
  useEffect(()=>{
    console.log(value)
  })

  return (
    <div>
      <form className="addProductForm" onSubmit={updateProduct}>
        <FormGroup>
          <h3>Update Product</h3>
          <div className="imgWrapper">
            <img src={value.imageUrl}></img>
          </div>
          <FormControl className="input">
            <InputLabel htmlFor="name">Name</InputLabel>
            <Input name="name" onChange={updateValue} value={value.name} id="name" aria-describedby="name" />
          </FormControl>
          <FormControl className="input">
            <InputLabel htmlFor="category">Category</InputLabel>
            <Input id="category" onChange={updateValue} value={value.category} name="category" aria-describedby="category" />
          </FormControl>
          <FormControl className="input">
            <InputLabel htmlFor="yards">Number of Yards</InputLabel>
            <Input disabled id="yards"  value={value.yards} name="yards" type="number" aria-describedby="yards" />
          </FormControl>
          <FormControl className="input">
            <InputLabel htmlFor="remains">Remains</InputLabel>
            <Input disabled id="remains"  value={value.remains} name="remains" type="number" aria-describedby="remains" />
          </FormControl>
          <FormControl className="input">
            <InputLabel htmlFor="purchaseId">Purchase ID</InputLabel>
            <Input disabled id="purchaseId" value={value.purchaseId} name="purchaseId" type="text" aria-describedby="purchaseId" />
          </FormControl>
          <FormControl className="input">
            <InputLabel htmlFor="sold">Sold</InputLabel>
            <Input disabled id="selling"  value={value.sold} name="sold" type="text" aria-describedby="sold" />
          </FormControl>
          <div className="input">
            <Input id="category" type="file" aria-describedby="productCategory" />
          </div>
          <div className="input">
            <Input id="imagePath" name="imagePath" type="hidden" value={value.imagePath} aria-describedby="imagePath" />
          </div>
          <div className="input">
            <Button variant="contained" color="primary" type="submit">
              Save
            </Button>
          </div>
        </FormGroup>
      </form>
    </div>
  );
}