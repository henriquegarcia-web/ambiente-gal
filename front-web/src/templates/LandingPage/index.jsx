import { Inter } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaRegUser } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";

const inter = Inter({
    weight: ["300", "400", "500", "600", "700", "900"],
    subsets: ["latin"]
});

export default function LandingPage() {
    return (
        <main className="w-full h-screen overflow-y-hidden bg-black-400">
            <header className="flex items-center justify-between px-6 py-6 w-full max-w-7xl mx-auto">
                <div className="w-28 lg:w-max">
                    <Image
                        src={"/images/logo.svg"}
                        alt="Logo"
                        width={216}
                        height={42}
                        style={{ objectFit: "contain" }}
                    />
                </div>
                <div className="flex items-center justify-center">
                    <Link href={"/login"} className="mr-4 lg:mr-8">
                        <div className="flex items-center justify-center">
                            <div className="hidden lg:block">
                                <FaRegUser color="#50B795" />
                            </div>
                            <p
                                className={`${inter.className} font-semibold text-sm text-primary-400 ml-4`}
                            >
                                Fazer login
                            </p>
                        </div>
                    </Link>
                    <Link
                        href={"/register"}
                        className={`${inter.className} font-semibold hover:brightness-90 duration-500 bg-primary-400 text-sm text-black-400 lg:px-10 px-2 text-center lg:py-3 py-2 rounded-lg`}
                    >
                        Criar conta
                    </Link>
                </div>
            </header>

            <section className="w-full max-w-7xl mx-auto lg:h-full 2xl:relative lg:px-6 px-4 pt-8 lg:flex lg:items-start lg:pt-32 lg:justify-between">
                <div className="mb-8 lg:max-w-md lg:mr-16">
                    <h2
                        className={`${inter.className} text-white-400 font-black text-4xl mb-8 xl:text-5xl`}
                    >
                        Alcance novos patamares e venda seus produtos digitais
                        com LIBERDADE
                    </h2>
                    <p
                        className={`${inter.className} text-white-400 text-lg mb-8`}
                    >
                        A plataforma ideal para infoprodutores que buscam
                        expandir seus negócios.
                    </p>
                    <Link href={"/register"}>
                        <div className="bg-primary-400 hover:brightness-90 duration-500 px-4 py-2 inline-flex items-center justify-center rounded-md">
                            <p
                                className={`${inter.className} text-white-400 font-semibold mr-2`}
                            >
                                Crie sua conta
                            </p>
                            <FaArrowRight color="#fff" />
                        </div>
                    </Link>
                </div>
                <div className="w-full max-w-lg mx-auto lg:max-w-none lg:ml-auto lg:w-max lg:mx-0 2xl:absolute 2xl:bottom-24 2xl:right-0">
                    <Image
                        src={"/images/landing-page.png"}
                        alt={"Dashboard demo"}
                        width={632}
                        height={672}
                        style={{ objectFit: "contain" }}
                    />
                </div>
            </section>
        </main>
    );
}
