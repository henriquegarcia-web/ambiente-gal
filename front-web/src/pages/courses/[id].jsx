import Head from "next/head";
import React from "react";

import CoursesPage from "@/templates/CoursesPage";

export default function Dashboard() {
    return (
        <>
            <Head>
                <title>Wolfy Admin - Cursos</title>
                <meta
                    name="description"
                  
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <CoursesPage />
        </>
    );
}
