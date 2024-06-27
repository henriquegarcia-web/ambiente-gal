import Head from "next/head";
import React from "react";

import ClientsPage from "@/templates/ClientsPage";

export default function Login() {
    return (
        <>
            <Head>
                <title>Wolfy Admin - Clients</title>
                <meta
                    name="description"
                    content=""
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <ClientsPage />
        </>
    );
}
