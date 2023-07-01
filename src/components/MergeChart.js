import React, { useEffect,useState } from 'react';

import { Chart, Bar } from 'react-chartjs-2';
import { Chart as ChartJS , LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,} from 'chart.js/auto';
import { HighDataKey, VolumeDataKey } from '../const/variable';
import Loading from './Loading';

export default function MergeChart({ data ,limit }) {
  // console.log(data);
  
  const [volumeArray, setvolumeArray] = useState([])
  const [priceArray, setpriceArray] = useState([])
  const [labels, setlabels] = useState([])
  
  const generateFormatedData = (data)=>{
    const templabel=Object.keys(data);
    templabel.splice(limit)
    const volumeArraytemp=[]
    const priceArraytemp=[];
    for(var i=0;i<limit && templabel.length;i++)
    {
      const oneDayData = data[`${templabel[i]}`];
      volumeArraytemp.push(oneDayData[VolumeDataKey]/100000);
      priceArraytemp.push(oneDayData[HighDataKey]);
    }
    setvolumeArray(volumeArraytemp);
    setpriceArray(priceArraytemp);
    setlabels(templabel);
  }



  const chartdata = {
    labels,
    datasets: [
      {
        type: 'line',
        label: 'price',
        borderColor: 'rgb(255, 99, 132)',
        borderWidth: 2,
        fill: false,
        data: priceArray,
      },
      {
        type: 'bar' ,
        label: 'volume(lakh)',
        backgroundColor: 'rgb(75, 192, 192)',
        data: volumeArray,
        borderColor: 'white',
        borderWidth: 2,
      },
      
    ],
  };

  useEffect(()=>{
    generateFormatedData(data);
  },[data,limit])

  return (
    <div className=''>
      {labels?.length>0 ? <Chart type='bar' data={chartdata} />:<Loading/>}
    </div>
  )
}
