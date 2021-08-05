import Axios from 'axios';

export default async (id) => {
  const res = await Axios.post(`/api/products/remove`, {id});
  return res;
}