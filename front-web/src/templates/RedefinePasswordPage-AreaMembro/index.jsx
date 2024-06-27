import { Inter } from "next/font/google";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Api } from "@/api/apiUser";
import { object, string } from "yup";
import { useRouter } from "next/router";
import Link from "next/link";
const inter = Inter({
    weight: ["300", "400", "500", "600", "700", "900"],
    subsets: ["latin"]
});

const loginSchema = object({
    email: string().email("E-mail inválido!").required("Campo obrigatório")
});

export default function RedefinePasswordPage() {
    const [animation, setAnimation] = useState(0);
    const [email, setEmail] = useState('')
    const [token, setToken] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')
    const [passo, setPasso] = useState(1)
    const router = useRouter();
    const handleValidarEmail = async () => {
        if (email) {
            let response = await Api.EnviarToken({ email })
            if (response.error) {
                alert(response.msg)
            } else {
                alert(response.msg)
                setPasso(2)
            }
        } else {
            alert('Por favor coloque o email')
        }
    }
    const handleValidarToken = async () => {
        if (token) {
            let response = await Api.validarToken({ token })
            if (response.error) {
                alert(response.msg)
            } else {
                alert(response.msg)
                setPasso(3)
            }
        } else {
            alert('Por favor coloque o token')
        }
    }
    const handleAlterPassword = async () => {
        if (password && passwordConfirm && (password == passwordConfirm)) {
            let response = await Api.AlterarSenha({ password, email, token })
            if (response.error) {
                alert(response.msg)
            } else {
                alert(response.msg)
                router.push("/login");
            }
        } else {
            alert('As senhas precisam ser iguais')
        }
    }


    return (
        <main className="w-full h-screen overflow-y-hidden bg-hive bg-black-400">
            <header className="flex items-center justify-center px-6 py-6 w-full max-w-7xl mx-auto">
                <div className="w-28 lg:w-max">
                    <Image src={"/images/logo.svg"} alt="Logo" width={216} height={42} style={{ objectFit: "contain" }} />
                </div>

            </header>

            <section className="flex items-center justify-center w-full h-90vh px-6">
                {passo == 1 &&
                    <div className={`${animation > 0 && "hidden"} w-full max-w-xl h-max p-8 rounded-3xl bg-white-100`} >
                        <div className="flex items-center justify-center flex-col mb-10 lg:mb-10">
                            <h2 className="text-white-400 font-bold text-xl lg:text-4xl mb-2">
                                Validação de Email
                            </h2>
                            <p className="text-white-400 font-light lg:text-xl">
                                Você receberá um e-mail com o token para
                                validação
                            </p>
                        </div>
                        <div className="w-full">
                            <div className="flex items-start justify-start flex-col mb-6 group">
                                <label htmlFor="email" className={`${inter.className} text-gray-500 mb-1 duration-500 group-focus-within:text-white-400`} >
                                    E-mail
                                </label>
                                <input id="email" name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={`${inter.className} block w-full duration-500 bg-[transparent] h-10 px-4 border border-white-100 text-sm text-white-400 rounded-full bg-white outline-none mb-3 focus:border-primary-400`} />

                            </div>

                            <div className="mt-10 w-full">
                                <input type="button" value="Enviar" onClick={handleValidarEmail} className="w-full py-3 rounded-full hover:cursor-pointer mb-4 hover:brightness-90 duration-500 bg-primary-400 text-white-400" />
                            </div>
                            <Link href={"/login-membro"} className={`${inter.className} text-sm text-primary-300 block text-center hover:underline`} >
                                Voltar para o login
                            </Link>
                        </div>
                    </div>
                }
                {passo == 2 &&
                    <div className={`${animation > 0 && "hidden"} w-full max-w-xl h-max p-8 rounded-3xl bg-white-100`} >
                        <div className="flex items-center justify-center flex-col mb-10 lg:mb-10">
                            <h2 className="text-white-400 font-bold text-xl lg:text-4xl mb-2">
                                Validação de Token
                            </h2>
                            <p className="text-white-400 font-light lg:text-xl">
                                Coloque o token enviado
                            </p>
                        </div>
                        <div className="w-full">
                            <div className="flex items-start justify-start flex-col mb-6 group">
                                <label htmlFor="token" className={`${inter.className} text-gray-500 mb-1 duration-500 group-focus-within:text-white-400`} >
                                    Token
                                </label>
                                <input id="token" name="token" type="token" value={token} onChange={(e) => setToken(e.target.value)} className={`${inter.className} block w-full duration-500 bg-[transparent] h-10 px-4 border border-white-100 text-sm text-white-400 rounded-full bg-white outline-none mb-3 focus:border-primary-400`} />

                            </div>

                            <div className="mt-10 w-full">
                                <input type="button" value="Validar" onClick={handleValidarToken} className="w-full py-3 rounded-full hover:cursor-pointer mb-4 hover:brightness-90 duration-500 bg-primary-400 text-white-400" />
                            </div>
                            <Link href={"/login-membro"} className={`${inter.className} text-sm text-primary-300 block text-center hover:underline`} >
                                Voltar para o login
                            </Link>
                        </div>
                    </div>
                }

                {passo == 3 &&
                    <div className={`${animation > 0 && "hidden"} w-full max-w-xl h-max p-8 rounded-3xl bg-white-100`} >
                        <div className="flex items-center justify-center flex-col mb-10 lg:mb-10">
                            <h2 className="text-white-400 font-bold text-xl lg:text-4xl mb-2">
                                Redefinir senha
                            </h2>

                        </div>
                        <div className="w-full">
                            <div className="flex items-start justify-start flex-col mb-6 group">
                                <label htmlFor="token" className={`${inter.className} text-gray-500 mb-1 duration-500 group-focus-within:text-white-400`} >
                                    Senha
                                </label>
                                <input id="password" name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className={`${inter.className} block w-full duration-500 bg-[transparent] h-10 px-4 border border-white-100 text-sm text-white-400 rounded-full bg-white outline-none mb-3 focus:border-primary-400`} />

                            </div>
                            <div className="flex items-start justify-start flex-col mb-6 group">
                                <label htmlFor="token" className={`${inter.className} text-gray-500 mb-1 duration-500 group-focus-within:text-white-400`} >
                                    Senha (Confirme)
                                </label>
                                <input id="passwordConfirm" name="passwordConfirm" type="password" value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} className={`${inter.className} block w-full duration-500 bg-[transparent] h-10 px-4 border border-white-100 text-sm text-white-400 rounded-full bg-white outline-none mb-3 focus:border-primary-400`} />

                            </div>

                            <div className="mt-10 w-full">
                                <input type="button" value="Alterar" onClick={handleAlterPassword} className="w-full py-3 rounded-full hover:cursor-pointer mb-4 hover:brightness-90 duration-500 bg-primary-400 text-white-400" />
                            </div>
                            <Link href={"/login-membro"} className={`${inter.className} text-sm text-primary-300 block text-center hover:underline`} >
                                Voltar para o login
                            </Link>
                        </div>
                    </div>
                }



            </section>
        </main>
    );
}
