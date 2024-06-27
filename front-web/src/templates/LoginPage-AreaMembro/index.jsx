import { Inter } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

import { ErrorMessage, Field, Form, Formik } from "formik";
import { object, string } from "yup";
import { Api } from "@/api/apiLogin";
import { Api as ApiArea } from "@/api/apiAreaMembro";
const inter = Inter({
    weight: ["300", "400", "500", "600", "700", "900"],
    subsets: ["latin"]
});

const loginSchema = object({
    email: string().email("E-mail inválido!").required("Campo obrigatório"),
    password: string().required("Campo obrigatório")
});

export default function LoginPage() {

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false)
    const router = useRouter();

    const initialValues = {
        email: "",
        password: ""
    };
    const { id } = router.query;


    useEffect(() => {
        let obj
        if (typeof window !== 'undefined') {
            const getAuthUser = localStorage.getItem('authUser')
            obj = getAuthUser == 'undefined' || getAuthUser == null ? '' : JSON.parse(getAuthUser ? getAuthUser : '')
            console.log(obj)
            if (obj?.id && obj?.permissao == 3) {
                handlePropriedade()
            }
        }
    }, [id])
    const handlePropriedade = async (e) => {
        let response = await ApiArea.Listagem()
        if (response.error) {
            alert(response.msg)
        } else {

            let listagem = response.list
        
            if (listagem.some((item) => item.link == id)) {
             
                router.push("/courses/" + id);
          }

        }
    };
    const login = async (e) => {
        setLoading(true)
        let { email, password } = e
        if (email && password) {
            let response = await Api.Login({ email, password ,link:id})
            if (response.error) {
                alert(response.msg)
            } else {
                router.push("/courses/" + id);
            }
        }
        setLoading(false)
    };

    return (
        <main className="w-full h-screen overflow-y-hidden bg-hive bg-black-400">
            <header className="flex items-center justify-center px-6 py-6 w-full max-w-7xl mx-auto">
                <div className="w-full lg:w-max">
                    <Image src={"/images/logo.svg"} alt="Logo" width={216} height={42} style={{ objectFit: "contain" }} />
                </div>

            </header>

            <section className="flex items-center justify-center w-full h-90vh px-6">
                <div className="w-full max-w-xl h-max p-8 rounded-3xl bg-white-100">
                    <div className="flex items-center justify-center flex-col lg:mb-10">
                        <h2 className="text-white-400 font-bold text-xl lg:text-4xl mb-2">
                            Fazer Login
                        </h2>
                        <p className="text-white-400 font-light lg:text-xl">
                            Insira suas informações para iniciar sessão
                        </p>
                    </div>

                    <Formik onSubmit={login} initialValues={initialValues} validationSchema={loginSchema} validateOnMount={true}  >
                        {({ isSubmitting }) => (
                            <Form className="w-full">
                                <div className="flex items-start justify-start flex-col mb-6 group">
                                    <label htmlFor="email" className={`${inter.className} text-gray-500 mb-1 duration-500 group-focus-within:text-white-400`} >
                                        E-mail
                                    </label>
                                    <Field id="email" name="email" type="email" className={`${inter.className} block w-full duration-500 bg-[transparent] h-10 px-4 border border-white-100 text-sm text-white-400 rounded-full bg-white outline-none mb-3 focus:border-primary-400`} />
                                    <ErrorMessage className={`${inter.className} text-red-400 text-xs font-bold`} name="email" component="span" />
                                </div>

                                <div className="flex items-start justify-start flex-col group mb-1">
                                    <label htmlFor="password" className={`${inter.className} text-gray-500 mb-1 duration-500 group-focus-within:text-white-400`} >
                                        Senha
                                    </label>
                                    <div className="relative w-full">
                                        <Field name="password" type={
                                            showPassword
                                                ? "text"
                                                : "password"
                                        }
                                            className={`${inter.className} block w-full mb-2 duration-500 bg-[transparent] h-10 px-4 border border-white-100 text-sm text-white-400 rounded-full bg-white outline-none focus:border-primary-400`}
                                        />
                                        <div onClick={() => setShowPassword(!showPassword)} className="absolute right-4 bottom-4 text-xl text-gray-400" >
                                            {showPassword ? (
                                                <IoMdEyeOff />
                                            ) : (
                                                <IoMdEye />
                                            )}
                                        </div>
                                    </div>
                                    <ErrorMessage className={`${inter.className} text-red-400 text-xs font-bold`} name="password" component="span" />
                                </div>

                                <div className="flex items-center justify-end">
                                    <Link href={"/redefine-password-membro"} className={`${inter.className} text-sm text-primary-300 hover:underline`} >
                                        Esqueci minha senha
                                    </Link>
                                </div>

                                <div className="mt-10 w-full">
                                    <input disabled={loading}   style={{backgroundColor:loading?'#ccc':''}} type="submit" value="Fazer login" className="w-full py-3 rounded-full hover:cursor-pointer mb-4 hover:brightness-90 duration-500 bg-primary-400 text-white-400" />
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </section>
        </main>
    );
}
