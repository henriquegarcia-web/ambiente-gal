import Head from "next/head";
import React from "react";

import RedefinePasswordPage from "@/templates/RedefinePasswordPage";

export default function RedefinePassword() {
    return (
        <>
            <Head>
                <title>Wolfy Admin - Redefine Password</title>
                <meta
                    name="description"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <RedefinePasswordPage />
        </>
    );
}
