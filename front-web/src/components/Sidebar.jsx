import { Inter } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import {
    HiCheckBadge,
    HiCodeBracket,
    HiCog6Tooth,
    HiCube,
    HiCurrencyDollar,
    HiDocumentDuplicate,
    HiLink,
    HiCreditCard,
    HiChartBar,
    HiMiniChevronLeft,
    HiMiniChevronRight,
    HiShoppingCart,
    HiTableCells,
    HiMiniUser,
    HiOutlineReceiptPercent,
    HiUserGroup,
    HiUsers,
    HiShieldCheck,
} from "react-icons/hi2";
import { TbLogout2 } from "react-icons/tb";
import { PerfilForm } from "./Perfil";

const inter = Inter({
    weight: ["300", "400", "500", "600", "700", "900"],
    subsets: ["latin"]
});

const Sidebar = () => {
    const [modalActive, setModalActive] = useState(false);
    const [item, setItem] = useState()
    const [sidebarToggle, setSidebarToggle] = useState(false);
    const [isWideScreen, setIsWideScreen] = useState(0);
    const [obj, setObj] = useState({})
    useEffect(() => {
        const getAuthUser = localStorage?.getItem("authUser");
        let obj = getAuthUser == "undefined" || getAuthUser == null || getAuthUser == "[object Object]" ? "" : JSON.parse(getAuthUser ? getAuthUser : "");
        setItem({id:obj.id,idConta:obj.idConta,nome:obj.nome, email: obj.email,foto:obj.foto, agencia:obj?.produtor?.agencia,agenciaDig:obj?.produtor?.agenciaDig,bairro:obj?.produtor?.bairro,banco:obj?.produtor?.banco,cep:obj?.produtor?.cep,cidade:obj?.produtor?.cidade,conta:obj?.produtor?.conta,contaDig:obj?.produtor?.contaDig,cpfCnpj:obj?.produtor?.cpfCnpj,estado:obj?.produtor?.estado,numero:obj?.produtor?.numero,rua:obj?.produtor?.rua,titular:obj?.produtor?.titular,tipoConta:obj?.produtor?.tipoConta,permissao:obj.permissao,versoIdentidade:obj?.produtor?.versoIdentidade,frenteIdentidade:obj?.produtor?.frenteIdentidade,cartaoCNPJ:obj?.produtor?.cartaoCNPJ,selfieDocumento:obj?.produtor?.selfieDocumento})
        setObj(obj)
        
        if (!obj?.id) {
            localStorage.setItem("authUser", "{}");
            window.location.href = '/'
        }
    }, [])
   
    const router = useRouter();

    useEffect(() => {
        setIsWideScreen(window.innerWidth);

        window.addEventListener("resize", () => {
            setIsWideScreen(window.innerWidth);
        });

        if (isWideScreen > 1024) {
            setSidebarToggle(true);
        }
    }, [isWideScreen]);
    let Menus
    if (obj.permissao == 1) {
        Menus = [
            { title: "Dashboard", icon: <HiTableCells size={24} />, link: "/dashboard" },
            { title: "Produtor", icon: <HiShieldCheck size={24} />, link: "/produtor" },
            { title: "Usuário", icon: <HiMiniUser size={24} />, link: "/user" },
            { title: "Financeiro", icon: <HiCreditCard size={24} />, link: "/financial" },
            { title: "Relatórios", icon: <HiChartBar size={24} />, link: "/reports" },
            // { title: "Integrações", icon: <HiLink size={24} />, link: "/integrations" },
            // { title: "Requerentes", icon: <HiDocumentDuplicate size={24} />, link: "/requerents" }
        ];
    }
    if (obj.permissao == 2) {
        Menus = [];
    }
    if (obj.permissao == 3) {
        Menus = [
            { title: "Dashboard", icon: <HiTableCells size={24} />, link: "/dashboard" },
            { title: "Relatórios", icon: <HiChartBar size={24} />, link: "/reports" },
            { title: "Financeiro", icon: <HiCreditCard size={24} />, link: "/financial" },
            { title: "Pixel", icon: <HiCodeBracket size={24} />, link: "/pixel" },
            { title: "Cupom", icon: <HiOutlineReceiptPercent size={24} />, link: "/cupom" },
            { title: "Produtos", icon: <HiCube size={24} />, link: "/products" },
            { title: "Área de membros", icon: <HiUserGroup size={24} />, link: "/member-area" },
            { title: "Clientes", icon: <HiUsers size={24} />, link: "/clients" },
            { title: "Checkout", icon: <HiCheckBadge size={24} />, link: "/checkout" },
            // { title: "Afiliados", icon: <HiCurrencyDollar size={24} />, link: "/affiliates" },
            // { title: "Marketplace", icon: <HiShoppingCart size={24} />, link: "/marketplace" },

      
             
           { title: "Integrações", icon: <HiLink size={24} />, link: "/integrations" },
        ];
    }
    if (obj.permissao == 4) {
        Menus = [
            { title: "Dashboard", icon: <HiTableCells size={24} />, link: "/dashboard" },
            { title: "Produtor", icon: <HiShieldCheck size={24} />, link: "/produtor" },
            { title: "Usuário", icon: <HiMiniUser size={24} />, link: "/user" },
            { title: "Financeiro", icon: <HiCreditCard size={24} />, link: "/financial" },
            //   { title: "Integrações", icon: <HiLink size={24} />, link: "/integrations" },
            //   { title: "Requerentes", icon: <HiDocumentDuplicate size={24} />, link: "/requerents" }
        ];
    }
    if (obj.permissao == 5) {
        Menus = [
            { title: "Dashboard", icon: <HiTableCells size={24} />, link: "/dashboard" },
            { title: "Produtor", icon: <HiShieldCheck size={24} />, link: "/produtor" },

            //  { title: "Integrações", icon: <HiLink size={24} />, link: "/integrations" },
            //  { title: "Requerentes", icon: <HiDocumentDuplicate size={24} />, link: "/requerents" }
        ];
    }

    // const Menus = [
    //     { title: "Dashboard", icon: <HiTableCells size={24} />, link: "/dashboard" },
    //     { title: "Pixel", icon: <HiCodeBracket size={24} />, link: "/pixel" },
    //     { title: "Cupom", icon: <HiOutlineReceiptPercent size={24} />, link: "/cupom" },
    //     { title: "Produtos", icon: <HiCube size={24} />, link: "/products" },
    //     { title: "Área de membros", icon: <HiUserGroup size={24} />, link: "/member-area"},
    //     { title: "Clientes", icon: <HiUsers size={24} />, link: "/clients" },
    //     { title: "Checkout", icon: <HiCheckBadge size={24} />, link: "/checkout" },
    //     { title: "Afiliados", icon: <HiCurrencyDollar size={24} />, link: "/affiliates" },
    //     { title: "Marketplace", icon: <HiShoppingCart size={24} />, link: "/marketplace" },
    //     { title: "Produtor", icon: <HiShieldCheck size={24} />, link: "/produtor" },
    //     { title: "Usuário", icon: <HiMiniUser size={24} />, link: "/user" },

    //     { title: "Financeiro", icon: <HiCreditCard size={24} />, link: "/financial" },
    //     { title: "Relatórios", icon: <HiChartBar size={24} />, link: "/reports" },
    //     { title: "Integrações", icon: <HiLink size={24} />, link: "/integrations" },
    //     { title: "Requerentes", icon: <HiDocumentDuplicate size={24} />, link: "/requerents" }
    // ];
    const handleClick = () => {
        localStorage.setItem("authUser", "{}");
        window.location.href = '/'
    }
    let BottomMenus
    if (obj?.id) {
        BottomMenus = [
            { title: "Sair", icon: <TbLogout2 size={24} />, link: "/", onClick: handleClick },
            { title: "Configurações", icon: <HiCog6Tooth size={24} />, link: "/perfil" }
        ];
    }


    return (
        <div className={`bg-sidebar-menu dark:bg-sidebar-dark-menu h-screen fixed top-0 left-0 z-50 duration-500 ${sidebarToggle ? "w-60" : "w-14"}`}  >
            <div className={`${sidebarToggle ? "p-6" : "p-3"} items-center justify-center`} >
                <Image src={sidebarToggle ? "/images/logo.svg" : "/images/wolfy.svg"} width={sidebarToggle ? 103 : 20} height={20} alt="Logo" className="mx-auto" />
            </div>
            <div className="text-white-400 h-4 w-4 bg-primary-300 absolute right-[-10px] top-[14px] items-center justify-center rounded-[50%] duration-500 lg:hidden" onClick={() => setSidebarToggle(!sidebarToggle)} >
                {sidebarToggle ? (
                    <HiMiniChevronLeft size={16} />
                ) : (
                    <HiMiniChevronRight size={16} />
                )}
            </div>
            <div className="overflow-y-scroll h-90vh flex flex-col justify-between sidebar-menus">
                <div className="flex flex-col mt-4 gap-2 items-center justify-center">
                    {Menus?.map((menu) => (
                        menu.title == "Dashboard" ?

                            <a key={menu.title} href={menu.link} className={`flex after:content-[''] after:w-1 after:block after:absolute after:top-0 after:bottom-0 after:right-0 ${sidebarToggle
                                ? "px-6 gap-5 justify-start"
                                : "justify-center"
                                } ${router.pathname === menu.link
                                    ? "bg-sidebar-hover-items after:bg-secondary-400 text-secondary-500 dark:bg-sidebar-dark-hover-items dark:text-white-icons dark:after:bg-white-text"
                                    : "text-white-icons"
                                } py-3 w-full relative hover:text-secondary-500 hover:bg-sidebar-hover-items hover:after:bg-secondary-400 duration-500 after:duration-500 dark:hover:bg-sidebar-dark-hover-items dark:hover:text-white-icons dark:hover:after:bg-white-text`} >
                                {menu.icon}
                                <p className={`${inter.className}font-medium duration-500 text-white-text ${sidebarToggle ? "opacity-100 visible" : "opacity-0 hidden"}`} >
                                    {menu.title}
                                </p>
                            </a>
                            :
                            <Link key={menu.title} href={menu.link} className={`flex after:content-[''] after:w-1 after:block after:absolute after:top-0 after:bottom-0 after:right-0 ${sidebarToggle
                                ? "px-6 gap-5 justify-start"
                                : "justify-center"
                                } ${router.pathname === menu.link
                                    ? "bg-sidebar-hover-items after:bg-secondary-400 text-secondary-500 dark:bg-sidebar-dark-hover-items dark:text-white-icons dark:after:bg-white-text"
                                    : "text-white-icons"
                                } py-3 w-full relative hover:text-secondary-500 hover:bg-sidebar-hover-items hover:after:bg-secondary-400 duration-500 after:duration-500 dark:hover:bg-sidebar-dark-hover-items dark:hover:text-white-icons dark:hover:after:bg-white-text`} >
                                {menu.icon}
                                <p className={`${inter.className}font-medium duration-500 text-white-text ${sidebarToggle ? "opacity-100 visible" : "opacity-0 hidden"}`}
                                >
                                    {menu.title}
                                </p>
                            </Link>
                    ))}
                </div>
                <div className="flex flex-col mt-4 gap-2 items-center justify-center">
                    {BottomMenus?.map((menu) => (
                        <Link onClick={() => { menu.title == 'Sair' ? handleClick() : setModalActive(true) }} key={menu.title} href={'#'} className={`flex after:content-[''] after:w-1 after:block after:absolute after:top-0 after:bottom-0 after:right-0 ${sidebarToggle
                            ? "px-6 gap-5 justify-start"
                            : "justify-center"
                            } ${router.pathname === menu.link
                                ? "bg-sidebar-hover-items after:bg-secondary-400 text-secondary-500 dark:bg-sidebar-dark-hover-items dark:text-white-icons dark:after:bg-white-text"
                                : "text-white-icons"
                            } py-3 w-full relative hover:text-secondary-500 hover:bg-sidebar-hover-items hover:after:bg-secondary-400 duration-500 after:duration-500 dark:hover:bg-sidebar-dark-hover-items dark:hover:text-white-icons dark:hover:after:bg-white-text`}
                        >
                            {menu.icon}
                            <p
                                className={`${inter.className
                                    }font-medium duration-500 text-white-text ${sidebarToggle
                                        ? "opacity-100 visible"
                                        : "opacity-0 hidden"
                                    }`}
                            >
                                {menu.title}
                            </p>
                        </Link>
                    ))}
                </div>
            </div>
            <PerfilForm disabled={true} buttonText={'Perfil'} modalActive={modalActive} setModalActive={setModalActive} item={item} setItem={setItem} />
        </div>
    );
};

export default Sidebar;
