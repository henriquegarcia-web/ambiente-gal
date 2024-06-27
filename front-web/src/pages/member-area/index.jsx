import MemberAreaPage from "@/templates/MemberAreaPage/index";
import Head from "next/head";
import React from "react";

const MemberArea = () => {
    return (
        <>
            <Head>
                <title>Wolfy Admin - Área de membros</title>
                <meta
                    name="description"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <MemberAreaPage/>
        </>
    );
};

export default MemberArea;
