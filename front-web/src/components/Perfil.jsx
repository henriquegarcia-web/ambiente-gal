import { Inter } from "next/font/google";
import React, { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import Modal from "@/components/Modal";
import { Api } from "@/api/apiUser";
import { Form } from "reactstrap";
import Image from "next/image";
import { bankCodes } from "@/components/banco";
import FileInputComponent from "./buttonFile";
const inter = Inter({
    weight: ["300", "400", "500", "600", "700", "900"],
    subsets: ["latin"]
});

export const PerfilForm = ({ disabled, buttonText, listagem, setListagem, modalActive, setModalActive, item, setItem }) => {
    const [loadingTable, setLoadingTable] = useState(false);
    const [loading, setLoading] = useState(false)
    const [foto, setFoto] = useState(item?.foto)
    useEffect(() => {
        setTimeout(() => {
            setLoadingTable(true);
        }, 500);

    }, [loadingTable]);
    useEffect(() => {
        if (item?.foto) {
            let perfil = item?.foto.replace("${process.env.NEXT_PUBLIC_API_URL}/arquivo/")

            setFoto(perfil.includes('blob') ? perfil : `${process.env.NEXT_PUBLIC_API_URL}/arquivo/` + perfil)

        }
    }, [item])
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
            banco: item?.banco ? item.banco : '',
            titular: item?.titular ? item.titular : '',
            tipoConta: item?.tipoConta ? item.tipoConta : '',
            conta: item?.conta ? item.conta : '',
            contaDig: item?.contaDig ? item.contaDig : '',
            agencia: item?.agencia ? item.agencia : '',
            agenciaDig: item?.agenciaDig ? item.agenciaDig : '',
            foto: null,
            versoIdentidade: null,
            frenteIdentidade: null,
            cartaoCNPJ: null,
            selfieDocumento: null,
            tipoChave:item?.tipoChave?item.tipoChave:'',
            chavePix:item?.chavePix?item.chavePix:''
        },
        onSubmit: async (values) => {
            setLoading(true)
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
                formData.set('versoIdentidade', values.versoIdentidade)
                formData.set('frenteIdentidade', values.frenteIdentidade)
                formData.set('cartaoCNPJ', values.cartaoCNPJ)
                formData.set('selfieDocumento', values.selfieDocumento)
                formData.set('dados', JSON.stringify(values))
                let response = await Api.Atualizar(formData)
                if (response.error) {
                    alert(response.msg)
                } else {
                    alert(response.msg)
                    const getAuthUser = localStorage?.getItem("authUser");
                    let obj = getAuthUser == "undefined" || getAuthUser == null || getAuthUser == "[object Object]" ? "" : JSON.parse(getAuthUser ? getAuthUser : "");
                    let itens = item
                    Object.assign(obj, { nome: values.nome })
                    Object.assign(obj.produtor, {
                        cpfCnpj: values.cpfCnpj, cep: values.cep, rua: values.rua, numero: values.numero, bairro: values.bairro, cidade: values.cidade, estado: values.estado, banco: values.banco,
                        titular: values.titular, tipoConta: values.tipoConta, conta: values.conta, contaDig: values.contaDig, agencia: values.agencia, agenciaDig: values.agenciaDig, validar: response.validar,chavePix:values.chavePix,tipoChave:values.tipoChave
                    })
                    if (response?.foto) {
                        itens.foto = response.foto
                        obj.foto = response?.foto
                    }
                    if (response?.dadosProdutor?.versoIdentidade) {
                        itens.versoIdentidade = response?.dadosProdutor?.versoIdentidade
                        obj.produtor.versoIdentidade = response?.dadosProdutor?.versoIdentidade
                    }
                    if (response?.dadosProdutor?.frenteIdentidade) {
                        itens.frenteIdentidade = response?.dadosProdutor?.frenteIdentidade
                        obj.produtor.frenteIdentidade = response?.dadosProdutor?.frenteIdentidade
                    }
                    if (response?.dadosProdutor?.cartaoCNPJ) {
                        itens.cartaoCNPJ = response?.dadosProdutor?.cartaoCNPJ
                        obj.produtor.cartaoCNPJ = response?.dadosProdutor?.cartaoCNPJ
                    }
                    if (response?.dadosProdutor?.selfieDocumento) {
                        itens.selfieDocumento = response?.dadosProdutor?.selfieDocumento
                        obj.produtor.selfieDocumento = response?.dadosProdutor?.selfieDocumento
                    }

                    setItem(itens)
                    localStorage.setItem("authUser", "{}");
                    localStorage.setItem('authUser', JSON.stringify(obj))
                    setPassword('')
                    setPasswordNew('')
                    setPasswordConfirm('')
                    validation.setFieldValue('password', '')
                    validation.setFieldValue('passwordNew', '')
                    validation.setFieldValue('passwordConfirm', '')
                }
            }
            setLoading(false)
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
    return (
        <>
            {modalActive &&
                <Modal modalActive={modalActive} titleModal={buttonText} handleClickModal={() => setModalActive(false)} >
                    <Form className="custom-form " encType='multipart/form-data'
                        onSubmit={(e) => {
                            e.preventDefault();
                            validation.handleSubmit();
                            return false;
                        }}
                    >
                        <div style={{ overflowY: 'auto', height: item.permissao == 3 ? 600 : '100%' }}>
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

                            {item.permissao == 3 &&
                                <>
                                    <label>Informações</label>
                                    <div className="flex items-center justify-start relative my-5">
                                        <input type="text" name="cpfCnpj" id="cpfCnpj" value={documentValue} onChange={handleDocumentChange} maxLength="18" placeholder={mask}
                                            className={`${inter.className} w-full border border-modal-close rounded-lg px-2 outline-none focus:border-black-400 text-sm h-10`}
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-x-2 lg:grid-cols-2 lg:gap-x-2 my-5">
                                        <div className="flex items-center justify-start relative ">
                                            <input type="number" name="cep" id="cep" placeholder="CEP" value={validation.values.cep} onChange={(e) => {
                                                validation.handleChange(e)
                                                handleCEP(e.target.value)
                                            }}
                                                className={`${inter.className} w-full border border-modal-close rounded-lg px-2 outline-none focus:border-black-400 text-sm h-10`} />
                                        </div>
                                        <div className="flex items-center justify-start relative ">
                                            <input type="text" name="rua" id="rua" disabled placeholder="Rua" value={validation.values.rua} onChange={validation.handleChange}
                                                className={`${inter.className} w-full border border-modal-close rounded-lg px-2 outline-none focus:border-black-400 text-sm h-10`}
                                            />
                                        </div>
                                    </div>



                                    <div className="grid grid-cols-4 gap-x-4 lg:grid-cols-4 lg:gap-x-4">
                                        <div className="flex items-center justify-start relative mb-5">
                                            <input type="number" name="numero" id="numero" placeholder="Número" value={validation.values.numero} onChange={validation.handleChange}
                                                className={`${inter.className} w-full border border-modal-close rounded-lg px-2 outline-none focus:border-black-400 text-sm h-10`}
                                            />
                                        </div>

                                        <div className="flex items-center justify-start relative mb-5">
                                            <input type="text" name="bairro" id="bairro" disabled placeholder="Bairro" value={validation.values.bairro} onChange={validation.handleChange}
                                                className={`${inter.className} w-full border border-modal-close rounded-lg px-2 outline-none focus:border-black-400 text-sm h-10`}
                                            />
                                        </div>

                                        <div className="flex items-center justify-start relative mb-5">
                                            <input type="text" name="cidade" id="cidade" disabled placeholder="Cidade" value={validation.values.cidade} onChange={validation.handleChange}
                                                className={`${inter.className} w-full border border-modal-close rounded-lg px-2 outline-none focus:border-black-400 text-sm h-10`}
                                            />
                                        </div>

                                        <div className="flex items-center justify-start relative mb-5">
                                            <input type="text" name="estado" id="estado" disabled placeholder="Estado" value={validation.values.estado} onChange={validation.handleChange}
                                                className={`${inter.className} w-full border border-modal-close rounded-lg px-2 outline-none focus:border-black-400 text-sm h-10`}
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-x-2 lg:grid-cols-2 lg:gap-x-2">
                                        <div className="flex justify-start relative my-5 " style={{ flexDirection: 'column' }}>
                                            <label style={{ color: '#ccc' }}>Verso Identidade
                                            </label>
                                            <FileInputComponent name={item.versoIdentidade} handleChange={(e) => { validation.setFieldValue('versoIdentidade', e.target?.files[0]) }} />

                                        </div>

                                        <div className="flex justify-start relative my-5 " style={{ flexDirection: 'column' }}>
                                            <label style={{ color: '#ccc' }}>Frente Identidade  </label>

                                            <FileInputComponent name={item.frenteIdentidade} handleChange={(e) => { validation.setFieldValue('frenteIdentidade', e.target?.files[0]) }} />
                                        </div>

                                        <div className="flex justify-start relative my-5 " style={{ flexDirection: 'column' }}>
                                            <label style={{ color: '#ccc' }}>Cartão CNPJ</label>

                                            <FileInputComponent name={item.cartaoCNPJ} handleChange={(e) => { validation.setFieldValue('cartaoCNPJ', e.target?.files[0]) }} />

                                        </div>

                                        <div className="flex justify-start relative my-5 " style={{ flexDirection: 'column' }}>
                                            <label style={{ color: '#ccc' }}>Selfie segurando o documento  </label>

                                            <FileInputComponent name={item.selfieDocumento} handleChange={(e) => { validation.setFieldValue('selfieDocumento', e.target?.files[0]) }} />

                                        </div>
                                    </div>

                                    <label>Dados Bancários</label>
                                    <div className="grid grid-cols-2 gap-x-2 lg:grid-cols-2 lg:gap-x-2 my-5">
                                        <div className="flex items-center justify-start relative">
                                            <select type="text" name="banco" id="banco" value={validation.values.banco} style={{ color: '#696969' }} onChange={validation.handleChange} className={`${inter.className} w-full border border-modal-close rounded-lg px-2 outline-none focus:border-black-400 text-sm h-10`}>
                                                <option value={''}>Banco</option>
                                                {bankCodes.map((item) => (
                                                    <option value={item.codigo} >{item.nome}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="flex items-center justify-start relative">
                                            <select type="text" name="tipoConta" id="tipoConta" placeholder="Tipo de Conta" value={validation.values.tipoConta} style={{ color: '#696969' }} onChange={validation.handleChange} className={`${inter.className} w-full border border-modal-close rounded-lg px-2 outline-none focus:border-black-400 text-sm h-10`}>
                                                <option value={''}>Tipo de Conta</option>
                                                <option value={1} >Conta Corrente</option>
                                                <option value={2} >Conta Poupança</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-start relative my-5">
                                        <input type="text" name="titular" id="titular" placeholder="Titular" value={validation.values.titular} onChange={validation.handleChange}
                                            className={`${inter.className} w-full border border-modal-close rounded-lg px-2 outline-none focus:border-black-400 text-sm h-10`}
                                        />
                                    </div>


                                    <div className="grid grid-cols-4 gap-x-4 lg:grid-cols-4 lg:gap-x-4">
                                        <div className="flex items-center justify-start relative mb-5">
                                            <input type="text" name="agencia" id="agencia" placeholder="Agência" value={validation.values.agencia} onChange={validation.handleChange}
                                                className={`${inter.className} w-full border border-modal-close rounded-lg px-2 outline-none focus:border-black-400 text-sm h-10`}
                                            />
                                        </div>

                                        <div className="flex items-center justify-start relative mb-5">
                                            <input type="text" name="agenciaDig" id="agenciaDig" placeholder="Digito" value={validation.values.agenciaDig} onChange={validation.handleChange}
                                                className={`${inter.className} w-full border border-modal-close rounded-lg px-2 outline-none focus:border-black-400 text-sm h-10`}
                                            />
                                        </div>
                                        <div className="flex items-center justify-start relative mb-5">
                                            <input type="number" name="conta" id="conta" placeholder="Conta" value={validation.values.conta} onChange={validation.handleChange}
                                                className={`${inter.className} w-full border border-modal-close rounded-lg px-2 outline-none focus:border-black-400 text-sm h-10`}
                                            />
                                        </div>

                                        <div className="flex items-center justify-start relative mb-5">
                                            <input type="text" name="contaDig" id="contaDig" placeholder="Digito" value={validation.values.contaDig} onChange={validation.handleChange}
                                                className={`${inter.className} w-full border border-modal-close rounded-lg px-2 outline-none focus:border-black-400 text-sm h-10`}
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-x-2 lg:grid-cols-2 lg:gap-x-2" >


                                        <div className="flex items-center justify-start relative mb-5">
                                            <select type="text" name="tipoChave"  id="tipoChave" placeholder="Tipo de Chave" value={validation.values.tipoChave} style={{ color: '#696969' }} onChange={validation.handleChange} className={`${inter.className} w-full border border-modal-close rounded-lg px-2 outline-none focus:border-black-400 text-sm h-10`}>
                                                <option value={''}>Tipo de Chave</option>
                                                <option value={1} >Email</option>
                                                <option value={2} >CPF</option>
                                                <option value={3} >CNPJ</option>
                                                <option value={4} >Celular</option>
                                            </select>
                                        </div>

                                        <div className="flex items-center justify-start relative mb-5">
                                            <input type="text" name="chavePix" id="chavePix" placeholder="Chave Pix" value={validation.values.chavePix} onChange={validation.handleChange}
                                                className={`${inter.className} w-full border border-modal-close rounded-lg px-2 outline-none focus:border-black-400 text-sm h-10`}
                                            />
                                        </div>

                                    </div>
                                </>
                            }
                        </div>

                        <div className="flex items-center justify-start relative">
                            <input width={'100%'} disabled={loading} style={{ backgroundColor: loading ? '#ccc' : '' }} type="submit" value="Alterar" className="w-full py-3 rounded-full hover:cursor-pointer mb-4 hover:brightness-90 duration-500 bg-primary-400 text-white-400" />
                        </div>
                    </Form>
                </Modal>
            }


        </>
    );
}
