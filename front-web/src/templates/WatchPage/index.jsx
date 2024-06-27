import { Inter } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { FiClock } from "react-icons/fi";
import { GoChevronDown, GoDownload } from "react-icons/go";
import { IoMdSearch } from "react-icons/io";
import { LuMonitorPlay } from "react-icons/lu";
import { useRouter } from 'next/router';
import {
    TbLayoutSidebarLeftCollapse,
    TbLayoutSidebarLeftExpand,
    TbLayoutSidebarRightCollapse,
    TbLayoutSidebarRightExpand
} from "react-icons/tb";
import { Api } from "@/api/apiAreaMembro";
import HeaderUser from "@/components/HeaderUser";

const inter = Inter({
    weight: ["300", "400", "500", "600", "700", "900"],
    subsets: ["latin"]
});

const myClasses = [
    {
        id: 10,
        title: "01 - Welcome!",
        time: "(3:36)",
        status: "complete",
        active: false
    },
    {
        id: 11,
        title: "02 - What is product design?",
        time: "(3:36)",
        status: "incomplete",
        active: true
    },
    {
        id: 12,
        title: "03 - Product designer role development",
        time: "(3:36)",
        status: "none",
        active: false
    },
    {
        id: 13,
        title: "04 - Product designer role development",
        time: "(3:36)",
        status: "none",
        active: false
    },
    {
        id: 14,
        title: "05 - Product designer role development",
        time: "(3:36)",
        status: "none",
        active: false
    },
    {
        id: 15,
        title: "06 - Product designer role development",
        time: "(13:09)",
        status: "none",
        active: false
    },
    {
        id: 16,
        title: "07 - Product designer role development",
        time: "(3:36)",
        status: "none",
        active: false
    }
];


const videoMenus = [
    // {
    //     id: 20,
    //     title: "Comentários",
    //     active: false
    // },
    {
        id: 21,
        title: "Materiais",
        active: true
    }
];

