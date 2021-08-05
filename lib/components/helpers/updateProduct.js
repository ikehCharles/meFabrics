import Axios from 'axios';
import { toast } from 'react-toastify';

export default ((e, setRefresh, refresh, val, switchShowProducts, switchShouldUpdateProduct, switchshowAddProductButton) => {
  e.preventDefault();
  const formdata = new FormData();
  const elements = e.target.elements;
  const length = elements.length;

  for (let i = 0; i < length; i++) {
    if (elements[i].type === "submit") continue;
    if (elements[i].type === "file") {
      if (!elements[i].files[0]) continue;
      const file = elements[i].files[0];
      formdata.append('file', file);
      continue;
    }
    formdata.append(elements[i].name, elements[i].value);
    if (elements[i].value === "") return toast.warning("Incomplete field(s)");
  }
  formdata.append("_id", val._id);
  Axios.post(`/api/products/update`, formdata)
    .then(({ data }) => {
      console.log(data)
      if (data.status) {
        switchShowProducts(true)
        switchShouldUpdateProduct(false)
        switchshowAddProductButton(true)
        setRefresh(!refresh);
        toast("Product updated successfully")
      } else {
        toast(data.message)
      }
    })
    .catch((err) => {
      console.log(err);
    });
  return null;
});