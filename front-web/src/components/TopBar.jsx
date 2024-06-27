import { Inter } from "next/font/google";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
    HiFolderPlus,
    HiOutlineBell,
    HiOutlineMagnifyingGlass,
    HiOutlinePlus
} from "react-icons/hi2";

const inter = Inter({
    weight: ["300", "400", "500", "600", "700", "900"],
    subsets: ["latin"]
});

const TopBar = ({ notRegistered, pageTitle, pageHandleModal, buttonText,top=true }) => {
    const [saleTotal, setSaleTotal] = useState(0);
    const [saleGoal, setSaleGoal] = useState(500000);
    const [salePercent, setSalePercent] = useState(0);

    useEffect(() => {
        const percent = (saleTotal / saleGoal) * 100;
        setSalePercent(percent);
    }, [saleGoal, saleTotal]);
    const [valida, setValida] = useState(true)
    const [permissao, setPermissao] = useState(0)
    const [obj, setObj] = useState({})
    const [foto, setFoto] = useState('')
    useEffect(() => {
        const getAuthUser = localStorage?.getItem("authUser");
        let obj = getAuthUser == "undefined" || getAuthUser == null || getAuthUser == "[object Object]" ? "" : JSON.parse(getAuthUser ? getAuthUser : "");
        setPermissao(obj?.permissao)
        setFoto(obj?.foto)
        setObj(obj)
        setValida(obj?.produtor.validar)
       
        if(obj.produtor?.valorTotal){
            setSaleTotal(obj.produtor.valorTotal)
        }
    }, [])
    const formatNumbers = (num) => {
        if (num >= 1000) {
            const roundedNum = Math.floor(num / 1000);
            return `${roundedNum}K`;
        } else {
            return num.toFixed(2);
        }
    };

    return (
        <div>
            { obj.permissao!=1 && (notRegistered && valida!=1) && (

                <div className="flex items-center justify-center gap-2 bg-yellow-headbar dark:bg-yellow-headbar-dark w-full p-1" style={{ height: 20 }}>
                    <HiFolderPlus
                        size={10}
                        className="text-black-400 dark:text-black-600"
                    />
                    <p
                        className={`${inter.className} max-w-[80%] text-sm font-normal lg:text-xl`}
                        style={{ fontSize: 10 }}
                    >
                        Você precisa completar o seu cadastro e esperar validação
                    </p>
                </div>
            )}
            <div className="p-3 lg:px-11 dark:bg-sidebar-dark-menu mb-4 border-b border-gray-border dark:border-black-300 flex flex-col-reverse gap-6 lg:flex-row lg:justify-between lg:items-center">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
                    <h2
                        className={`${inter.className} text-3xl font-semibold text-black-400 dark:text-white-400`}
                        style={{ fontSize: 20 }}
                    >
                        {pageTitle}
                    </h2>
                    {pageHandleModal && (
                        <button
                            onClick={pageHandleModal}
                            className="px-2 py-1 rounded-[100px] bg-primary-400 flex items-center text-white-400 gap-2 w-max hover:bg-primary-300 duration-500"
                            style={{ fontSize: 14 }}
                        >
                            <p
                                className={`${inter.className} text-md font-semibold`}

                            >
                                {buttonText}
                            </p>
                            <HiOutlinePlus size={18} />
                        </button>
                    )}
                </div>
                {top && 
                 <div className="flex flex-col-reverse gap-6 lg:flex-row">

                 <div className="flex items-center gap-4">
                     {permissao == 3 &&
                         <div className="w-full">
                             <p
                                 className={`${inter.className} text-xl font-semibold w-max ml-auto`}
                                 style={{ fontSize: 10 }}
                             >
                                 R$ {formatNumbers(saleTotal)} / R${" "}
                                 {formatNumbers(saleGoal)}
                             </p>
                             <div className="flex items-center gap-2 justify-end">
                                 <Image
                                     src={"/images/medal.svg"}
                                     width={15}
                                     height={15}
                                     alt="medal"
                                 />
                                 <div className="w-full h-3 bg-gray-sale dark:bg-gray-sale-dark rounded-full overflow-hidden relative max-w-[229px] lg:w-[229px]">
                                     <div
                                         className="absolute top-0 bottom-0 left-0 bg-yellow-headbar dark:bg-yellow-headbar-dark"
                                         style={{ width: `${salePercent}%` }}
                                     ></div>
                                 </div>
                             </div>
                         </div>

                     }

                     <Image
                         src={foto?`${process.env.NEXT_PUBLIC_API_URL}/arquivo/${foto}`: "/images/user.svg"}
                         width={30}
                         height={30}
                         alt="user"
                         className="rounded-[50%]"
                     />
                 </div>
             </div>
                }
               
            </div>
        </div>
    );
};

export default TopBar;
