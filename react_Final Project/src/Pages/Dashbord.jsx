import React  from 'react'
import HOC from '../Component/HOC'
import { Bar, Line } from 'react-chartjs-2'
import { CategoryScale, LineElement } from 'chart.js';
import Chart from "chart.js/auto";
import { IoArrowDownCircleOutline, IoArrowUpCircleOutline, IoInformationCircleOutline, IoPrintOutline } from 'react-icons/io5';
import { PiDownload, PiKanban, PiPiggyBank, PiReceiptBold } from 'react-icons/pi';
import { BiDollarCircle } from 'react-icons/bi';






const Dashbord = () => {

    let data1  = [
      {
        icone:<PiKanban className='icone ' />,
        num:'687',
        bgcolor: 'bg-danger',
        icone1: <IoArrowDownCircleOutline />,
        stok:'2.01%',
        text :'Total Projects'
    },
      {
        icone:<PiReceiptBold className='icone ' />,
        num:'$284.92K',
        bgcolor: ' bg-success',
        icone1:< IoArrowUpCircleOutline />,
        stok:'8.98%',
        text :'Total Expenses'
    },
      {
        icone:<BiDollarCircle  className='icone '/>,
        num:'28.35%',
        bgcolor: 'bg-success',
        icone1:  <IoArrowUpCircleOutline />,
        stok:' 13.45%',
        text :'Budget Spent'
    },
      {
        icone:<PiPiggyBank  className='icone ' />,
        num:'$982.12K',
        bgcolor: 'bg-danger',
        icone1: <IoArrowDownCircleOutline />,
        stok:'0.54%',
        text :'Total Budget'
    },
  ]



  const data = {
    labels: ['Q2 19', 'Q3 19', 'Q4 19', 'Q1 20', 'Q2 20', 'Q3 20', 'Q4 20', 'Q1 21', 'Q2 21', 'Q3 21', 'Q4 21', 'Q1 22', 'Q2 22', 'Q3 22', 'Q4 22', 'Q1 23', 'Q2 23', 'Q3 23', 'Q4 23'],


    datasets: [
      {
        label: '',
        data: [114, 110, 110, 106, 108, 109, 106, 115, 110, 108, 108, 110, 105, 108, 105, 107, 106, 116, 107, 120],
        fill: true,
        backgroundColor: "rgba( 243, 106, 109,.2)",
        borderColor: "rgb( 243, 106, 109)",

        pointRadius: 0,
        tension: 0.4
      },
      {
        label: "",
        data: [112, 113, 112, 111, 111, 113, 113, 110, 113, 112, 113, 113, 112, 114, 111, 113, 115, 112, 111, 100],
        fill: true,
        backgroundColor: "    rgba(132, 102, 216, 0.3)",
        borderColor: "rgb(94, 54, 202)",
        pointRadius: 0
        , tension: 0.4,
        plugins: {
        },
        legend: {
          display: false
        }
      }
    ]
  };
  return (
    <>

        <div className='w-100 p-4 Dashbord P-Dashbord '>
          <div className='w-100 row g-4
           d-flex justify-content-between'> 
          {
            data1.map((x,i) =>{
              return  <div className='col-3  ' key={i}>
              <div className='Total d-flex p-2 justify-content-between align-items-center'>
                <div className=' icone-div  '>
                 {x.icone}
                </div>
               <div className='w-75 d-flex justify-content-between'>
                 <div className="flex-grow-1">
                  <div className="align-items-center d-flex mb-1">
                    <div className=" fw-medium mb-1 me-2 ">{x.num}</div>
                    <div className={"align-items-center badge bg-opacity-75 d-inline-flex fs-8 ms-auto mt-n1 rounded-pill " + x.bgcolor}   >
                 
                    {x.icone1} {x.stok} </div>
                  </div> {x.text} </div>
               </div>

              </div>
            </div>
            })
          }
            
       
            <div className='col-6 '>
             <div className='chart-div '>
               <div className="align-items-start w-auto  d-flex mb-3">
                <h5 className="card-title flex-grow-1 m-0"> Budget and Expenses </h5>
                 <div className='icone-main  d-flex  '>
                   <div className='icone'><IoInformationCircleOutline /></div>
                  <div className='icone'><PiDownload /></div>
                  <div className='icone'><IoPrintOutline /></div>
                 </div>
             
              </div>
              <Line className='line-Chart-1' data={data} options={{
                scales:
                {
                  x: { grid: { display: true, color: "rgba(224, 224, 224, 0.3)" } }
                  ,
                  y: { grid: { display: true, color: "rgba(224, 224, 224, 0.3)" } }
                }
                , plugins: {
                  title: { display: false }, legend: { display: false }
                }
              }}
              />
             </div>
            </div>

          </div>
        </div>


      {/* </div> */}



    </>
  )
}

export default HOC(Dashbord)