import Axios from 'axios';
import { toast } from 'react-toastify';

export default ((e, customerId, setRefresh, refresh, url) => {
  e.preventDefault();
  const formdata = {};
  const elements = e.target.elements;
  const length = elements.length;

  for (let i = 0; i < length; i++) {
    if (elements[i].type === "submit") continue;
    formdata[elements[i].name] = elements[i].value;
  }
  console.log(formdata)

  Axios.post(`api/purchases/add`, formdata)
    .then(({ data }) => {
      if(data.status){
        console.log(data)
        toast("Purchase added successfully")
        e.target.reset()
      } else {
        toast(data.message)
      }
    })
    .catch((err) => {
      console.log(err);
    });
  return true;
});