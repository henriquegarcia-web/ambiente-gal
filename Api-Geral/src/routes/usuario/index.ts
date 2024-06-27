import { Router } from "express";
import * as Usuario from "../../controllers/usuarioController"
import { privateRoute } from "../../config/passport";
import multer from "multer";
import { verificarPermissao } from "../../middlewares/authPermission";
const usuario = Router()
const update = multer({
    dest: 'tmp',
    fileFilter: (req, file, cb) => {
      
        const allowedMimes2 = ['image/jpeg','image/jpg','image/png'];
        if ( file.fieldname == 'versoIdentidade' ||  file.fieldname == 'frenteIdentidade' ||  file.fieldname == 'cartaoCNPJ' || file.fieldname=='selfieDocumento'  ) {
            if (allowedMimes2.includes(file.mimetype) || file.mimetype=='application/pdf' ) {
                cb(null, true)

            } else {
                cb(null, false)
            }
        }

        const allowedMimes = ['image/jpeg','image/jpg','image/png'];
        if (file.fieldname == 'foto'   ) {
            if (allowedMimes.includes(file.mimetype) ) {
                cb(null, true)

            } else {
                cb(null, false)
            }
        }
    },
    
    limits: { fieldSize: 200000000 }
})

usuario.post('/login',Usuario.Login)
usuario.post('/',privateRoute,verificarPermissao(['Admin','Gerente']),Usuario.Cadastrar)
usuario.put('/',privateRoute,update.single('foto'),Usuario.Editar)
usuario.put('/atualizar',privateRoute,update.fields([{name:'versoIdentidade',maxCount:1},{name:'frenteIdentidade',maxCount:1},{name:'cartaoCNPJ',maxCount:1},{name:'selfieDocumento',maxCount:1},{name:'foto',maxCount:1}]),Usuario.Atualizar)
usuario.put('/detalhes',privateRoute,Usuario.EditarDetalhes)
usuario.get('/',privateRoute,verificarPermissao(['Admin','Gerente']),Usuario.Listagem)
usuario.post('/gerarToken',Usuario.GerarToken)
usuario.post('/validarToken',Usuario.validarToken)
usuario.post('/alterarsenha',Usuario.AlterarSenha)
usuario.get('/:id',privateRoute,verificarPermissao(['Admin','Gerente']),Usuario.Listagem)
usuario.delete('/:id/:permissao',privateRoute,verificarPermissao(['Admin','Gerente']),Usuario.Excluir)
export default usuario