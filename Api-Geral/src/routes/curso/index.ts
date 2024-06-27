import { Router } from "express";
import * as Curso from "../../controllers/cursoController"
import multer from "multer";
import { verificarPermissao } from "../../middlewares/authPermission";
const curso = Router()
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
curso.post('/',verificarPermissao(['Produtor']),update.single('imagem'),Curso.Cadastrar)
curso.put('/',verificarPermissao(['Produtor']),update.single('imagem'),Curso.Editar)
curso.delete('/:id',verificarPermissao(['Produtor']),Curso.Excluir)
curso.get('/',verificarPermissao(['Produtor','Admin','Gerente','Funcionario']),Curso.Listagem)
curso.get('/:id',verificarPermissao(['Produtor','Admin','Gerente','Funcionario']),Curso.Listagem)

export default curso