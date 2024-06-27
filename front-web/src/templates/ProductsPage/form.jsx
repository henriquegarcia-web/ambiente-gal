import { Inter } from "next/font/google";
import React, { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import Modal from "@/components/Modal";
import { Api } from "@/api/apiProduto";
import { Form } from "reactstrap";

const inter = Inter({
    weight: ["300", "400", "500", "600", "700", "900"],
    subsets: ["latin"]
});


export const ProdutoForm = ({ disabled, buttonText, listagem, setListagem, modalActive, setModalActive, item, setItem, areaMembros }) => {
    const [loadingTable, setLoadingTable] = useState(false);
    const [loading, setLoading] = useState(false)
    const [formattedValue, setFormattedValue] = useState('');
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
            idAreaMembro: item?.idAreaMembro ? item.idAreaMembro : '',
            nome: item?.nome ? item.nome : '',
            descricao: item?.descricao ? item.descricao : '',
            preco: item?.preco ? item.preco : '',
            tipo: item?.tipo?.id ? item.tipo.id : item?.tipo ? item?.tipo : '',
            afiliacao: item?.afiliacao ? item.afiliacao : '',
            porcentagemAfialiacao: item?.porcentagemAfialiacao ? item.porcentagemAfialiacao : '',
            imagem: null
        },
        onSubmit: async (values) => {
            setLoading(true)
            let urlDaImagem = ''
            if (values.imagem) {
                urlDaImagem = URL.createObjectURL(values.imagem);
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
                    Object.assign(list[index], { idAreaMembro: values.idAreaMembro, areaMembro: areaMembros.find((item) => item.id == parseInt(values.idAreaMembro)), nome: values.nome, descricao: values.descricao, preco: values.preco, tipo: values.tipo, afiliacao: values.afiliacao, porcentagemAfialiacao: values.porcentagemAfialiacao,msg:'Produtor' })
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
                    let value = { id: response.id, idAreaMembro: values.idAreaMembro, areaMembro: areaMembros.find((item) => item.id == parseInt(values.idAreaMembro)), nome: values.nome, descricao: values.descricao, preco: values.preco, tipo: values.tipo, afiliacao: values.afiliacao, porcentagemAfialiacao: values.porcentagemAfialiacao,msg:'Produtor'}
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
    const handleValueChange = (event, type = 1) => {
        let value = type == 1 ? event.target.value : `${event}`;

        // Remove todos os caracteres não numéricos
        value = value?.replace(/\D/g, '');
     
        // Formata como valor monetário
        const numberValue = Number(value) / 100; // Converte para um número
        let formatted = numberValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        setFormattedValue(formatted);
        formatted = formatted.replace('R$', '')
        formatted = formatted.replace(/\./g, '');
        formatted = formatted.replace(',', '.')
        formatted = Number(formatted)
        validation.setFieldValue('preco',formatted)
    };
    useEffect(() => {
      
        if (item?.preco) {
            handleValueChange(item.preco.toFixed(2), 2)
        }
    }, [item])
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
                            style={{ marginTop: 40 }}
                            onSubmit={(e) => {
                                e.preventDefault();
                                validation.handleSubmit();
                                return false;
                            }}
                        >

                            <div className="flex  justify-start relative my-2" style={{ flexDirection: 'column' }}>
                                <label style={{ marginBottom: 5 }}>Área de Membro</label>
                                {disabled ?
                                <a target="_blank" style={{textAlign:'center',cursor:"pointer",borderColor:'#ccc',borderWidth:1,borderRadius:5,backgroundColor:'#FAFAFA'}} href={`/courses/`+areaMembros.find((item)=>item.id==validation.values.idAreaMembro)?.link} >Acessar</a>
                            :
                                    <select type="text" value={validation?.values?.idAreaMembro} onChange={validation.handleChange} name="idAreaMembro" disabled={disabled} id="idAreaMembro"
                                        className={`${inter.className} w-full border border-modal-close rounded-lg px-2 outline-none focus:border-black-400 text-sm h-10`}>
                                        <option value="" >Selecione</option>
                                        {areaMembros && areaMembros.map((info, index) => (
                                            <option key={index} value={info.id} >{info.nome}</option>
                                        ))}
                                    </select>
                                }

                            </div>
                            <div className="flex  justify-start relative my-2" style={{ flexDirection: 'column' }}>
                                <label style={{ marginBottom: 5 }}>Nome</label>
                                <input type="text" name="nome" disabled={disabled} id="nome" style={{ color: '#696969' }} placeholder="Nome" value={validation.values.nome} onChange={validation.handleChange}
                                    className={`${inter.className} w-full border border-modal-close rounded-lg px-2 outline-none focus:border-black-400 text-sm h-10`}
                                />
                            </div>

                            <div className="flex  justify-start relative my-2" style={{ flexDirection: 'column' }}>
                                <label style={{ marginBottom: 5 }}>Descrição</label>
                                <textarea type="text" name="descricao" disabled={disabled} id="descricao" style={{ color: '#696969' }} placeholder="Descrição" value={validation.values.descricao} onChange={validation.handleChange}
                                    className={`${inter.className} w-full border border-modal-close rounded-lg px-2 outline-none focus:border-black-400 text-sm h-10`}
                                ></textarea>
                            </div>
                            <div className="flex  justify-start relative my-2" style={{ flexDirection: 'column' }}>
                                <label style={{ marginBottom: 5 }}>Preço</label>
                                <input type="text" name="preco" disabled={disabled} style={{ color: '#696969' }} id="preco" placeholder="Preço" value={formattedValue} onChange={handleValueChange}
                                    className={`${inter.className} w-full border border-modal-close rounded-lg px-2 outline-none focus:border-black-400 text-sm h-10`}
                                />
                            </div>

                            <div className="flex  justify-start relative my-2" style={{ flexDirection: 'column' }}>
                                <label style={{ marginBottom: 5 }}>Tipo</label>
                                <select type="text" value={validation?.values?.tipo} onChange={validation.handleChange} name="tipo" disabled={disabled} id="tipo"
                                    className={`${inter.className} w-full border border-modal-close rounded-lg px-2 outline-none focus:border-black-400 text-sm h-10`}>
                                    <option value="" >Tipo</option>
                                    <option value="1" >Produto Principal</option>
                                    <option value="2" >Order Bump</option>
                                    <option value="3" >Downsell</option>
                                </select>
                            </div>
                            {!disabled &&
                                <div className="grid grid-cols-2 gap-x-2 lg:grid-cols-2 lg:gap-x-2">
                                    <div className="flex items-center justify-start relative mb-5">
                                        <select type="text" value={validation?.values?.afiliacao} onChange={validation.handleChange} name="afiliacao" disabled={disabled} id="afiliacao"
                                            className={`${inter.className} w-full border border-modal-close rounded-lg px-2 outline-none focus:border-black-400 text-sm h-10`}>
                                            <option value="" >Afiliação</option>
                                            <option value={true} >Sim</option>
                                            <option value={false} >Não</option>

                                        </select>

                                    </div>

                                    <div className="flex items-center justify-start relative mb-5">
                                        <input type="number" maxLength={2} name="porcentagemAfialiacao" id="porcentagemAfialiacao" disabled={disabled} placeholder="Porcentagem Afialiação" value={validation.values.porcentagemAfialiacao} onChange={validation.handleChange}
                                            className={`${inter.className} w-full border border-modal-close rounded-lg px-2 outline-none focus:border-black-400 text-sm h-10`}
                                        />
                                    </div>

                                </div>
                            }

                            {!disabled &&
                               <div className="flex justify-start relative my-5" style={{ flexDirection: "column" }}>
                               <label style={{ color: '#ccc' }}>Imagem (100x100)</label>
                                    <input type="file" name="imagem" accept="image/*" disabled={disabled} id="imagem" placeholder="Imagem"
                                        className={`${inter.className} w-full border border-modal-close rounded-lg px-2 outline-none focus:border-black-400 text-sm h-10`} onChange={(e) => { 
                                          
                                            if(e.target.files[0] && (e.target.files[0]?.type =='image/jpeg' || e.target.files[0]?.type== 'image/png' || e.target.files[0]?.type== 'image/jpg' )){
                                                    validation.setFieldValue('imagem', e.target.files[0]) 
                                                }else{
                                                    alert("Imagem inválida ou não escolhida!")
                                                    e.target.value = ''
                                                }
                                                }
                                            }
                                        
                                    />
                                </div>

                            }
                            {!disabled &&
                                <div className="flex items-center justify-start relative mb-5">
                                    <input disabled={loading}   style={{backgroundColor:loading?'#ccc':''}} width={'100%'} type="submit" value="Salvar" className="w-full py-3 rounded-full hover:cursor-pointer mb-4 hover:brightness-90 duration-500 bg-primary-400 text-white-400" />
                                </div>
                            }
                        </Form>

                    }

                </Modal>
            }


        </>
    );
}
