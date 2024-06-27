import Head from "next/head";
import React from "react";

import CheckoutPage from "@/templates/CheckoutPage";

export default function Checkout() {
    return (
        <>
            <Head>
                <title>Wolfy Admin - Checkout</title>
                <meta
                    name="description"
                 
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <CheckoutPage />
        </>
    );
}
