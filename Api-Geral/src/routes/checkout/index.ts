import { Router } from "express";
import * as Checkout from "../../controllers/checkoutController"
import multer from "multer";
import { privateRoute } from "../../config/passport";
import { verificarPermissao } from "../../middlewares/authPermission";
const checkout = Router()
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
checkout.post('/',privateRoute,verificarPermissao(['Produtor']),update.single('imagem'),Checkout.Cadastrar)
checkout.put('/',privateRoute,verificarPermissao(['Produtor']),update.single('imagem'),Checkout.Editar)
checkout.delete('/:id',privateRoute,verificarPermissao(['Produtor']),Checkout.Excluir)
checkout.get('/',privateRoute,verificarPermissao(['Produtor','Admin','Gerente','Funcionario']),Checkout.Listagem)
checkout.get('/link/:link',Checkout.Listagem)
checkout.get('/:id',privateRoute,verificarPermissao(['Produtor','Admin','Gerente','Funcionario']),Checkout.Listagem)

export default checkout