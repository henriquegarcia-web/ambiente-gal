import { Router } from "express";
import * as AreaMembro from "../../controllers/areaMembroController"
import multer from "multer";
import { verificarPermissao } from "../../middlewares/authPermission";
import { privateRoute } from "../../config/passport";
const areaMembro = Router()
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
areaMembro.post('/',privateRoute,verificarPermissao(['Produtor']),update.single('imagem'),AreaMembro.Cadastrar)
areaMembro.put('/',privateRoute,verificarPermissao(['Produtor']),update.single('imagem'),AreaMembro.Editar)
areaMembro.delete('/:id',privateRoute,verificarPermissao(['Produtor']),AreaMembro.Excluir)
areaMembro.get('/link/:link',AreaMembro.Listagem)
areaMembro.get('/',privateRoute,verificarPermissao(['Produtor','Admin','Gerente','Funcionario']),AreaMembro.Listagem)
areaMembro.get('/:id',privateRoute,verificarPermissao(['Produtor','Admin','Gerente','Funcionario']),AreaMembro.Listagem)

export default areaMembro