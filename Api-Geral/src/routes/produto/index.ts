import { Router } from "express";
import * as Produto from "../../controllers/produtoController"
import multer from "multer";
import { verificarPermissao } from "../../middlewares/authPermission";
const produto = Router()
const update = multer({
    dest: 'tmp',
    fileFilter: (req, file, cb) => {
        const allowedMimes = ['image/jpeg','image/jpg','image/png'];
        if ( file.fieldname == 'imagem'  ) {
            if (allowedMimes.includes(file.mimetype) ) {
                cb(null, true)

            } else {
                cb(null, false)
            }
        }
    },
    limits: { fieldSize: 200000000 }
})
produto.post('/',verificarPermissao(['Produtor']),update.single('imagem'),Produto.Cadastrar)
produto.put('/',verificarPermissao(['Produtor']),update.single('imagem'),Produto.Editar)
produto.delete('/:id',verificarPermissao(['Produtor']),Produto.Excluir)
produto.get('/',verificarPermissao(['Produtor','Admin','Gerente','Funcionario']),Produto.Listagem)
produto.get('/:id',verificarPermissao(['Produtor','Admin','Gerente','Funcionario']),Produto.Listagem)

export default produto