import { Inter } from "next/font/google";
import React, { useEffect, useRef, useState } from "react";
import SettingsIcon from '@mui/icons-material/Settings';
import { DataGrid } from "@mui/x-data-grid";
import { IconButton, Menu, MenuItem } from "@mui/material";
import Link from "next/link";

const inter = Inter({
    weight: ["300", "400", "500", "600", "700", "900"],
    subsets: ["latin"]
});


const AreaMembro = ({ listagem,setButtonText,setItem,setDisabled,setModalActive }) => {
    const [loadingTable, setLoadingTable] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedRow, setSelectedRow] = useState(null);
    const handleDropdownClick = (event, id) => {
        setAnchorEl(event.currentTarget);
        setSelectedRow(id);
    };

    const handleDropdownClose = () => {
        setAnchorEl(null);
        setSelectedRow(null);
    };
    const columns = [
        { field: 'imagem', headerName: 'imagem', width: 300, align: "center" ,
            renderCell: (params) => (
                <>
                {params.row?.imagem ?
                  <img src={params.row?.imagem?.includes('blob')?`${params.row.imagem}`:`${process.env.NEXT_PUBLIC_API_URL}/arquivo/${params.row.imagem}`} width={90} style={{justifyItems:'center',alignItems:'center',padding:'auto',display:'flex',marginLeft:'40%',borderRadius:10}} />
                :
                <img src={''} />
            }
             </>
            ),
        },
        { field: "nome", headerName: "Nome", minWidth: 300, align: "center" },
        { field: 'link', headerName: 'Link', width: 300, align: "center",
            renderCell: (params) => (
                <Link href={`/courses/${params.row.link}`} target="_blank" as={`/login-membro/${params.row.link}`} >Acessar</Link>
            ),
        },
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
                        <MenuItem onClick={() => handleEditClick(params.row.id)}>Editar</MenuItem>
                        <MenuItem onClick={() => handleViewClick(params.row.id)}>Visualizar</MenuItem>
                        <MenuItem onClick={() => handleExcluirClick(params.row.id)}>Excluir</MenuItem>
                    </Menu>
                </div>
            ),
        },
    ];
    
    const handleEditClick = (id) => {
        // Lógica de edição
        setButtonText("Editar Área")
        let itens = [...listagem]
        let item = itens.filter((item) => item.id == id)[0]
        setItem(item)
        setDisabled(false)
        setModalActive(true)
        handleDropdownClose();
    };
    const handleExcluirClick = (id) => {
        // Lógica de edição
        setButtonText("Excluir Área")
        let item = listagem.filter((item) => item.id == id)[0]
        setItem(item)
        setDisabled(false)
        setModalActive(true)
        handleDropdownClose();
    };
    const handleViewClick = (id) => {
        setButtonText("Visualizar Área")
        let item = listagem.filter((item) => item.id == id)[0]
        setItem(item)
        setDisabled(true)
        setModalActive(true)
        handleDropdownClose();
    };

    useEffect(() => {
        setTimeout(() => {
            setLoadingTable(true);
        }, 500);


    }, [loadingTable]);

    return (
        <>
            <div className="dark:text-white-400">
                <DataGrid
                    rows={listagem}
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
        </>
    );
};

export default AreaMembro;
