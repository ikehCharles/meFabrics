import React, {useState} from 'react';
import AddSalesComponent from '../component/addSalesComponent';
import GetSalesTable from '../component/salesTable'


export default function Sales(){
  const [refreshSales, setRefreshSales] = useState(true)
  return (
    <div>
      <AddSalesComponent refreshSales={refreshSales} setRefreshSales={setRefreshSales} />
      <GetSalesTable setRefreshSales={setRefreshSales} refreshSales={refreshSales} />
    </div>
  )
}