import { Inter } from "next/font/google";
import React, { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import Modal from "@/components/Modal";
import { Api } from "@/api/apiCheckout";
import { Form } from "reactstrap";
import Select from "react-select";
const inter = Inter({
    weight: ["300", "400", "500", "600", "700", "900"],
    subsets: ["latin"]
});


export const CheckoutForm = ({ disabled, buttonText, listagem, setListagem, modalActive, setModalActive, item, setItem, cupons, pixels, produtos }) => {
    const Tipos = [{ value: 1, label: 'Pix' }, { value: 2, label: 'Cartão de Credito' }, { value: 3, label: 'Boleto' }, { value: 4, label: 'Recorrência -> Cartão de Credito' }]
    const [loadingTable, setLoadingTable] = useState(false);
    const [loading, setLoading] = useState(false)
    const formData = new FormData()
    useEffect(() => {
        setTimeout(() => {
            setLoadingTable(true);
        }, 500);

    }, [loadingTable]);

    const validation = useFormik({
        enableReinitialize: true,
        initialValues: {
            id: item?.id ? item.id : '',
            idCupom: item?.idCupom ? item.idCupom : '',
            idPixel: item?.idPixel ? item.idPixel : '',
            idProduto: item?.idProduto ? item.idProduto : '',
            statusEndereco: item?.statusEndereco ? item.statusEndereco : '',
            statusCupom: item?.statusCupom ? item.statusCupom : '',
            statusTimer: item?.statusTimer ? item.statusTimer : '',
            statusEmail: item?.statusEmail ? item.statusEmail : '',
            nome: item?.nome ? item.nome : '',
            descricao: item?.descricao ? item.descricao : '',
            time: item?.time ? item.time : '',
            recorrencia: item?.recorrencia ? item.recorrencia : '',
            status: item?.status?.toString() ? item?.status?.toString() : '',
            imagem: null,
            postback: item?.postback ? item.postback : '',
            corPrimaria: item?.corPrimaria ? item.corPrimaria : '',
            corSecundaria: item?.corSecundaria ? item.corSecundaria : '',
            corTerciaria: item?.corTerciaria ? item.corTerciaria : '',
            corQuaternaria: item?.corQuaternaria ? item.corQuaternaria : ''
        },
        onSubmit: async (values) => {
            setLoading(true)
            let urlDaImagem
            if (values.imagem) {
                urlDaImagem = URL.createObjectURL(values.imagem);
            }
            if (values.recorrencia?.length > 0) {
                values = { ...values, recorrencia: values.recorrencia?.map((item) => { return item.value }).join('-') }
            }else{
                values.recorrencia = ''
            }
            if(values.idProduto?.length > 0){
                values = { ...values,  idProduto: values.idProduto?.map((item) => { return item.value }).join('-') }
            }else{
                values.idProduto = ''
            }
            if (values.idPixel?.length > 0) {
                values = { ...values, idPixel: values.idPixel?.map((item) => { return item.value }).join('-')}
            }else{
                values.idPixel = ''
            }
          
            formData.set('imagem', values.imagem)
            formData.set('dados', JSON.stringify(values))
            if (values.id) {
                let response = await Api.Editar(formData)
                if (response.error) {
                    alert(response.msg)
                } else {
                    setModalActive(false)
                    setItem({})
                    let list = [...listagem]
                    let index = list.findIndex((item) => item.id == values.id)

                    Object.assign(list[index], { ...values, ...(urlDaImagem && { imagem: urlDaImagem }), cupom: cupons.find((item) => item.id == values.idCupom),  idPixel: pixels?.filter((item) => values.idPixel?.split('-')?.includes(String(item.value))).map((item) => { return { value: item.value, label: item.label } })
                    ,idProduto: produtos?.filter((item) => values.idProduto?.split('-')?.includes(String(item.value))).map((item) => { return { value: item.value, label: item.label } }), tipo: Tipos?.filter((type) => values?.recorrencia?.split('-').includes(String(type.value))), status: values.status == 'true' ? true : false })
                    setListagem(list)
                    validation.handleReset()
                }
            } else if (!values.id) {
                let response = await Api.Cadastrar(formData)
                if (response.error) {
                    alert(response.msg)
                } else {
                    alert(response.msg)
                    setModalActive(false)
                    let value = { ...values, id: response.id, link: response.link, idPixel: pixels?.filter((item) => values.idPixel?.split('-')?.includes(String(item.value))).map((item) => { return { value: item.value, label: item.label } }), ...(urlDaImagem && { imagem: urlDaImagem }), cupom: cupons.find((item) => item.id == values.idCupom), idProduto: produtos?.filter((item) => values.idProduto?.split('-')?.includes(String(item.value))).map((item) => { return { value: item.value, label: item.label } }), tipo: Tipos?.filter((type) => values?.recorrencia?.split('-').includes(String(type.value))), status: values.status == 'true' ? true : false }
                    let list = [...listagem]
                    list.push(value)
                    setListagem(list)
                    validation.handleReset()
                }
            }
            setLoading(false)
            document.documentElement.scrollTo({ top: 0, behavior: 'smooth' });
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
                                <div style={{ color: '#af0505', textAlign: 'center', marginTop: 30 }}>Tem certeza que deseja excluir esse item?</div>
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
                            <div style={{ height: '700px', overflowY: 'auto' }} >

                                <div className="flex justify-start relative" style={{ flexDirection: "column" }}>
                                    <select type="text" value={validation.values.idCupom} onChange={validation.handleChange} name="idCupom" disabled={disabled} id="idCupom"
                                        className={`${inter.className} w-full border border-modal-close rounded-lg px-2 outline-none focus:border-black-400 text-sm h-10`}>
                                        <option value="" >Cupom</option>
                                        {cupons && cupons.map((info, index) => (
                                            <option key={index} value={info.id} >{info.nome}</option>
                                        ))}
                                    </select>
                                </div>
                                {/* <div className="grid grid-cols-2 gap-x-2 lg:grid-cols-2 lg:gap-x-2  mb-5 mt-5">

                                    

                                    <div className="flex justify-start relative" style={{ flexDirection: "column" }}>
                                        <select type="text" value={validation.values.idPixel} onChange={validation.handleChange} name="idPixel" disabled={disabled} id="idPixel"
                                            className={`${inter.className} w-full border border-modal-close rounded-lg px-2 outline-none focus:border-black-400 text-sm h-10`}>
                                            <option value="" >Pixel</option>
                                            {pixels && pixels.map((info, index) => (
                                                <option key={index} value={info.id} >{info.nome}</option>
                                            ))}
                                        </select>
                                    </div>

                                </div> */}

                                <Select placeholder='Pixel' isMulti className="basic-multi-select my-5 mb-5"
                                    options={pixels}
                                    value={validation.values.idPixel}
                                    onChange={(val) => {
                                        validation.setFieldValue('idPixel', val)
                                    }} />

                                <Select placeholder='Produtos' isMulti className="basic-multi-select"
                                    options={produtos}
                                    value={validation.values.idProduto}
                                    onChange={(val) => {
                                        validation.setFieldValue('idProduto', val)
                                    }} />

                                <div className="flex items-center justify-start relative my-5">
                                    <input type="text" name="nome" disabled={disabled} id="nome" placeholder="Nome" value={validation.values.nome} onChange={validation.handleChange}
                                        className={`${inter.className} w-full border border-modal-close rounded-lg px-2 outline-none focus:border-black-400 text-sm h-10`}
                                    />
                                </div>
                                <div className="flex items-center justify-start relative my-5">
                                    <textarea type="text" name="descricao" disabled={disabled} id="descricao" placeholder="Descrição" value={validation.values.descricao} onChange={validation.handleChange}
                                        className={`${inter.className} w-full border border-modal-close rounded-lg px-2 outline-none focus:border-black-400 text-sm h-10`}
                                    ></textarea>
                                </div>

                                <div className="grid grid-cols-2 gap-x-2 lg:grid-cols-2 lg:gap-x-2  mb-5">

                                    <div className="flex justify-start relative" style={{ flexDirection: "column" }}>
                                        <label style={{ color: '#ccc' }}>Endereço</label>
                                        <select type="text" value={validation.values.statusEndereco} onChange={validation.handleChange} name="statusEndereco" disabled={disabled} id="statusEndereco"
                                            className={`${inter.className} w-full border border-modal-close rounded-lg px-2 outline-none focus:border-black-400 text-sm h-10`}>
                                            <option value="" >Status</option>
                                            <option value="1" >Ativado</option>
                                            <option value="2" >Desativado</option>
                                        </select>
                                    </div>

                                    <div className="flex justify-start relative" style={{ flexDirection: "column" }}>
                                        <label style={{ color: '#ccc' }}>Cupom</label>
                                        <select type="text" value={validation.values.statusCupom} onChange={validation.handleChange} name="statusCupom" disabled={disabled} id="statusCupom"
                                            className={`${inter.className} w-full border border-modal-close rounded-lg px-2 outline-none focus:border-black-400 text-sm h-10`}>
                                            <option value="" >Status</option>
                                            <option value="1" >Ativado</option>
                                            <option value="2" >Desativado</option>
                                        </select>
                                    </div>

                                    <div className="flex justify-start relative" style={{ flexDirection: "column" }}>
                                        <label style={{ color: '#ccc' }}>Timer</label>
                                        <select type="text" value={validation.values.statusTimer} onChange={validation.handleChange} name="statusTimer" disabled={disabled} id="statusTimer"
                                            className={`${inter.className} w-full border border-modal-close rounded-lg px-2 outline-none focus:border-black-400 text-sm h-10`}>
                                            <option value="" >Status</option>
                                            <option value="1" >Ativado</option>
                                            <option value="2" >Desativado</option>
                                        </select>
                                    </div>

                                    <div className="flex justify-start relative" style={{ flexDirection: "column" }}>
                                        <label style={{ color: '#ccc' }}>Email <small>(Confirmação)</small> </label>
                                        <select type="text" value={validation.values.statusEmail} onChange={validation.handleChange} name="statusEmail" disabled={disabled} id="statusEmail"
                                            className={`${inter.className} w-full border border-modal-close rounded-lg px-2 outline-none focus:border-black-400 text-sm h-10`}>
                                            <option value="" >Status</option>
                                            <option value="1" >Ativado</option>
                                            <option value="2" >Desativado</option>
                                        </select>
                                    </div>

                                </div>




                                <div className="flex justify-start relative my-5 " style={{ flexDirection: 'column' }}>
                                    <label style={{ color: '#ccc' }}>Time</label>
                                    <input type="time" name="time" step="1" disabled={disabled} id="time" placeholder="Time" value={validation.values.time} onChange={validation.handleChange}
                                        className={`${inter.className} w-full border border-modal-close rounded-lg px-2 outline-none focus:border-black-400 text-sm h-10`}
                                    />
                                </div>
                                <div className="flex items-center justify-start relative my-5">
                                    <select type="text" value={validation.values.status} onChange={validation.handleChange} name="status" disabled={disabled} id="status"
                                        className={`${inter.className} w-full border border-modal-close rounded-lg px-2 outline-none focus:border-black-400 text-sm h-10`}>
                                        <option value="" >Status</option>
                                        <option value="true" >Ativado</option>
                                        <option value="false" >Desativado</option>

                                    </select>
                                </div>

                                <div className="flex items-center justify-start relative my-5">
                                    <input type="text" name="postback" disabled={disabled} id="postback" placeholder="PostBack" value={validation.values.postback} onChange={validation.handleChange} className={`${inter.className} w-full border border-modal-close rounded-lg px-2 outline-none focus:border-black-400 text-sm h-10`} />
                                </div>

                                <div className="grid grid-cols-4 gap-x-4 lg:grid-cols-4 lg:gap-x-4  mb-5">

                                    <div className="flex justify-start relative" style={{ flexDirection: "column" }}>
                                        <label style={{ color: '#ccc' }}>Cor Primaria</label>
                                        <input type="color" disabled={disabled} name="corPrimaria" id="corPrimaria" placeholder="Cor Primaria" value={validation.values.corPrimaria} onChange={validation.handleChange}
                                            className={`${inter.className} w-full border border-modal-close rounded-lg px-2 outline-none focus:border-black-400 text-sm h-10`}
                                        />
                                    </div>

                                    <div className="flex justify-start relative" style={{ flexDirection: "column" }}>
                                        <label style={{ color: '#ccc' }}>Cor Secundaria</label>
                                        <input type="color" name="corSecundaria" id="corSecundaria" disabled={disabled} placeholder="Cor Secundaria" value={validation.values.corSecundaria} onChange={validation.handleChange}
                                            className={`${inter.className} w-full border border-modal-close rounded-lg px-2 outline-none focus:border-black-400 text-sm h-10`}
                                        />
                                    </div>

                                    <div className="flex justify-start relative" style={{ flexDirection: "column" }}>
                                        <label style={{ color: '#ccc' }}>Cor Terciaria</label>
                                        <input type="color" name="corTerciaria" id="corTerciaria" disabled={disabled} placeholder="Cor Terciaria" value={validation.values.corTerciaria} onChange={validation.handleChange}
                                            className={`${inter.className} w-full border border-modal-close rounded-lg px-2 outline-none focus:border-black-400 text-sm h-10`}
                                        />
                                    </div>

                                    <div className="flex justify-start relative" style={{ flexDirection: "column" }}>
                                        <label style={{ color: '#ccc' }}>Cor Quaternária</label>
                                        <input type="color" name="corQuaternaria" id="corQuaternaria" disabled={disabled} placeholder="Cor Quaternária" value={validation.values.corQuaternaria} onChange={validation.handleChange}
                                            className={`${inter.className} w-full border border-modal-close rounded-lg px-2 outline-none focus:border-black-400 text-sm h-10`}
                                        />
                                    </div>

                                </div>

                                <Select tabIndex={18} placeholder='Tipo de Venda' isMulti className="basic-multi-select"
                                    options={Tipos}
                                    value={validation.values.recorrencia}
                                    onChange={(val) => {
                                        validation.setFieldValue('recorrencia', val)
                                    }} />


                                <div className="flex justify-start relative my-5 mb-5" style={{ flexDirection: "column" }}>
                                    <label style={{ color: '#ccc' }}>Imagem (630x270)</label>
                                    <input type="file" name="imagem" accept="image/*" disabled={disabled} id="imagem" placeholder="Imagem"
                                        className={`${inter.className} w-full border border-modal-close rounded-lg px-2 outline-none focus:border-black-400 text-sm h-10`} onChange={(e) => {
                                            if (e.target.files[0] && (e.target.files[0]?.type == 'image/jpeg' || e.target.files[0]?.type == 'image/png')) {
                                                validation.setFieldValue('imagem', e.target.files[0])
                                            } else {
                                                alert("Imagem inválida ou não escolhida!")
                                                e.target.value = ''
                                            }

                                        }}
                                    />
                                </div>

                                <div className="flex items-center justify-start relative ">
                                    <input width={'100%'} disabled={loading} style={{ backgroundColor: loading ? '#ccc' : '' }} type="submit" value="Salvar" className="w-full py-3 rounded-full hover:cursor-pointer mb-4 hover:brightness-90 duration-500 bg-primary-400 text-white-400" />
                                </div>
                            </div>
                        </Form>

                    }

                </Modal>
            }


        </>
    );
}
