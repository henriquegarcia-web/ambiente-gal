import dynamic from 'next/dynamic';

const ApexCharts = dynamic(() => import('react-apexcharts'), {
  ssr: false // Isso garante que o componente seja renderizado apenas no lado do cliente
});

const ChartDonut = ({data}) => {
    const optionsDonut = {
        title: {
            text: "",
            align: "left",
        },
        labels: ["Pix", "Boleto", "Cartão"],
    };

    const seriesDonut = [data?.pix?data.pix:0,data?.boleto?data.boleto:0,data?.cartao?data?.cartao:0];

    return (
        
        <ApexCharts
        style={{width:'100%'}}
            options={optionsDonut}
            series={seriesDonut}
            type="donut"
            height={350}
        />
    );
};

export default ChartDonut;
