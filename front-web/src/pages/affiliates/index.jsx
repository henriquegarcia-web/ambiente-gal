import Head from "next/head";
import React from "react";

import AffiliatesPage from "@/templates/AffiliatesPage";

export default function Affiliates() {
    return (
        <>
            <Head>
                <title>Wolfy Admin - Afiliados</title>
                <meta
                    name="description"
                   
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <AffiliatesPage />
        </>
    );
}
