import { Inter } from "next/font/google";
import React, { useEffect, useRef, useState } from "react";
import Modal from "@/components/Modal";
import { Form } from "reactstrap";
import { useFormik } from "formik";
import {Api } from "../../../api/apiModulo"

const inter = Inter({
    weight: ["300", "400", "500", "600", "700", "900"],
    subsets: ["latin"]
});




const ModuloForm = ({buttonText , modulesModalActive, setModulesModalActive , item, disabled, setListagem, setItem, listagem, areaMembros,cursos}) => {
    const [loadingTable, setLoadingTable] = useState(false);
    const [loading, setLoading] = useState(false)
    const formData = new FormData()

    const validation = useFormik({
        enableReinitialize: true,
        initialValues: {
            id: item?.id ? item.id : '',
            idCurso: item?.idCurso ? item.idCurso : '',
            nome: item?.nome ? item.nome : '',
            descricao: item?.descricao ? item.descricao : '',
            imagem: null
        },
        onSubmit: async (values) => {
            setLoading(true)
            let urlDaImagem = ''
            formData.set('imagem', values.imagem)
            formData.set('dados', JSON.stringify(values))
            if (values.imagem) {
                urlDaImagem = URL.createObjectURL(values.imagem);
            }
            if (values.id) {
                let response = await Api.Editar(formData)
                if (response.error) {
                    alert(response.msg)
                } else {
                    setModulesModalActive(false)
                    setItem({})
                    let list = [...listagem]
                    let index = list.findIndex((item) => item.id == values.id)
                    Object.assign(list[index], { idAreaMembro: values.idAreaMembro,idCurso:values.idCurso,curso:cursos.find((item)=>item.id == parseInt(values.idCurso)), areaMembro: areaMembros.find((item) => item.id == parseInt(values.idAreaMembro)), nome: values.nome, descricao: values.descricao, ...(urlDaImagem && { imagem: urlDaImagem }) })
                    setListagem(list)
                    validation.resetForm()
                }
            } else if (!values.id) {
                let response = await Api.Cadastrar(formData)
                if (response.error) {
                    alert(response.msg)
                } else {
                    alert(response.msg)
                    setModulesModalActive(false)
                    let value = { id: response.id, idAreaMembro: values.idAreaMembro,idCurso:values.idCurso,curso:cursos.find((item)=>item.id == parseInt(values.idCurso)), areaMembro: areaMembros.find((item) => item.id == parseInt(values.idAreaMembro)), nome: values.nome, descricao: values.descricao, ...(urlDaImagem && { imagem: urlDaImagem }) }
                    let list = [...listagem]
                    list.push(value)
                    setListagem(list)
                    validation.resetForm()
                }
            }
            setLoading(false)
            document.documentElement.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });

    useEffect(() => {
        setTimeout(() => {
            setLoadingTable(true);
        }, 500);


    }, [loadingTable]);


    const handleExcluir = async () => {
        setLoading(true)
        if (item.id) {
            let response = await Api.Excluir({ id: item.id })
            if (response.error) {
                alert(response.msg)
            } else {
                alert(response.msg)
                setModulesModalActive(false)
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


            {modulesModalActive && (
                <Modal
                    modalActive={modulesModalActive}
                    handleClickModal={() => setModulesModalActive(false)}
                    titleModal={buttonText}
                >
                    {['Excluir Modulo'].includes(buttonText) &&
                        <>
                            <div className="row" >
                                <div style={{ color: '#af0505', textAlign: 'center', marginTop: 30 }} >Tem certeza que deseja excluir esse item?</div>
                            </div>
                            <div className="flex items-center justify-start relative ">
                                <input width={'100%'} onClick={handleExcluir} disabled={loading} style={{ backgroundColor: '#af0505', marginTop: 30 }} type="button" value="Sim" className="w-full py-2 rounded-full hover:cursor-pointer hover:brightness-90 duration-500 bg-primary-400 text-white-400" />
                            </div>
                        </>

                    }

                    {['Cadastrar Modulo', 'Editar Modulo', 'Visualizar Modulo'].includes(buttonText) &&

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
                                <select type="text" value={validation?.values?.idCurso} onChange={validation.handleChange} name="idCurso" disabled={disabled} id="idCurso"
                                    className={`${inter.className} w-full border border-modal-close rounded-lg px-2 outline-none focus:border-black-400 text-sm h-10`}>
                                    <option value="" >Curso</option>
                                    {cursos && cursos.map((info, index) => (
                                        <option key={`${index}-${info.id}`} value={info.id} >{info.nome}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex items-center justify-start relative my-5">
                                <input type="text" value={validation?.values?.nome} onChange={validation.handleChange} name="nome" disabled={disabled} id="nome" placeholder="Nome"
                                    className={`${inter.className} w-full border border-modal-close rounded-lg px-2 outline-none focus:border-black-400 text-sm h-10`}
                                />
                            </div>
                            <div className="flex items-center justify-start relative my-5">
                                <input type="text" value={validation?.values?.descricao} onChange={validation.handleChange} name="descricao" disabled={disabled} id="descricao" placeholder="Descrição"
                                    className={`${inter.className} w-full border border-modal-close rounded-lg px-2 outline-none focus:border-black-400 text-sm h-10`}
                                />
                            </div>


                            <div className="flex items-center justify-start relative my-5">
                                <input type="file" name="imagem" accept="image/*"  disabled={disabled} id="imagem" placeholder="Imagem"
                                    className={`${inter.className} w-full border border-modal-close rounded-lg px-2 outline-none focus:border-black-400 text-sm h-10`} onChange={(e) => {       if(e.target.files[0] && (e.target.files[0]?.type =='image/jpeg' || e.target.files[0]?.type== 'image/png' || e.target.files[0]?.type== 'image/jpg' )){
                                        validation.setFieldValue('imagem', e.target.files[0]) 
                                    }else{
                                        alert("Imagem inválida ou não escolhida!")
                                        e.target.value = ''
                                    } }}
                                />
                            </div>


                            <div className="flex items-center justify-start relative ">
                                <input width={'100%'}   style={{backgroundColor:loading?'#ccc':''}} disabled={loading} type="submit" value="Salvar" className="w-full py-3 rounded-full hover:cursor-pointer mb-4 hover:brightness-90 duration-500 bg-primary-400 text-white-400" />
                            </div>
                        </Form>

                    }


                </Modal>
            )}


        </>

    );
};

export default ModuloForm;
