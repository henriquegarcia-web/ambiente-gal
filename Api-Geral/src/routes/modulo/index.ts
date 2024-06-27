import { Router } from "express";
import * as Modulo from "../../controllers/moduloController"
import multer from "multer";
import { verificarPermissao } from "../../middlewares/authPermission";
const modulo = Router()
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
modulo.post('/',verificarPermissao(['Produtor']),update.single('imagem'),Modulo.Cadastrar)
modulo.put('/',verificarPermissao(['Produtor']),update.single('imagem'),Modulo.Editar)
modulo.delete('/:id',verificarPermissao(['Produtor']),Modulo.Excluir)
modulo.get('/',verificarPermissao(['Produtor','Admin','Gerente','Funcionario']),Modulo.Listagem)
modulo.get('/:id',verificarPermissao(['Produtor','Admin','Gerente','Funcionario']),Modulo.Listagem)

export default modulo