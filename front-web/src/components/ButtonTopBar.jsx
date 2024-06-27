import { Inter } from "next/font/google";
import React from "react";

const inter = Inter({
    weight: ["300", "400", "500", "600", "700", "900"],
    subsets: ["latin"]
});

export default function ButtonTopBar(props) {
    return (
        <button
            onClick={props.handleFilterButton}
            className={`${inter.className} ${
                props.filterButton === props.filterCondition &&
                "text-white-400 bg-secondary-400"
            } duration-500 lg:mr-4 mb-4 lg:mb-0 text-xs font-semibold hover:bg-secondary-400 hover:text-white-400 text-gray-400 border border-modal-close px-6 py-2 rounded-full`}
        >
            {props.nameButton}
        </button>
    );
}
