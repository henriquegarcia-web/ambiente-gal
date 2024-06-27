import { Inter } from "next/font/google";
import Image from "next/image";
import React from "react";

const inter = Inter({
    weight: ["300", "400", "500", "600", "700", "900"],
    subsets: ["latin"]
});

export default function BoxMarketplace(props) {
    return (
        <div className="w-full max-w-xs mb-4 sm:mb-0 p-4 border border-modal-close rounded-2xl bg-black-100 dark:bg-sidebar-dark-menu dark:border-black-300">
            <Image
                src={props.image}
                width={330}
                height={330}
                alt={props.imageAlt}
                style={{ objectFit: "cover", borderRadius: "16px" }}
            />
            <h2
                className={`${inter.className} my-4 text-2xl text-black-400 dark:text-white-400`}
            >
                {props.title}
            </h2>
            <p style={{fontSize:14}}
                className={`${inter.className} font-light text-gray-400 text-xl mb-4 dark:text-white-400`}
            >
                {props.description}
            </p>

            {props.marketplace && (
                <div className="flex items-start justify-start flex-col">
                    <p
                        className={`${inter.className} font-light text-gray-400 dark:text-white-400`}
                    >
                        {props.valueDescription}{" "}
                    </p>
                    <p
                        className={`${inter.className} font-light text-primary-400 text-2xl`}
                    >
                        {props.value}
                    </p>
                </div>
            )}
            <div  style={{justifyContent:'center',display:'flex',alignItems:'center',cursor:"pointer"}} >
                <button className="w-full py-1 rounded-full hover:cursor-pointer hover:brightness-90 duration-500 bg-primary-400 text-white-400" onClick={props.handleClick} disabled={props.status=='Afiliado'?true:false} style={{backgroundColor:props.status=='Afiliado'?'#ccc':''}} >{props.status}</button>
            </div>

            <div  style={{justifyContent:'center',display:'flex',alignItems:'center',cursor:"pointer"}} >
                <button className="w-full py-1 rounded-full hover:cursor-pointer hover:brightness-90 duration-500 text-white-400 " onClick={props.handleView}  style={{color:'#fff',borderColor:'#AAAAAA',backgroundColor:props.status=='Afiliado'?'#ccc':''}} >Detalhes</button>
            </div>
          
  
                <p
                    onClick={props.handleModal}
                    style={{cursor:"pointer"}}
                    className={`${inter.className} ${
                        true
                            ? "text-primary-400"
                            : "text-gray-400 dark:text-white-400"
                    } font-medium text-lg `}
                >
                    Cadastrar
                </p>
        
        </div>
    );
}
