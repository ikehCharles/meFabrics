import Axios from 'axios';

export default async () => {
  const res = await Axios.get(`/api/customers`);
  return res;
}