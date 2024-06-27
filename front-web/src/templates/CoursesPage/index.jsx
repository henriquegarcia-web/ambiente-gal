import { Inter, Poppins } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { Api } from "@/api/apiAreaMembro";
import HeaderUser from "@/components/HeaderUser";
import { useRouter } from 'next/router';
import { useParams } from 'next/navigation'

const inter = Inter({
    weight: ["300", "400", "500", "600", "700", "900"],
    subsets: ["latin"]
});

const poppins = Poppins({
    weight: ["300", "400", "500", "600", "700", "900"],
    subsets: ["latin"]
});

export default function CoursesPage() {
    const [dados, setDados] = useState({})
    const [cursos, setCursos] = useState([])
    const [modulos, setModulos] = useState(0)
    const [link, setLink] = useState('')
    const [aulas, setAulas] = useState(0)
    const router = useRouter();
    const { id } = router.query;
    const [links, setLinks] = useState()
    useEffect(() => {
       handleInfo()
    }, [id])
    const handleInfo = async () => {
        if (id) {
            setLinks(id)
            let response = await Api.Link(id)
            if (response.error) {
                alert(response.msg)
            } else {
                let curso = response?.list[0]?.cursos
                setCursos(curso)
                setDados(response?.list[0])
                let modulos = curso.reduce((acumulador, elemento) => { return acumulador + (elemento.modulos?.length); }, 0);
                let aulas = 0
                let conteudos = curso.map((elemento) => {
                    elemento?.modulos.map((elemento2) => {
                        aulas = aulas + elemento2?.conteudos?.length
                    })
                })
                setAulas(aulas)
                setModulos(modulos)
            }
        }
    }
    const [obj, setObj] = useState()

    const handleValidar = () => {
        if(links){
            if((obj?.id)){
                if(obj.permissao==3 || obj.permissao==2){
    
                }else{
               window.location.href = '/login-membro/'+links
                }
            }else{
         window.location.href = '/login-membro/'+links
            }
        }
    }
    useEffect(() => {
        let objs
        if (typeof window !== 'undefined') {
            const getAuthUser = localStorage.getItem('authUser')
            objs = getAuthUser == 'undefined' || getAuthUser == null ? '' : JSON.parse(getAuthUser ? getAuthUser : '')
            if (objs?.id ) {
                setObj(objs)
            }
        }
    }, [links])
    useEffect(()=>{
        handleValidar()
    },[obj,links])

    return (
        <section className="relative w-full h-screen overflow-y-scroll">
            <div className="bg-cover bg-no-repeat bg-center w-full h-52 lg:h-96 fixed" style={{ backgroundImage: `url(${dados?.imagem ? (`${process.env.NEXT_PUBLIC_API_URL}/arquivo/` + dados?.imagem) : `/images/banner.png`})` }}></div>
            <div className="fixed w-full h-screen bg-gradient-to-t from-bg-course from-80% lg:from-60%"></div>

           

            <section className="relative z-10 px-8 pb-8">
                <div className="mt-16 lg:mt-40">
                    <h1 className={`${inter.className} text-white-400 font-bold text-4xl  mb-2`} >
                        {dados?.nome}
                    </h1>
                    <p className={`${inter.className} text-white-400 mb-8`}>
                        {modulos > 1 ? `${modulos} Módulos` : `${modulos} Módulo`}  | {aulas > 1 ? `${aulas} Aulas` : `${aulas} Aula`}
                    </p>
                </div>



                <div className="flex items-start justify-start flex-col mb-8">
                    <h2 className={`${poppins.className} text-white-400 font-medium text-lg mb-7`} >
                        Seus cursos
                    </h2>

                    <div className="flex items-start justify-start flex-col sm:grid sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
                        {cursos?.length > 0 && cursos.map((item) => (
                            <div className="relative overflow-hidden rounded-xl mb-6 sm:mb-0 w-full" >
                                <img src={item.imagem ? (`${process.env.NEXT_PUBLIC_API_URL}/arquivo/` + item.imagem) : "/images/image-course.png"} width={370} height={300} alt="Banner course" style={{ objectFit: "cover", borderRadius: "12px" }} />
                                <div className="flex items-start justify-between flex-col absolute bottom-0 p-4 bg-white-300 w-full" style={{marginBottom:30}}>

                                    <h3 className={`${poppins.className} text-black-400 mb-2 font-semibold`} >
                                        {item.nome}
                                    </h3>
                                    <div style={{ display: 'flex', justifyContent: "space-between", alignItems: "center", width: '100%' }}>
                                        <p className={`${poppins.className} text-black-400 text-sm`} >
                                            {item.modulos?.length > 1 ? `${item.modulos?.length} módulos` : `${item.modulos?.length} módulo`}
                                        </p>
                                        <div className="flex items-center justify-start">
                                            <Link href={`/watch/${id}/${item.id}`} className={`${poppins.className} text-white-400 bg-secondary-900 hover:bg-secondary-600 duration-500 px-6 py-2 rounded-lg mr-4`} >
                                                Assistir agora
                                            </Link>

                                        </div>
                                    </div>



                                </div>
                            </div>
                        ))}

                    </div>
                </div>

                {/* <div className="flex items-start justify-start flex-col">
                    <h2
                        className={`${poppins.className} text-white-400 font-medium text-lg mb-7`}
                    >
                        Continue assistindo
                    </h2>

                    <div className="flex items-start justify-start flex-col sm:grid sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
                        <div className="relative overflow-hidden rounded-xl mb-6 sm:mb-0 w-full">
                            <Image
                                src={"/images/image-course.png"}
                                width={370}
                                height={300}
                                alt="Banner course"
                                style={{
                                    objectFit: "cover",
                                    borderRadius: "12px"
                                }}
                            />

                            <div className="flex items-start justify-start flex-col absolute bottom-0 p-4 bg-white-300 w-full">
                                <h3
                                    className={`${poppins.className} text-black-400 mb-2 font-semibold`}
                                >
                                    Tráfego pago
                                </h3>
                                <p
                                    className={`${poppins.className} text-black-400 text-sm`}
                                >
                                    3 módulos
                                </p>
                            </div>
                        </div>
                    </div>
                </div> */}
            </section>
        </section>
    );
}
