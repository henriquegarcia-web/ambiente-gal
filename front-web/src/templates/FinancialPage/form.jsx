import { Inter } from "next/font/google";
import React, { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import Modal from "@/components/Modal";
import { Api } from "@/api/apiTransacao";
import { Form } from "reactstrap";

const inter = Inter({
    weight: ["300", "400", "500", "600", "700", "900"],
    subsets: ["latin"]
});

export const TransacaoForm = ({ buttonText, listagem, setListagem, modalActive, setModalActive, saldoDisponivel }) => {
    const [loadingTable, setLoadingTable] = useState(false);
    const [loading, setLoading] = useState(false)
    const [formattedValue, setFormattedValue] = useState('');
    useEffect(() => {
        setTimeout(() => {
            setLoadingTable(true);
        }, 500);

    }, [loadingTable]);
    const Times = async () => {
        let data = new Date();
        let horas = data.getHours();
        let min = data.getMinutes();
        let sec = data.getSeconds();
        let horaAtual = horas + ':' + min + ':' + sec
        let dia = String(data.getDate()).padStart(2, '0');
        let mes = String(data.getMonth() + 1).padStart(2, '0');
        let ano = data.getFullYear();
        let dataAtual = ano + '-' + mes + '-' + dia;
        let times = { data: dataAtual, hora: horaAtual }
        return times
    }
    const validation = useFormik({
        enableReinitialize: true,
        initialValues: {
            valor: '',
            tipoValor:''
        },
        onSubmit: async (values) => {
            let time = Times()
            setLoading(true)
            let response = await Api.Cadastrar(values)
            if (response.error) {
                alert(response.msg)
            } else {
                alert(response.msg)
                setModalActive(false)
                let value = { id: response.id, valor: values.valor, status: 1, data: response.data, saldoDisponivel: response.saldoDisponivel,saldoRetido:response.saldoRetido,taxa:response.taxa,valorLiquido:response.valorLiquido,hora:response.hora }
                let list = [...listagem]
                list.push(value)
                setListagem(list)
                validation.handleReset()
            }
            setLoading(false)
        }
    })

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
        validation.setFieldValue('valor', formatted)
    };

    return (
        <>
            {modalActive &&
                <Modal
                    modalActive={modalActive}
                    titleModal={buttonText}
                    handleClickModal={() => setModalActive(false)}
                >

                    <Form
                        className="custom-form "
                        encType='multipart/form-data'
                        onSubmit={(e) => {
                            e.preventDefault();
                            validation.handleSubmit();
                            return false;
                        }} >

                        <div className="flex justify-start relative my-5 " style={{ flexDirection: 'column' }}>
                            <h3 className="mb-5 my-5">Saldo {(saldoDisponivel ? parseFloat(saldoDisponivel) : 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h3>
                            <label style={{ color: '#ccc' }}>Valor mínino de R$ 50,00 e Taxa de R$ 4,99 por saque</label>
                            <input type="text" name="valor" id="valor" placeholder="Valor" value={formattedValue} onChange={handleValueChange}
                                className={`${inter.className} w-full border border-modal-close rounded-lg px-2 outline-none focus:border-black-400 text-sm h-10`}
                            />
                        </div>
                        <div className="flex justify-start relative my-5 " style={{ flexDirection: 'column' }}>
                            <h3 className="mb-5 my-5">Tipo de Valor</h3>
                            <select type="text" value={validation.values.tipoValor} onChange={validation.handleChange} name="tipoValor" id="tipoValor"
                                className={`${inter.className} w-full border border-modal-close rounded-lg px-2 outline-none focus:border-black-400 text-sm h-10`}>
                                <option value="" >Status</option>
                                <option value="1" >Saldo Disponivel</option>
                                <option value="2" >Valor Retido</option>
                               
                            </select>
                        </div>



                        <div className="flex items-center justify-start relative mb-1">
                            <input disabled={loading} style={{ backgroundColor: loading ? '#ccc' : '' }} width={'100%'} type="submit" value="Solicitar" className="w-full py-3 rounded-full hover:cursor-pointer  hover:brightness-90 duration-500 bg-primary-400 text-white-400" />
                        </div>
                    </Form>



                </Modal>
            }


        </>
    );
}
