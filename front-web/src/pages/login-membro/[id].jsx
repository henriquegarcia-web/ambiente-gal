import Head from "next/head";
import React from "react";

import LoginPage from "@/templates/LoginPage-AreaMembro";

export default function Login() {
    return (
        <>
            <Head>
                <title>Wolfy Admin - Login</title>
                <meta
                    name="description"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <LoginPage />
        </>
    );
}
