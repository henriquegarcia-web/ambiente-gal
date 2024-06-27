import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const ApexCharts = dynamic(() => import('react-apexcharts'), {
  ssr: false // Isso garante que o componente seja renderizado apenas no lado do cliente
});

const ChartLine = ({data}) => {
    console.log(data)
    const [nomes,setNomes] = useState()
    const [valores,setValores] = useState()
    const handleDados = () =>{
        let listNome = data.map((item)=>{return item.dia})
        let listValor = data.map((item)=>{return item.valor.toFixed(2)})
        setNomes(listNome)
        setValores(listValor)
    }
    useEffect(()=>{
        handleDados()
    },[data])
    const optionsLine = {
        dataLabels: {
            enabled: false,
        },
        stroke: {
            curve: "straight",
        },
        title: {
            text: "Total de Vendas",
            align: "left",
        },
        grid: {
            row: {
                colors: ["#f3f3f3", "transparent"],
                opacity: 0.5,
            },
        },
        xaxis: {
            categories: nomes,
        },
    };

    const seriesLine = [
        {
            name: "Vendas",
            data: valores,
        },
    ];

    return (
      
        <ApexCharts
        style={{width:'100%'}}
            options={optionsLine}
            series={seriesLine}
            type="line"
            height={350}
        />
    );
};

export default ChartLine;
