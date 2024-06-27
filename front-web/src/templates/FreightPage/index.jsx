import { Inter } from "next/font/google";
import React, { useEffect, useRef, useState } from "react";
import { FaBoxOpen, FaRegFileAlt } from "react-icons/fa";
import { SlOptions } from "react-icons/sl";

import ButtonTopBar from "@/components/ButtonTopBar";
import Container from "@/components/Container";
import Modal from "@/components/Modal";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";
import TopButtons from "@/components/TopButtons";

import { DataGrid } from "@mui/x-data-grid";

const inter = Inter({
    weight: ["300", "400", "500", "600", "700", "900"],
    subsets: ["latin"]
});

const rows = [
    { id: 1, col1: "Wolfy Pay", col2: "Ativo", col3: "R$ 1.000,00" },
    { id: 2, col1: "Wolfy Up", col2: "Cancelado", col3: "R$ 750,00" },
    { id: 3, col1: "Wolfy App", col2: "Em aprovação", col3: "R$ 80,00" }
];

const styleRowStatus = [
    "px-4",
    "py-2",
    "rounded-full",
    "text-white-400",
    "text-xs",
    "font-semibold"
];

const buttons = [
    { title: "Exemplo", typeFilter: "exemplo1" },
    { title: "Exemplo 2", typeFilter: "exemplo2" },
    { title: "Exemplo 3", typeFilter: "exemplo3" }
];

const FreightPage = () => {
    const [loadingTable, setLoadingTable] = useState(false);
    const [modalAction, setModalAction] = useState(false);
    const [filterButton, setFilterButton] = useState("");
    const [modalActive, setModalActive] = useState(false);
    const [typeProduct, setTypeProduct] = useState("");

    const nameProduct = useRef(null);
    const descriptionProduct = useRef(null);
    const priceProduct = useRef(null);
    const linkProduct = useRef(null);

    const columns = [
        { field: "col1", headerName: "Nome", width: 150, align: "center" },
        { field: "col2", headerName: "Status", width: 300, align: "center" },
        {
            field: "col3",
            headerName: "Preço",
            minWidth: 300,
            flex: 1,
            align: "center"
        },
        {
            field: "col4",
            headerName: "Actions",
            minWidth: 150,
            renderCell: () => (
                <div className="relative mx-auto">
                    <div className="hover:cursor-pointer">
                        <SlOptions onClick={() => setModalAction(true)} />
                    </div>
                </div>
            )
        }
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

    const saveProduct = () => {
        // console.log(typeProduct);
        // console.log(linkProduct.current.value);
    };

    return (
        <div className="flex items-start justify-start">
            <Sidebar />
            <Container>
                <TopBar
                    notRegistered
                    pageHandleModal={() => setModalActive(true)}
                    pageTitle="Frete"
                    buttonText="Novo frete"
                />

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

                <div className="dark:text-white-400">
                    <DataGrid
                        checkboxSelection
                        rows={rows}
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

            {modalAction && (
                <Modal
                    modalActive={modalAction}
                    titleModal="Actions"
                    saveButton={() => console.log("exemplo de acao")}
                    textButton="Salvar"
                    handleClickModal={() => setModalAction(false)}
                />
            )}

            {modalActive && (
                <Modal
                    modalActive={modalActive}
                    titleModal="Cadastro de frete"
                    saveButton={() => saveProduct()}
                    textButton="Salvar"
                    handleClickModal={() => setModalActive(false)}
                >
                    <div className="flex items-center justify-start relative my-5">
                        <input
                            ref={nameProduct}
                            type="text"
                            name="name-product"
                            id="name-product"
                            placeholder="Nome"
                            className={`${inter.className} w-full border border-modal-close rounded-lg pl-10 pr-2 outline-none focus:border-black-400 text-sm h-10`}
                        />
                        <FaBoxOpen className="absolute text-lg left-4 fill-gray-400" />
                    </div>

                    <div className="flex items-start justify-start relative my-5">
                        <textarea
                            ref={descriptionProduct}
                            name="description-product"
                            id="description-product"
                            placeholder="Descrição"
                            className={`${inter.className} w-full border border-modal-close rounded-lg pl-10 pr-2 py-2 outline-none focus:border-black-400 text-sm resize-none h-20`}
                        ></textarea>
                        <FaRegFileAlt className="absolute text-lg left-4 top-3 fill-gray-400" />
                    </div>

                    <div className="flex items-start justify-start flex-col lg:grid lg:grid-cols-2 lg:gap-x-4 my-5">
                        <div className="flex items-center justify-start relative w-full mb-4 lg:mb-0">
                            <input
                                ref={priceProduct}
                                type="number"
                                name="name-product"
                                id="name-product"
                                placeholder="Preço"
                                className={`${inter.className} w-full border border-modal-close rounded-lg pl-10 pr-2 outline-none focus:border-black-400 text-sm h-10`}
                            />
                            <div className="absolute text-lg left-4 text-gray-400">
                                R$
                            </div>
                        </div>

                        <div className="flex items-center justify-start relative w-full"></div>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default FreightPage;
