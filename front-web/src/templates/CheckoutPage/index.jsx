import { Inter } from "next/font/google";
import React, { useEffect, useRef, useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import ButtonTopBar from "@/components/ButtonTopBar";
import Container from "@/components/Container";
import Modal from "@/components/Modal";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";
import TopButtons from "@/components/TopButtons";
import { DataGrid } from "@mui/x-data-grid";
import SettingsIcon from '@mui/icons-material/Settings';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import { Api } from "@/api/apiCheckout";
import { Api as ApiCupom } from "@/api/apiCupom";
import { Api as ApiPixel } from "@/api/apiPixel";
import { Api as ApiProduto } from "@/api/apiProduto";
import { CheckoutForm } from "./form";
import Link from "next/link";

const inter = Inter({
    weight: ["300", "400", "500", "600", "700", "900"],
    subsets: ["latin"]
});


const buttons = [];

export default function CheckoutPage() {
    const [loadingTable, setLoadingTable] = useState(false);
    const [filterButton, setFilterButton] = useState("");
    const [modalActive, setModalActive] = useState(false);
    const [item, setItem] = useState()
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedRow, setSelectedRow] = useState(null);
    const [listagem, setListagem] = useState([])
    const [listagemFilter, setListagemFilter] = useState([])
    const [buttonText, setButtonText] = useState('')
    const [disabled, setDisabled] = useState(false)
    const [listagemCupom, setListagemCupom] = useState([])
    const [listagemPixel, setListagemPixel] = useState([])
    const [listagemProdutos, setListagemProdutos] = useState([])
    useEffect(() => {
        console.log(listagem)
        setListagemFilter(listagem)
    }, [setListagem, listagem])
    const columns = [
        {
            field: "corPrimaria", headerName: "Cor Primaria", minWidth: 100, align: "center", renderCell: (params) => (
                <div style={{ textAlign: 'center', display: 'flex',backgroundColor:`${params.row.corPrimaria?params.row.corPrimaria:'#000'}` ,color:'#fff',padding:5,borderRadius:6}}>
                    {params.row.corPrimaria}
                </div>
            )
        },
        {
            field: "corSecundaria", headerName: "Cor Secundaria", minWidth: 100, align: "center", renderCell: (params) => (
                <div style={{ textAlign: 'center', display: 'flex' ,backgroundColor:`${params.row.corSecundaria?params.row.corSecundaria:'#000'}`,color:'#fff',padding:5,borderRadius:6}}>
                    {params.row.corSecundaria}
                </div>
            )
        },
        {
            field: "corTerciaria", headerName: "Cor Terciaria", minWidth: 100, align: "center", renderCell: (params) => (
                <div style={{ textAlign: 'center', display: 'flex' ,backgroundColor:`${params.row.corTerciaria?params.row.corTerciaria:'#000'}`,color:'#fff',padding:5,borderRadius:6}}>
                    {params.row.corTerciaria}
                </div>
            )
        },
        {
            field: "corQuaternaria", headerName: "Cor Quaternaria", minWidth: 100, align: "center", renderCell: (params) => (
                <div style={{ textAlign: 'center', display: 'flex' ,backgroundColor:`${params.row.corQuaternaria?params.row.corQuaternaria:'#000'}`,color:'#fff',padding:5,borderRadius:6}}>
                    {params.row.corQuaternaria}
                </div>
            )
        },
        { field: "nome", headerName: "Nome", width: 300, align: "center" },
        {
            field: "status", headerName: "Status", width: 150, align: "center", renderCell: (params) => (
                <div style={{ textAlign: 'center', display: 'flex', backgroundColor: params.row.status ? '#44C13C' : '#FACA15', padding: 5, borderRadius: 5 }}>
                    {params.row.status ? 'Ativo' : 'Desativado'}
                </div>
            )
        },
        {
            field: 'link', headerName: 'Link', width: 300, align: "center",
            renderCell: (params) => (
                <Link href={`/checkout-sale/${params.row.link}`} target="_blank" as={`/checkout-sale/${params.row.link}`} >Acessar</Link>
            ),
        },

        {
            field: 'actions', headerName: 'Ação', width: 50,
            renderCell: (params) => (
                <div style={{ textAlign: 'center', color: 'red', display: 'flex' }}>
                    <IconButton
                        aria-label="more"
                        aria-controls="actions-menu"
                        aria-haspopup="true"
                        style={{ justifyContent: 'center', alignItems: 'center' }}
                        onClick={(event) => handleDropdownClick(event, params.row.id)}>
                        <SettingsIcon />
                    </IconButton>
                    <Menu id="actions-menu" anchorEl={anchorEl} open={Boolean(anchorEl && selectedRow === params.row.id)} onClose={handleDropdownClose} >
                        <MenuItem onClick={() => handleEditClick(params.row.id)}>Editar</MenuItem>
                        <MenuItem onClick={() => handleViewClick(params.row.id)}>Visualizar</MenuItem>
                        <MenuItem onClick={() => handleExcluirClick(params.row.id)}>Excluir</MenuItem>
                    </Menu>
                </div>
            ),
        },
    ];

    useEffect(() => {
        setTimeout(() => {
            setLoadingTable(true);
        }, 500);

    }, [loadingTable]);


    const handleDropdownClick = (event, id) => {
        setAnchorEl(event.currentTarget);
        setSelectedRow(id);
    };

    const handleDropdownClose = () => {
        setAnchorEl(null);
        setSelectedRow(null);
    };
    const handleCadastrarClick = () => {
        // Lógica de edição
        setButtonText("Cadastrar")
        setItem({})
        setDisabled(false)
        setModalActive(true)
        handleDropdownClose();
    };
    const handleEditClick = (id) => {
        // Lógica de edição
        setButtonText("Editar")
        let item = listagem.filter((item) => item.id == id)[0]
        item = { ...item, recorrencia: item.tipo, idProduto: item.idProduto }
   
        setItem(item)
        setDisabled(false)
        setModalActive(true)
        handleDropdownClose();
    };
    const handleExcluirClick = (id) => {
        // Lógica de edição
        setButtonText("Excluir")
        let item = listagem.filter((item) => item.id == id)[0]
        setItem(item)
        setDisabled(false)
        setModalActive(true)
        handleDropdownClose();
    };
    const handleViewClick = (id) => {
        setButtonText("Visualizar")
        let item = listagem.filter((item) => item.id == id)[0]
        item = { ...item, recorrencia: item.tipo, idProduto: item.idProduto }
        setItem(item)
        setDisabled(true)
        setModalActive(true)
        handleDropdownClose();
    };
    const handleListagem = async () => {
        let response = await Api.Listagem()
        if (response.list?.length > 0) {
            let listagem = response.list.map((item)=>{return {...item,idProduto: item.produtos.map((itens) => { return { label: itens.nome, value: itens.id } }),idPixel: item.pixels.map((itens) => { return { label: itens.nome, value: itens.id } }),tipo:item.tipo.map((item)=>{return {label:item.nome,value:item.id}})}})
     
            setListagem(listagem)
        } else {
            if (response?.err && response?.err.status == 401) {
                window.location.href = '/'
            }
        }
    }
    const handleFilter = (e) => {
        let buscar = e.target.value
        let list = listagem.filter((item) => item.nome.toLocaleLowerCase().includes(buscar.toLocaleLowerCase()) || (item.cupom?.nome?item.cupom?.nome.toLocaleLowerCase():'').includes(buscar.toLocaleLowerCase()) || (item.pixel?.nome?item.pixel?.nome.toLocaleLowerCase():'').includes(buscar.toLocaleLowerCase()) || (item.status ? 'Ativo' : 'Desativado').toLocaleLowerCase().includes(buscar.toLocaleLowerCase()))
        setListagemFilter(list)
    }
    const handleListagemCupom = async () => {
        let response = await ApiCupom.Listagem()
        setListagemCupom(response.list)
    }
    const handleListagemPixel = async () => {
        let response = await ApiPixel.Listagem()
        let options = response.list?.map((item) => { return { label: item.nome, value: item.id } })
        setListagemPixel(options)
    }
    const handleListagemProdutos = async () => {
        let response = await ApiProduto.Listagem()
        let options = response.list?.map((item) => { return { label: item.nome, value: item.id } })
        setListagemProdutos(options)
    }
    useEffect(() => {
        handleListagem()
        handleListagemCupom()
        handleListagemPixel()
        handleListagemProdutos()
    }, [])
    const myLocaleText = {
        noRowsLabel: 'Sem Linhas',
        page: 'Página',
        of: 'de',
        rowsPerPage: 'Linhas por página',
        // Adicione outras chaves conforme necessário
    };
    return (
        <div className="flex items-start justify-start">
            <Sidebar />
            <Container>
                <TopBar
                    notRegistered
                    pageHandleModal={() => {
                        handleCadastrarClick()
                    }}
                    pageTitle="Checkout"
                    buttonText="Cadastrar"
                />
                <TopButtons search handleFilter={handleFilter}>
                    {buttons.map((button, index) => (
                        <ButtonTopBar
                            key={index}
                            nameButton={button.title}
                            filterButton={filterButton}
                            filterCondition={button.typeFilter}
                            handleFilterButton={() =>
                                filterButton !== button.typeFilter
                                    ? setFilterButton(button.typeFilter)
                                    : setFilterButton("")} />
                    ))}
                </TopButtons>
                <div className="dark:text-white-400">
                    <DataGrid rows={listagemFilter} columns={columns} localeText={myLocaleText} disableRowSelectionOnClick sx={{ textAlign: "center", fontSize: "14px", fontFamily: inter.style.fontFamily, "&  .MuiDataGrid-columnHeaderTitleContainer": { justifyContent: "center" } }} />
                </div>
            </Container>
            <CheckoutForm disabled={disabled} buttonText={buttonText} listagem={listagem} setListagem={setListagem} modalActive={modalActive} setModalActive={setModalActive} item={item} setItem={setItem} cupons={listagemCupom} pixels={listagemPixel} produtos={listagemProdutos} />
        </div>
    );
}
