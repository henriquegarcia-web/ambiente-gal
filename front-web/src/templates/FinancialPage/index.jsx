import { Inter } from "next/font/google";
import React, { useEffect, useState } from "react";
import { IoWalletOutline } from "react-icons/io5";
import { TfiStatsUp } from "react-icons/tfi";
import IconButton from '@mui/material/IconButton';
import BoxFinancial from "@/components/BoxFinancial";
import ButtonTopBar from "@/components/ButtonTopBar";
import Container from "@/components/Container";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";
import TopButtons from "@/components/TopButtons";
import SettingsIcon from '@mui/icons-material/Settings';
import { DataGrid } from "@mui/x-data-grid";
import { Api } from "@/api/apiTransacao";
import { Api as ApiProdutor } from "@/api/apiProdutor";
import { TransacaoForm } from "./form";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { StatusForm } from "./status";

const inter = Inter({
    weight: ["300", "400", "500", "600", "700", "900"],
    subsets: ["latin"]
});

const rows = [
    { id: 1, col1: "14/10/2023", col2: "R$ 1.000,00", col3: "Ativo" },
    { id: 2, col1: "14/10/2023", col2: "R$ 1.000,00", col3: "Cancelado" },
    { id: 3, col1: "14/10/2023", col2: "R$ 1.000,00", col3: "Em aprovação" }
];

const styleRowStatus = [
    "px-4",
    "py-2",
    "rounded-full",
    "text-white-400",
    "text-xs",
    "font-semibold"
];

const buttons = [];

