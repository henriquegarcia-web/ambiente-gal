import { Router } from "express";
import * as Webhook from "../../controllers/webhookController"
import { privateRoute } from "../../config/passport";
import { verificarPermissao } from "../../middlewares/authPermission";
const webhook = Router()

webhook.post('/',privateRoute,verificarPermissao(['Produtor']),Webhook.Cadastrar)
webhook.put('/',privateRoute,verificarPermissao(['Produtor']),Webhook.Editar)
webhook.delete('/:id',privateRoute,verificarPermissao(['Produtor']),Webhook.Excluir)
webhook.get('/',privateRoute,verificarPermissao(['Produtor','Admin','Gerente','Funcionario']),Webhook.Listagem)
webhook.get('/:id',privateRoute,verificarPermissao(['Produtor','Admin','Gerente','Funcionario']),Webhook.Listagem)

export default webhook