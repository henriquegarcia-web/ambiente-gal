import Head from "next/head";
import React from "react";

import PixelPage from "@/templates/PixelPage";

export default function Pixel() {
    return (
        <>
            <Head>
                <title>Wolfy Admin - Pixel</title>
                <meta
                    name="description"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <PixelPage />
        </>
    );
}
