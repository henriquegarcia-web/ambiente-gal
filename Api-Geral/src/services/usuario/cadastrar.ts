import { CadastrarCliente, CadastrarColaborador, CadastrarProdutor } from "../../integration/email"
import { Usuario } from "../../models/usuario"
import { GeneretePassword } from "./generetePassword"

export const CadastrarUsuario = async (idConta:number,nome:string,email:string,cpf:string,permissao:number) =>{
    if(email && cpf){
        let password = await GeneretePassword(cpf)
        let cadastro = await Usuario.create({idConta,nome,email,password,permissao})
        if(cadastro?.id){
            if(permissao==1){
                await CadastrarColaborador(email,cpf,'Admin')
            }else if(permissao==2){
                await CadastrarCliente(email,cpf)
            }else if(permissao==3){
                await CadastrarProdutor(email)
            }else if(permissao==4){
                await CadastrarColaborador(email,cpf,'Gerente')
            }else if(permissao==5){
                await CadastrarColaborador(email,cpf,'Funcionário')
            }
        }
        return cadastro
    }else{
        return {id:null}
    }
   
}