const WatchPage = () => {
    const [coursesShow, setCoursesShow] = useState(true);
    const [coursesToggle, setCoursesToggle] = useState(true);
    const [classesShow, setClassesShow] = useState(false);
    const [classes, setClasses] = useState(myClasses);
    const [menus, setMenus] = useState(videoMenus);
    const [activeMenu, setActiveMenu] = useState("Materiais");
    const router = useRouter();
    const [modulo, setModulo] = useState({})
    const [aulas, setAulas] = useState([])
    const [aulasSelect, setAulasSelect] = useState({})
    const [curso, setCurso] = useState({})
    const [modulosFiltrar, setModulosFiltrar] = useState([])
    const [obj, setObj] = useState()
    const [links, setLinks] = useState()
    const { id, link } = router.query;
    useEffect(() => {
        let objs
        if (typeof window !== 'undefined') {
            const getAuthUser = localStorage.getItem('authUser')

            objs = getAuthUser == 'undefined' || getAuthUser == null ? '' : JSON.parse(getAuthUser ? getAuthUser : '')
            setObj(objs)
        }
    }, [])
    useEffect(() => {
        handleInfo()
    }, [link])
    const handleInfo = async () => {
        if (link) {
            setLinks(link)
            let response = await Api.Link(link)
            if (response.error) {
                alert(response.msg)
            } else {
                let curso = response?.list[0]?.cursos
                let cursoSelect = curso.find((item) => item.id == id)
                let moduloSelect = curso.map((item) => { return item.modulos.find((item2) => item2.id == id) }).filter((item) => item?.id)
                setModulo(moduloSelect[0])
                setAulas(moduloSelect[0]?.conteudos)
                setAulasSelect(moduloSelect[0]?.conteudos[0])
                setCurso(cursoSelect)
                setModulosFiltrar(cursoSelect?.modulos)
            }
        }
    }
    const [buscar,setBuscar] = useState('')
    const handleFiltrar = async (e) => {
        let buscar = e.target.value
        let listagem = curso
        let filtrar = listagem.modulos?.filter((item2) => item2.nome.toUpperCase().includes(buscar.toUpperCase()))
        setModulosFiltrar(filtrar)
    }
    const handleClick = async (item) => {
        setAulasSelect(item)
    }
    const handleSelectClasses = (selected) => {
        setClasses((prevClasses) =>
            prevClasses.map((item) => ({
                ...item,
                active: item.id === selected
            }))
        );
    };

    const handleMenuVideo = (clicked) => {
        setMenus((prevClasses) =>
            prevClasses.map((item) => ({
                ...item,
                active: item.id === clicked
            }))
        );
    };

    useEffect(() => {
        const activeItem = menus.find((object) => object.active === true);
        const activeTitle = activeItem ? activeItem.title : "";

        setActiveMenu(activeTitle);
    }, [menus]);
    const handleValidar = () => {
        if(links){
            if((obj?.id)){
                if(obj.permissao==3 || obj.permissao==2){
    
                }else{
               window.location.href = '/login-membro/'+links
                }
            }else{
         window.location.href = '/login-membro/'+links
            }
        }
    }
    useEffect(() => {
        let objs
        if (typeof window !== 'undefined') {
            const getAuthUser = localStorage.getItem('authUser')
            objs = getAuthUser == 'undefined' || getAuthUser == null ? '' : JSON.parse(getAuthUser ? getAuthUser : '')
            if (objs?.id ) {
                setObj(objs)
            }
        }
    }, [links])
    useEffect(()=>{
        handleValidar()
    },[obj,links])
    return (
        <section className="bg-bg-course min-h-screen">
            <HeaderUser nameUser="" item={obj} link={link} />
            <div onClick={() => setCoursesShow(!coursesShow)} className={`${coursesShow ? "translate-x-[-100%]" : "translate-x-0"} cursor-pointer fixed top-20 z-10 bg-watch-box p-4 left-0 duration-500`} >
                <TbLayoutSidebarLeftExpand
                    size={24}
                    className="text-white-400"
                />
            </div>
            <div className={`bg-watch-box w-max max-w-[300px] py-4 px-5 rounded-[5px] duration-500 fixed top-20 left-0 bottom-0 z-10 overflow-auto courses-bar ${coursesShow ? "translate-x-0" : "translate-x-[-100%]"}`} style={{ marginTop: "-80px" }} >
                <div className="flex justify-between items-center">
                    <h2 className={`${inter.className} text-xl font-normal text-white-400`} >
                        Módulos
                    </h2>
                    <div onClick={() => setCoursesShow(!coursesShow)} className="cursor-pointer" >
                        <TbLayoutSidebarLeftCollapse size={24} className="text-white-400" />
                    </div>
                </div>
                <div className="relative mt-4">
                    <IoMdSearch size={20} className="absolute left-2 top-[10px] text-watch-text-search" />
                    <input type="text" value={buscar} name="buscar" id="buscar" onChange={(e)=>{
                        setBuscar(e.target.value)
                        handleFiltrar(e)
                    }} placeholder="Buscar..." className={`${inter.className} border border-modal-close outline-none text-sm text-white-400 rounded-[4px] pr-2 pl-10 h-10 bg-watch-search placeholder:text-watch-text-search w-full`}
                    />
                </div>
                <div className="flex items-center justify-between mt-4">
                    <p className={`${inter.className} text-white-400 text-xs font-normal`} >
                        {modulosFiltrar?.length} Modulos
                    </p>
                </div>
                <div className={`mt-5 grid gap-5 overflow-auto ${coursesToggle ? "visible" : "hidden"}`} >
                    {modulosFiltrar?.map((course) => (
                        <Link href={`/watch/${link}/${course.id}`} key={course.id} className="flex flex-1 gap-3" >
                            <Image src={course.imagem ? (`${process.env.NEXT_PUBLIC_API_URL}/arquivo/` + course.imagem) : "/images/image-course.png"} width={70} height={90} className="object-cover rounded-xl" />
                            <div className="grid gap-2">
                                <h3 className={`${inter.className} text-white-400 text-base font-bold`} >
                                    {course.nome}
                                </h3>

                                <div className="flex items-center gap-1">
                                    <p className={`${inter.className} text-watch-gray-time text-xs font-medium`} >
                                        {course.conteudos?.length > 1 ? `${course.conteudos?.length} Aulas` : `${course.conteudos?.length} Aula`}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
            <div className="bg-watch-box w-full max-w-[738px] m-auto rounded-t-[12px] overflow-hidden min-h-[1100px]" style={{ marginTop: '-80px' }}>
                {aulasSelect?.video &&
                    <video width={'100%'} src={`${process.env.NEXT_PUBLIC_API_URL}/arquivo/` + aulasSelect?.video} controls></video>
                }

                <div>
                    <div className="p-5 grid gap-2 items-center lg:grid-cols-[1fr_max-content] lg:gap-6">
                        <h2 className={`${inter.className} text-white-400 text-xl font-medium`} >
                            {aulasSelect?.nome}
                        </h2>
                        {/* <div className="flex items-center gap-6">
                            <div className="w-9 h-9 flex items-center justify-center border border-white-400 rounded-xl">
                                <FiClock size={24} className="text-white-400" />
                            </div>
                            <button className="bg-watch-download w-9 h-9 flex items-center justify-center rounded-xl">
                                <GoDownload
                                    size={24}
                                    className="text-watch-text-search"
                                />
                            </button>
                        </div> */}
                    </div>
                    <div className="mt-5 px-5 flex items-center border-b border-watch-search">
                        {menus?.map((menu) => (
                            <button
                                key={menu.id}
                                onClick={() => handleMenuVideo(menu.id)}
                                className={`${inter.className
                                    }  py-3 pl-3 pr-12 border-b-2 duration-500 ${menu.active
                                        ? "text-white-400 border-white-400"
                                        : "text-watch-text-search hover:text-white-400 border-[transparent] hover:border-white-400"
                                    }`}
                            >
                                {menu.title}
                            </button>
                        ))}
                    </div>
                    <div className="p-10">
                        {activeMenu === "Materiais" && (
                            <div className="grid gap-16" style={{ display: 'flex' }}>
                                {aulasSelect?.materiais1 &&
                                    <div>
                                        <p style={{ marginBottom: 15 }} className={`${inter.className} font-medium text-sm text-watch-text-search mt-3`}>
                                            {aulasSelect?.descricao1}
                                        </p>
                                        <a href={`${process.env.NEXT_PUBLIC_API_URL}/arquivo/` + aulasSelect?.materiais1} className={`${inter.className} font-medium text-sm text-secondary-400 mt-5 border border-secondary-400 py-3 px-4 rounded-lg hover:bg-secondary-400 hover:text-white-400 duration-500`} >
                                            Download
                                        </a>
                                    </div>
                                }
                                {aulasSelect?.materiais2 &&
                                    <div>
                                        <p style={{ marginBottom: 15 }} className={`${inter.className} font-medium text-sm text-watch-text-search mt-3`}>
                                            {aulasSelect?.descricao1}
                                        </p>
                                        <a href={`${process.env.NEXT_PUBLIC_API_URL}/arquivo/` + aulasSelect?.materiais2} className={`${inter.className} font-medium text-sm text-secondary-400 mt-5 border border-secondary-400 py-3 px-4 rounded-lg hover:bg-secondary-400 hover:text-white-400 duration-500`} >
                                            Download
                                        </a>
                                    </div>
                                }


                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div
                onClick={() => setClassesShow(!classesShow)}
                className={`${classesShow ? "translate-x-[100%]" : "translate-x-0"
                    } cursor-pointer fixed top-20 z-10 bg-watch-box p-4 right-0 duration-500`}
            >
                <TbLayoutSidebarRightExpand
                    size={24}
                    className="text-white-400"
                />
            </div>
            <div>
                <div className={`bg-watch-box w-[300px] rounded-[12px] duration-500 fixed lg:absolute top-20 right-0 z-10 h-max courses-bar ${classesShow ? "translate-x-0" : "translate-x-[100%] lg:translate-x-0"}`} style={{ height: '90%' }} >
                    <div className="flex justify-between items-center px-3">
                        <h2 className={`${inter.className} text-white-400 text-sm font-normal p-3 pr-8 border-b-2 border-white-400`} >
                            Aulas
                        </h2>
                        <div onClick={() => setClassesShow(!classesShow)} className="cursor-pointer lg:hidden" >
                            <TbLayoutSidebarRightCollapse size={24} className="text-white-400" />
                        </div>
                    </div>
                    <div className="grid overflow-auto courses-bar" style={{ height: '90%' }}>
                        {aulas?.map((item) => (
                            <div key={item.id} className={`grid items-start gap-3 grid-cols-[20px_1fr] py-3 px-4 border-b border-watch-search last:border-0 cursor-pointer ${item.active && "bg-watch-selected"} hover:bg-watch-selected duration-500`} onClick={() => handleClick(item)} >
                                <div className={`relative w-5 h-5 rounded-[50%] border-2 border-secondary-400 overflow-hidden complete`} >

                                </div>
                                <div className="grid gap-1">
                                    <div className="grid items-center gap-2 grid-cols-[16px_1fr]">
                                        <LuMonitorPlay size={16} className="text-white-400" />
                                        <p className={`${inter.className} line-clamp-1 text-sm font-medium text-white-400`} >
                                            {item.nome}
                                        </p>
                                    </div>
                                    <p className={`${inter.className} line-clamp-1 text-xs font-normal text-white-400`} >
                                        {item.time}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
};

export default WatchPage;
