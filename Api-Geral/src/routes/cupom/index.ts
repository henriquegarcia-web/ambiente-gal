import { Router } from "express";
import * as Cupom from "../../controllers/cupomController"
import { verificarPermissao } from "../../middlewares/authPermission";
const cupom = Router()

cupom.post('/',verificarPermissao(['Produtor']),Cupom.Cadastrar)
cupom.put('/',verificarPermissao(['Produtor']),Cupom.Editar)
cupom.delete('/:id',verificarPermissao(['Produtor']),Cupom.Excluir)
cupom.get('/',verificarPermissao(['Produtor','Admin','Gerente','Funcionario']),Cupom.Listagem)
cupom.get('/:id',verificarPermissao(['Produtor','Admin','Gerente','Funcionario']),Cupom.Listagem)

export default cupom