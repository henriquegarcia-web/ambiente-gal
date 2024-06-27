import { Inter } from "next/font/google";
import React, { useEffect, useRef, useState } from "react";

import ButtonTopBar from "@/components/ButtonTopBar";
import Container from "@/components/Container";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";
import TopButtons from "@/components/TopButtons";

import AreaMembro from "./areaMembro";
import AreaMembroForm from "./areaMembro/form";
import Cursos from "./cursos";
import CursosForm from "./cursos/form";
import Modulo from "./modulos";
import ModuloForm from "./modulos/form";
import Conteudo from "./conteudo";
import ConteudoForm from "./conteudo/form";
import { Api as ApiArea } from "../../api/apiAreaMembro"
import { Api as ApiCurso } from "../../api/apiCurso"
import { Api as ApiModulo } from "../../api/apiModulo"
import { Api as Apiconteudo } from "../../api/apiConteudo"
const inter = Inter({
    weight: ["300", "400", "500", "600", "700", "900"],
    subsets: ["latin"]
});
const buttons = [
    { title: "Área de membros", typeFilter: "membros" },
    { title: "Cursos", typeFilter: "cursos" },
    { title: "Módulos", typeFilter: "modulos" },
    { title: "Conteúdo", typeFilter: "conteudo" }
];

