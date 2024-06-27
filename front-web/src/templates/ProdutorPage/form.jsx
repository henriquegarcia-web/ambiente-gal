import { Inter } from "next/font/google";
import React, { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import Modal from "@/components/Modal";
import { Api } from "@/api/apiProdutor";
import { Form } from "reactstrap";
import { bankCodes } from "@/components/banco";
const inter = Inter({
    weight: ["300", "400", "500", "600", "700", "900"],
    subsets: ["latin"]
});


export default function ProdutorForm({ disabled, buttonText, listagem, setListagem, modalActive, setModalActive, item, setItem }) {
    const [loadingTable, setLoadingTable] = useState(false);
    const [loading, setLoading] = useState(false)
    const [saque, setSaque] = useState(item?.saque)
    const [taxaFixa, setTaxaFixa] = useState(item?.taxaFixa)
    const [taxaRetido, setTaxaRetido] = useState(item?.taxaRetido)
    const [taxaVariavel, setTaxaVariavel] = useState(item?.taxaVariavel)
    const [formattedValue, setFormattedValue] = useState('');
    useEffect(() => {
        if (modalActive) {
            console.log(item)
            if (item?.taxaFixa) {
             
                handleValueChange(item.taxaFixa?.toFixed(2),2, 1)
            }
            setTaxaRetido(item?.taxaRetido)
            setTaxaVariavel(item?.taxaVariavel)
            if (item?.saque) {
                handleValueChange(item.saque.toFixed(2),2, 2)
            }
        }

    }, [modalActive]);

    useEffect(() => {
        setTimeout(() => {
            setLoadingTable(true);
        }, 500);

    }, [loadingTable]);
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
    const validation = useFormik({
        enableReinitialize: true,
        initialValues: {
            id: item?.id ? item.id : '',
            nome: item?.nome ? item.nome : '',
            cpfCnpj: item?.cpfCnpj ? item.cpfCnpj : '',
            email: item?.email ? item.email : '',
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
            validar: item?.validar ? item.validar : '',
            tipoChave: item?.tipoChave ? item.tipoChave : '',
            chavePix: item?.chavePix ? item.chavePix : ''
        },
        onSubmit: async (values) => {
            if (values.id && (values.cpfCnpj.length == 11 || values.cpfCnpj.length == 14)) {
                let response = await Api.Editar(values)
                if (response.error) {
                    if (response?.err && response?.err.status == 401) {
                        alert(response?.err.message)
                    } else {
                        alert(response.msg)
                    }
                } else {
                    setModalActive(false)
                    setItem({})
                    let list = [...listagem]
                    let index = list.findIndex((item) => item.id == values.id)
                    Object.assign(list[index], { ...values, status: (values.validar == 1) ? "Completo" : "Incompleto" })
                    setListagem(list)
                    validation.handleReset()
                }
            } else if (!values.id && (values.cpfCnpj.length == 11 || values.cpfCnpj.length == 14)) {
                let response = await Api.Cadastrar({ nome: values.nome, email: values.email, cpfCnpj: values.cpfCnpj, cep: values.cep, rua: values.rua, numero: values.numero, bairro: values.bairro, cidade: values.cidade, estado: values.estado, banco: values.banco, titular: values.titular, tipoConta: values.tipoConta, conta: values.conta, contaDig: values.contaDig, agencia: values.agencia, agenciaDig: values.agenciaDig, })
                if (response.error) {
                    if (response?.err && response?.err.status == 401) {
                        alert(response?.err.message)
                    } else {
                        alert(response.msg)
                    }
                } else {
                    alert(response.msg)
                    setModalActive(false)
                    let value = { ...values, id: response.id, validar: values.validar, status: (values.validar == 1) ? "Completo" : "Incompleto", saque: 4.99, taxaVariavel: 6.49, taxaFixa: 1.49, taxaRetido: 5.00 }
                    let list = [...listagem]
                    list.push(value)
                    setListagem(list)
                    validation.handleReset()
                }
            } else {
                alert("CPF/CNPJ Inválido!")
            }
        }
    })

    const handleExcluir = async () => {
        setLoading(true)
        if (item?.id) {
            let response = await Api.Excluir({ id: item.id })
            if (response.error) {
                if (response?.err && response?.err.status == 401) {
                    alert(response?.err.message)
                } else {
                    alert(response.msg)
                }
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
    const handleTaxas = async () => {

        let values = { id: item.id, taxaFixa: Number(taxaFixa ? taxaFixa?.replace(/[^\d.,]/g, '').replace(',', '.') : 0), taxaVariavel: Number(String(taxaVariavel)?.replace(' ', '.').replace(',', '.')), saque: Number(saque?.replace(/[^\d.,]/g, '').replace(' ', '.').replace(',', '.')), taxaRetido: Number(String(taxaRetido)?.replace(' ', '.').replace(',', '.')) }
  
        let response = await Api.Taxas(values)
        if (response.error) {
            alert(response.msg)
        } else {
            let list = [...listagem]
            let index = list.findIndex((itens) => itens.id == item.id)
            Object.assign(list[index], { saque:values.saque, taxaVariavel:values.taxaVariavel, taxaFixa:values.taxaFixa, taxaRetido:values.taxaRetido })
            setListagem(list)
            setItem({})
            setModalActive(false)
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
                            <div style={{ height: 600, overflowY: "auto" }}>
                                <div className="flex items-center justify-start relative my-5">
                                    <input type="text" name="nome" disabled={disabled} id="nome" placeholder="Nome" value={validation.values.nome} onChange={validation.handleChange}
                                        className={`${inter.className} w-full border border-modal-close rounded-lg px-2 outline-none focus:border-black-400 text-sm h-10`}
                                    />
                                </div>

                                <div className="flex items-center justify-start relative my-5">
                                    <input type="text" name="cpfCnpj" disabled={disabled} id="cpfCnpj" value={documentValue} onChange={handleDocumentChange} maxLength="18" placeholder={mask}
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
                                {buttonText == 'Visualizar' &&
                                    <div className="grid grid-cols-2 gap-x-2 lg:grid-cols-2 lg:gap-x-2">

                                        <div className="flex justify-start relative my-5 " style={{ flexDirection: 'column' }}>
                                            <label style={{ color: '#ccc' }}>Verso Identidade</label>
                                            {item.versonIdentidade ?
                                                <a target="_blank" href={`${process.env.NEXT_PUBLIC_API_URL}/arquivo/` + item.versonIdentidade} >Link</a>
                                                :
                                                <p>Arquivo não encontrado</p>
                                            }


                                        </div>

                                        <div className="flex justify-start relative my-5 " style={{ flexDirection: 'column' }}>
                                            <label style={{ color: '#ccc' }}>Frente Identidade</label>
                                            {item.frenteIdentidade ?
                                                <a target="_blank" href={`${process.env.NEXT_PUBLIC_API_URL}/arquivo/` + item.frenteIdentidade} >Link</a>
                                                :
                                                <p>Arquivo não encontrado</p>
                                            }


                                        </div>

                                        <div className="flex justify-start relative my-5 " style={{ flexDirection: 'column' }}>
                                            <label style={{ color: '#ccc' }}>Frente Identidade</label>
                                            {item.cartaoCNPJ ?
                                                <a target="_blank" href={`${process.env.NEXT_PUBLIC_API_URL}/arquivo/` + item.cartaoCNPJ} >Link</a>
                                                :
                                                <p>Arquivo não encontrado</p>
                                            }


                                        </div>

                                        <div className="flex justify-start relative my-5 " style={{ flexDirection: 'column' }}>
                                            <label style={{ color: '#ccc' }}>Selfie segurando o documento</label>
                                            {item.selfieDocumento ?
                                                <a target="_blank" href={`${process.env.NEXT_PUBLIC_API_URL}/arquivo/` + item.selfieDocumento} >Link</a>
                                                :
                                                <p>Arquivo não encontrado</p>
                                            }
                                        </div>
                                    </div>
                                }
                                <label>Dados Bancários</label>
                                <div className="flex items-center justify-start relative my-5">
                                    <select type="text" name="banco" disabled={disabled} id="banco" value={validation.values.banco} style={{ color: '#696969' }} onChange={validation.handleChange} className={`${inter.className} w-full border border-modal-close rounded-lg px-2 outline-none focus:border-black-400 text-sm h-10`}>
                                        <option value={''}>Banco</option>
                                        {bankCodes.map((item) => (
                                            <option value={item.codigo} >{item.nome}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="flex items-center justify-start relative my-5">
                                    <input type="text" name="titular" disabled={disabled} id="titular" placeholder="Titular" value={validation.values.titular} onChange={validation.handleChange}
                                        className={`${inter.className} w-full border border-modal-close rounded-lg px-2 outline-none focus:border-black-400 text-sm h-10`}
                                    />
                                </div>
                                <div className="flex items-center justify-start relative my-5">
                                    <select type="text" name="tipoConta" disabled={disabled} id="tipoConta" placeholder="Tipo de Conta" value={validation.values.tipoConta} style={{ color: '#696969' }} onChange={validation.handleChange} className={`${inter.className} w-full border border-modal-close rounded-lg px-2 outline-none focus:border-black-400 text-sm h-10`}>
                                        <option value={''}>Tipo de Conta</option>
                                        <option value={1} >Conta Corrente</option>
                                        <option value={2} >Conta Poupança</option>
                                    </select>
                                </div>

                                <div className="grid grid-cols-4 gap-x-4 lg:grid-cols-4 lg:gap-x-4" >
                                    <div className="flex items-center justify-start relative mb-5">
                                        <input type="text" name="agencia" id="agencia" disabled={disabled} placeholder="Agência" value={validation.values.agencia} onChange={validation.handleChange}
                                            className={`${inter.className} w-full border border-modal-close rounded-lg px-2 outline-none focus:border-black-400 text-sm h-10`}
                                        />
                                    </div>

                                    <div className="flex items-center justify-start relative mb-5">
                                        <input type="text" name="agenciaDig" id="agenciaDig" disabled={disabled} placeholder="Digito" value={validation.values.agenciaDig} onChange={validation.handleChange}
                                            className={`${inter.className} w-full border border-modal-close rounded-lg px-2 outline-none focus:border-black-400 text-sm h-10`}
                                        />
                                    </div>
                                    <div className="flex items-center justify-start relative mb-5">
                                        <input type="number" disabled={disabled} name="conta" id="conta" placeholder="Conta" value={validation.values.conta} onChange={validation.handleChange}
                                            className={`${inter.className} w-full border border-modal-close rounded-lg px-2 outline-none focus:border-black-400 text-sm h-10`}
                                        />
                                    </div>

                                    <div className="flex items-center justify-start relative mb-5">
                                        <input type="text" name="contaDig" id="contaDig" disabled={disabled} placeholder="Digito" value={validation.values.contaDig} onChange={validation.handleChange}
                                            className={`${inter.className} w-full border border-modal-close rounded-lg px-2 outline-none focus:border-black-400 text-sm h-10`}
                                        />
                                    </div>


                                </div>
                                <div className="grid grid-cols-2 gap-x-2 lg:grid-cols-2 lg:gap-x-2" >


                                    <div className="flex items-center justify-start relative mb-5">
                                        <select type="text" name="tipoChave" disabled={disabled} id="tipoChave" placeholder="Tipo de Chave" value={validation.values.tipoChave} style={{ color: '#696969' }} onChange={validation.handleChange} className={`${inter.className} w-full border border-modal-close rounded-lg px-2 outline-none focus:border-black-400 text-sm h-10`}>
                                            <option value={''}>Tipo de Chave</option>
                                            <option value={1} >Email</option>
                                            <option value={2} >CPF</option>
                                            <option value={3} >CNPJ</option>
                                            <option value={4} >Celular</option>
                                        </select>
                                    </div>

                                    <div className="flex items-center justify-start relative mb-5">
                                        <input type="text" name="chavePix" id="chavePix" disabled={disabled} placeholder="Chave Pix" value={validation.values.chavePix} onChange={validation.handleChange}
                                            className={`${inter.className} w-full border border-modal-close rounded-lg px-2 outline-none focus:border-black-400 text-sm h-10`}
                                        />
                                    </div>

                                </div>
                                <div className="flex items-center justify-start relative my-5">
                                    <select type="text" name="validar" disabled={disabled} id="validar" value={validation.values.validar} style={{ color: '#696969' }} onChange={validation.handleChange} className={`${inter.className} w-full border border-modal-close rounded-lg px-2 outline-none focus:border-black-400 text-sm h-10`}>
                                        <option value={''}>Validar</option>
                                        <option value={1} >Validado</option>
                                        <option value={2} >Não Validado</option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex items-center justify-start relative mb-5">
                                <input width={'100%'} type="submit" value="Salvar" className="w-full py-3 rounded-full hover:cursor-pointer mb-4 hover:brightness-90 duration-500 bg-primary-400 text-white-400" />
                            </div>
                        </Form>

                    }
                    {['Taxa'].includes(buttonText) &&

                        <>
                            <div className="flex items-center justify-start relative my-5">
                                <input type="text" name="nome" disabled={true} id="nome" placeholder="Nome" value={item.nome}
                                    className={`${inter.className} w-full border border-modal-close rounded-lg px-2 outline-none focus:border-black-400 text-sm h-10`}
                                />
                            </div>


                            <div className="grid grid-cols-2 gap-x-2 lg:grid-cols-2 lg:gap-x-2">
                                <div className="flex  justify-start relative my-2" style={{ flexDirection: 'column' }}>
                                    <label style={{ marginBottom: 5 }}>Taxa Fixa</label>
                                    <input type="text" name="taxaFixa" id="taxaFixa" placeholder="Taxa Fixa" value={taxaFixa} onChange={(e) => handleValueChange(e.target.value, 2, 1)}
                                        className={`${inter.className} w-full border border-modal-close rounded-lg px-2 outline-none focus:border-black-400 text-sm h-10`}
                                    />
                                </div>

                                <div className="flex  justify-start relative my-2" style={{ flexDirection: 'column' }}>
                                    <label style={{ marginBottom: 5 }}>Taxa Variável <span style={{ fontSize: 10 }} >(%)</span></label>
                                    <input type="number" name="taxaVariavel" id="taxaVariavel" placeholder="Taxa Variável" value={taxaVariavel} onChange={(e) => setTaxaVariavel(e.target.value)}
                                        className={`${inter.className} w-full border border-modal-close rounded-lg px-2 outline-none focus:border-black-400 text-sm h-10`}
                                    />
                                </div>

                                <div className="flex  justify-start relative my-2" style={{ flexDirection: 'column' }}>
                                    <label style={{ marginBottom: 5 }}>Saque</label>

                                    <input type="text" name="saque" id="saque" placeholder="Saque" value={saque} onChange={(e) => handleValueChange(e.target.value, 2, 2)}
                                        className={`${inter.className} w-full border border-modal-close rounded-lg px-2 outline-none focus:border-black-400 text-sm h-10`}
                                    />
                                </div>

                                <div className="flex  justify-start relative my-2" style={{ flexDirection: 'column' }}>
                                    <label style={{ marginBottom: 5 }}>Taxa Retenção <span style={{ fontSize: 10 }} >(%)</span></label>
                                    <input type="number" name="taxaRetido" id="taxaRetido" placeholder="Taxa de Retenção" value={taxaRetido} onChange={(e) => setTaxaRetido(e.target.value)}
                                        className={`${inter.className} w-full border border-modal-close rounded-lg px-2 outline-none focus:border-black-400 text-sm h-10`}
                                    />
                                </div>

                            </div>


                            <div className="flex items-center justify-start relative my-2">
                                <input disabled={loading} style={{ backgroundColor: loading ? '#ccc' : '' }} width={'100%'} type="button" value="Salvar" onClick={handleTaxas} className="w-full py-3 rounded-full hover:cursor-pointer hover:brightness-90 duration-500 bg-primary-400 text-white-400" />
                            </div>
                        </>

                    }

                </Modal>
            }


        </>
    );
}
