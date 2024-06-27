import { Inter } from "next/font/google";
import React, { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import Modal from "@/components/Modal";
import { Api } from "@/api/apiPixel";
import { Form } from "reactstrap";

const inter = Inter({
    weight: ["300", "400", "500", "600", "700", "900"],
    subsets: ["latin"]
});

export  const PixelForm= ({ disabled, buttonText, listagem, setListagem, modalActive, setModalActive, item, setItem }) => {
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
            idPixel: item?.idPixel ? item.idPixel : '',
            api: item?.api ? item.api : '',
            plataforma: item?.plataforma ? item.plataforma : '',
            tipo: item?.tipo ? item.tipo : '',
            api: item?.api ? item.api : '',
            descricao: item?.descricao ? item.descricao : ''
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
                    Object.assign(list[index], { ...values })
                    setListagem(list)
                    validation.handleReset()
                }
            } else if (!values.id) {
                let response = await Api.Cadastrar(values)
                if (response.error) {
                    alert(response.msg)
                } else {
                    alert(response.msg)
                    setModalActive(false)
                    let value = { ...values,id: response.id}
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
                                <input type="text" name="idPixel" disabled={disabled} id="idPixel" placeholder="IdPixel" value={validation.values.idPixel} onChange={validation.handleChange}
                                    className={`${inter.className} w-full border border-modal-close rounded-lg px-2 outline-none focus:border-black-400 text-sm h-10`}
                                />
                            </div>
                            <div className="flex items-center justify-start relative my-5">
                                <input type="text" name="api" disabled={disabled} id="api" placeholder="Api" value={validation.values.api} onChange={validation.handleChange}
                                    className={`${inter.className} w-full border border-modal-close rounded-lg px-2 outline-none focus:border-black-400 text-sm h-10`}
                                />
                            </div>
                            <div className="flex  justify-start relative my-2" style={{ flexDirection: 'column' }}>
                            <label style={{ marginBottom: 5, color: '#ccc' }}>Plataforma</label>
                            <select value={validation.values.plataforma} onChange={validation.handleChange} name="plataforma" id="plataforma" placeholder="Tipo"
                                className={`${inter.className} w-full border border-modal-close rounded-lg px-2 outline-none focus:border-black-400 text-sm h-10`}>
                                <option value={''}>Selecione</option>
                                <option value={1} >Facebook</option>
                            </select>

                        </div>
                            <div className="flex  justify-start relative my-2" style={{ flexDirection: 'column' }}>
                            <label style={{ marginBottom: 5, color: '#ccc' }}>Tipo de Evento</label>
                            <select value={validation.values.tipo} onChange={validation.handleChange} name="tipo" id="tipo" placeholder="Tipo"
                                className={`${inter.className} w-full border border-modal-close rounded-lg px-2 outline-none focus:border-black-400 text-sm h-10`}>
                                <option value={''}>Selecione</option>
                                <option value={1} >Page View</option>
                                <option value={2}>Initiate Checkout</option>
                                <option value={3}>Purchase</option>
                            </select>

                        </div>

                            <div className="flex items-center justify-start relative my-5">
                                <input type="text" name="descricao" disabled={disabled} id="descricao" placeholder="Descricao" value={validation.values.descricao} onChange={validation.handleChange}
                                    className={`${inter.className} w-full border border-modal-close rounded-lg px-2 outline-none focus:border-black-400 text-sm h-10`}
                                />
                            </div>

                         
                            <div className="flex items-center justify-start relative mb-5">
                                <input disabled={loading}   style={{backgroundColor:loading?'#ccc':''}} width={'100%'} type="submit" value="Salvar" className="w-full py-3 rounded-full hover:cursor-pointer mb-4 hover:brightness-90 duration-500 bg-primary-400 text-white-400" />
                            </div>
                        </Form>

                    }

                </Modal>
            }


        </>
    );
}
