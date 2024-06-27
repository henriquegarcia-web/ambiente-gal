import React, { useEffect, useRef, useState } from 'react';
import { AiOutlineFile, AiOutlineEye } from 'react-icons/ai'; // Importe os ícones desejados

const FileInputComponent = ({ handleChange, name }) => {
    const fileInputRef = useRef(null);
    const [arquivo, setArquivo] = useState('Selecione')
    useEffect(()=>{
        setArquivo("Selecione")
    },[name])
    const handleClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };
    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile?.name) {
            setArquivo("Selecionado")
            handleChange(event)
        } else {
            setArquivo("Selecione")
            handleChange({})
        }
    };
    const handleViewFile = () => {
        window.open(`${process.env.NEXT_PUBLIC_API_URL}/arquivo/` + name, '_blank');
    };
    const handleBlur = (event) => {
        handleFileChange(event)
      };
    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', padding: '10px', backgroundColor: 'transparent', color: 'black', borderRadius: (name && arquivo!='Selecionado') ? '5px 0px 0px 5px' : '5px', width: '100%', cursor: 'pointer', border: '1px solid #E5E5E5' }}
                onClick={handleClick} >
                <div style={{ borderRight: '1px solid #333', paddingRight: '8px' }} >
                    <AiOutlineFile size={20} />
                </div>
                <span style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', paddingLeft: 10 }} >{(name && arquivo!='Selecionado') ? "Arquivo" : arquivo ? arquivo : "Selecione"} </span>

                <input type="file" onBlur={handleBlur} ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileChange} />
            </div>

            {(name && arquivo!='Selecionado') &&
                <div style={{ display: 'inline-flex', alignItems: 'center', padding: '10px', backgroundColor: 'transparent', color: 'black', borderRadius: '0px 5px 5px 0px ', cursor: 'pointer', border: '1px solid #E5E5E5' }} onClick={handleViewFile} >
                    <div style={{ paddingRight: '8px', padding: 2 }} >
                        <AiOutlineEye size={20} /> 
                    </div>
                </div>
            }



        </div>
    );
};

export default FileInputComponent;
