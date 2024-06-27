import dynamic from 'next/dynamic';

const ApexCharts = dynamic(() => import('react-apexcharts'), {
  ssr: false // Isso garante que o componente seja renderizado apenas no lado do cliente
});

const ChartBar = () => {
    const optionsBar = {
        plotOptions: {
            bar: {
                borderRadius: 4,
                horizontal: true,
            },
        },
        title: {
            text: "Lorem ipsum",
            align: "left",
        },
        dataLabels: {
            enabled: false,
        },
        xaxis: {
            categories: [
                "South Korea",
                "Canada",
                "United Kingdom",
                "Netherlands",
                "Italy",
                "France",
                "Japan",
                "United States",
                "China",
                "Germany",
            ],
        },
    };

    const seriesBar = [
        {
            data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380],
        },
    ];

    return (
        
        <ApexCharts
        style={{width:'100%'}}
            options={optionsBar}
            series={seriesBar}
            type="bar"
            height={350}
        />
    );
};

export default ChartBar;
