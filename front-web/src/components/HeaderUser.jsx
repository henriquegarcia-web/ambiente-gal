import { Poppins, Inter } from "next/font/google";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { FaRegBell } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { useFormik } from "formik";
import { Api } from "@/api/apiUser";
import { Form } from "reactstrap";
import Modal from "./Modal";

const poppins = Poppins({
    weight: ["300", "400", "500", "600", "700", "900"],
    subsets: ["latin"]
});

const inter = Inter({
    weight: ["300", "400", "500", "600", "700", "900"],
    subsets: ["latin"]
});

export default function HeaderUser({ item,link }) {
    const [modalUser, setModalUser] = useState(false);
    const [imageUser, setImageUser] = useState("");
    const [imageUserURL, setImageUserURL] = useState("");
    const [emailDisable, setEmailDisable] = useState(true);
    const [obj, setObj] = useState({})
    const name = useRef(null);
    const email = useRef(null);
    const id = useRef(null);
    const address = useRef(null);
    const number = useRef(null);
    const neighborhood = useRef(null);
    const city = useRef(null);
    const cep = useRef(null);

    const handleEditPhoto = (e) => {
        const file = e.target.files[0];
        setImageUser(file);
        setImageUserURL(URL.createObjectURL(file));
    };
    useEffect(() => {
        let objs
        if (typeof window !== 'undefined') {
            const getAuthUser = localStorage.getItem('authUser')
            objs = getAuthUser == 'undefined' || getAuthUser == null ? '' : JSON.parse(getAuthUser ? getAuthUser : '')
            if (objs?.id ) {
                setObj(objs)
            }
        }
    }, [id])
    const saveUser = () => {
        // console.log(name.current.value);
    };

    const [foto, setFoto] = useState(item?.foto)
    useEffect(() => {
        if (item?.foto) {
            let foto = item?.foto.replace("${process.env.NEXT_PUBLIC_API_URL}/arquivo/")
            setFoto(foto.includes('blob') ? foto : `${process.env.NEXT_PUBLIC_API_URL}/arquivo/` + foto)
        }
    }, [item])
    const [loadingTable, setLoadingTable] = useState(false);
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        setTimeout(() => {
            setLoadingTable(true);
        }, 500);

    }, [loadingTable]);

    const formData = new FormData()
    const [password, setPassword] = useState('')
    const [passwordNew, setPasswordNew] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')
    const validation = useFormik({
        enableReinitialize: true,
        initialValues: {
            idConta: item?.idConta ? item.idConta : '',
            id: item?.id ? item.id : '',
            nome: item?.nome ? item.nome : '',
            email: item?.email ? item.email : '',
            password: '',
            passwordNew: '',
            passwordConfirm: '',
            cpfCnpj: item?.cpfCnpj ? item.cpfCnpj : '',
            cep: item?.cep ? item.cep : '',
            rua: item?.rua ? item.rua : '',
            numero: item?.numero ? item.numero : '',
            bairro: item?.bairro ? item.bairro : '',
            cidade: item?.cidade ? item.cidade : '',
            estado: item?.estado ? item.estado : '',
            foto: null
        },
        onSubmit: async (values) => {
            let urlDaImagem = ''
            if (values.foto) {
                urlDaImagem = URL.createObjectURL(values.foto);
            }
            if (values.id) {
                if (values.passwordNew && values.passwordConfirm) {
                    if ((values.passwordNew != values.passwordConfirm)) {
                        return alert("As senhas precisam ser iguais!")
                    }
                }
                formData.set('foto', values.foto)
                formData.set('dados', JSON.stringify(values))
                let response = await Api.Atualizar(formData)
                if (response.error) {
                    alert(response.msg)
                } else {
                    alert(response.msg)
                    const getAuthUser = localStorage?.getItem("authUser");
                    let obj = getAuthUser == "undefined" || getAuthUser == null || getAuthUser == "[object Object]" ? "" : JSON.parse(getAuthUser ? getAuthUser : "");
                    obj.produtor = values
                    obj.nome = values.nome
                    obj.foto = response.foto
                    localStorage.setItem("authUser", "{}");
                    localStorage.setItem('authUser', JSON.stringify(obj))
                    setPassword('')
                    setPasswordNew('')
                    setPasswordConfirm('')
                }
            }
        }
    })
    const [documentValue, setDocumentValue] = useState('');
    const [mask, setMask] = useState('999.999.999-99'); // Máscara vazia inicialmente
    const formatValue = (value) => {
        if (!value) return '';
        const isCnpj = value.length > 11;
        if (isCnpj) {
            return value.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5');
        } else {
            return value.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4');
        }
    };
    const handleDocumentChange = (event, type = 1) => {
        const inputValue = type == 1 ? event.target.value.replace(/\D/g, '') : event // Remove caracteres não numéricos
        const formattedValue = formatValue(inputValue);
        validation.setFieldValue('cpfCnpj', inputValue)
        setDocumentValue(formattedValue);
        const isCnpj = inputValue?.length > 11;
        if (isCnpj) {
            setMask('99.999.999/9999-99');
        } else {
            setMask('999.999.999-99');
        }
    };
    const handleValueChange = (event, type = 1, variavel) => {
        let value = type == 1 ? event.target.value : `${event}`;
        // Remove todos os caracteres não numéricos
        value = value?.replace(/\D/g, '');
        // Formata como valor monetário
        const numberValue = Number(value) / 100; // Converte para um número
        const formatted = numberValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        if (variavel == 1) {
            setTaxaFixa(formatted)
        } else {
            setSaque(formatted)
        }

    };
    useEffect(() => {
        handleDocumentChange(item?.cpfCnpj, 2)
    }, [item])
    const handleCEP = async (cep) => {
        if (cep.length == 8) {
            let string = cep.replace(/\D/g, '')
            fetch(`https://viacep.com.br/ws/${string}/json`)
                .then(res => res.json()).then(data => {
                    validation.setFieldValue('rua', data.logradouro)
                    validation.setFieldValue('bairro', data.bairro)
                    validation.setFieldValue('cidade', data.localidade)
                    validation.setFieldValue('estado', data.uf)
                })
        }
    }
    const handleImagem = async () => {
        let imagem = document.querySelector('input[id="imagemPerfil"]')
        if (imagem) {
            imagem.click()
        }
    }
    const handleUrl = async (imagem) => {
        let urlDaImagem = ''
        if (imagem) {
            urlDaImagem = URL.createObjectURL(imagem);
        }
        setFoto(urlDaImagem)
    }
    const handleClick = () => {
        localStorage.setItem("authUser", "{}");
        window.location.href = '/login-membro/'+link
    }
   
    useEffect(()=>{
    
    },[obj])
    return (
        <>
            <header className="flex items-center justify-end p-8 relative z-10">
                {/* <FaRegBell
                    onClick={() => console.log("notificacao")}
                    className="fill-white-400 hover:cursor-pointer"
                />
                <IoSearch
                    onClick={() => console.log("pesquisa")}
                    className="ml-4 fill-white-400 hover:cursor-pointer"
                /> */}
                {(item?.id && item.permissao == 2) &&
                    <div onClick={() => setModalUser(true)} className="flex items-center justify-center ml-4 hover:cursor-pointer" >
                        <img src={foto ? foto : "/images/user.png"} width={30} height={30} alt="User picture" style={{ objectFit: "cover", borderRadius: "50%" }} />
                        <p className={`${poppins.className} font-medium ml-2 text-white-400`} >
                            {item?.nome}
                        </p>
                    </div>
                }

            </header>

            <Modal
                modalActive={modalUser}
                titleModal="Meu perfil"
                saveButton={() => saveUser()}

                handleClickModal={() => setModalUser(false)}
            >
                <Form className="custom-form " encType='multipart/form-data'
                    onSubmit={(e) => {
                        e.preventDefault();
                        validation.handleSubmit();
                        return false;
                    }}
                >
                    <div style={{ overflowY: 'auto', height: item?.permissao == 3 ? 600 : '100%' }}>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
                            <img src={foto ? foto : "/images/user.svg"} width={150} height={150} onClick={handleImagem} alt="user" className="rounded-[50%]" />
                            <input type="file" name="imagem" accept="image/*" id="imagemPerfil" style={{ display: 'none' }}
                                onChange={(e) => {
                                    handleUrl(e.target.files[0])
                                    validation.setFieldValue('foto', e.target.files[0])
                                }}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-x-2 lg:grid-cols-2 lg:gap-x-2 my-5">

                            <div className="flex  justify-start relative my-2" style={{ flexDirection: 'column' }}>
                                <label style={{ marginBottom: 5 }}>Nome</label>
                                <input type="text" name="nome" id="nome" placeholder="Nome" value={validation.values.nome} onChange={validation.handleChange}
                                    className={`${inter.className} w-full border border-modal-close rounded-lg px-2 outline-none focus:border-black-400 text-sm h-10`}
                                />
                            </div>

                            <div className="flex  justify-start relative my-2" style={{ flexDirection: 'column' }}>
                                <label style={{ marginBottom: 5 }}>Email</label>
                                <input type="text" name="email" autoComplete="off" disabled={true} id="email" placeholder="Email" value={validation.values.email} onChange={validation.handleChange}
                                    className={`${inter.className} w-full border border-modal-close rounded-lg px-2 outline-none focus:border-black-400 text-sm h-10`}
                                />
                            </div>
                        </div>


                        <div className="flex  justify-start relative my-2" style={{ flexDirection: 'column' }}>
                            <label style={{ marginBottom: 5 }}>Senha Atual</label>
                            <input type="password" name="password" autoComplete="off" value={password} onChange={(e) => {
                                validation.setFieldValue('password', e.target.value)
                                setPassword(e.target.value)
                            }} placeholder={'Senha Atual'}
                                className={`${inter.className} w-full border border-modal-close rounded-lg px-2 outline-none focus:border-black-400 text-sm h-10`}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-x-2 lg:grid-cols-2 lg:gap-x-2 my-5">

                            <div className="flex items-center justify-start relative ">
                                <input type="password" autoComplete="off" name="passwordNew" value={passwordNew} onChange={(e) => {
                                    validation.setFieldValue('passwordNew', e.target.value)
                                    setPasswordNew(e.target.value)
                                }} placeholder={'Senha Nova'}
                                    className={`${inter.className} w-full border border-modal-close rounded-lg px-2 outline-none focus:border-black-400 text-sm h-10`}
                                />
                            </div>
                            <div className="flex items-center justify-start relative ">
                                <input type="password" autoComplete="off" name="passwordConfirm" value={passwordConfirm} onChange={(e) => {
                                    validation.setFieldValue('passwordConfirm', e.target.value)
                                    setPasswordConfirm(e.target.value)
                                }} placeholder={'Senha (Confirme)'}
                                    className={`${inter.className} w-full border border-modal-close rounded-lg px-2 outline-none focus:border-black-400 text-sm h-10`}
                                />
                            </div>
                        </div>



                    </div>

                    <div className="flex items-center justify-start relative">
                        <input width={'100%'} type="submit" value="Alterar" className="w-full py-3 rounded-full hover:cursor-pointer mb-4 hover:brightness-90 duration-500 bg-primary-400 text-white-400" />
                    </div>
                    <button
                        onClick={()=>{handleClick()}}
                        style={{textAlign:'center',width:'100%'}}
                        className={`${inter.className} text-sm text-primary-300 block text-center hover:underline`}
                    >
                        Sair
                    </button>
                </Form>
            </Modal>
        </>
    );
}
