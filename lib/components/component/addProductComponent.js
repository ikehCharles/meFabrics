import React from 'react';
import { FormGroup, Button, FormControl, InputLabel, Input } from '@material-ui/core';
import addProductHelper from '../helpers/addProduct';
import "./addProductComponent.css";

export default function AddProduct({toggleOnSave, setRefresh, refresh, url, value}) {
  const addProduct = (e) => addProductHelper(e, toggleOnSave, setRefresh, refresh, url);

  return (
    <div>
      <form className="addProductForm" onSubmit={addProduct}>
        <FormGroup>
          <h3>Add Product</h3>
          <FormControl className="input">
            <InputLabel htmlFor="name">Name</InputLabel>
            <Input name="name" id="name" aria-describedby="name" />
          </FormControl>
          <FormControl className="input">
            <InputLabel htmlFor="category">Category</InputLabel>
            <Input id="category" name="category" aria-describedby="category" />
          </FormControl>
          <div className="input">
            <Input id="category" type="file" aria-describedby="productCategory" />
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