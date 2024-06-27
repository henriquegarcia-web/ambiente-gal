import { Router } from "express";
import * as Conteudo from "../../controllers/conteudoController"
import multer from "multer";
import { verificarPermissao } from "../../middlewares/authPermission";
const conteudo = Router()
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
        const allowedVideoMimes = ['video/mp4', 'video/webm', 'video/ogg'];
        if ( file.fieldname == 'video'  ) {
            if (allowedVideoMimes.includes(file.mimetype) ) {
                cb(null, true)

            } else {
                cb(null, false)
            }
        }

        if ( file.fieldname == 'materiais1' ||  file.fieldname == 'materiais2' ) {
            if (file.mimetype=='application/pdf' ) {
                cb(null, true)

            } else {
                cb(null, false)
            }
        }
    },
    limits: { fieldSize: 20000000000 }
})
conteudo.post('/',verificarPermissao(['Produtor']),update.fields([{name:'imagem',maxCount:1},{name:'video',maxCount:1},{name:'materiais1',maxCount:1},{name:'materiais2',maxCount:1}]),Conteudo.Cadastrar)
conteudo.put('/',verificarPermissao(['Produtor']),update.fields([{name:'imagem',maxCount:1},{name:'video',maxCount:1},{name:'materiais1',maxCount:1},{name:'materiais2',maxCount:1}]),Conteudo.Editar)
conteudo.delete('/:id',verificarPermissao(['Produtor']),Conteudo.Excluir)
conteudo.get('/',verificarPermissao(['Produtor','Admin','Gerente','Funcionario']),Conteudo.Listagem)
conteudo.get('/:id',verificarPermissao(['Produtor','Admin','Gerente','Funcionario']),Conteudo.Listagem)

export default conteudo