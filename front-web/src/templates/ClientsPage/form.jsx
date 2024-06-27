import { Inter } from "next/font/google";
import React, { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import Modal from "@/components/Modal";
import { Api } from "@/api/apiCliente";
import { Form } from "reactstrap";

const inter = Inter({
    weight: ["300", "400", "500", "600", "700", "900"],
    subsets: ["latin"]
});


export default function ClientsForm({ disabled, buttonText, listagem, setListagem, modalActive, setModalActive, item, setItem }) {
    const [loadingTable, setLoadingTable] = useState(false);
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        setTimeout(() => {
            setLoadingTable(true);
        }, 500);

    }, [loadingTable]);

    const validation = useFormik({
        enableReinitialize: true,
        initialValues: {
            id: item?.id ? item.id : '',
            nome: item?.nome ? item.nome : '',
            cpfCnpj: item?.cpf ? item.cpf : '',
            email: item?.email ? item.email : '',
            cep: item?.cep ? item.cep : '',
            rua: item?.rua ? item.rua : '',
            numero: item?.numero ? item.numero : '',
            bairro: item?.bairro ? item.bairro : '',
            cidade: item?.cidade ? item.cidade : '',
            estado: item?.estado ? item.estado : ''
        },
        onSubmit: async (values) => {
            setLoading(true)
            if (values.id) {
                let response = await Api.Editar(values)
                if (response.error) {
                    alert(response.msg)
                } else {
                    setModalActive(false)
                    setItem({})
                    let list = [...listagem]
                    let index = list.findIndex((item) => item.id == values.id)
                    Object.assign(list[index], { nome: values.nome, cpf: values.cpfCnpj, cep: values.cep, rua: values.rua, numero: values.numero, bairro: values.bairro, cidade: values.cidade, estado: values.estado })
                    setListagem(list)
                    validation.handleReset()
                }
            } else if (!values.id) {
                let response = await Api.Cadastrar({ nome: values.nome, cpfCnpj: values.cpfCnpj, email: values.email, cep: values.cep, rua: values.rua, numero: values.numero, bairro: values.bairro, cidade: values.cidade, estado: values.estado })
                if (response.error) {
                    alert(response.msg)
                } else {
                    alert(response.msg)
                    setModalActive(false)
                    let value = { id: response.id, nome: values.nome, cpf: values.cpfCnpj, email: values.email, cep: values.cep, rua: values.rua, numero: values.numero, bairro: values.bairro, cidade: values.cidade, estado: values.estado }
                    let list = [...listagem]
                    list.push(value)
                    setListagem(list)
                    validation.handleReset()
                }
            }
            setLoading(false)
        }
    })

    const handleExcluir = async () => {
        setLoading(true)
        if (item?.id) {
            let response = await Api.Excluir({ id: item.id })
            if (response.error) {
                alert(response.msg)
            } else {

                alert(response.msg)
                setModalActive(false)
                let list = [...listagem]
                let dados = list.filter((info) => info.id != item.id)
                setListagem(dados)
            }
        } else {
            alert('Item não selecionado!')
        }
        setLoading(false)
    }
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


    return (
        <>
            {modalActive &&
                <Modal
                    modalActive={modalActive}
                    titleModal={buttonText}
                    handleClickModal={() => setModalActive(false)}
                >
                    {['Excluir'].includes(buttonText) &&
                        <>
                            <div className="row" >
                                <div style={{ color: '#af0505', textAlign: 'center', marginTop: 30 }} >Tem certeza que deseja excluir esse item?</div>
                            </div>
                            <div className="flex items-center justify-start relative ">
                                <input width={'100%'} onClick={handleExcluir} disabled={loading} style={{ backgroundColor: '#af0505', marginTop: 30 }} type="button" value="Sim" className="w-full py-2 rounded-full hover:cursor-pointer hover:brightness-90 duration-500 bg-primary-400 text-white-400" />
                            </div>
                        </>

                    }

                    {['Cadastrar', 'Editar', 'Visualizar'].includes(buttonText) &&

                        <Form
                            className="custom-form "
                            encType='multipart/form-data'
                            onSubmit={(e) => {
                                e.preventDefault();
                                validation.handleSubmit();
                                return false;
                            }}
                        >
                            <div className="flex items-center justify-start relative my-5">
                                <input type="text" name="nome" disabled={disabled} id="nome" placeholder="Nome" value={validation.values.nome} onChange={validation.handleChange}
                                    className={`${inter.className} w-full border border-modal-close rounded-lg px-2 outline-none focus:border-black-400 text-sm h-10`}
                                />
                            </div>

                            <div className="flex items-center justify-start relative my-5">
                                <input type="text" name="cpfCnpj" disabled={disabled} id="cpfCnpj" placeholder="CPF/CNPJ" value={validation.values.cpfCnpj} onChange={validation.handleChange}
                                    className={`${inter.className} w-full border border-modal-close rounded-lg px-2 outline-none focus:border-black-400 text-sm h-10`}
                                />
                            </div>
                            <div className="flex items-center justify-start relative my-5">
                                <input type="text" name="email" disabled={['Editar', 'Visualizar'].includes(buttonText) ? true : false} id="email" placeholder="Email"
                                    value={validation.values.email} onChange={validation.handleChange} className={`${inter.className} w-full border border-modal-close rounded-lg px-2 outline-none focus:border-black-400 text-sm h-10`}
                                />
                            </div>
                            <div className="flex items-center justify-start relative  mb-5">
                                <input type="number" name="cep" disabled={disabled} id="cep" placeholder="CEP" value={validation.values.cep} onChange={(e) => {
                                    validation.handleChange(e)
                                    handleCEP(e.target.value)
                                }}
                                    className={`${inter.className} w-full border border-modal-close rounded-lg px-2 outline-none focus:border-black-400 text-sm h-10`} />

                                <input type="text" name="rua" id="rua" disabled placeholder="Rua" value={validation.values.rua} onChange={validation.handleChange}
                                    className={`${inter.className} w-full border border-modal-close rounded-lg px-2 outline-none focus:border-black-400 text-sm h-10`}
                                />
                            </div>

                            <div className="grid grid-cols-4 gap-x-4 lg:grid-cols-4 lg:gap-x-4">
                                <div className="flex items-center justify-start relative mb-5">
                                    <input type="number" disabled={disabled} name="numero" id="numero" placeholder="Número" value={validation.values.numero} onChange={validation.handleChange}
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
                            <div className="flex items-center justify-start relative mb-5">
                                <input width={'100%'} disabled={loading} style={{backgroundColor:loading?'#ccc':''}} type="submit" value="Salvar" className="w-full py-3 rounded-full hover:cursor-pointer mb-4 hover:brightness-90 duration-500 bg-primary-400 text-white-400" />
                            </div>
                        </Form>

                    }

                </Modal>
            }


        </>
    );
}
