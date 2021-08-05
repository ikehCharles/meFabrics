import Axios from 'axios';

export default async (id) => {
  const res = await Axios.get(`/api/purchases/`);
  return res;
}