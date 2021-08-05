import Axios from 'axios';
import { toast } from 'react-toastify';

export default ((e, toggleOnSave, setRefresh, refresh, url) => {
  e.preventDefault();
  const formdata = {};
  const elements = e.target.elements;
  const length = elements.length;

  for (let i = 0; i < length; i++) {
    if (elements[i].type === "submit") continue;
    
    formdata[elements[i].name] = elements[i].value;
  }
  console.log(formdata)

  Axios.post(`/api/customers/add`, formdata)
    .then(({ data }) => {
      console.log(data)
      if(data.status){
        toggleOnSave();
        toast("Customer added successfully")
      } else {
        toast(data.message)
      }
    })
    .catch((err) => {
      console.log(err);
    });
  return null;
});