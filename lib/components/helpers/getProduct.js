import Axios from 'axios';

export default async (id) => {
  const res = await Axios.get(`/api/products/product/${id}`);
  return res;
}