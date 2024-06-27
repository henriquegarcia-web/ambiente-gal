import Head from "next/head";
import React from "react";

import FreightPage from "@/templates/FreightPage";

export default function Freight() {
    return (
        <>
            <Head>
                <title>Wolfy Admin - Frete</title>
                <meta
                    name="description"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <FreightPage />
        </>
    );
}
