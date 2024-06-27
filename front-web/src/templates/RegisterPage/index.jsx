import { Inter } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { Form } from "reactstrap";
import { useFormik} from "formik";
import { object, string, ref, bool } from "yup";
import { Api } from "@/api/apiProdutor";
const inter = Inter({
    weight: ["300", "400", "500", "600", "700", "900"],
    subsets: ["latin"]
});



export default function RegisterPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [loading,setLoading] = useState(false)
    const router = useRouter();

    const validation = useFormik({
        enableReinitialize: true,
        initialValues: {
            id: '',
            nome: '',
            password: '',
            confirmPassword:'',
            email: ''
        },
        onSubmit: async (values) => {
            setLoading(true)
            if(values.password && values.confirmPassword && (values.password==values.confirmPassword)){
                if(values.email){
                    let response = await Api.Cadastrar(values)
                    if (response.error) {
                        alert(response.msg)
                    } else {
                       alert(response.msg)
                       router.push("/login");
                    }
                }else{
                    alert("O email precisa ser enviado!")
                }
            }else{
                alert("As duas senha precisa ser iguais!")
            }
            setLoading(false)
        }
    })

    return (
        <main className="w-full h-screen overflow-y-hidden bg-hive bg-black-400">
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
                    <Link href={"/"} className="mr-4 lg:mr-8">
                        <p
                            className={`${inter.className} font-semibold text-sm text-white-400 ml-4`}
                        >
                            Home
                        </p>
                    </Link>
                    <Link
                        href={"/login"}
                        className={`${inter.className} font-semibold hover:bg-primary-400 hover:text-white-400 duration-500 border border-primary-400 text-sm text-primary-400 lg:px-8 px-2 text-center py-2 rounded-full`}
                    >
                        Fazer Login
                    </Link>
                </div>
            </header>

            <section className="flex items-center justify-center w-full h-90vh px-6">
                <div className="w-full max-w-xl h-max p-8 rounded-3xl bg-white-100">
                    <div className="flex items-center justify-center flex-col mb-10 lg:mb-10">
                        <h2
                            className={`${inter.className} text-white-400 font-bold text-xl 2xl:text-4xl mb-2`}
                        >
                            Criar nova conta
                        </h2>
                        <p
                            className={`${inter.className} text-white-400 font-light 2xl:text-xl text-center text-sm`}
                        >
                            Inicie no digital criando uma conta com a Wolfy
                        </p>
                    </div>

                 
                            <Form 
                            className="w-full" 
                            encType='multipart/form-data'
                            onSubmit={(e) => {
                                e.preventDefault();
                                validation.handleSubmit();
                                return false;
                            }}>
                                <div className="flex items-start justify-start flex-col mb-4 group">
                                    <label htmlFor="email" className={`${inter.className} text-gray-500 mb-1 duration-500  group-focus-within:text-white-400`}
                                    >
                                        E-mail
                                    </label>
                                    <input id="email" name="email" type="email" value={validation.values.email} onChange={validation.handleChange}  className={`${inter.className} block w-full duration-500 bg-[transparent] h-10 px-4 border border-white-100 text-sm text-white-400 rounded-full bg-white outline-none mb-3 focus:border-primary-400`}
                                    />
                                
                                </div>

                                <div className="flex items-start justify-start flex-col group mb-4">
                                    <label
                                        htmlFor="password"
                                        className={`${inter.className} text-gray-500 mb-1 duration-500 group-focus-within:text-white-400`}
                                    >
                                        Senha
                                    </label>
                                    <div className="relative w-full">
                                        <input value={validation.values.password} onChange={validation.handleChange}  id="password"  name="password" type={ showPassword  ? "text"  : "password" } className={`${inter.className} block w-full mb-2 duration-500 bg-[transparent] h-10 px-4 border border-white-100 text-sm text-white-400 rounded-full bg-white outline-none focus:border-primary-400`}
                                        />
                                        <div
                                            onClick={() =>
                                                setShowPassword(!showPassword)
                                            }
                                            className="absolute right-4 bottom-4 text-xl text-gray-400"
                                        >
                                            {showPassword ? (
                                                <IoMdEyeOff />
                                            ) : (
                                                <IoMdEye />
                                            )}
                                        </div>
                                    </div>
                                   
                                </div>

                                <div className="flex items-start justify-start flex-col group mb-1">
                                    <label
                                        htmlFor="confirmPassword"
                                        className={`${inter.className} text-gray-500 mb-1 duration-500 group-focus-within:text-white-400`}
                                    >
                                        Confirmar Senha
                                    </label>
                                    <div className="relative w-full">
                                        <input value={validation.values.confirmPassword} onChange={validation.handleChange} id="confirmPassword" name="confirmPassword" type={  showPassword ? "text" : "password"  } className={`${inter.className} block w-full mb-2 duration-500 bg-[transparent] h-10 px-4 border border-white-100 text-sm text-white-400 rounded-full bg-white outline-none focus:border-primary-400`}
                                        />
                                        <div
                                            onClick={() =>
                                                setShowPassword(!showPassword)
                                            }
                                            className="absolute right-4 bottom-4 text-xl text-gray-400"
                                        >
                                            {showPassword ? (
                                                <IoMdEyeOff />
                                            ) : (
                                                <IoMdEye />
                                            )}
                                        </div>
                                    </div>
                                   
                                </div>

                                <div className="flex items-start justify-start flex-col">
                                    <div className="w-full flex items-start justify-start mb-2">
                                        <input
                                            type="checkbox"
                                            name="termsAndConditions"
                                            id="termsAndConditions"
                                            className="mt-1"
                                        />
                                        <label
                                            htmlFor="termsAndConditions"
                                            className={`${inter.className} text-sm ml-2 text-white-400 font-light`}
                                        >
                                            Clicando no botão abaixo você
                                            concorda com os{" "}
                                            <Link
                                                href={"/"}
                                                className="text-secondary-400 hover:underline"
                                            >
                                                termos de uso
                                            </Link>{" "}
                                            e{" "}
                                            <Link
                                                href={"/"}
                                                className="text-secondary-400 hover:underline"
                                            >
                                                politica de privacidade
                                            </Link>
                                        </label>
                                    </div>
                                   
                                </div>

                                <div className="mt-5 2xl:mt-10 w-full">
                                    <input
                                      style={{backgroundColor:loading?'#ccc':''}}
                                       disabled={loading}
                                        type="submit"
                                        value="Fazer Cadastro"
                                        className="w-full py-3 rounded-full hover:cursor-pointer mb-4 hover:brightness-90 duration-500 bg-primary-400 text-white-400"
                                    />

                                    <Link
                                        href={"/login"}
                                        className="text-sm text-primary-300 block text-center hover:underline"
                                    >
                                        Já tenho conta, fazer login
                                    </Link>
                                </div>
                            </Form>
                       
                </div>
            </section>
        </main>
    );
}
