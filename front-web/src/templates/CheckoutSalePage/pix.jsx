import { Inter } from "next/font/google";
import React, { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import Modal from "@/components/Modal";
import { Api } from "@/api/apiCheckout";
import { Form } from "reactstrap";
import Select from "react-select";
import QRCode from 'qrcode';
const inter = Inter({
    weight: ["300", "400", "500", "600", "700", "900"],
    subsets: ["latin"]
});


export const ModalPix = ({ modalPix, buttonText, codeQr, setModalPix }) => {
    const [qrcode, setQrcode] = useState()
    const imgElementQrcodeRef = useRef(null);
    const [disabled, setDisabled] = useState(true)
    useEffect(() => {
        if (codeQr) {
            setQrcode(codeQr)

            gerarCodigo(codeQr)
        }


    }, [codeQr])
    const gerarCodigo = async (codeQr) => {
        try {
            const dataUrl = await QRCode.toDataURL(codeQr);
            imgElementQrcodeRef.current.src = dataUrl;

            const imgElement = document.getElementById('qrcode');
            if (imgElement) {
                imgElement.src = url;
            }
        } catch (error) {
            console.error('Erro ao gerar o código QR:', error);
        }
    };

    const copiarCodigo = () => {
        setDisabled(false)

        const textarea = document.getElementById('codigoInput');
        if (textarea) {
            textarea.select();
            document.execCommand('copy');
        }
        // setDisabled(true)
    };

    return (
        <>
            {modalPix &&
                <Modal
                    modalActive={modalPix}
                    titleModal={buttonText}
                    handleClickModal={() => setModalPix(false)}
                >
                    <div style={{fontSize:10,marginBottom:15}} >
                        <p className="mb-5 my-5" style={{ color: '#000' }}>Você também pode tentar lendo o nosso QRCode?.</p>
                        <p className="">1. Abra o aplicativo do seu banco no celular</p>
                        <p className="">2. Selecione a opção de pagar com Pix / escanear QR code.</p>
                        <p className="">3. Após o pagamento, você receberá por email os dados de acesso á sua compra (verifique a caisa de SPAM)</p>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'center' }} >
                        <img ref={imgElementQrcodeRef} style={{ width: 196, height: 196 }} />

                    </div>
                    <div style={{fontSize:10,marginTop:15,marginBottom:15}} >
                  
                        <p className="">1. Copie o código abaixo</p>
                        <p className="">2. Cole no seu banco na função</p>
                        <p className="" style={{fontSize:12}} >PIX Copie e Cola</p>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center' }} className='row' >

                        <input style={{ outline: 'none', border: '1px solid #4FB795', paddingTop: '8px', paddingBottom: '8px', paddingLeft: "8px", borderTopLeftRadius: '5px', borderBottomLeftRadius: "5px", width: "75%" }} type="text" value={qrcode} id="codigoInput" disabled={disabled} />

                        <button style={{ outline: 'nome', backgroundColor: '#4FB795', color: 'white', paddingLeft: '8px', paddingRight: '8px', fontWeight: 'bold', border: 'none', borderTopRightRadius: '5px', borderBottomRightRadius: '5px' }} id="copiarBtn" onClick={copiarCodigo}>Copiar</button>

                    </div>


                </Modal>
            }


        </>
    );
}
