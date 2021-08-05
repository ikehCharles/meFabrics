import React, { useState, useEffect } from 'react';
import { TextField, FormGroup, Select, Button, FormControl, InputLabel, Input } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import addSaleHelper from '../helpers/addSales';
import "./addProductComponent.css";
import getProductsHelper from '../helpers/getProducts';
import getCustomersHelper from '../helpers/getCustomers';


export default function AddSales({ setRefreshSales, refreshSales }) {
  const addSale = (e) => addSaleHelper(e, customerId, setRefreshSales, refreshSales);
  const [products, getProducts] = useState([]);
  const [categories, getCategories] = useState([])
  const [category, getCategory] = useState(false)
  const [material, getMaterial] = useState("");
  const [options, getOptions] = useState([])
  const [customerId, getCustomerId] = useState()
  const [isAllProducts, switchIsAllProduct] = useState(true);
  const [mode, handleMode] = useState("offline");
  const [paid, setPaid] = useState(true);
  const [receivedStatus, setReceivedStatus] = useState(true);
  const [measurement, getMeasurement] = useState("yard")
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
  }, []);


  useEffect(() => {
    getCustomersHelper()
      .then(({ data }) => {
        getOptions(data.data)
      })
  }, [])


  return (
    <div>
      <form className="addProductForm" onSubmit={addSale}>
        <FormGroup>
          <h3>Add Sales</h3>
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
              {products.filter(d => d.category.toLowerCase() === category).map((d, key) => (
                <option key={key} value={d._id}>{d.name}</option>
              ))}
            </Select>
          </FormControl>}
          <FormControl className="input">
            <InputLabel htmlFor="quantity">Quantity Bought</InputLabel>
            <Input id="quantity" name="quantity" inputProps={{
                step: '0.01'
              }} type="number" aria-describedby="yards" />
          </FormControl>
          <FormControl className="input">
            <InputLabel htmlFor="soldAt">Sold At</InputLabel>
            <Input id="soldAt" name="soldAt" type="number" aria-describedby="cost" />
          </FormControl>
          <Autocomplete
            onChange={(e, value) => getCustomerId(value._id)}
            id="customerId"
            options={options}
            getOptionLabel={(option) => `${option.name.first} ${option.name.last}`}
            style={{ width: "100%" }}
            renderInput={(params) => <TextField {...params} label="Customer" variant="outlined" />}
          />
          <FormControl variant="outlined" className="input">
            <InputLabel htmlFor="measurement">Measurement</InputLabel>
            <Select
              native
              value={measurement}
              onChange={(e)=>getMeasurement(e.target.value)}
              label="measurement"
              inputProps={{
                name: 'measurement',
                id: 'measurement',
              }}
            >
              <option aria-label="None" value="" />
              <option value={`yard`}>Yard</option>
              <option value={`trouser`}>Trouser</option>
            </Select>
          </FormControl>
          <FormControl variant="outlined" className="input">
            <InputLabel htmlFor="mode">Mode of acquisition</InputLabel>
            <Select
              native
              value={mode}
              onChange={(e)=>handleMode(e.target.value)}
              label="Mode"
              inputProps={{
                name: 'mode',
                id: 'mode',
              }}
            >
              <option aria-label="None" value="" />
              <option value={`online`}>Online</option>
              <option value={`offline`}>Offline</option>
            </Select>
          </FormControl>
          <FormControl variant="outlined" className="input">
            <InputLabel htmlFor="mode">Paid</InputLabel>
            <Select
              native
              value={paid}
              onChange={(e)=>setPaid(e.target.value)}
              label="paid"
              inputProps={{
                name: 'paid',
                id: 'paid',
              }}
            >
              <option aria-label="None" value="" />
              <option value={true}>full</option>
              <option value={false}>part</option>
            </Select>
          </FormControl>  
          <FormControl variant="outlined" className="input">
            <InputLabel htmlFor="mode">Received</InputLabel>
            <Select
              native
              value={receivedStatus}
              onChange={(e)=>setReceivedStatus(e.target.value)}
              label="received"
              inputProps={{
                name: 'received',
                id: 'received',
              }}
            >
              <option aria-label="None" value="" />
              <option value={true}>True</option>
              <option value={false}>False</option>
            </Select>
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