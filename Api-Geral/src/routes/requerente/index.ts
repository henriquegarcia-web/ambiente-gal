import { Router } from "express";
import * as Requerente from "../../controllers/requerenteController"
import { verificarPermissao } from "../../middlewares/authPermission";
const requerente = Router()

requerente.put('/',verificarPermissao(['Admin']),Requerente.Editar)
requerente.get('/',verificarPermissao(['Admin']),Requerente.Listagem)
requerente.get('/:id',verificarPermissao(['Admin']),Requerente.Listagem)

export default requerente