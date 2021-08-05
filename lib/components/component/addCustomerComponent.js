import React, { useState } from 'react';
import { FormGroup, Select, Button, FormControl, InputLabel, Input } from '@material-ui/core';
import addCustomerHelper from '../helpers/addCustomer';
import "./addProductComponent.css";

export default function AddCustomer({ toggleOnSave, setRefresh, refresh, url, value }) {
  const addCustomer = (e) => addCustomerHelper(e, toggleOnSave, setRefresh, refresh, url);
  const [mode, switchMode] = useState("")
  const handleMode = (e) => {
    switchMode(e.target.value)
  } 
  return (
    <div>
      <form className="addProductForm" onSubmit={addCustomer}>
        <FormGroup>
          <h3>Add Customer</h3>
          <FormControl className="input">
            <InputLabel htmlFor="name">Firstname</InputLabel>
            <Input name="first" id="first" aria-describedby="firstname" />
          </FormControl>
          <FormControl className="input">
            <InputLabel htmlFor="lastname">Lastname</InputLabel>
            <Input id="last" name="last" aria-describedby="lastname" />
          </FormControl>
          <FormControl className="input">
            <InputLabel htmlFor="phone">Phone Number</InputLabel>
            <Input id="phone" name="phone" type="number" aria-describedby="phone number" />
          </FormControl>
          <FormControl className="input">
            <InputLabel htmlFor="email">Email</InputLabel>
            <Input id="email" name="email" type="email" aria-describedby="email" />
          </FormControl>
          <FormControl className="input">
            <InputLabel htmlFor="social">Social</InputLabel>
            <Input id="social" name="social" type="text" aria-describedby="social" />
          </FormControl>
          <FormControl variant="outlined" className="input">
            <InputLabel htmlFor="mode">Mode of acquisition</InputLabel>
            <Select
              native
              value={mode}
              onChange={handleMode}
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