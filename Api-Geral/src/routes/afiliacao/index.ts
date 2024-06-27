import { Router } from "express";
import * as Afiliacao from "../../controllers/afiliacaoController"
import { verificarPermissao } from "../../middlewares/authPermission";

const afiliacao = Router()
afiliacao.post('/',verificarPermissao(['Produtor']),Afiliacao.Cadastrar)
afiliacao.put('/',verificarPermissao(['Produtor']),Afiliacao.Editar)
afiliacao.delete('/:id',verificarPermissao(['Produtor']),Afiliacao.Excluir)
afiliacao.get('/',verificarPermissao(['Produtor','Admin','Gerente','Funcionario']),Afiliacao.Listagem)
afiliacao.get('/produtos',verificarPermissao(['Produtor','Admin','Gerente','Funcionario']),Afiliacao.Produtos)
afiliacao.get('/:id',verificarPermissao(['Produtor','Admin','Gerente','Funcionario']),Afiliacao.Listagem)

export default afiliacao