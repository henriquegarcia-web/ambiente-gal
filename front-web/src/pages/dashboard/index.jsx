import Head from "next/head";
import React from "react";

import DashboardPage from "@/templates/DashboardPage";

export default function Dashboard() {
    return (
        <>
            <Head>
                <title>Wolfy Admin - Dashboard</title>
                <meta
                    name="description"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <DashboardPage />
        </>
    );
}
