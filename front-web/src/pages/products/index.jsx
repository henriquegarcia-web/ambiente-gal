import Head from "next/head";
import React from "react";

import ProductsPage from "@/templates/ProductsPage";

export default function Products() {
    return (
        <>
            <Head>
                <title>Wolfy Admin - Products</title>
                <meta
                    name="description"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <ProductsPage />
        </>
    );
}
