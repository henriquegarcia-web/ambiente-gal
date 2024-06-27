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
import { Api } from "@/api/apiProduto";
import { Api as ApiArea } from "@/api/apiAreaMembro";
import {ProdutoForm} from "./form";

const inter = Inter({
    weight: ["300", "400", "500", "600", "700", "900"],
    subsets: ["latin"]
});


const buttons = [];

export default function ProdutoPage() {
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
    const [listagemArea,setListagemArea] = useState([])
    useEffect(()=>{
        setListagemFilter(listagem)
    },[setListagem,listagem])
    const columns = [
        { field: "idAreaMembro", headerName: "Área Membro", minWidth: 200, align: "center",renderCell: (params) => (
            <div style={{ textAlign: 'center',display: 'flex' }}>
                {params.row.areaMembro?.nome}
            </div>
        ), },
        { field: "nome", headerName: "Nome", width: 200, align: "center" },
     
        { field: "preco", headerName: "Preço", minWidth: 100, align: "center",renderCell: (params) => (
            <div style={{ textAlign: 'center',display: 'flex' }}>
                {params.row.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </div>
        ) },
        { field: "tipo", headerName: "Tipo", minWidth: 200, align: "center",renderCell: (params) => (
            <div style={{ textAlign: 'center',display: 'flex' }}>
                {params.row.tipo?.nome?params.row.tipo.nome:(parseInt(params.row.tipo)==1?'Produto Principal':parseInt(params.row.tipo)==2?'Order Bump':parseInt(params.row.tipo)==3?'Downseel':'')}
            </div>
        ) },
        { field: "afiliacao", headerName: "Afiliação", minWidth: 200, align: "center" ,renderCell: (params) => (
            <div style={{ textAlign: 'center',display: 'flex' }}>
                {((params.row.afiliacao || params.row.afiliacao=='true') && params.row.afiliacao!='false')?'Disponível':'Indisponível'}
            </div>
        ),},
        { field: "porcentagemAfialiacao", headerName: "% Afiliação", minWidth: 100, align: "center" },
        { field: "status", headerName: "Status", minWidth: 200, align: "center",renderCell: (params) => (
            <div style={{ textAlign: 'center',display: 'flex' }}>
                {params.row.msg}
            </div>
        ), },
        {field: 'actions', headerName: 'Ação', width: 50,
            renderCell: (params) => (
                <div style={{ textAlign: 'center', color: 'red', display: 'flex' }}>
                    <IconButton
                        aria-label="more"
                        aria-controls="actions-menu"
                        aria-haspopup="true"
                        style={{ justifyContent: 'center', alignItems: 'center' }}
                        onClick={(event) => handleDropdownClick(event, params.row.id)}
                    >
                        <SettingsIcon />
                    </IconButton>
                    <Menu
                        id="actions-menu"
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl && selectedRow === params.row.id)}
                        onClose={handleDropdownClose}
                    >
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
        setItem(item)
        setDisabled(true)
        setModalActive(true)
        handleDropdownClose();
    };
    const handleListagem = async () => {
        let response = await Api.Listagem()
        if(response.list?.length>0){
            setListagem(response.list)
        }else{
            if(response?.err && response?.err.status==401){
                window.location.href = '/'
            }
        }
    }
    const handleFilter = (e) =>{
        let buscar = e.target.value
        let list  = listagem.filter((item)=>item.nome.toLocaleLowerCase().includes(buscar.toLocaleLowerCase()) || (item.afiliacao?'Disponivel':'Indisponivel')?.toLocaleLowerCase().includes(buscar.toLocaleLowerCase()) || String(item.preco).toLocaleLowerCase().includes(buscar.toLocaleLowerCase()) )
        setListagemFilter(list)
    }
    const handleListagemArea = async ()=>{
        let response = await ApiArea.Listagem()
        if(response.list?.length>0){
            let listagem = response.list.filter((item)=>item.nome)
            setListagemArea(listagem)
        }else{
            if(response?.err && response?.err.status==401){
                window.location.href = '/'
            }
        }
       
    }
    useEffect(() => {
        handleListagem()
        handleListagemArea()
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
                    pageTitle="Produtos"
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
                                    : setFilterButton("") }/>
                    ))}
                </TopButtons>
                <div className="dark:text-white-400">
                    <DataGrid rows={listagemFilter} columns={columns} localeText={myLocaleText} disableRowSelectionOnClick sx={{ textAlign: "center", fontSize: "14px", fontFamily: inter.style.fontFamily, "&  .MuiDataGrid-columnHeaderTitleContainer": { justifyContent: "center" } }} />
                </div>
            </Container>
            <ProdutoForm disabled={disabled} buttonText={buttonText} listagem={listagem} setListagem={setListagem} modalActive={modalActive} setModalActive={setModalActive} item={item} setItem={setItem}  areaMembros={listagemArea} />
        </div>
    );
}
