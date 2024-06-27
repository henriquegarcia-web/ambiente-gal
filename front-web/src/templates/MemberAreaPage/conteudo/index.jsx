import { Inter } from "next/font/google";
import React, { useEffect, useRef, useState } from "react";
import SettingsIcon from '@mui/icons-material/Settings';
import { IconButton, Menu, MenuItem } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
const inter = Inter({
    weight: ["300", "400", "500", "600", "700", "900"],
    subsets: ["latin"]
});


const Conteudo = ({listagem,setButtonText,setItem,setDisabled,setModalActive}) => {
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
        { field: 'iamgem', headerName: 'imagem', width: 170,
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
        { field: "areaMembro", headerName: "Área Membro", minWidth: 170, renderCell: (params) => (
            <p style={{ textAlign: 'center',margin:'auto' }}>
               {params?.row?.modulo?.curso?.areaMembro?.nome}
            </p>
        ),},
        { field: "curso", headerName: "Curso", minWidth: 170, renderCell: (params) => (
            <p style={{ textAlign: 'center',margin:'auto' }}>
               {params?.row?.modulo?.curso?.nome}
            </p>
        ),},
        { field: "modulo", headerName: "Modulo", minWidth: 170, renderCell: (params) => (
            <p style={{ textAlign: 'center',margin:'auto' }}>
               {params?.row?.modulo?.nome}
            </p>
        )},
        { field: "nome", headerName: "Nome", minWidth: 170, align: "center" },
        { field: "video", headerName: "Video", minWidth: 170, align: "center" , renderCell: (params) => (
            <a style={{ textAlign: 'center',margin:'auto' }} target="_blank" href={params.row?.video?.includes('blob')?`${params.row?.video}`:`${process.env.NEXT_PUBLIC_API_URL}/arquivo/${params.row?.video}`} >
               Link
            </a>
        )},
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
        setButtonText("Editar Conteúdo")
        let item = listagem.filter((item) => item.id == id)[0]
        setItem(item)
        setDisabled(false)
        setModalActive(true)
        handleDropdownClose();
    };
    const handleExcluirClick = (id) => {
        // Lógica de edição
        setButtonText("Excluir Conteúdo")
        let item = listagem.filter((item) => item.id == id)[0]
        setItem(item)
        setDisabled(false)
        setModalActive(true)
        handleDropdownClose();
    };
    const handleViewClick = (id) => {
        setButtonText("Visualizar Conteúdo")
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

    );
};

export default Conteudo;
