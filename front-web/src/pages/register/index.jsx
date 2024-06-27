import Head from "next/head";
import React from "react";

import RegisterPage from "@/templates/RegisterPage";

export default function Register() {
    return (
        <>
            <Head>
                <title>Wolfy Admin - Register</title>
                <meta
                    name="description"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <RegisterPage />
        </>
    );
}
