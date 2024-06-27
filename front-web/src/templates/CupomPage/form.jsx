import { Inter } from "next/font/google";
import React, { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import Modal from "@/components/Modal";
import { Api } from "@/api/apiCupom";
import { Form } from "reactstrap";

const inter = Inter({
    weight: ["300", "400", "500", "600", "700", "900"],
    subsets: ["latin"]
});


export  const CupomForm = ({ disabled, buttonText, listagem, setListagem, modalActive, setModalActive, item, setItem }) => {
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
            tipo: item?.tipo ? item.tipo : '',
            valor: item?.valor ? item.valor : '',
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
                    Object.assign(list[index], { nome: values.nome, tipo: values.tipo, valor: values.valor, descricao: values.descricao })
                    setListagem(list)
                    setFormattedValue('')
                    validation.handleReset()
                }
            } else if (!values.id) {
                let response = await Api.Cadastrar(values)
                if (response.error) {
                    alert(response.msg)
                } else {
                    alert(response.msg)
                    setModalActive(false)
                    let value = { id: response.id, nome: values.nome, tipo: values.tipo, valor: values.valor, descricao: values.descricao}
                    let list = [...listagem]
                    list.push(value)
                    setListagem(list)
                    setFormattedValue('')
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
    const [formattedValue, setFormattedValue] = useState('');
    useEffect(()=>{
        if(parseInt(item?.tipo)==2){
        
            handleValueChange(item.valor.toFixed(2),2)
        }
     
    },[item])
    const handleValueChange = (event,type=1) => {
        let value = type==1? event.target.value:`${event}`;
    
        // Remove todos os caracteres não numéricos
     
        value = value?.replace(/\D/g, '');
        // Formata como valor monetário
        const numberValue = Number(value) / 100; // Converte para um número
        const formatted = numberValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        validation.setFieldValue('valor',Number(formatted.replace('R$','').replace(' ','.').replace(',','.')))
        setFormattedValue(formatted);
      };
    

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
                                <select name="tipo" disabled={disabled} id="tipo" value={validation.values.tipo} onChange={validation.handleChange}
                                    className={`${inter.className} w-full border border-modal-close rounded-lg px-2 outline-none focus:border-black-400 text-sm h-10`}>
                                        <option value={''} >Tipo</option>
                                        <option value={1} >Porcentagem</option>
                                        <option value={2} >Valor</option>
                                </select>
                            </div>

                            <div className="flex items-center justify-start relative my-5">
                                <input type={validation.values.tipo==2?'text':'number'} name="valor" disabled={disabled} id="valor" maxLength={validation.values.tipo==2?100:2}   placeholder="Digite o valor" value={validation.values.tipo==2?formattedValue:validation.values.valor}  onChange={validation.values.tipo==2?handleValueChange:validation.handleChange}   
                                    className={`${inter.className} w-full border border-modal-close rounded-lg px-2 outline-none focus:border-black-400 text-sm h-10`}
                                />
                             
                            </div>
                           

                            <div className="flex items-center justify-start relative my-5">
                                <input type="text" name="descricao" disabled={disabled} id="descricao" placeholder="Descricao" value={validation.values.descricao} onChange={validation.handleChange}
                                    className={`${inter.className} w-full border border-modal-close rounded-lg px-2 outline-none focus:border-black-400 text-sm h-10`}
                                />
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
