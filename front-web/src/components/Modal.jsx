import { Inter } from "next/font/google";
import React from "react";
import { FaXmark } from "react-icons/fa6";

const inter = Inter({
    weight: ["300", "400", "500", "600", "700", "900"],
    subsets: ["latin"]
});

export default function Modal({
    children,
    modalActive,
    titleModal,
    handleClickModal,
    saveButton,
    textButton,
    minWidth
}) {
    return (
        <div  className={`${modalActive ? "opacity-100" : "opacity-0 pointer-events-none"
                } w-full h-screen fixed z-[51] duration-500 top-0 flex items-center justify-center bg-modal-background`} style={{left:0}} >
            <div className="w-full max-w-[90%] lg:max-w-xl z-50 dark:border dark:border-black-300 dark:bg-sidebar-dark-menu bg-white-400 rounded-xl p-6"  style={{minWidth:minWidth?minWidth:'36rem'}}>
                <div className="flex items-center justify-between">
                    <h2
                        className={`${inter.className} dark:text-white-400 text-black-300 font-medium text-xl`}
                    >
                        {titleModal}
                    </h2>
                    <div
                        onClick={handleClickModal}
                        className="flex items-center justify-center bg-modal-close rounded-full w-7 h-7 hover:cursor-pointer"
                    >
                        <FaXmark className="dark:text-white-400 text-black-300 relative" />
                    </div>
                </div>
                {children}
                {textButton ?
                    <button
                        className={`${inter.className} bg-secondary-400 block w-full rounded-full py-2 font-medium text-white-400 hover:brightness-90 duration-500`}
                        onClick={saveButton}
                    >
                        {textButton}
                    </button>
                    : <></>}

            </div>
        </div>
    );
}
