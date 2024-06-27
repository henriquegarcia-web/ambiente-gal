import { Router } from "express";
import * as Venda from "../../controllers/vendaController"
import { privateRoute } from "../../config/passport";
import { verificarPermissao } from "../../middlewares/authPermission";
const venda = Router()

venda.post('/',Venda.Cadastrar)
venda.get('/',privateRoute,verificarPermissao(['Produtor','Admin','Gerente','Funcionario']),Venda.Listagem)
venda.get('/:id',privateRoute,verificarPermissao(['Produtor','Admin','Gerente','Funcionario']),Venda.Listagem)

export default venda