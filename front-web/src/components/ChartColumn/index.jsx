import dynamic from 'next/dynamic';

const ApexCharts = dynamic(() => import('react-apexcharts'), {
  ssr: false // Isso garante que o componente seja renderizado apenas no lado do cliente
});

const ChartColumn = ({data}) => {
    const optionsColumn = {
        plotOptions: {
            bar: {
                borderRadius: 10,
                dataLabels: {
                    position: "top", // top, center, bottom
                },
            },
        },
        dataLabels: {
            enabled: true,
            formatter: function (val) {
                return val;
            },
            offsetY: -20,
            style: {
                fontSize: "12px",
                colors: ["#304758"],
            },
        },

        xaxis: {
            categories: [
                "Jan",
                "Fev",
                "Mar",
                "Abr",
                "Mai",
                "Jun",
                "Jul",
                "Agos",
                "Set",
                "Out",
                "Nov",
                "Dez",
            ],
            position: "top",
            axisBorder: {
                show: false,
            },
            axisTicks: {
                show: false,
            },
            crosshairs: {
                fill: {
                    type: "gradient",
                    gradient: {
                        colorFrom: "#D8E3F0",
                        colorTo: "#BED1E6",
                        stops: [0, 100],
                        opacityFrom: 0.4,
                        opacityTo: 0.5,
                    },
                },
            },
            tooltip: {
                enabled: true,
            },
        },
        yaxis: {
            axisBorder: {
                show: false,
            },
            axisTicks: {
                show: false,
            },
            labels: {
                show: false,
                formatter: function (val) {
                    return val;
                },
            },
        },
        title: {
            text: "Condominios",
            floating: true,
            offsetY: 330,
            align: "center",
            style: {
                color: "#444",
            },
        },
    };

    const seriesColumn = [
        {
            name: "Condominios",
            data: data,
        },
    ];

    return (
        
        <ApexCharts
        style={{width:'100%'}}
            options={optionsColumn}
            series={seriesColumn}
            type="bar"
            height={350}
        />
    );
};

export default ChartColumn;
