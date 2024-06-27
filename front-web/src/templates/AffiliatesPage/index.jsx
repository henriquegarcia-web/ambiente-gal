import { Inter } from "next/font/google";
import React, { useEffect, useState } from "react";
import { SlOptions } from "react-icons/sl";
import Menu from '@mui/material/Menu';
import IconButton from '@mui/material/IconButton';
import SettingsIcon from '@mui/icons-material/Settings';
import ButtonTopBar from "@/components/ButtonTopBar";
import Container from "@/components/Container";
import Modal from "@/components/Modal";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";
import TopButtons from "@/components/TopButtons";
import { Api } from "@/api/apiAfiliado";
import { DataGrid } from "@mui/x-data-grid";
import { AfiliadoForm } from "./form";
import MenuItem from '@mui/material/MenuItem';
const inter = Inter({
    weight: ["300", "400", "500", "600", "700", "900"],
    subsets: ["latin"]
});




const buttons = [
];

export default function AffiliatesPage() {
    const [loadingTable, setLoadingTable] = useState(false);
    const [modalAction, setModalAction] = useState(false);
    const [listagem, setListagem] = useState([]);
    const [filterButton, setFilterButton] = useState("exemplo1");
    const [modalActive, setModalActive] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [item, setItem] = useState({});
    const [selectedRow, setSelectedRow] = useState(null);
    const [listagemFilter, setListagemFilter] = useState([])

    const handleDropdownClose = () => {
        setAnchorEl(null);
        setSelectedRow(null);
    };
    const columns = [
        {
            field: "afiliado",
            headerName: "Afiliado",
            minWidth: 200,
            align: "center",
            flex: 1,
            renderCell: (params) => (
                <div className="relative mx-auto">
                    {params.row.afiliado}
                </div>
            )
        },
        {
            field: "col2",
            headerName: "Data",
            minWidth: 200,
            flex: 1,
            align: "center",
            renderCell: (params) => (
                <div className="relative mx-auto">
                    {params.row.data}
                </div>
            )
        },
        {
            field: "col3",
            headerName: "Produto",
            minWidth: 200,
            align: "center",
            renderCell: (params) => (
                <div className="relative mx-auto">
                    {params.row.produto}
                </div>
            )
        },
        {
            field: "col4",
            headerName: "Comissão",
            minWidth: 150,
            align: "center",
            renderCell: (params) => (
                <div className="relative mx-auto">
                    {params.row.comissao}
                </div>
            )
        },
        {
            field: "col5",
            headerName: "Status",
            minWidth: 250,
            align: "center",
            flex: 1,
            renderCell: (params) => (
                <div style={{ textAlign: 'center', display: 'flex', backgroundColor: params.row.status == 'Aprovado' ? '#44C13C' : '#FACA15', padding: 5, borderRadius: 5 }}>
                    {params.row.status}
                </div>
            )
        },
        {
            field: "col6",
            headerName: "Ações",
            minWidth: 150,
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
                    <Menu
                        id="actions-menu"
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl && selectedRow === params.row.id)}
                        onClose={handleDropdownClose}
                    >
                        <MenuItem onClick={() => handleEditClick(params.row.id)}>Status</MenuItem>
                    </Menu>
                </div>
            ),
        }
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
    const handleListagem = async () => {
        let response = await Api.Listagem()
        if (response.list?.length > 0) {
            let listagem = response.list.filter((item) => item.type == 'Produtor')
            listagem = listagem.map((item) => { return { id: item.id, idProduto: item.produto.id, afiliado: item.produtor.nome, data: new Date(item.data).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' }), produto: item.produto.nome, comissao: ((item.produto.porcentagemAfialiacao / 100) * item.produto.preco).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }), status: item.status } })
            setListagem(listagem)
        } else {
            if (response?.err && response?.err.status == 401) {
                window.location.href = '/'
            }
        }
    }
    const handleEditClick = (id) => {
        // Lógica de edição
        let item = listagem.filter((item) => item.id == id)[0]
        setItem(item)
        setModalActive(true)
        handleDropdownClose();
    };
    const handleFilter = (e) => {
        let buscar = e.target.value
        let list = listagem.filter((item) => item.afiliado.toLocaleLowerCase().includes(buscar.toLocaleLowerCase()) || (item.status).toLocaleLowerCase().includes(buscar.toLocaleLowerCase()) || item.data.toLocaleLowerCase().includes(buscar.toLocaleLowerCase()) || item.comissao.toLocaleLowerCase().includes(buscar.toLocaleLowerCase()))
        setListagemFilter(list)
    }
    useEffect(() => {
        handleListagem()
    }, [])
    useEffect(() => {
        setListagemFilter(listagem)
    }, [setListagem, listagem])
    return (
        <div className="flex items-start justify-start">
            <Sidebar />
            <Container>
                <TopBar notRegistered pageTitle="Afiliados" buttonText="Novo Produto" />

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

            <AfiliadoForm listagem={listagem} setListagem={setListagem} modalActive={modalActive} setModalActive={setModalActive} item={item} setItem={setItem} />
        </div>
    );
}
