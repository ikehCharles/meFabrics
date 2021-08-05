import Axios from 'axios';

export default async (_id) => {
  const res = await Axios.post(`/api/customers/remove`, {_id});
  return res;
}