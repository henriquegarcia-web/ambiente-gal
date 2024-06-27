import { Router } from "express";
import * as Produtor from "../../controllers/produtorController"
import { verificarPermissao } from "../../middlewares/authPermission";
import { privateRoute } from "../../config/passport";
const produtor = Router()

produtor.post('/',Produtor.Cadastrar)
produtor.put('/',privateRoute,Produtor.Editar)
produtor.put('/taxas',privateRoute,verificarPermissao(['Admin','Gerente']),Produtor.Taxas)
produtor.delete('/:id',privateRoute,verificarPermissao(['Admin']),Produtor.Excluir)
produtor.get('/',privateRoute,verificarPermissao(['Admin','Gerente','Funcionario']),Produtor.Listagem)
produtor.get('/:id',privateRoute,verificarPermissao(['Admin','Gerente','Funcionario','Produtor']),Produtor.Listagem)

export default produtor