import './App.css';
import { useEffect, useState } from 'react';
import { fetchData } from './api/common';
import MergeChart from './components/MergeChart';
import SearchBar from './components/SearchBar';
import { DailydataKey, defaultStockName, defaultStockSymbol, monthDayCount, monthVariable, weekDayCount, weekVariable } from './const/variable';


function App() {

  const [stockInfo, setstockInfo] = useState({ name: defaultStockName, symbol: defaultStockSymbol });
  const [stockdata, setstockdata] = useState(null);
  const [datalimit, setdatalimit] = useState(7);

  async function loadData() {
    const query = `function=TIME_SERIES_DAILY_ADJUSTED&symbol=${stockInfo.symbol}`;
    const res = await fetchData(query);
    setstockdata(res[DailydataKey]);
  }

  useEffect(() => {
    loadData()
  }, [stockInfo.symbol])


  const updateDataLimit=(daycount)=>{
    setdatalimit(daycount)
  }

  return (
    <div className=' bg-white p-11 text-black'>

      <SearchBar setInfo={setstockInfo} />

      <div>
        <ul className='flex flex-row justify-between bg-gray-500 rounded-3xl p-2'>
          <li className='hover:bg-slate-500 p-2' onClick={()=>updateDataLimit(weekDayCount)}>{weekVariable}</li>
          <li className='hover:bg-slate-500 p-2' onClick={()=>updateDataLimit(monthDayCount)}>{monthVariable}</li>
        </ul>
      </div>
      <div className='m-1  font-bold flex justify-center'>
        {stockInfo.name}
      </div>

      {stockdata!=null ? <MergeChart data={stockdata} limit={datalimit}/> :""}

    </div>
  )
}

export default App;