import Head from "next/head";
import React from "react";

import ProdutorPage from "@/templates/ProdutorPage";

export default function Pixel() {
    return (
        <>
            <Head>
                <title>Wolfy Admin - Produtor</title>
                <meta
                    name="description"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <ProdutorPage />
        </>
    );
}
