import dynamic from "next/dynamic";
import { Inter } from "next/font/google";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import ChartLine from "../../components/ChartLine";
import ChartBar from "../../components/ChartBar";
import ChartDonut from "../../components/ChartDonut";
import ChartColumn from "../../components/ChartColumn";
import Container from "@/components/Container";
import PaymentsBar from "@/components/PaymentsBar";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";
import { Api } from "@/api/apiDashboard";
import "swiper/css";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const inter = Inter({
    weight: ["300", "400", "500", "600", "700", "900"],
    subsets: ["latin"]
});

const DashboardPage = () => {
    const [valorLiquido, setValorLiquido] = useState(0)
    const [taxaAprovacaoCartao, setTaxaAprovacaoCartao] = useState(0)
    const [boletosGerados, setBoletosGerados] = useState(0)
    const [taxaAprovacaoBoleto, setTaxaAprovacaoBoleto] = useState(0)
    const [cartao, setCartao] = useState(0)
    const [boleto, setBoleto] = useState(0)
    const [pix, setPix] = useState(0)
    const [vendasAnuais, setVendasAnuais] = useState([])
    const [valorTotal, setValorTotal] = useState(0)
    const [valores, setValores] = useState()
   
    const [obj, setObj] = useState({})
    useEffect(() => {
        const getAuthUser = localStorage?.getItem("authUser");
        let obj = getAuthUser == "undefined" || getAuthUser == null || getAuthUser == "[object Object]" ? "" : JSON.parse(getAuthUser ? getAuthUser : "");
      
        setObj(obj)
        
    }, [])
    useEffect(() => {
        handleDados()
    }, [obj])
    const [listagem, setListagem] = useState([]);
    const [vendasDiarias, setVendasDiarias] = useState([]);
    const handleDados = async () => {
        setListagem([])
        let response = await Api.Dados()
        setVendasDiarias(response.vendasDiarias)
        setValores(response)
        let listagem
        if(obj.permissao ==1){
            listagem = [
                { title: "Valor Total", number: response.valorDisponivel ? response.valorDisponivel : 0, positive: true, },
                { title: "Valor Hoje", number: response.valorHoje ? response.valorHoje : 0, positive: false, },
                { title: "Grafico", number: response.valorHoje ? response.valorHoje : 0, positive: false, },
            ];
        }else{
            listagem = [
                { title: "Valor Total", number: response.valorTotal ? response.valorTotal : 0, positive: false, },
                { title: "Valor Pendente", number: response.valorPendente ? response.valorPendente : 0, positive: true, },
                { title: "Valor Disponivel", number: response.valorDisponivel ? response.valorDisponivel : 0, positive: true, },
                { title: "Valor Hoje", number: response.valorHoje ? response.valorHoje : 0, positive: false, },
                { title: "Grafico", number: response.valorHoje ? response.valorHoje : 0, positive: false, },
            ];
        }
        

        setListagem(listagem)
    }



    return (
        <div className="flex">
            <Sidebar />
            <Container>

                <TopBar notRegistered pageTitle="Dashboard" />
                <div style={{ padding: 20, backgroundColor: '#F9F9F9', borderRadius: 20, margin: 20 }}>
                    <div className="dashboard__caroulsel">
                        <Swiper
                            spaceBetween={30}
                            slidesPerView={1.0}
                            breakpoints={{
                                768: {
                                    slidesPerView: 3.5,
                                    spaceBetween: 30,
                                },
                                1024: {
                                    slidesPerView: 5.5,
                                    spaceBetween: 50,
                                },
                            }}
                        >
                            {listagem.map((card, index) => (
                                <SwiperSlide key={index} style={{marginRight:-10}}  >
                                    {card.title !='Grafico'

                                        ?
                                        < div className="dashboard__card" style={{  padding:'10px 10px 10px 10px' ,borderRadius:10, backgroundColor: '#01171F', color: '#fff' ,}}>
                                            <h3>{card.title}</h3>
                                            <div className="dashboard__data">
                                                <div className="dashboard__number">
                                                    <p>{card.number.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                                                </div>

                                            </div>

                                        </div>

                                        :
                                        <div className="flex items-center justify-center relative mb-5" style={{width:300}}>
                                            <ChartDonut data={valores} />
                                        </div>


                                    }


                                </SwiperSlide>

                            ))}
                        </Swiper>
                    </div>
                 
                    <div className="grid grid-cols-1 gap-x-1 lg:grid-cols-1 lg:gap-x-1" style={{ padding: 20, marginTop: 10 }}>


                        <div className="flex items-center justify-center relative mb-5">
                            <ChartLine data={vendasDiarias} />
                        </div>



                    </div>



                </div>

            </Container >
        </div >
    );
};

export default DashboardPage;
