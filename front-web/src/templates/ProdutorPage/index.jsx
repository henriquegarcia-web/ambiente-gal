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
import { Api } from "@/api/apiProdutor";
import ProdutorForm from "./form";

const inter = Inter({
    weight: ["300", "400", "500", "600", "700", "900"],
    subsets: ["latin"]
});


const buttons = [];

export default function ProdutorPage() {
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
    useEffect(() => {
        setListagemFilter(listagem)
    }, [setListagem, listagem])
    const columns = [

        { field: "nome", headerName: "Nome", width: 250, align: "center" },
        { field: "email", headerName: "Email", width: 250, align: "center" },
        { field: "saque", headerName: "Saque", minWidth: 150, align: "center", renderCell: (params) => (
                <div style={{ textAlign: 'center', display: 'flex' }}>
                    {params.row.saque?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </div>
            ) 
        },
        { field: "taxaFixa", headerName: "Taxa Fixa", minWidth: 150, align: "center", renderCell: (params) => (
                <div style={{ textAlign: 'center', display: 'flex' }}>
                    {params.row.taxaFixa?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </div>
            )
        },
        { field: "taxaVariavel", headerName: "Taxa Variável (%)", minWidth: 150, align: "center", renderCell: (params) => (
                <div style={{ textAlign: 'center', display: 'flex' }}>
                    {params.row.taxaVariavel}
                </div>
            )
        },
        { field: "cpfCnpj", headerName: "CPF/CNPJ", minWidth: 250, align: "center" },
        { field: "status", headerName: "Dados", minWidth: 100, align: "center",
            renderCell: (params) => (
                <div style={{ textAlign: 'center', display: 'flex', backgroundColor: params.row.status == 'Completo' ? '#44C13C' : '#FACA15', padding: 5, borderRadius: 5 }}>
                    {params.row.status}
                </div>
            )
        },
        { field: 'actions', headerName: 'Ação', width: 50,
            renderCell: (params) => (
                <div style={{ textAlign: 'center', color: 'red', display: 'flex' }}>
                    <IconButton aria-label="more" aria-controls="actions-menu" aria-haspopup="true" style={{ justifyContent: 'center', alignItems: 'center' }} onClick={(event) => handleDropdownClick(event, params.row.id)}>
                        <SettingsIcon />
                    </IconButton>
                    <Menu id="actions-menu" anchorEl={anchorEl} open={Boolean(anchorEl && selectedRow === params.row.id)}  onClose={handleDropdownClose}>
                        <MenuItem onClick={() => handleEditClick(params.row.id)}>Editar</MenuItem>
                        <MenuItem onClick={() => handleViewClick(params.row.id)}>Visualizar</MenuItem>
                        <MenuItem onClick={() => handleExcluirClick(params.row.id)}>Excluir</MenuItem>
                        <MenuItem onClick={() => handleTaxaClick(params.row.id)}>Taxas</MenuItem>
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
    const handleTaxaClick = (id) => {
        // Lógica de edição
        setButtonText("Taxa")
        let item = listagem.filter((item) => item.id == id)[0]
      
        setItem(item)
        setDisabled(true)
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
        if (response.list?.length > 0) {
            
            let listagem = response.list?.map((item) => { return { ...item, status:item.validar==1 ? "Completo" : "Incompleto" } })
            if (listagem?.length > 0) {
                setListagem(listagem)
            }
        } else {
            if (response?.err && response?.err.status == 401) {
                window.location.href = '/'
            }
        }

    }
    const handleFilter = (e) => {
        let buscar = e.target.value
        let list = listagem.filter((item) => item.nome.toLocaleLowerCase().includes(buscar.toLocaleLowerCase()) || item.email.toLocaleLowerCase().includes(buscar.toLocaleLowerCase()) || item.cpfCnpj.toLocaleLowerCase().includes(buscar.toLocaleLowerCase()) || String(item.saque)?.replace('.', ',').toLocaleLowerCase().includes(buscar.toLocaleLowerCase()) || String(item.taxaFixa)?.replace('.', ',').toLocaleLowerCase().includes(buscar.toLocaleLowerCase()) || String(item.taxaVariavel)?.replace('.', ',').toLocaleLowerCase().includes(buscar.toLocaleLowerCase()))
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
        <div className="flex items-start justify-start">
            <Sidebar />
            <Container>
                <TopBar notRegistered pageHandleModal={() => { handleCadastrarClick() }} pageTitle="Produtores" buttonText="Cadastrar" />

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
                        sx={{ textAlign: "center", fontSize: "14px", fontFamily: inter.style.fontFamily, "&  .MuiDataGrid-columnHeaderTitleContainer": { justifyContent: "center" } }}
                    />
                </div>
            </Container>

            <ProdutorForm disabled={disabled} buttonText={buttonText} listagem={listagem} setListagem={setListagem} modalActive={modalActive} setModalActive={setModalActive} item={item} setItem={setItem} />
        </div>
    );
}
