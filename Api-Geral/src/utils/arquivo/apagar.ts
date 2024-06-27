import {unlink} from 'fs/promises'
import fs  from 'fs'

export const ApagarArquivo = async(dados:any)=>{
    fs.access(dados, fs.constants.F_OK,async (err) => {
        if(!err){
            await unlink(dados)
        }
      });
}
