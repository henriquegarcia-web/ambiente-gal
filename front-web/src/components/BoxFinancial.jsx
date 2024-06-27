import { Inter } from "next/font/google";
import React from "react";

const inter = Inter({
    weight: ["300", "400", "500", "600", "700", "900"],
    subsets: ["latin"]
});

export default function BoxFinancial({ children, title, value }) {
    return (
        <div className="grid grid-cols-[30px_auto] gap-x-2 items-center sm:mr-8 mb-8 sm:mb-0 dark:border dark:border-black-300 dark:bg-sidebar-dark-menu bg-white-box rounded-lg shadow-md w-full max-w-max py-2 lg:py-8 px-4 lg:px-0 lg:pl-6 lg:pr-36">
            {children}

            <div>
                <p
                    className={`${inter.className} text-gray-400 font-semibold text-xs`} style={{fontSize:10}}
                >
                    {title}
                </p>
                <p
                    className={`${inter.className} text-black-400 font-bold dark:text-white-400`} style={{fontSize:12}}
                >
                    {value}
                </p>
            </div>
        </div>
    );
}