export default function FinancialPage() {
    const [anchorEl, setAnchorEl] = useState(null);
    const [loadingTable, setLoadingTable] = useState(false);
    const [filterButton, setFilterButton] = useState("exemplo1");
    const [listagem, setListagem] = useState([])
    const [listagemFiltrar, setListagemFiltrar] = useState([])
    const [modalActive, setModalActive] = useState(false)
    const [modalStatus, setModalStatus] = useState(false)
    const [saldoDisponivel, setSaldoDisponivel] = useState(0)
    const [valorRetido, setValorRetido] = useState(0)
    const [saldoPendente, setSaldoPendente] = useState(0)
    const [selectedRow, setSelectedRow] = useState(null);
    const [buttonText, setButtonText] = useState('')
    const [item, setItem] = useState({})
    const [obj, setObj] = useState({})
    const handleDropdownClose = () => {
        setAnchorEl(null);
        setSelectedRow(null);
    };
    useEffect(() => {
        handleListagem()
        handleProdutor()
    }, [])
    useEffect(() => {
        setListagemFiltrar(listagem)
    }, [listagem])
    useEffect(() => {
        const getAuthUser = localStorage?.getItem("authUser");
        let obj = getAuthUser == "undefined" || getAuthUser == null || getAuthUser == "[object Object]" ? "" : JSON.parse(getAuthUser ? getAuthUser : "");

        setObj(obj)
        if (!obj?.id) {
            localStorage.setItem("authUser", "{}");
            window.location.href = '/'
        } else {
            handleProdutor(obj.idConta)
        }
    }, [])
    const handleListagem = async () => {
        let response = await Api.Listagem()
        if (response.list && response?.list.length > 0) {
            setListagem(response.list)
            setListagemFiltrar(response.list)
        } else {
            if (response?.err && response?.err.status == 401) {
                window.location.href = '/'
            }
        }
    }
    const handleProdutor = async (id) => {
        if (id) {
            let response = await ApiProdutor.ListagemIndividual({ id })
            if (response.list && response?.list.length > 0) {
                let dados = response.list[0]

                if (dados.saldoDisponivel) {
                    setSaldoDisponivel(dados.saldoDisponivel)
                }
                if (dados.saldoPendente) {
                    setSaldoPendente(dados.saldoPendente)
                }
                if (dados.valorRetido) {
                    setValorRetido(dados.valorRetido)
                }
            }
        }

    }
    const columns = [
        obj.permissao==1 && {
            field: "produtor", headerName: "Produtor", minWidth: 300, align: "center", renderCell: (params) => (
                <div style={{ textAlign: 'center', display: 'flex' }}>
                    {params.row?.produtor?.nome}
                </div>
            ),
        },
        
        {
            field: "saldoDisponivel", headerName: "Saldo Disponivel", minWidth: 300, align: "center", renderCell: (params) => (
                <div style={{ textAlign: 'center', display: 'flex' }}>
                    {params.row?.saldoDisponivel?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </div>
            ),
        },
          
        {
            field: "valorRetido", headerName: "Valor Retido", minWidth: 300, align: "center", renderCell: (params) => (
                <div style={{ textAlign: 'center', display: 'flex' }}>
                    {params.row?.saldoRetido?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </div>
            ),
        },
        {
            field: "tipoValor", headerName: "Tipo valor", minWidth: 300, align: "center", renderCell: (params) => (
                <div style={{ textAlign: 'center', display: 'flex' }}>
                    {parseInt(params.row?.tipoValor) ==1?'Saldo Disponivel':'Valor Retido'}
                </div>
            ),
        },
       
       
        {
            field: "valor", headerName: "Valor Solicitado", minWidth: 300, align: "center", renderCell: (params) => (
                <div style={{ textAlign: 'center', display: 'flex' }}>
                    {params.row.valor?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </div>
            ),
        },
        {
            field: "taxa", headerName: "Taxa", minWidth: 300, align: "center", renderCell: (params) => (
                <div style={{ textAlign: 'center', display: 'flex' }}>
                    {params.row.taxa?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </div>
            ),
        },
        {
            field: "valorLiquido", headerName: "Valor Liquido", minWidth: 300, align: "center", renderCell: (params) => (
                <div style={{ textAlign: 'center', display: 'flex' }}>
                    {params.row.valorLiquido?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </div>
            ),
        },
        {
            field: "data", headerName: "Data", minWidth: 300, align: "center", renderCell: (params) => (
                <div style={{ textAlign: 'center', display: 'flex' }}>
                    {new Date(params.row?.data + 'T00:00:00')?.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })} - {params.row.hora}
                </div>
            ),
        },
        {
            field: "status", headerName: "Status", minWidth: 300, align: "center", renderCell: (params) => (
                <div style={{ textAlign: 'center', display: 'flex' }}>
                    {params.row.status == 1 ? 'Em Analise' : params.row.status == 2 ? 'Aprovado' : 'Recusado'}
                </div>
            ),
        },
       
        (obj.permissao != 3) &&
        { field: 'actions', headerName: 'Ação', width: 50,
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
                        <MenuItem onClick={() => handleValidarClick(params.row.id)}>Status</MenuItem>
                    </Menu>
                </div>
            ),
        }
    ];

    const handleDropdownClick = (event, id) => {
        setAnchorEl(event.currentTarget);
        setSelectedRow(id);
    };
    useEffect(() => {
        setTimeout(() => {
            setLoadingTable(true);
        }, 500);

        if (typeof document !== "undefined") {
            const row = document.querySelectorAll(".MuiDataGrid-cellContent");

            row.forEach((row) => {
                if (row.getAttribute("title") === "Ativo") {
                    row.classList.add("bg-green-400");

                    styleRowStatus.forEach((style) => {
                        row.classList.add(style);
                    });
                }

                if (row.getAttribute("title") === "Cancelado") {
                    row.classList.add("bg-red-400");

                    styleRowStatus.forEach((style) => {
                        row.classList.add(style);
                    });
                }

                if (row.getAttribute("title") === "Em aprovação") {
                    row.classList.add("bg-yellow-400");

                    styleRowStatus.forEach((style) => {
                        row.classList.add(style);
                    });
                }
            });
        }
    }, [loadingTable]);
    const handleValidarClick = (id) => {
        setButtonText("Editar")
        let item = listagem.filter((item) => item.id == id)[0]
        setItem(item)
        setModalStatus(true)
        handleDropdownClose();
    };
    const handleClique = () => {
        setModalActive(true)
    }
    return (
        <div className="flex items-start justify-start">
            <Sidebar />
            <Container>
                <TopBar notRegistered pageHandleModal={obj.permissao == 3 && handleClique} pageTitle="Financeiro" buttonText="Novo saque" />

                {obj.permissao == 3 &&
                    <div className="py-4 pb-8 px-6 flex items-start justify-start flex-row sm:flex-row border-b border-b-gray-border">
                        <BoxFinancial title="Saldo disponível" value={saldoDisponivel?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}>
                            <IoWalletOutline className="w-5 h-5 fill-gray-400 dark:fill-white-400" />
                        </BoxFinancial>

                        <BoxFinancial title="Saldos pendentes" value={saldoPendente?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}>
                            <TfiStatsUp className="w-5 h-5 fill-gray-400 dark:fill-white-400" />
                        </BoxFinancial>
                        <BoxFinancial title="Saldo Retido" value={valorRetido?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}>
                            <TfiStatsUp className="w-5 h-5 fill-gray-400 dark:fill-white-400" />
                        </BoxFinancial>
                    </div>
                }


                <TopButtons >
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
                        rows={listagemFiltrar}
                        columns={columns}
                        disableRowSelectionOnClick
                        sx={{
                            textAlign: "center",
                            fontSize: "14px",
                            fontFamily: inter.style.fontFamily,
                            "&  .MuiDataGrid-columnHeaderTitleContainer": {
                                justifyContent: "center"
                            }
                        }}
                    />
                </div>
            </Container>
            <TransacaoForm buttonText={'Solicitar Saque'} saldoDisponivel={saldoDisponivel} listagem={listagem} setListagem={setListagem} modalActive={modalActive} setModalActive={setModalActive} />
            <StatusForm buttonText={"Validação"} listagem={listagem} setListagem={setListagem} modalActive={modalStatus} setModalActive={setModalStatus} item={item} setItem={setItem} />
        </div>
    );
}
