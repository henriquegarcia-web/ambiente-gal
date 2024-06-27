import { Inter } from "next/font/google";
import React, { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import Modal from "@/components/Modal";
import { Api } from "@/api/apiAfiliado";
import { Form } from "reactstrap";
import Select from "react-select";
const inter = Inter({
    weight: ["300", "400", "500", "600", "700", "900"],
    subsets: ["latin"]
});


export const AfiliadoForm = ({  listagem, setListagem, modalActive, setModalActive, item, setItem }) => {

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
            idProduto: item?.idProduto ? item.idProduto : '',
            status: item.status=='Aprovado'?true:false,
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
                    Object.assign(list[index], { status: values.status == 'true' ? "Aprovado" : "Aguardando Aprovação" })
                    setListagem(list)
                    validation.handleReset()
                }
            }
            setLoading(false)
            document.documentElement.scrollTo({ top: 0, behavior: 'smooth' });
        }
    })

    return (
        <>
            {modalActive &&
                <Modal
                    modalActive={modalActive}
                    titleModal={"Status Afiliação"}
                    handleClickModal={() => setModalActive(false)}
                >

                    <Form className="custom-form " encType='multipart/form-data' onSubmit={(e) => { e.preventDefault();
                            validation.handleSubmit();
                            return false;
                        }} >
                        <div className="flex items-center justify-start relative my-5">
                            <select type="text" value={validation.values.status} onChange={validation.handleChange} name="status"  id="status"
                                className={`${inter.className} w-full border border-modal-close rounded-lg px-2 outline-none focus:border-black-400 text-sm h-10`}>
                                <option value="" >Status</option>
                                <option value={true} >Aprovado</option>
                                <option value={false} >Aguardando Aprovação</option>
                            </select>
                        </div>

                        <div className="flex items-center justify-start relative ">
                            <input width={'100%'} disabled={loading} style={{backgroundColor:loading?'#ccc':''}} type="submit" value="Salvar" className="w-full py-3 rounded-full hover:cursor-pointer mb-4 hover:brightness-90 duration-500 bg-primary-400 text-white-400" />
                        </div>
                    </Form>

                </Modal>
            }


        </>
    );
}