const MemberAreaPage = () => {
    const [loadingTable, setLoadingTable] = useState(false);
    const [filterButton, setFilterButton] = useState("membros");
    const [memberModalActive, setMemberModalActive] = useState(false);
    const [memberActive, setMemberActive] = useState(false);
    const [courseActive, setCourseActive] = useState(false);
    const [courseModalActive, setCourseModalActive] = useState(false);
    const [modulesActive, setModulesActive] = useState(false);
    const [modulesModalActive, setModulesModalActive] = useState(false);
    const [conteudoModalActive, setConteudoModalActive] = useState(false);
    const [conteudoActive, setConteudoActive] = useState(false)
    const [buttonText, setButtonText] = useState("Nova área");
    const [buttonTextModal, setButtonTextModal] = useState("");
    const [disabled, setDisabled] = useState(false);
    const [listagemArea, setListagemArea] = useState([])
    const [listagemCurso, setListagemCurso] = useState([])
    const [listagemModulo, setListagemModulo] = useState([])
    const [listagemConteudo, setListagemConteudo] = useState([])
    const [listagemFilterArea, setListagemFilterArea] = useState([])
    const [listagemFilterCurso, setListagemFilterCurso] = useState([])
    const [listagemFilterModulo, setListagemFilterModulo] = useState([])
    const [listagemFilterConteudo, setListagemFilterConteudo] = useState([])
    const [item, setItem] = useState({});

    useEffect(() => {
        handleListagemArea()
    }, [])

    const handleListagemArea = async () => {
        let response = await ApiArea.Listagem()
        if (response.list?.length > 0) {
            let listagem = response.list.filter((item) => item.nome)
            setListagemFilterArea(listagem)
            setListagemArea(listagem)
        } else {
            if (response?.err && response?.err.status == 401) {
                window.location.href = '/'
            }
        }
    }
    const handleListagemCurso = async () => {
        let response = await ApiCurso.Listagem()
        setListagemFilterCurso(response?.list)
        setListagemCurso(response.list)
    }
    const handleListagemModulo = async () => {
        let response = await ApiModulo.Listagem()
        setListagemFilterModulo(response?.list)
        setListagemModulo(response?.list)
    }
    const handleListagemConteudo = async () => {
        let response = await Apiconteudo.Listagem()
        setListagemFilterConteudo(response?.list)
        setListagemConteudo(response?.list)
    }

    const handleModalActive = async () => {
        setItem({})
        switch (filterButton) {
            case "membro":
                
                setMemberModalActive(true);
                setButtonTextModal("Cadastrar Área")
                break;

            case "cursos":
                
                setCourseModalActive(true);
                setButtonTextModal("Cadastrar Curso")
                break;

            case "modulos":
                
                setModulesModalActive(true);
                setButtonTextModal("Cadastrar Modulo")
                break;

            case "conteudo":
                
                setConteudoModalActive(true);
                setButtonTextModal("Cadastrar Conteúdo")
                break;

            default:
                
                setMemberModalActive(true);
                setButtonTextModal("Cadastrar Área")
                break;
        }

    };

    useEffect(() => {
        handleFilter()

    }, [filterButton]);
    const handleFilter = async () => {
        switch (filterButton) {
            case "membro":
                
                await handleListagemArea()
                setButtonText("Nova área");
                setMemberActive(true);
                setCourseActive(false);
                setModulesActive(false)
                setConteudoActive(false)
                break;

            case "cursos":
                
                await handleListagemArea()
                await handleListagemCurso()
                setButtonText("Novo curso");
                setMemberActive(false);
                setCourseActive(true);
                setModulesActive(false)
                setConteudoActive(false)
                break;

            case "modulos":
                
                await handleListagemArea()
                await handleListagemCurso()
                await handleListagemModulo()
                setButtonText("Novo módulo");
                setMemberActive(false);
                setCourseActive(false);
                setModulesActive(true)
                setConteudoActive(false)
                break;

            case "conteudo":
                
                await handleListagemArea()
                await handleListagemCurso()
                await handleListagemModulo()
                await handleListagemConteudo()
                setButtonText("Novo Conteúdo");
                setMemberActive(false);
                setCourseActive(false);
                setModulesActive(false)
                setConteudoActive(true)
                break;

            default:
                
                await handleListagemArea()
                setButtonText("Nova área");
                setMemberActive(true);
                setCourseActive(false);
                setModulesActive(false)
                setConteudoActive(false)
                break;
        }
    }


    useEffect(() => {
        setTimeout(() => {
            setLoadingTable(true);
        }, 500);
    }, [loadingTable]);
    const handleFilterCampus = (e) => {
        let buscar = e.target.value
        let listagem
        let list
        if (memberActive) {
            listagem = listagemArea
            list = listagem.filter((item) => item.nome.toLocaleLowerCase().includes(buscar.toLocaleLowerCase()) || item.descricao.toLocaleLowerCase().includes(buscar.toLocaleLowerCase()))
            setListagemArea(list)
        } else if (courseActive) {
            listagem = listagemCurso
            list = listagem.filter((item) => item.nome.toLocaleLowerCase().includes(buscar.toLocaleLowerCase()) || item.descricao.toLocaleLowerCase().includes(buscar.toLocaleLowerCase()) || (item?.areaMembro?.nome.toLocaleLowerCase().includes(buscar.toLocaleLowerCase())))
            setListagemCurso(list)
        } else if (modulesActive) {
            listagem = listagemModulo
            list = listagem.filter((item) => item.nome.toLocaleLowerCase().includes(buscar.toLocaleLowerCase()) || item.descricao.toLocaleLowerCase().includes(buscar.toLocaleLowerCase()) || (item?.curso?.areaMembro?.nome.toLocaleLowerCase().includes(buscar.toLocaleLowerCase())) || (item?.curso?.nome.toLocaleLowerCase().includes(buscar.toLocaleLowerCase())))
            setListagemModulo(list)
        } else if (conteudoActive) {
            listagem = listagemConteudo
            list = listagem.filter((item) => item.nome.toLocaleLowerCase().includes(buscar.toLocaleLowerCase()) || item.descricao.toLocaleLowerCase().includes(buscar.toLocaleLowerCase()) || (item?.modulo?.curso?.areaMembro?.nome.toLocaleLowerCase().includes(buscar.toLocaleLowerCase())) || (item?.modulo?.curso?.nome.toLocaleLowerCase().includes(buscar.toLocaleLowerCase())) || (item?.modulo?.nome.toLocaleLowerCase().includes(buscar.toLocaleLowerCase())))
            setListagemConteudo(list)
        }
    }

    useEffect(()=>{
        setListagemFilterArea(listagemArea)
    },[listagemArea])
    useEffect(()=>{
        setListagemFilterCurso(listagemCurso)
    },[listagemCurso])
    useEffect(()=>{
        setListagemFilterModulo(listagemModulo)
    },[listagemModulo])
    useEffect(()=>{
        setListagemFilterConteudo(listagemConteudo)
    },[listagemConteudo])

    return (
        <div className="flex items-start justify-start">
            <Sidebar />
            <Container>
                <TopBar notRegistered pageHandleModal={handleModalActive} pageTitle="Área de membros" buttonText={buttonText} />

                <TopButtons search handleFilter={handleFilterCampus}>
                    {buttons.map((button, index) => (
                        <ButtonTopBar
                            key={index}
                            nameButton={button.title}
                            filterButton={filterButton}
                            filterCondition={button.typeFilter}
                            handleFilterButton={() => {
                                filterButton !== button.typeFilter
                                    ? setFilterButton(button.typeFilter)
                                    : setFilterButton("");
                            }} />
                    ))}
                </TopButtons>

                {memberActive &&
                    <AreaMembro listagem={listagemArea} setButtonText={setButtonTextModal} setItem={setItem} setDisabled={setDisabled} setModalActive={setMemberModalActive} setListagem={setListagemArea} />
                }

                {courseActive &&
                    <Cursos listagem={listagemCurso} setButtonText={setButtonTextModal} setItem={setItem} setDisabled={setDisabled} setModalActive={setCourseModalActive} setListagem={setListagemCurso} />
                }
                {modulesActive &&
                    <Modulo listagem={listagemModulo} setButtonText={setButtonTextModal} setItem={setItem} setDisabled={setDisabled} setModalActive={setModulesModalActive} setListagem={setListagemModulo} />
                }
                {conteudoActive &&
                    <Conteudo listagem={listagemConteudo} setButtonText={setButtonTextModal} setItem={setItem} setDisabled={setDisabled} setModalActive={setConteudoModalActive} setListagem={setListagemConteudo} />
                }

            </Container>
            {memberActive &&
                <AreaMembroForm buttonText={buttonTextModal} memberModalActive={memberModalActive} setMemberModalActive={setMemberModalActive} disabled={disabled} item={item} setListagem={setListagemArea} setItem={setItem} listagem={listagemArea} />
            }
            {courseActive &&
                <CursosForm buttonText={buttonTextModal} courseModalActive={courseModalActive} setCourseModalActive={setCourseModalActive} disabled={disabled} item={item} setListagem={setListagemCurso} setItem={setItem} listagem={listagemCurso} areaMembros={listagemArea} />
            }
            {modulesActive &&
                <ModuloForm buttonText={buttonTextModal} setModulesModalActive={setModulesModalActive} modulesModalActive={modulesModalActive} disabled={disabled} item={item} setListagem={setListagemModulo} setItem={setItem} listagem={listagemModulo} areaMembros={listagemArea} cursos={listagemCurso} />
            }
            {conteudoActive &&
                <ConteudoForm buttonText={buttonTextModal} setConteudoModalActive={setConteudoModalActive} conteudoModalActive={conteudoModalActive} disabled={disabled} item={item} setListagem={setListagemConteudo} setItem={setItem} listagem={listagemConteudo} areaMembros={listagemArea} cursos={listagemCurso} modulos={listagemModulo} />
            }

        </div>
    );
};

export default MemberAreaPage;
