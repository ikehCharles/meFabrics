import React, { useState, useEffect } from 'react';
import {FormGroup, Select, Button, FormControl, InputLabel, Input } from '@material-ui/core';
import addPurchaseHelper from '../helpers/addPurchase';
import "./addProductComponent.css";
import getProductsHelper from '../helpers/getProducts';


export default function AddPurchase({ toggleOnSave, setRefresh, refresh, url, value }) {
  const addPurchase = (e) => addPurchaseHelper(e);
  const [products, getProducts] = useState([]);
  const [categories, getCategories] = useState([])
  const [category, getCategory] = useState(false)
  const [material, getMaterial] = useState("");
  useEffect(() => {
    getProductsHelper()
      .then(({ data }) => {
        if (data.status) {
          getProducts(data.data);
          data.data.forEach(d => {

            getCategories(e => {
              if (e.includes(d.category.toLowerCase())) {
                return e;
              } else {
                return [...e, d.category.toLowerCase()]
              }
            });
          })
        } else {
          toast(data.message);
        }
      });
  }, [refresh]);


  return (
    <div>
      <form className="addProductForm" onSubmit={addPurchase}>
        <FormGroup>
          <h3>Add Purchase</h3>
          <FormControl variant="outlined" className="input">
            <InputLabel htmlFor="mode">Select fabric Category</InputLabel>
            <Select
              native
              value={category}
              onChange={(e) => getCategory(e.target.value)}
              label="category"
              inputProps={{
                name: 'category',
                id: 'category',
              }}
            >
              <option value="null">Select Category</option>
              {categories.map((d, key) => (
                <option key={key} value={d}>{d}</option>
              ))}
            </Select>
          </FormControl>
          {category && <FormControl variant="outlined" className="input">
            <InputLabel htmlFor="fabricMaterial">Select fabric material</InputLabel>
            <Select
              native
              value={material}
              onChange={(e) => getMaterial(e.target.value)}
              label="material"
              inputProps={{
                name: 'fabricId',
                id: 'material',
              }}
            >
              {products.filter((d) => d.category.toLowerCase() === category).map((d, key) => (
                <option key={key} value={d._id}>{d.name}</option>
              ))}
            </Select>
          </FormControl>}
          <FormControl className="input">
            <InputLabel htmlFor="yards">Yards Purchased</InputLabel>
            <Input id="yards" name="yards" inputProps={{
                step: '0.01'
              }} type="number" aria-describedby="yards" />
          </FormControl>
          <FormControl className="input">
            <InputLabel htmlFor="cost">Cost</InputLabel>
            <Input id="cost" name="cost" type="number" aria-describedby="cost" />
          </FormControl>
          <FormControl className="input">
            <InputLabel htmlFor="sellingPerYard">Selling Per Yard</InputLabel>
            <Input id="sellingPerYard" name="sellingPerYard" type="number" aria-describedby="sellingPerYard" />
          </FormControl>
          <FormControl className="input">
            <InputLabel htmlFor="sellingPerTrouser">Selling Per Trouser</InputLabel>
            <Input id="sellingPerTrouser" name="sellingPerTrouser" type="number" aria-describedby="sellingPerTrouser" />
          </FormControl>
          <FormControl className="input">
            <InputLabel htmlFor="quarter">Quarter</InputLabel>
            <Input id="quarter" min="1" max="5" name="quarter" type="number" aria-describedby="quarter" />
          </FormControl>
          <FormControl className="input">
            <InputLabel htmlFor="date">Date</InputLabel>
            <Input id="date" name="date" type="date" aria-describedby="date" />
          </FormControl>
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