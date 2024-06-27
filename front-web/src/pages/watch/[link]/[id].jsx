import Head from "next/head";
import React from "react";

import WatchPage from "@/templates/WatchPage";

export default function Products() {
    return (
        <>
            <Head>
                <title>Wolfy Admin - Assistir</title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <WatchPage />
        </>
    );
}
