import React, { useEffect, useState } from "react";

import BoxMarketplace from "@/components/BoxMarketplace";
import ButtonTopBar from "@/components/ButtonTopBar";
import Container from "@/components/Container";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";
import TopButtons from "@/components/TopButtons";
import { Api } from "@/api/apiAfiliado";
import { ProdutoForm } from "../ProductsPage/form";
import { Api as ApiProduto } from "@/api/apiProduto";
import { Api as ApiArea } from "@/api/apiAreaMembro";
const buttons = [];

export default function MarketplacePage() {
    const [filterButton, setFilterButton] = useState("");
    const [listagem, setListagem] = useState([])
    const [listagemFilter, setListagemFilter] = useState([])
    const [modalActive, setModalActive] = useState(false);
    const [item, setItem] = useState()
    const [listagemArea,setListagemArea] = useState([])

    const handleListagemArea = async ()=>{
        let response = await ApiArea.Listagem()
        if(response.list?.length>0){
            setListagemArea(response.list)
        }else{
            if(response?.err && response?.err.status==401){
                window.location.href = '/'
            }
        }
    }
    const handleListagem = async ()=>{
        let response = await Api.Produtos()
        if(response.list?.length>0){
            let listagem = response.list.map((item)=>{return {id:item.id,nome:item.nome,descricao:item.descricao,imagem:item.imagem,msg:item.msg,comissao:((item.porcentagemAfialiacao/100) * item.preco).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),status:item.status}})
            setListagem(listagem)
        }else{
            if(response?.err && response?.err.status==401){
                window.location.href = '/'
            }
        }
       
    }
    const handleViewClick = async (id) => {
        let response = await ApiProduto.Visualizar(id)
        setItem(response.list[0])
        setModalActive(true)
    };
    const handleAfiliar = async (id) => {
        let response = await Api.Cadastrar({idProduto:id})
        if(response.error){
            alert(response.msg)
        }else{
            alert(response.msg)
        }
    };
    useEffect(()=>{
        setListagemFilter(listagem)
    },[setListagem,listagem])
    useEffect(()=>{
        handleListagemArea()
        handleListagem()
    },[])
    return (
        <div className="flex items-start justify-start">
            <Sidebar />
            <Container>
            <TopBar notRegistered  pageTitle="Mais vendidos do Marketplace" buttonText="Novo Produto" />


                <TopButtons search>
                    {buttons.map((button, index) => (
                        <ButtonTopBar
                            key={index}
                            nameButton={button.title}
                            filterButton={filterButton}
                            filterCondition={button.typeFilter}
                            handleFilterButton={() =>
                                filterButton !== button.typeFilter
                                    ? setFilterButton(button.typeFilter)
                                    : setFilterButton("")
                            }
                        />
                    ))}
                </TopButtons>

                <section className="flex items-center justify-center flex-col pb-8 sm:grid sm:grid-cols-2 sm:gap-8 lg:grid-cols-4 px-6">
                   
                    {listagemFilter.map((item)=>(
                         <BoxMarketplace marketplace image={`${process.env.NEXT_PUBLIC_API_URL}/arquivo/${item.imagem}`}
                         imageAlt="Representation Marketplace"
                         title={item.nome}
                         description={item.descricao}
                         valueDescription="Receba até"
                         value={item.comissao}
                         status={item.msg}
                         handleClick={()=>handleAfiliar(item.id)}
                         handleView={()=>handleViewClick(item.id)}
                     />
                    ))}
                </section>
            </Container>
            <ProdutoForm disabled={true} buttonText={'Visualizar'} listagem={[]} setListagem={()=>{}} modalActive={modalActive} setModalActive={setModalActive} item={item} setItem={()=>{}}  areaMembros={listagemArea} />
        </div>
    );
}
