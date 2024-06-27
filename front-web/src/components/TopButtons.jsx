import { Inter } from "next/font/google";
import React, { useState } from "react";
import { IoMdSearch } from "react-icons/io";
import { IoReload } from "react-icons/io5";

const inter = Inter({
    weight: ["300", "400", "500", "600", "700", "900"],
    subsets: ["latin"]
});

export default function TopButtons({ children, search ,handleFilter}) {
    const [filterMobile, setFilterMobile] = useState(false);

    return (
        <div className="dark:bg-sidebar-dark-menu dark:border-y dark:border-black-300 flex items-start justify-start flex-col lg:flex-row lg:items-center lg:justify-between px-4 lg:px-6 py-6">
            <div className="hidden lg:flex lg:items-center lg:justify-start">
                {children}

                {search && (
                    <div className="relative mb-4 lg:mb-0">
                        <input
                            type="text"
                            name="search"
                            id="search"
                            placeholder="Buscar..."
                            onChange={handleFilter}
                            className="border border-modal-close outline-none text-xs text-black-400 focus:border-black-400 rounded-full pl-2 pr-10 h-10"
                        />
                        <IoMdSearch className="absolute right-3 top-3 text-xl" />
                    </div>
                )}
            </div>

            <div className="flex items-center justify-between w-full lg:w-fit">
                <button
                    onClick={() => setFilterMobile(!filterMobile)}
                    className={`${inter.className} dark:text-white-400 dark:border-black-300 lg:hidden duration-500 text-sm font-medium text-black-400 border border-modal-close px-6 py-2 rounded-full`}
                >
                    Pesquisar
                </button>
             
            </div>

            <div
                className={`${
                    filterMobile && "h-60 mt-4"
                } h-0 lg:hidden flex items-start justify-start flex-col-reverse overflow-y-hidden duration-500`}
            >
                {children}

                {search && (
                    <div className="relative mb-4 lg:mb-0">
                        <input
                            type="text"
                            name="search"
                            id="search"
                            placeholder="'Miami beach house'"
                            className="border border-modal-close outline-none text-sm text-black-400 focus:border-black-400 rounded-full pl-2 pr-10 h-10"
                        />
                        <IoMdSearch className="absolute right-3 top-3 text-xl" />
                    </div>
                )}
            </div>
        </div>
    );
}
