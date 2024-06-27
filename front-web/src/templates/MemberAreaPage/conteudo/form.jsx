import { Inter } from "next/font/google";
import React, { useEffect, useRef, useState } from "react";
import Modal from "@/components/Modal";
import { useFormik } from "formik";
import { Form } from 'reactstrap'
import { Api } from "../../../api/apiConteudo"
const inter = Inter({
    weight: ["300", "400", "500", "600", "700", "900"],
    subsets: ["latin"]
});

const ConteudoForm = ({ buttonText, conteudoModalActive, setConteudoModalActive, item, disabled, setListagem, setItem, listagem, areaMembros, cursos, modulos }) => {
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
            idModulo: item?.idModulo ? item.idModulo : '',
            nome: item?.nome ? item.nome : '',
            descricao: item?.descricao ? item.descricao : '',
            descricao1: item?.descricao1 ? item.descricao1 : '',
            materiais1:null,
            descricao2: item?.descricao2 ? item.descricao2 : '',
            materiais2: null,
            imagem: null,
            video: null
        },
        onSubmit: async (values) => {
            setLoading(true)
            let urlDaImagem = ''
            let urlDoVideo = ''
            let urlDoMaterial1 = ''
            let urlDoMaterial2 = ''
            if (values.imagem) {
                urlDaImagem = URL.createObjectURL(values.imagem);
            }
            if (values.video) {
                urlDoVideo = URL.createObjectURL(values.video);
            }
            if (values.materiais1) {
                urlDoMaterial1 = URL.createObjectURL(values.materiais1);
            }
            if (values.materiais2) {
                urlDoMaterial2 = URL.createObjectURL(values.materiais2);
            }

            formData.set('video', values.video)
            formData.set('imagem', values.imagem)
            formData.set('materiais1', values.materiais1)
            formData.set('materiais2', values.materiais2)
            formData.set('dados', JSON.stringify(values))
            if (values.id) {
                let response = await Api.Editar(formData)
                if (response.error) {
                    alert(response.msg)
                } else {
                    setConteudoModalActive(false)
                    setItem({})
                    let list = [...listagem]
                    let index = list.findIndex((item) => item.id == values.id)
                    Object.assign(list[index], { idModulo: values.idModulo, nome: values.nome, descricao: values.descricao, curso: cursos.find((item) => item.id == parseInt(values.idCurso)), areaMembro: areaMembros.find((item) => item.id == parseInt(values.idAreaMembro)), modulo: modulos.find((item) => item.id == parseInt(values.idModulo)), ...(urlDaImagem && { imagem: urlDaImagem }), ...(urlDoVideo && { video: urlDoVideo }), ...(urlDoMaterial1 && { materiais1: urlDoMaterial1 }), ...(urlDoMaterial2 && { materiais2: urlDoMaterial2 }) ,descricao1:values.descricao1,descricao2:values.descricao2})
                    setListagem(list)
                    validation.resetForm()
                }
            } else if (!values.id) {
                let response = await Api.Cadastrar(formData)
                if (response.error) {
                    alert(response.msg)
                } else {
                    alert(response.msg)
                    setConteudoModalActive(false)
                    let value = { id: response.id, idModulo: values.idModulo, nome: values.nome, descricao: values.descricao, curso: cursos.find((item) => item.id == parseInt(values.idCurso)), areaMembro: areaMembros.find((item) => item.id == parseInt(values.idAreaMembro)), modulo: modulos.find((item) => item.id == parseInt(values.idModulo)), ...(urlDaImagem && { imagem: urlDaImagem }), ...(urlDoVideo && { video: urlDoVideo }),...(urlDoMaterial1 && { materiais1: urlDoMaterial1 }), ...(urlDoMaterial2 && { materiais2: urlDoMaterial2 }) ,descricao1:values.descricao1,descricao2:values.descricao2 }
                    let list = [...listagem]
                    list.push(value)
                    setListagem(list)
                    validation.resetForm()
                }
            }
            setLoading(false)
            document.documentElement.scrollTo({ top: 0, behavior: 'smooth' });
        }
    })
    const handleExcluir = async () => {
        setLoading(true)
        if (item.id) {
            let response = await Api.Excluir({ id: item.id })
            if (response.error) {
                alert(response.msg)
            } else {

                alert(response.msg)
                setConteudoModalActive(false)
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
            {conteudoModalActive && (
                <Modal
                    modalActive={conteudoModalActive}
                    handleClickModal={() => setConteudoModalActive(false)}
                    titleModal={buttonText}
                >
                    {['Excluir Conteúdo'].includes(buttonText) &&
                        <>
                            <div className="row" >
                                <div style={{ color: '#af0505', textAlign: 'center', marginTop: 30 }} >Tem certeza que deseja excluir esse item?</div>
                            </div>
                            <div className="flex items-center justify-start relative ">
                                <input width={'100%'} onClick={handleExcluir} disabled={loading} style={{ backgroundColor: '#af0505', marginTop: 30 }} type="button" value="Sim" className="w-full py-2 rounded-full hover:cursor-pointer hover:brightness-90 duration-500 bg-primary-400 text-white-400" />
                            </div>
                        </>

                    }

                    {['Cadastrar Conteúdo', 'Editar Conteúdo', 'Visualizar Conteúdo'].includes(buttonText) &&

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
                                <select type="text" value={validation?.values?.idModulo} onChange={validation.handleChange} name="idModulo" disabled={disabled} id="idModulo"
                                    className={`${inter.className} w-full border border-modal-close rounded-lg px-2 outline-none focus:border-black-400 text-sm h-10`}>
                                    <option value="" >Modulo</option>
                                    {modulos && modulos.map((info, index) => (
                                        <option key={index} value={info.id} >{info.nome}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex items-center justify-start relative my-5">
                                <input type="text" value={validation.values.nome} onChange={validation.handleChange} name="nome" disabled={disabled} id="nome" placeholder="Nome"
                                    className={`${inter.className} w-full border border-modal-close rounded-lg px-2 outline-none focus:border-black-400 text-sm h-10`}
                                />
                            </div>

                            <div className="flex items-center justify-start relative my-5">
                                <input type="text" value={validation.values.descricao} onChange={validation.handleChange} name="descricao" disabled={disabled} id="descricao" placeholder="Descrição"
                                    className={`${inter.className} w-full border border-modal-close rounded-lg px-2 outline-none focus:border-black-400 text-sm h-10`}
                                />
                            </div>
                            <label className="my-5" style={{ fontSize: 9 }} >Video</label>
                            <div className="flex items-center justify-start relative ">

                                <input type="file" name="video" accept="video/*" disabled={disabled} id="video" placeholder="Video"
                                    className={`${inter.className} w-full border border-modal-close rounded-lg px-2 outline-none focus:border-black-400 text-sm h-10`} onChange={(e) => { validation.setFieldValue('video', e.target.files ? e.target.files[0] : '') }}
                                />
                            </div>
                            <label className="my-5" style={{ fontSize: 9 }} >Imagem</label>
                            <div className="flex items-center justify-start relative">

                                <input type="file" name="imagem" disabled={disabled} id="imagem" accept="image/*" placeholder="Imagem"
                                    className={`${inter.className} w-full border border-modal-close rounded-lg px-2 outline-none focus:border-black-400 text-sm h-10`} onChange={(e) => {       if(e.target.files[0] && (e.target.files[0]?.type =='image/jpeg' || e.target.files[0]?.type== 'image/png' || e.target.files[0]?.type== 'image/jpg' )){
                                        validation.setFieldValue('imagem', e.target.files[0]) 
                                    }else{
                                        alert("Imagem inválida ou não escolhida!")
                                        e.target.value = ''
                                    } }}
                                />
                            </div>
                            <label className="my-5" style={{ fontSize: 9, marginTop: 10 }} >Material - 1</label>
                            <div className="flex items-center justify-start relative ">
                                <input type="text" value={validation.values.descricao1} onChange={validation.handleChange} name="descricao1" disabled={disabled} id="descricao1" placeholder="Descrição"
                                    className={`${inter.className} w-full border border-modal-close rounded-lg px-2 outline-none focus:border-black-400 text-sm h-10`}
                                />
                            </div>
                            <div className="flex items-center justify-start relative my-5">

                                <input type="file" name="materiais1" disabled={disabled} id="materiais1" accept=".pdf"
                                    className={`${inter.className} w-full border border-modal-close rounded-lg px-2 outline-none focus:border-black-400 text-sm h-10`} onChange={(e) => { validation.setFieldValue('materiais1', e.target.files ? e.target.files[0] : '') }}
                                />
                            </div>
                            <label className="my-5" style={{ fontSize: 9, marginTop: 10 }} >Material - 2</label>
                            <div className="flex items-center justify-start relative ">
                                <input type="text" value={validation.values.descricao2} onChange={validation.handleChange} name="descricao2" disabled={disabled} id="descricao2" placeholder="Descrição"
                                    className={`${inter.className} w-full border border-modal-close rounded-lg px-2 outline-none focus:border-black-400 text-sm h-10`}
                                />
                            </div>
                            <div className="flex items-center justify-start relative my-5">

                                <input type="file" name="materiais2" disabled={disabled} id="materiais2" accept=".pdf" 
                                    className={`${inter.className} w-full border border-modal-close rounded-lg px-2 outline-none focus:border-black-400 text-sm h-10`} onChange={(e) => { validation.setFieldValue('materiais2', e.target.files ? e.target.files[0] : '') }}
                                />
                            </div>
                            <div className="flex items-center justify-start relative my-5 ">
                                <input width={'100%'}   style={{backgroundColor:loading?'#ccc':''}} disabled={loading} type="submit" value="Salvar" className="w-full py-3 rounded-full hover:cursor-pointer mb-4 hover:brightness-90 duration-500 bg-primary-400 text-white-400" />
                            </div>
                        </Form>

                    }


                </Modal>
            )}
        </>


    );
};

export default ConteudoForm;
