import Head from "next/head";
import React from "react";

import IntegrationsPage from "@/templates/IntegrationsPage";

export default function Products() {
    return (
        <>
            <Head>
                <title>Wolfy Admin - Integrações</title>
                <meta
                    name="description"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <IntegrationsPage />
        </>
    );
}
