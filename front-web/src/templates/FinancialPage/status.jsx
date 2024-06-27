import { Inter } from "next/font/google";
import React, { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import Modal from "@/components/Modal";
import { Api } from "@/api/apiTransacao";
import { Form } from "reactstrap";
import { bankCodes } from "@/components/banco";
const inter = Inter({
    weight: ["300", "400", "500", "600", "700", "900"],
    subsets: ["latin"]
});


export  const StatusForm = ({ buttonText, listagem, setListagem, modalActive, setModalActive, item, setItem }) => {
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
            status: '',
        },
        onSubmit: async (values) => {
            setLoading(true)
            if (values.id) {
                let response = await Api.Status(values)
                if (response.error) {
                    alert(response.msg)
                } else {
                    setModalActive(false)
                    setItem({})
                    let list = [...listagem]
                    let index = list.findIndex((item) => item.id == values.id)
                    Object.assign(list[index], { status: values.status })
                    setListagem(list)
                    setFormattedValue('')
                    validation.handleReset()
                }
            }
            setLoading(false)
        }
    })

  
    

    return (
        <>
            {modalActive &&
                <Modal
                    modalActive={modalActive}
                    titleModal={buttonText}
                    handleClickModal={() => setModalActive(false)}
                >
       
                            <div className="flex items-center justify-start relative my-5">
                                <select type="text" name="banco"  disabled id="banco" value={item.produtor?.banco} style={{ color: '#696969' }} onChange={validation.handleChange} className={`${inter.className} w-full border border-modal-close rounded-lg px-2 outline-none focus:border-black-400 text-sm h-10`}>
                                    <option value={''}>Banco</option>
                                    {bankCodes.map((item) => (
                                        <option value={item.codigo} >{item.nome}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex items-center justify-start relative my-5">
                                <input type="text" name="titular" disabled  id="titular" placeholder="Titular" value={item.produtor?.titular} onChange={validation.handleChange}
                                    className={`${inter.className} w-full border border-modal-close rounded-lg px-2 outline-none focus:border-black-400 text-sm h-10`}
                                />
                            </div>
                            <div className="flex items-center justify-start relative my-5">
                                <select type="text" name="tipoConta"  id="tipoConta" placeholder="Tipo de Conta" value={item.produtor?.tipoConta} disabled style={{ color: '#696969' }} onChange={validation.handleChange} className={`${inter.className} w-full border border-modal-close rounded-lg px-2 outline-none focus:border-black-400 text-sm h-10`}>
                                    <option value={''}>Tipo de Conta</option>
                                    <option value={1} >Conta Correte</option>
                                    <option value={2} >Conta Poupança</option>
                                </select>
                            </div>

                            <div className="grid grid-cols-4 gap-x-4 lg:grid-cols-4 lg:gap-x-4">
                                <div className="flex items-center justify-start relative mb-5">
                                    <input type="text" name="agencia"  id="agencia" disabled placeholder="Agência" value={item.produtor?.agencia} onChange={validation.handleChange}
                                        className={`${inter.className} w-full border border-modal-close rounded-lg px-2 outline-none focus:border-black-400 text-sm h-10`}
                                    />
                                </div>

                                <div className="flex items-center justify-start relative mb-5">
                                    <input type="text" name="agenciaDig"  id="agenciaDig" disabled placeholder="Digito" value={item.produtor?.agenciaDig} onChange={validation.handleChange}
                                        className={`${inter.className} w-full border border-modal-close rounded-lg px-2 outline-none focus:border-black-400 text-sm h-10`}
                                    />
                                </div>
                                <div className="flex items-center justify-start relative mb-5">
                                    <input type="number" disabled  name="conta" id="conta" placeholder="Conta" value={item.produtor?.conta} onChange={validation.handleChange}
                                        className={`${inter.className} w-full border border-modal-close rounded-lg px-2 outline-none focus:border-black-400 text-sm h-10`}
                                    />
                                </div>

                                <div className="flex items-center justify-start relative mb-5">
                                    <input type="text" name="contaDig" id="contaDig" disabled placeholder="Digito" value={item.produtor?.contaDig} onChange={validation.handleChange}
                                        className={`${inter.className} w-full border border-modal-close rounded-lg px-2 outline-none focus:border-black-400 text-sm h-10`}
                                    />
                                </div>
                              


                            </div>
                            <div className="grid grid-cols-2 gap-x-2 lg:grid-cols-2 lg:gap-x-2" >
                                    

                                    <div className="flex items-center justify-start relative mb-5">
                                        <select type="text" name="tipoChave" disabled id="tipoChave" placeholder="Tipo de Chave" value={item.produtor?.tipoChave} style={{ color: '#696969' }} onChange={validation.handleChange} className={`${inter.className} w-full border border-modal-close rounded-lg px-2 outline-none focus:border-black-400 text-sm h-10`}>
                                            <option value={''}>Tipo de Chave</option>
                                            <option value={1} >Email</option>
                                            <option value={2} >CPF</option>
                                            <option value={3} >CNPJ</option>
                                            <option value={4} >Celular</option>
                                        </select>
                                    </div>
                                    
                                        <div className="flex items-center justify-start relative mb-5">
                                            <input type="text" name="chavePix" id="chavePix" disabled placeholder="Chave Pix" value={item.produtor?.chavePix} onChange={validation.handleChange}
                                                className={`${inter.className} w-full border border-modal-close rounded-lg px-2 outline-none focus:border-black-400 text-sm h-10`}
                                            />
                                        </div>
    
                                    </div>
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
                                <select name="status" id="Status" value={validation.values.status} onChange={validation.handleChange}
                                    className={`${inter.className} w-full border border-modal-close rounded-lg px-2 outline-none focus:border-black-400 text-sm h-10`}>
                                        <option value={''} >Status</option>
                                        <option value={2} >Aprovado</option>
                                        <option value={3} >Recursado</option>
                                </select>
                            </div>

                          
                          
                            <div className="flex items-center justify-start relative mb-2">
                                <input width={'100%'} style={{backgroundColor:loading?'#ccc':''}} disabled={loading} type="submit" value="Salvar" className="w-full py-3 rounded-full hover:cursor-pointer  hover:brightness-90 duration-500 bg-primary-400 text-white-400" />
                            </div>
                        </Form>


                </Modal>
            }


        </>
    );
}
