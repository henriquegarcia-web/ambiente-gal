import { Inter } from "next/font/google";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { FaPix } from "react-icons/fa6";
import { IoBarcodeSharp, IoCard } from "react-icons/io5";
import InputMask from "react-input-mask";
import { useRouter } from 'next/router';
import Countdown from "@/components/Countdown";
import { Api } from "@/api/apiCheckout";
import { Api as ApiVenda } from "@/api/apiVenda";
import io from 'socket.io-client';
import * as CardValidator from 'card-validator';
import { useFormik } from "formik";
import { Form } from "reactstrap";
import { ModalPix } from "./pix";
import { ModalBoleto } from "./boleto";
import Obrigado from "./obrigado";
import FacebookPixel from "./pixelFacebook";
const advancedMatching = { em: '' }
const options = {
    autoConfig: true,
    debug: false,
}
const inter = Inter({
    weight: ["300", "400", "500", "600", "700", "900"],
    subsets: ["latin"]
});

const CheckoutSalePage = () => {
    const [paymentMethod, setPaymentMethod] = useState("");
    const [targetDateStr, setTargetDateStr] = useState();
    const router = useRouter();
    const [modalPix, setModalPix] = useState(false)
    const [codeQr, setCodeQr] = useState('')
    const [modalBoleto, setModalBoleto] = useState(false)
    const [codeBarras, setCodeBarras] = useState('')
    const [produtos, setProdutos] = useState([])
    const [info, setInfo] = useState({})
    const [taxas, setTaxas] = useState()
    const [carrinho, setCarrinho] = useState([])
    const [valor, setValor] = useState(0)
    const [disabled, setDisabled] = useState(false)
    const [url, setUrl] = useState(false)
    const [socket, setSocket] = useState(null);
    const [compraRealizada, setCompraRealizada] = useState(false);
    const [loading, setLoading] = useState(false);
    const [transactionStatus, setTransactionStatus] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const [idPixels, setIdPixels] = useState([]);
    useEffect(() => {
        setSocket(io(`${process.env.NEXT_PUBLIC_API_SOCKET}`));
    }, [])
    useEffect(() => {
        if (!socket) {
            return;
        }
        socket.on('status', (data) => {
            setTransactionStatus(data.status)
            setTransactionId(data.id)
        });
    }, [socket]);
    useEffect(() => {
        if (transactionStatus == 'Aprovado' && transactionId == id) {
            //alert("Compra Aprovada!")
            setCompraRealizada(true)
            setDocumentValue("")
            validation.handleReset()
            localStorage.removeItem('authVendaID')
            setId('')
            setModalPix(false)
            setModalBoleto(false)
            if (info.postback) {
                window.location.href = info.postback
            }

        }
    }, [transactionStatus])
    const handlePaymentMethod = (type) => {
        setPaymentMethod(type);
    };

    const { link } = router.query;
    const [id, setId] = useState()
    useEffect(() => {
        const getAuthUser = localStorage?.getItem("authVendaID");
        let obj = getAuthUser == "undefined" || getAuthUser == null || getAuthUser == "[object Object]" ? "" : JSON.parse(getAuthUser ? getAuthUser : "");
        setId(obj)
    }, [setId])
    const validation = useFormik({
        enableReinitialize: true,
        initialValues: {
            id: null,
            checkoutLink: link,
            nome: '',
            cpfCnpj: '',
            email: '',
            confirmEmail: '',
            celular: '',
            cep: '',
            rua: '',
            numero: '',
            bairro: '',
            cidade: '',
            estado: '',
            tipo: null,
            titular: '',
            cardNumero: '',
            cardMes: '',
            cardAno: '',
            cardCvv: '',
            parcelas: null,
            carrinho: null,
            cupomName: ''
        },
        onSubmit: async (values) => {
            values.carrinho = carrinho
            values.id = id
            values.checkoutLink = link
            setDisabled(true)
            if (info.statusEmail == 1 ? values.email == values.confirmEmail : values.email) {
                values.celular = values.celular.replace(/\D/g, "")
                values.cardNumero = values.cardNumero.replace(/\D/g, "")
                values.celular = values.celular.replace(/\D/g, "")
                let resposta = await ApiVenda.Cadastrar(values)
                console.log(resposta)
                if (resposta.error) {
                    alert(resposta.msg)
                } else {

                    if (values.tipo == 1) {
                        setModalPix(true)
                        setCodeQr(resposta.response[0].emv)
                        setId(resposta.id)
                    } else if (values.tipo == 3) {
                        setModalBoleto(true)
                        setCodeBarras(resposta.response.digitableLine)
                        setUrl(resposta.response.paymentLink)
                        setId(resposta.id)
                    } else if (values.tipo == 2) {
                        if (resposta.response.status == 'Aprovado') {
                        //    alert("Compra Aprovada!")
                            setCompraRealizada(true)
                            setDocumentValue("")
                            validation.handleReset()
                            localStorage.removeItem('authVendaID')
                            setId("")
                   
                        } else {
                            alert("Erro com a operadora do cartão, verifique os dados")
                        }
                    }
                }
            } else {
                alert('Os emails precisam ser iguais!')
            }
            setDisabled(false)
        }
    })

    const handleInfo = async () => {
        setLoading(true)
        if (link) {
            let response = await Api.Link(link)
            if (response.error) {
                alert(response.msg)
            } else {
              
                let produto = response.list[0].produtos
                let produtoSelect = produto.filter((item) => item?.tipo?.id == 1)
                setCarrinho(produtoSelect)
                let valores = produtoSelect?.reduce((acumulador, element) => { return acumulador + element.preco }, 0)
                setValor(valores)
                let informacoes = response.list[0]
                let valor = localStorage?.getItem("time");
                valor = valor == "undefined" || valor == null || valor == "[object Object]" ? "" : JSON.parse(valor ? valor : "");
                if (valor != informacoes.time) {
                    localStorage.setItem("time", JSON.stringify(informacoes.time));
                }
                setInfo(informacoes)
                setProdutos(produto)
                setTargetDateStr(informacoes.time)
                setIdPixels(informacoes?.pixels)
            }
        }
        setLoading(false)
    }
    useEffect(() => {
        handleInfo()
    }, [link])
    const estiloParaOcultarBarraDeRolagem = {
        overflow: 'hidden',
        scrollbarWidth: 'thin',
        scrollbarColor: 'transparent transparent',
        WebkitOverflowScrolling: 'touch', // Para melhoria do overflow em alguns navegadores
        // ... outras propriedades de estilo específicas aqui
    };


    const handleInputChange = (event) => {
        const { value } = event.target;
        validation.setFieldValue('cardNumero', value)
        // Use a função card-validator para obter informações sobre o cartão
        const cardInfo = CardValidator.number(value);
        if (cardInfo.card) {
            let taxas = info?.taxas?.find((item) => item.nome == cardInfo.card.type)
            setTaxas(taxas)
        }
    };
    const handleSelecionar = (item) => {
        let car = [...carrinho]
        car?.push(item)
        let valores = car?.reduce((acumulador, element) => { return acumulador + element.preco }, 0)
        setValor(valores)
        setCarrinho(car)
    }
    const handleRetirar = (item) => {
        let car = [...carrinho]
        car = car?.filter((product) => product.id != item.id)
        let valores = car?.reduce((acumulador, element) => { return acumulador + element.preco }, 0)
        setValor(valores)
        setCarrinho(car)
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

    return (
        <div className={`${info.corPrimaria ? '' : 'bg-checkout-bg'}  w-full`} style={{ backgroundColor: info.corPrimaria, display: "flex", minHeight: '100vh' }}>

            {!compraRealizada ?
                <>
                    {info.status && info.statusTimer == 1 &&
                        <div className="bg-checkout-bg w-full" style={{ position: 'fixed', top: 0, left: 0, zIndex: 999, padding: 0, height: 135 }}>
                            {targetDateStr &&
                                <Countdown targetDateStr={targetDateStr} />
                            }
                        </div>
                    }

                    <div className={`checkout-box ${info.corSecundaria ? '' : 'bg-checkout-box'}  w-full max-w-[700px]  m-auto py-11 px-8 border border-checkout-border `} style={{ height: !info.status ? 1200 : '', backgroundColor: info.corSecundaria, flex: 1, marginTop: info.statusTimer == 1 ? 150 : 0 }}>
                        {loading==false &&
                            <>
                                {!info.status &&
                                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                                      {/* {!loading &&   <button className="w-full py-3 rounded-full hover:cursor-pointer mb-4 hover:brightness-90 duration-500 bg-primary-400 text-white-400" style={{ backgroundColor: '#ccc', padding: 10 }} type="button" >Carregando....</button>} */}
                                    </div>
                                }
                            </>
                        }
                        {info.status &&
                            <>
                                {info?.imagem &&     <Image src={info?.imagem ? `${process.env.NEXT_PUBLIC_API_URL}/arquivo/${info.imagem}` : "/images/checkout-banner.png"} width={670} height={100} alt="checkout banner" className="object-cover  " style={{ marginTop: info.statusTimer == 1 ? 5 : 0, borderRadius: 30 }} /> }
                             
                                {produtos?.map((item) => (
                                    <>
                                        {item.tipo.id == 1 &&
                                            <div className="flex items-center mt-1 gap-5 pb-5 border-b border-checkout-border">
                                                <img src={item.imagem ? `${process.env.NEXT_PUBLIC_API_URL}/arquivo/${item.imagem}` : "/images/checkout-photo.png"} width={98} height={98} alt="checkout photo" className="object-cover" style={{ borderRadius: 30 }} />
                                                <div className="flex-1">
                                                    <h2  style={{ fontSize: 16, color: info.corQuaternaria }} className={`${inter.className} text-2xl font-bold  text-white-400`} >
                                                        {item.nome}
                                                    </h2>
                                                    <p style={{ fontSize: 18, color: info.corQuaternaria }} className={`${inter.className} text-2xl font-bold text-primary-400 mt-1`}  >
                                                        {item.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                                    </p>
                                                    <p style={{  color: info.corQuaternaria }} className={`${inter.className} text-xs font-normal text-white-400 mt-1`} >
                                                        {item.descricao}
                                                    </p>
                                                </div>
                                                <p className={`${inter.className} text-xs font-normal text-white-400 mt-1`} >
                                                    {item.tipo.id == 1 ?
                                                        <button className="w-full py-3 rounded-full hover:cursor-pointer mb-4 hover:brightness-90 duration-500  text-white-400" style={{ padding: 10 }} ></button>
                                                        :
                                                        (carrinho?.some((product) => product.id == item.id) ? <button className="w-full py-3 rounded-full hover:cursor-pointer mb-4 hover:brightness-90 duration-500 bg-primary-400 text-white-400" style={{ padding: 10 }} onClick={() => { handleRetirar(item) }} >Retirar</button> : <button className="w-full py-3 rounded-full hover:cursor-pointer mb-4 hover:brightness-90 duration-500 bg-warning-400 text-white-400" style={{ backgroundColor: '#FFC107', padding: 10 }} onClick={() => handleSelecionar(item)} >Selecionar</button>
                                                        )
                                                    }
                                                </p>
                                            </div>
                                        }
                                    </>

                                ))}

                                <Form className="custom-form " encType='multipart/form-data'
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        validation.handleSubmit();
                                        return false;
                                    }} >
                                    <div className="flex flex-col gap-3 mt-5 overflow-auto ScrollOver" styles={[estiloParaOcultarBarraDeRolagem, { height: 600, overflowY: "hidden" }]}>
                                        <label htmlFor="name" className={`${inter.className} text-sm font-normal text-white-400 mt-1`} >
                                            Informações Cadastrais
                                        </label>

                                        <div className="flex flex-col">
                                            <label htmlFor="name" className={`${inter.className} text-sm font-normal text-white-400 mt-1`}  style={{  color: info.corQuaternaria }} >
                                                Nome completo
                                            </label>
                                            <input style={{ backgroundColor: info.corTerciaria, color: info.corQuaternaria }} className={`${inter.className} ${info.corTerciaria ? '' : 'bg-checkout-input'}  flex flex-1 py-[10px] px-1 rounded-[5px] border border-checkout-border outline-none text-white-400 text-sm mt-2`} type="text" placeholder="Nome" id="nome" name="nome" value={validation.values.nome} onChange={validation.handleChange} />
                                        </div>
                                        <div className="flex flex-col">
                                            <label htmlFor="cpf" className={`${inter.className} text-sm font-normal text-white-400 mt-1`}  style={{  color: info.corQuaternaria }}  >
                                                CPF
                                            </label>
                                            <input style={{ backgroundColor: info.corTerciaria, color: info.corQuaternaria }} className={`${inter.className} ${info.corTerciaria ? '' : 'bg-checkout-input'} flex flex-1 py-[10px] px-1 rounded-[5px] border border-checkout-border outline-none text-white-400 text-sm  mt-2`} type="text" id="cpfCnpj" name="cpfCnpj" value={documentValue} onChange={handleDocumentChange} maxLength="18" placeholder={mask} />
                                        </div>
                                        <label htmlFor="email" className={`${inter.className} text-sm font-normal text-white-400 mt-1`}  style={{  color: info.corQuaternaria }}  >
                                            Seu email
                                        </label>
                                        <div className={`grid grid-cols-1 gap-x-${info.statusEmail == 1 ? 2 : 1} lg:grid-cols-${info.statusEmail == 1 ? 2 : 1} lg:gap-x-${info.statusEmail == 1 ? 2 : 1} `}>
                                            <div className="flex items-center justify-start relative ">
                                                <input style={{ backgroundColor: info.corTerciaria, color: info.corQuaternaria }} className={`${inter.className} ${info.corTerciaria ? '' : 'bg-checkout-input'} flex flex-1 py-[10px] px-1 rounded-[5px] border border-checkout-border outline-none text-white-400 text-sm`} type="text" placeholder="Digite seu email para receber a compra" id="email" name="email" value={validation.values.email} onChange={validation.handleChange} />
                                            </div>
                                            {info.statusEmail == 1 &&
                                                <div className="flex items-center justify-start relative ">
                                                    <input style={{ backgroundColor: info.corTerciaria, color: info.corQuaternaria }} className={`${inter.className} ${info.corTerciaria ? '' : 'bg-checkout-input'} flex flex-1 py-[10px] px-1 rounded-[5px] border border-checkout-border outline-none text-white-400 text-sm`} type="text" placeholder="Digite seu email novamente" id="confirmEmail" name="confirmEmail" value={validation.values.confirmEmail} onChange={validation.handleChange} />

                                                </div>
                                            }

                                        </div>


                                        <div className="flex flex-col">
                                            <label htmlFor="phone" className={`${inter.className} text-sm font-normal text-white-400 `}  style={{  color: info.corQuaternaria }}  >
                                                Celular
                                            </label>
                                            <InputMask style={{ backgroundColor: info.corTerciaria, color: info.corQuaternaria }} className={`${inter.className} ${info.corTerciaria ? '' : 'bg-checkout-input'} flex flex-1 py-[10px] px-1 rounded-[5px] border border-checkout-border outline-none text-white-400 text-sm mt-2`} type="text" placeholder="(99) 9 9999-9999" id="celular" name="celular" mask={"(99) 9 9999-9999"} value={validation.values.celular} onChange={validation.handleChange} />
                                        </div>
                                        {info.statusEndereco == 1 &&
                                            <>
                                                <label htmlFor="name" className={`${inter.className} text-sm font-normal text-white-400 mt-1`}  style={{  color: info.corQuaternaria }}  >
                                                    Dados de Endereço
                                                </label>
                                                <div className=" grid grid-cols-2 gap-x-3 lg:grid-cols-3 lg:gap-x-3">
                                                    <div className="flex items-center justify-start relative mb-5">
                                                        <input style={{ backgroundColor: info.corTerciaria, color: info.corQuaternaria }} type="number" name="cep" id="cep" placeholder="CEP" value={validation.values.cep} onChange={(e) => {
                                                            validation.handleChange(e)
                                                            handleCEP(e.target.value)
                                                        }}
                                                            className={`${inter.className} ${info.corTerciaria ? '' : 'bg-checkout-input'} flex flex-1 py-[10px] px-1 rounded-[5px] border border-checkout-border outline-none text-white-400 text-sm`} />
                                                    </div>

                                                    <div className="flex items-center justify-start relative mb-5">
                                                        <input style={{ backgroundColor: info.corTerciaria, color: info.corQuaternaria }} type="text" name="rua" id="rua" placeholder="Rua" value={validation.values.rua} onChange={validation.handleChange}
                                                            className={`${inter.className} ${info.corTerciaria ? '' : 'bg-checkout-input'} flex flex-1 py-[10px] px-1 rounded-[5px] border border-checkout-border outline-none text-white-400 text-sm`}
                                                        />
                                                    </div>

                                                    <div className="flex items-center justify-start relative mb-5">
                                                        <input style={{ backgroundColor: info.corTerciaria, color: info.corQuaternaria }} type="number" name="numero" id="numero" placeholder="Número" value={validation.values.numero} onChange={validation.handleChange}
                                                            className={`${inter.className} ${info.corTerciaria ? '' : 'bg-checkout-input'} flex flex-1 py-[10px] px-1 rounded-[5px] border border-checkout-border outline-none text-white-400 text-sm`} />
                                                    </div>
                                                    <div className="flex items-center justify-start relative mb-5">
                                                        <input style={{ backgroundColor: info.corTerciaria, color: info.corQuaternaria }} type="text" name="bairro" id="bairro" placeholder="Bairro" value={validation.values.bairro} onChange={validation.handleChange}
                                                            className={`${inter.className} ${info.corTerciaria ? '' : 'bg-checkout-input'} flex flex-1 py-[10px] px-1 rounded-[5px] border border-checkout-border outline-none text-white-400 text-sm`} />
                                                    </div>

                                                    <div className="flex items-center justify-start relative mb-5">
                                                        <input style={{ backgroundColor: info.corTerciaria, color: info.corQuaternaria }} type="text" name="cidade" id="cidade" placeholder="Cidade" value={validation.values.cidade} onChange={validation.handleChange}
                                                            className={`${inter.className} ${info.corTerciaria ? '' : 'bg-checkout-input'} flex flex-1 py-[10px] px-1 rounded-[5px] border border-checkout-border outline-none text-white-400 text-sm`} />
                                                    </div>

                                                    <div className="flex items-center justify-start relative mb-5">
                                                        <input style={{ backgroundColor: info.corTerciaria, color: info.corQuaternaria }} type="text" name="estado" id="estado" placeholder="Estado" value={validation.values.estado} onChange={validation.handleChange}
                                                            className={`${inter.className} ${info.corTerciaria ? '' : 'bg-checkout-input'} flex flex-1 py-[10px] px-1 rounded-[5px] border border-checkout-border outline-none text-white-400 text-sm`} />
                                                    </div>
                                                </div>
                                            </>
                                        }
                                        {info.statusCupom == 1 &&
                                            <div className="flex items-center justify-start relative mb-5">
                                                <input style={{ backgroundColor: info.corTerciaria, color: info.corQuaternaria }} type="text" name="cupomName" id="cupomName" placeholder="Cupom" value={validation.values.cupomName} onChange={validation.handleChange}
                                                    className={`${inter.className} ${info.corTerciaria ? '' : 'bg-checkout-input'} flex flex-1 py-[10px] px-1 rounded-[5px] border border-checkout-border outline-none text-white-400 text-sm`} />
                                            </div>
                                        }


                                        <div className="mt-3 flex flex-col gap-5 lg:flex-row">
                                            {info.tipo?.map((item) => (
                                                <button style={{ backgroundColor: info.corTerciaria }} type="button" className={`flex items-center justify-center ${info.corTerciaria ? '' : 'bg-checkout-input'} p-4 gap-2 rounded-[5px] border border-checkout-border lg:flex-1 hover:border-primary-400 duration-500 ${validation.values.tipo === item.id && "border-primary-400"}`} onClick={() => validation.setFieldValue('tipo', item.id ==4 ?2:item.id)}  >
                                                    <IoCard size={30} className="text-checkout-gray" />
                                                    <p className={`${inter.className} text-checkout-gray text-sm font-normal text-left`} >
                                                        {/* {item.nome} */}
                                                      {item.nome.replace('Recorrencia -> ','')} 
                                                    </p>
                                                </button>
                                            ))}

                                         
                                        </div>
                                        {validation.values.tipo == 2 &&
                                            <div className=" p-5 rounded-[5px] mt-5 flex flex-col gap-4">
                                                <div className="flex flex-col items-center lg:flex-row gap-4">
                                                    <div className="flex flex-col lg:w-[50%]">
                                                        <div className="flex flex-col">
                                                            <label htmlFor="card-name" className={`${inter.className} text-sm font-normal text-white-400 mt-1`} >
                                                                Nome do titular
                                                            </label>
                                                            <input style={{ backgroundColor: info.corTerciaria }} className={`${inter.className} ${info.corTerciaria ? '' : 'bg-checkout-input'} flex flex-1 py-[10px] px-1 rounded-[5px] border border-checkout-border outline-none text-white-400 text-sm`} type="text" placeholder="Nome impresso no cartão" id="card-name" name="titular" value={validation.values.titular} onChange={validation.handleChange} />
                                                        </div>
                                                        <div className="flex flex-col">
                                                            <label htmlFor="card-number" className={`${inter.className} text-sm font-normal text-white-400 mt-1`} >
                                                                Número do cartão
                                                            </label>
                                                            <InputMask style={{ backgroundColor: info.corTerciaria }} className={`${inter.className} ${info.corTerciaria ? '' : 'bg-checkout-input'} flex flex-1 py-[10px] px-1 rounded-[5px] border border-checkout-border outline-none text-white-400 text-sm`} type="text" value={validation.values.cardNumero} onChange={handleInputChange} placeholder="Digite somente números" id="card-number" name="cardNumero" mask={"9999 9999 9999 9999"} />
                                                        </div>
                                                        <div className="gap-1 grid grid-cols-3">
                                                            <div className="flex flex-col">
                                                                <label htmlFor="card-month" className={`${inter.className} text-sm font-normal text-white-400 mt-1`} >
                                                                    Mês
                                                                </label>
                                                                <InputMask style={{ backgroundColor: info.corTerciaria }} className={`${inter.className} ${info.corTerciaria ? '' : 'bg-checkout-input'} py-[10px] px-1 rounded-[5px] border border-checkout-border outline-none text-white-400 text-sm`} type="text" placeholder="00" id="card-month" name="cardMes" mask={"99"} value={validation.values.cardMes} onChange={validation.handleChange} />
                                                            </div>
                                                            <div className="flex flex-col">
                                                                <label htmlFor="card-year" className={`${inter.className} text-sm font-normal text-white-400 mt-1`} >
                                                                    Ano
                                                                </label>
                                                                <InputMask style={{ backgroundColor: info.corTerciaria }} className={`${inter.className} ${info.corTerciaria ? '' : 'bg-checkout-input'} py-[10px] px-1 rounded-[5px] border border-checkout-border outline-none text-white-400 text-sm`} type="text" placeholder="0000" id="card-year" name="cardAno" mask={"9999"} value={validation.values.cardAno} onChange={validation.handleChange} />
                                                            </div>
                                                            <div className="flex flex-col">
                                                                <label htmlFor="card-code" className={`${inter.className} text-sm font-normal text-white-400 mt-1`} >
                                                                    CVV
                                                                </label>
                                                                <InputMask style={{ backgroundColor: info.corTerciaria }} className={`${inter.className} ${info.corTerciaria ? '' : 'bg-checkout-input'} py-[10px] px-1 rounded-[5px] border border-checkout-border outline-none text-white-400 text-sm`} type="text" placeholder="000" id="card-code" name="cardCvv" mask={"999"} value={validation.values.cardCvv} onChange={validation.handleChange} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <Image src={"/images/card.png"} width={206} height={136} alt="credit card" className="flex flex-1" />
                                                </div>
                                                <div className="flex flex-col w-full">
                                                    <label htmlFor="card-installment" className={`${inter.className} text-sm font-normal text-white-400 mt-1`} >
                                                        Número de parcelas
                                                    </label>
                                                    <select style={{ backgroundColor: info.corTerciaria }} id="card-installment" className={`${inter.className} ${info.corTerciaria ? '' : 'bg-checkout-input'} text-white-400 py-[10px] px-1 rounded-[5px] border border-checkout-border outline-none  text-sm w-full`} name="parcelas" value={validation.values.parcelas} onChange={validation.handleChange} >
                                                        <option value="" >Selecione</option>
                                                        {taxas?.parcelas?.map((item, index) => (
                                                            <option key={index} value={item.numero}>{item.numero}x de {String(((((item.juros / 100) * valor) + item.valorfixo) + valor).toFixed(2)).replace('.', ',')}</option>
                                                        ))}

                                                    </select>
                                                </div>
                                            </div>

                                        }
                                        {produtos?.map((item) => (
                                            <>
                                                {item.tipo.id != 1 &&
                                                    <div className="flex items-center mt-1 gap-5 pb-5 border-b border-checkout-border">
                                                        <Image src={item.imagem ? `${process.env.NEXT_PUBLIC_API_URL}/arquivo/${item.imagem}` : "/images/checkout-photo.png"} width={98} height={98} alt="checkout photo" className="object-cover" style={{ borderRadius: 30 }} />
                                                        <div className="flex-1">
                                                            <h2  style={{ fontSize: 16, color: info.corQuaternaria }} className={`${inter.className} text-2xl font-bold  text-white-400`} >
                                                                {item.nome}
                                                            </h2>

                                                            <p style={{ fontSize: 18, color: info.corQuaternaria }} className={`${inter.className} text-2xl font-bold text-primary-400 mt-1`}  >
                                                                {item.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                                            </p>
                                                            <p style={{color: info.corQuaternaria }} className={`${inter.className} text-xs font-normal text-white-400 mt-1`} >
                                                                {item.descricao}
                                                            </p>
                                                        </div>
                                                        <p className={`${inter.className} text-xs font-normal text-white-400 mt-1`} >

                                                            {item.tipo?.id == 1 ?
                                                                <button type="button" className="w-full py-3 rounded-full hover:cursor-pointer mb-4 hover:brightness-90 duration-500 bg-primary-400 text-white-400" style={{ padding: 10 }} >
                                                                </button>
                                                                :
                                                                (carrinho?.some((product) => product.id == item.id) ?
                                                                    <div className="w-full py-3 rounded-full hover:cursor-pointer mb-4 hover:brightness-90 duration-500 bg-primary-400 text-white-400" style={{ padding: 10 }} onClick={() => { handleRetirar(item) }} >Retirar</div> :
                                                                    <div className="w-full py-3 rounded-full hover:cursor-pointer mb-4 hover:brightness-90 duration-500 bg-warning-400 text-white-400" style={{ backgroundColor: '#FFC107', padding: 10 }} onClick={() => handleSelecionar(item)} >Selecionar</div>
                                                                )
                                                            }

                                                        </p>
                                                    </div>
                                                }
                                            </>


                                        ))}
                                        <button className={`${inter.className} flex  items-center justify-center p-2 mt-5 bg-primary-400 rounded-[10px] text-white-400 text-base font-medium hover:bg-primary-300 duration-500`} type="submit" style={{ backgroundColor: disabled ? '#ccc' : '' }} disabled={disabled} > FINALIZAR A COMPRA
                                        </button>

                                    </div>
                                </Form>
                            </>
                        }
                    </div>
                    <ModalPix buttonText={'Qrcode'} codeQr={codeQr} modalPix={modalPix} setModalPix={setModalPix} />
                    <ModalBoleto buttonText={'Boleto'} url={url} codeBarras={codeBarras} modalBoleto={modalBoleto} setModalBoleto={setModalBoleto} />
                </>

                :
               <>
                <div className={`checkout-box ${info.corSecundaria ? '' : 'bg-checkout-box'}  w-full max-w-[700px]  m-auto py-11 px-8 border border-checkout-border `} style={{ height: !info.status ? 1200 : '', backgroundColor: info.corSecundaria }}>
                    <Obrigado />
                </div>
                     {idPixels?.map((item) => (
                        <>
                            {item.plataforma==1  &&
                             <FacebookPixel pixelId={item.idPixel} valor={valor} tipo={'Compra'} />
                            }
                           
                        </>
                       
                    ))}
               </>
            }
            {idPixels?.map((item) => (
                <>
                    {item.plataforma==1  &&
                     <FacebookPixel pixelId={item.idPixel} valor={valor} tipo={'Outros'} />
                    }
                </>
               
            ))}
 
        </div>
    );
};

export default CheckoutSalePage;
