import Head from "next/head";
import React from "react";

import CupomPage from "@/templates/CupomPage";

export default function Cupom() {
    return (
        <>
            <Head>
                <title>Wolfy Admin - Cupom</title>
                <meta
                    name="description"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            < CupomPage/>
        </>
    );
}
