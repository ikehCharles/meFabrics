import Axios from 'axios';

export default async (id) => {
  const res = await Axios.get(`/api/customers/customer/${id}`);
  return res;
}