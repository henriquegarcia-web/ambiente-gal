import { Router } from "express";
import * as Transacao from "../../controllers/transacaoController"
import { verificarPermissao } from "../../middlewares/authPermission";
const transacao = Router()

transacao.post('/',verificarPermissao(['Produtor']),Transacao.Cadastrar)
transacao.get('/',verificarPermissao(['Admin','Produtor']),Transacao.Listagem)
transacao.get('/:id',verificarPermissao(['Admin','Produtor']),Transacao.Listagem)
transacao.post('/status',verificarPermissao(['Admin','GErente']),Transacao.Status)


export default transacao