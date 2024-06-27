import Head from "next/head";
import React from "react";


import CheckoutSalePage from "@/templates/CheckoutSalePage";

export default function CheckoutSale() {
    return (
        <>
            <Head > 
                <title>Wolfy Admin - Checkout de venda</title>
                <meta
                    name="description"
           
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <CheckoutSalePage />
        </>
    );
}
