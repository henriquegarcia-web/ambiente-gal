import { Router } from "express";
import * as Pixel from "../../controllers/pixelController"
import { verificarPermissao } from "../../middlewares/authPermission";
const pixel = Router()

pixel.post('/',verificarPermissao(['Produtor']),Pixel.Cadastrar)
pixel.put('/',verificarPermissao(['Produtor']),Pixel.Editar)
pixel.delete('/:id',verificarPermissao(['Produtor']),Pixel.Excluir)
pixel.get('/',verificarPermissao(['Produtor','Admin','Gerente','Funcionario']),Pixel.Listagem)
pixel.get('/:id',verificarPermissao(['Produtor','Admin','Gerente','Funcionario']),Pixel.Listagem)

export default pixel