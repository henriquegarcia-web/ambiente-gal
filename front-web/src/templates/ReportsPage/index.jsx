import { Inter } from "next/font/google";
import React, { useEffect, useRef, useState } from "react";
import { IoWalletOutline } from "react-icons/io5";
import { TfiStatsUp } from "react-icons/tfi";
import ReactToPrint from "react-to-print";
import BoxFinancial from "@/components/BoxFinancial";
import ButtonTopBar from "@/components/ButtonTopBar";
import Container from "@/components/Container";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";
import TopButtons from "@/components/TopButtons";

import { DataGrid, GridToolbar, GridToolbarExport } from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';
import { XGridExportPlugin } from '@mui/x-data-grid-pro';
import { Api } from "@/api/apiVenda";
import { Api as ApiProdutor } from "@/api/apiProdutor";
const inter = Inter({
    weight: ["300", "400", "500", "600", "700", "900"],
    subsets: ["latin"]
});


const styleRowStatus = [
    "px-4",
    "py-2",
    "rounded-full",
    "text-white-400",
    "text-xs",
    "font-semibold"
];

const buttons = [];

export default function ReportsPage() {
    const [loadingTable, setLoadingTable] = useState(false);
    const [filterButton, setFilterButton] = useState("exemplo1");
    const [tipo, setTipo] = useState("");
    const [dataInicial, setDataInicial] = useState("");
    const [dataFinal, setDataFinal] = useState("");
    const [postback, setPostBack] = useState("");
    const [listagem, setListagem] = useState([])
    const [listagemFiltrar, setListagemFiltrar] = useState([])
    const [valorTotal, setValorTotal] = useState(0)
    const [valorLiquido, setValorLiquido] = useState(0)
    const [vendas, setVendas] = useState(0)
    const [admin, setAdmin] = useState(false)
    const [produtores, setProdutores] = useState(false)
    const [status, setStatus] = useState('')
    const [produtor, setProdutor] = useState()
    const divRef = useRef(null);
    const gerarPDF = () => {

        const divElement = divRef.current;
        if (divElement) {
            const opt = {
                margin: 10,
                filename: 'documento.pdf',
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2 },
                jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
            };

            html2pdf().from(divElement).set(opt).outputPdf().then(pdf => {
                const pdfBlob = new Blob([pdf], { type: 'application/pdf' });
                const pdfUrl = URL.createObjectURL(pdfBlob);

                const link = document.createElement('a');
                link.href = pdfUrl;
                link.download = 'documento.pdf';
                link.click();

                URL.revokeObjectURL(pdfUrl);
            });
        }
    };
    const handleProdutor = async () => {
        let response = await ApiProdutor.Listagem()
        if (response.list?.length > 0) {
            setProdutores(response.list)
            setAdmin(true)
        } else {
            setAdmin(false)
        }

    }
    const handleListagem = async () => {
        let response = await Api.Listagem()
        if (response?.list && response?.list.length > 0) {
            let listagem = response?.list
            let list = listagem?.filter((item) => item.status == 'Aprovado')
            let valorTotal = list?.reduce((acumulador, element) => { return acumulador + parseFloat(element.valor) }, 0)
            let valorLiquido = produtores?.length>0? produtores?.reduce((acumulador, element) => { return acumulador + element?.saldoDisponivel }, 0):0
            setValorLiquido(valorLiquido)
            let vendas = list?.length
            setValorTotal(valorTotal)
            setVendas(vendas)
            setListagem(listagem)
            setListagemFiltrar(listagem)

            // let plataforma = list?.reduce((acumulador, element) => { return acumulador + parseFloat(element.valor) }, 0)

        } else {
            if (response?.err && response?.err.status == 401) {
                window.location.href = '/'
            }
        }

    }
    useEffect(() => {
        handleProdutor()
    }, [])
    useEffect(() => {
        handleListagem()
    }, [produtores])
    const columns = [
        (admin && {
            field: "Produtor", headerName: "Produtor", minWidth: 200, align: "center", renderCell: (params) => (
                <div style={{ textAlign: 'center', display: 'flex' }}>
                    {params.row.produtor?.nome}
                </div>
            )
        }),

        {
            field: "chackout", headerName: "Checkout", minWidth: 150, align: "center", renderCell: (params) => (
                <div style={{ textAlign: 'center', display: 'flex' }}>
                    {params.row.checkout?.nome}
                </div>
            )
        },

        {
            field: "col3",
            headerName: "Cliente",
            minWidth: 150,
            align: "center",
            flex: 1, renderCell: (params) => (
                <div style={{ textAlign: 'center', display: 'flex' }}>
                    {params.row?.nome}
                </div>
            )
        },
        {
            field: "email",
            headerName: "Email",
            minWidth: 150,
            align: "center",
            flex: 1, renderCell: (params) => (
                <div style={{ textAlign: 'center', display: 'flex' }}>
                    {params.row?.email}
                </div>
            )
        },
        {
            field: "celular",
            headerName: "celular",
            minWidth: 150,
            align: "center",
            flex: 1, renderCell: (params) => (
                <div style={{ textAlign: 'center', display: 'flex' }}>
                    {params.row?.celular}
                </div>
            )
        },
        {
            field: "data",
            headerName: "Data",
            minWidth: 150,
            align: "center",
            flex: 1, renderCell: (params) => (
                <div style={{ textAlign: 'center', display: 'flex' }}>
                    {new Date(params.row?.data + 'T00:00:00')?.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' }) + ' - ' + params.row?.hora }
                </div>
            )
        },
        {
            field: "tipo",
            headerName: "Tipo",
            minWidth: 150,
            align: "center",
            flex: 1, renderCell: (params) => (
                <div style={{ textAlign: 'center', display: 'flex' }}>
                    {params.row?.tipo == 1 ? 'Pix' : params.row.tipo == 2 ? 'Cartão de Credito' : "Boleto"}
                </div>
            )
        },

        {
            field: "valor", headerName: "Valor", minWidth: 150, align: "center", renderCell: (params) => (
                <div style={{ textAlign: 'center', display: 'flex' }}>
                    {params.row.valor?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </div>
            )
        },
        {
            field: "valorLiquido", headerName: "Valor Liquido", minWidth: 150, align: "center", renderCell: (params) => (
                <div style={{ textAlign: 'center', display: 'flex' }}>
                    {(params.row.valorLiquido)?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </div>
            )
        },
        {
            field: "status", headerName: "Status", minWidth: 150, align: "center", renderCell: (params) => (
                <div style={{ textAlign: 'center', display: 'flex' }}>
                    {params.row.status}
                </div>
            )
        },
    ];

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
    const handleFilter = () => {
        let filtrar = listagem?.filter((item) => ((produtor ? produtor == item.idProdutor : true) && ((tipo && tipo != 'Todos') ? (item.tipo == tipo ? true : false) : true)) && (status ? status == item.status : true) && (dataInicial && dataFinal ? (new Date(dataInicial + 'T00:00:00') <= new Date(item.data + 'T00:00:00') && new Date(dataFinal + 'T00:00:00') >= new Date(item.data + 'T00:00:00') ? true : false) : true))
        let valorTotal = filtrar?.reduce((acumulador, element) => { return acumulador + parseFloat(admin ? element.valor : element.valorLiquido) }, 0)
      
        let vendas = filtrar?.length
        setValorTotal(valorTotal)
        setVendas(vendas)
        setListagemFiltrar(filtrar)
        setValorLiquido(filtrar[0].produtor.saldoDisponivel)
    }
    return (
        <div className="flex items-start justify-start"   >
            <Sidebar />
            <Container>

                <TopBar
                    notRegistered

                    pageTitle="Relatórios de venda"

                />
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }} >
                    <ReactToPrint
                        trigger={() => <button className=" py-3 rounded-full hover:cursor-pointer hover:brightness-90 duration-500 bg-primary-400 text-white-400" style={{ float: 'right', padding: 10 }} > Exportar</button>}
                        content={() => divRef.current} pageStyle="@page { margin: 2cm; } @media print { body { margin: 0; } }" />
                </div>

                <div ref={divRef} >
                    <div className="py-4 pb-8 px-6 flex items-center justify-start flex-row sm:flex-row border-b border-b-gray-border">
                        <BoxFinancial title="Valor Total" value={(valorTotal ? parseFloat(valorTotal) : 0)?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}>
                            <IoWalletOutline className="w-5 h-5 fill-gray-400 dark:fill-white-400" />
                        </BoxFinancial>
                        <BoxFinancial title="Valor Disponivel" value={(valorLiquido ? parseFloat(valorLiquido) : 0)?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}>
                            <IoWalletOutline className="w-5 h-5 fill-gray-400 dark:fill-white-400" />
                        </BoxFinancial>
                        <BoxFinancial title="Vendas encontradas" value={vendas}>
                            <TfiStatsUp className="w-5 h-5 fill-gray-400 dark:fill-white-400" />
                        </BoxFinancial>
                    </div>

                    <div className="grid grid-cols-5 gap-x-5 lg:grid-cols-5 lg:gap-x-5s" style={{ paddingLeft: 10, paddingRight: 10, paddingTop: 10 }}>
                        {admin &&
                            <div className="flex  justify-start relative my-2" style={{ flexDirection: 'column' }}>
                                <label style={{ marginBottom: 5, color: '#ccc' }}>Produtor</label>
                                <select value={produtor} onChange={(e) => setProdutor(e.target.value)} name="tipo" id="tipo" placeholder="Tipo"
                                    className={`${inter.className} w-full border border-modal-close rounded-lg px-2 outline-none focus:border-black-400 text-sm h-10`}>
                                    <option value={''} >Selecione</option>
                                    {produtores.map((item) => (
                                        <option value={item.id} >{item.email}</option>
                                    ))}
                                </select>

                            </div>
                        }
                        <div className="flex  justify-start relative my-2" style={{ flexDirection: 'column' }}>
                            <label style={{ marginBottom: 5, color: '#ccc' }}>Data Inicial</label>
                            <input value={dataInicial} onChange={(e) => setDataInicial(e.target.value)} type="date" name="dataInicial" id="dataInicial"
                                className={`${inter.className} w-full border border-modal-close rounded-lg px-2 outline-none focus:border-black-400 text-sm h-10`}
                            />
                        </div>
                        <div className="flex  justify-start relative my-2" style={{ flexDirection: 'column' }}>
                            <label style={{ marginBottom: 5, color: '#ccc' }}>Data Final</label>
                            <input value={dataFinal} onChange={(e) => setDataFinal(e.target.value)} type="date" name="datFinal" id="dataFinal"
                                className={`${inter.className} w-full border border-modal-close rounded-lg px-2 outline-none focus:border-black-400 text-sm h-10`}
                            />
                        </div>

                        <div className="flex  justify-start relative my-2" style={{ flexDirection: 'column' }}>
                            <label style={{ marginBottom: 5, color: '#ccc' }}>Tipo</label>
                            <select value={tipo} onChange={(e) => setTipo(e.target.value)} name="tipo" id="tipo" placeholder="Tipo"
                                className={`${inter.className} w-full border border-modal-close rounded-lg px-2 outline-none focus:border-black-400 text-sm h-10`}>
                                <option value={''}>Selecione</option>
                                <option value={1} >Pix</option>
                                <option value={2}>Cartão de Credito</option>
                                <option value={3}>Boleto</option>
                                <option value={'Todos'}>Todos</option>
                            </select>

                        </div>


                        <div className="flex  justify-start relative my-2" style={{ flexDirection: 'column' }}>
                            <label style={{ marginBottom: 5, color: '#ccc' }}>Status</label>
                            <select value={status} onChange={(e) => setStatus(e.target.value)} name="status" id="status" placeholder="Status"
                                className={`${inter.className} w-full border border-modal-close rounded-lg px-2 outline-none focus:border-black-400 text-sm h-10`}>
                                <option value={''} >Selecione</option>
                                <option value={'Aprovado'} >Aprovado</option>
                                <option value={'Pendente'}>Pendente</option>
                            </select>

                        </div>
                        <div className="flex  justify-start relative my-2" style={{ flexDirection: 'column', marginTop: 'auto', float: 'right' }}>

                            <button onClick={handleFilter} className="w-full py-3 rounded-full hover:cursor-pointer hover:brightness-90 duration-500 bg-primary-400 text-white-400">Filtrar</button>
                        </div>

                    </div>
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

                    <div className="dark:text-white-400" style={{ padding: 60 }}>
                        <DataGrid

                            plugins={[XGridExportPlugin]}
                            style={{ border: 'none' }}

                            rows={listagemFiltrar}
                            columns={columns}
                            disableRowSelectionOnClick
                            components={{
                                Toolbar: GridToolbar,
                                ToolbarExport: GridToolbarExport,
                            }}
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

                </div>

            </Container>
        </div>
    );
}
