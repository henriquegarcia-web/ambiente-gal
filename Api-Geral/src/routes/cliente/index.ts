import { Router } from "express";
import * as Cliente from "../../controllers/clienteController"
import { verificarPermissao } from "../../middlewares/authPermission";
const cliente = Router()

cliente.post('/',verificarPermissao(['Produtor']),Cliente.Cadastrar)
cliente.put('/',verificarPermissao(['Produtor']),Cliente.Editar)
cliente.delete('/:id',verificarPermissao(['Produtor']),Cliente.Excluir)
cliente.get('/',verificarPermissao(['Produtor','Admin','Gerente','Funcionario']),Cliente.Listagem)
cliente.get('/:id',verificarPermissao(['Produtor','Admin','Gerente','Funcionario']),Cliente.Listagem)

export default cliente