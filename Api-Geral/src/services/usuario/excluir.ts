import { Usuario } from "../../models/usuario"
import { ApagarArquivo } from "../../utils/arquivo/apagar"

export const ExcluirUsuario = async (idConta:number,permissao:number) =>{
    const permissoesPermitidas:any = {1: true,4: true,5: true};
    let resposta = {msg:'',error:false}
    let buscar = await Usuario.findOne({where:{...(permissoesPermitidas[permissao] ?{id:idConta}:{idConta}),permissao}})
    if(buscar?.id){
        await buscar.destroy()
        if(buscar?.foto){
            await ApagarArquivo(`public/arquivo/${buscar.foto}`)
        }
        Object.assign(resposta,{msg:'Item excluido com sucesso!',error:false})
    }else{
        Object.assign(resposta,{msg:'Erro encontrado, tente novamente mais tarde!',error:true})
    }
    return resposta
}