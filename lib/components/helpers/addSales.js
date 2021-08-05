import Axios from 'axios';
import { toast } from 'react-toastify';

export default ((e, customerId, setRefreshSales, refreshSales) => {
  e.preventDefault();
  const formdata = {};
  const elements = e.target.elements;
  const length = elements.length;

  for (let i = 0; i < length; i++) {
    if (elements[i].type === "submit") continue;
    formdata[elements[i].name] = elements[i].value;
  }
  formdata["customerId"] = customerId;

  Axios.post(`api/sales/add`, formdata)
    .then(({ data }) => {
      if(data.status){
        toast(data.message)
        setRefreshSales(!refreshSales)
      } else {
        toast(data.message)
      }
    })
    .catch((err) => {
      console.log(err);
    });
  return null;
});