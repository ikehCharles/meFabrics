import Axios from 'axios';

export default async (_id, yards) => {
  const res = await Axios.post(`/api/sales/remove`, {_id});
  return res;
}