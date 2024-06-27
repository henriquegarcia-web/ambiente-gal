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


export const ModalBoleto = ({ modalBoleto, buttonText, url,codeBarras, setModalBoleto }) => {
    const [qrcode,setQrcode] = useState()
    const imgElementQrcodeRef = useRef(null);
    const [disabled,setDisabled] = useState(true)
    useEffect(()=>{
        setQrcode(codeBarras)
    },[codeBarras])
  
      const copiarCodigo = () => {
        setDisabled(false)
    
        const textarea = document.getElementById('codigoInput');
        if(textarea){
            textarea.select();
            document.execCommand('copy');
        }
       // setDisabled(true)
      };
    
    return (
        <>
            {modalBoleto &&
                <Modal
                    modalActive={modalBoleto}
                    titleModal={buttonText}
                    handleClickModal={() => setModalBoleto(false)}
                >
                    <div style={{display: 'flex', justifyContent:'center' ,marginBottom:10}} >
                    
                    <iframe  ref={imgElementQrcodeRef} style={{width:400,height:400}} src={url}></iframe>
                      
                    </div>
                    <div style={{display:'flex', justifyContent:'center'}} className='row' >
                        <input style={{outline:'none', border:'1px solid #4FB795', paddingTop:'8px', paddingBottom:'8px', paddingLeft:"8px", borderTopLeftRadius:'5px', borderBottomLeftRadius: "5px", width:"75%"}} type="text" value={codeBarras} id="codigoInput" />
                        <button style={{outline:'nome',backgroundColor:'#4FB795', color:'white',paddingLeft:'8px', paddingRight:'8px', fontWeight:'bold',border:'none', borderTopRightRadius: '5px', borderBottomRightRadius: '5px'}} id="copiarBtn" onClick={copiarCodigo}>Copiar</button>
                    </div>


                </Modal>
            }


        </>
    );
}
