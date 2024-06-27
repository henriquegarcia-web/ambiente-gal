import Head from "next/head";
import React from "react";

import FinancialPage from "@/templates/FinancialPage";

export default function Financial() {
    return (
        <>
            <Head>
                <title>Wolfy Admin - Financeiro</title>
                <meta
                    name="description"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <FinancialPage />
        </>
    );
}
