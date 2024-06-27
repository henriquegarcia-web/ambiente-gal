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
import { Api } from "@/api/apiWebhook";
import WebHookForm from "./form";


const inter = Inter({
    weight: ["300", "400", "500", "600", "700", "900"],
    subsets: ["latin"]
});


const buttons = [];

export default function WebhookList({modalActive,setModalActive}) {
    const [loadingTable, setLoadingTable] = useState(false);
    const [modalActiveForm, setModalActiveForm] = useState(false);
    const [filterButton, setFilterButton] = useState("");
    const [item, setItem] = useState()
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedRow, setSelectedRow] = useState(null);
    const [listagem, setListagem] = useState([])
    const [listagemFilter, setListagemFilter] = useState([])
    const [buttonText, setButtonText] = useState('')
    const [disabled, setDisabled] = useState(false)
    useEffect(() => {
        setListagemFilter(listagem)
    }, [setListagem, listagem])
    const columns = [
        { field: "nome", headerName: "Nome", width: 200, align: "center" },
        { field: "url", headerName: "url", minWidth: 500, align: "center" },
        { field: "eventos", headerName: "Eventos", minWidth: 500, align: "center",  
        renderCell: (params) => (
            <div style={{ textAlign: 'center',  display: 'flex' }}>
                {params.row?.evento?.map((item)=>(
                    <p>{item?.label}</p>
                ))}
            </div>
        ), },
        {
            field: 'actions', headerName: 'Ação', width: 50,
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
        setModalActiveForm(true)
        handleDropdownClose();
    };
    const handleEditClick = (id) => {
        // Lógica de edição
        setButtonText("Editar")
        let item = listagem.filter((item) => item.id == id)[0]
   
        setItem(item)
        setDisabled(false)
        setModalActiveForm(true)
        handleDropdownClose();
    };
    const handleExcluirClick = (id) => {
        // Lógica de edição
        setButtonText("Excluir")
        let item = listagem.filter((item) => item.id == id)[0]
        setItem(item)
        setDisabled(false)
        setModalActiveForm(true)
        handleDropdownClose();
    };
    const handleViewClick = (id) => {
        setButtonText("Visualizar")
        let item = listagem.filter((item) => item.id == id)[0]
        setItem(item)
        setDisabled(true)
        setModalActiveForm(true)
        handleDropdownClose();
    };
    const handleListagem = async () => {
        let response = await Api.Listagem()
        if (response.list?.length > 0) {
            let listagem =  response.list.map((item)=>{return {...item,evento:item.evento.map((item2)=>{return {value:item2.id,label:item2.nome}})}})
            if ( listagem?.length > 0) {
                setListagem( listagem)
            }
        } else {
            if (response?.err && response?.err.status == 401) {
                window.location.href = '/'
            }
        }

    }
    const handleFilter = (e) => {
        let buscar = e.target.value
        let list = listagem.filter((item) => item.nome.toLocaleLowerCase().includes(buscar.toLocaleLowerCase()) || item.email.toLocaleLowerCase().includes(buscar.toLocaleLowerCase()) || item.cpf.toLocaleLowerCase().includes(buscar.toLocaleLowerCase()))
        setListagemFilter(list)
    }
    useEffect(() => {
        handleListagem()
    }, [])
    const myLocaleText = {
        noRowsLabel: 'Sem Linhas',
        page: 'Página',
        of: 'de',
        rowsPerPage: 'Linhas por página',
        // Adicione outras chaves conforme necessário
    };
    return (
        <Modal
            modalActive={modalActive}
            titleModal={''}
            handleClickModal={() => setModalActive(false)}
            minWidth={'76rem'}
        >
          
          
              
                    <TopBar
                     
                        pageHandleModal={() => {
                            handleCadastrarClick()
                        }}
                        pageTitle="Webhooks"
                        buttonText="Cadastrar"
                        top={false}
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
                                        : setFilterButton("")
                                }
                            />
                        ))}
                    </TopButtons>

                    <div className="dark:text-white-400">
                        <DataGrid
                            rows={listagemFilter}
                            columns={columns}
                            localeText={myLocaleText}
                            disableRowSelectionOnClick
                            sx={{ textAlign: "center",fontSize: "14px", fontFamily: inter.style.fontFamily, "&  .MuiDataGrid-columnHeaderTitleContainer": { justifyContent: "center" } }}
                        />
                    </div>
              

                <WebHookForm disabled={disabled} buttonText={buttonText} listagem={listagem} setListagem={setListagem} modalActive={modalActiveForm} setModalActive={setModalActiveForm} item={item} setItem={setItem} />
          
        </Modal>
    );
}
