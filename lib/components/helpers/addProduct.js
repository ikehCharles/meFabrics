import Axios from 'axios';
import { toast } from 'react-toastify';

export default ((e, toggleOnSave, setRefresh, refresh, url) => {
  e.preventDefault();
  const formdata = new FormData();
  const elements = e.target.elements;
  const length = elements.length;

  for (let i = 0; i < length; i++) {
    if (elements[i].type === "submit") continue;
    if (elements[i].type === "file") {
      const file = elements[i].files[0];
      formdata.append('file', file);
      continue;
    }
    formdata.append(elements[i].name, elements[i].value);
    if (elements[i].value === "") return toast.warning("Incomplete field(s)");
  }

  Axios.post(`${url}`, formdata)
    .then(({ data }) => {
      if(data.status){
        toggleOnSave();
        setRefresh(!refresh);
        toast("Product added successfully")
      } else {
        toast(data.message)
      }
    })
    .catch((err) => {
      console.log(err);
    });
  return null;
});