import { Router } from "express";
import { privateRoute } from "../config/passport";
import usuario from "./usuario";
import cliente from "./cliente";
import produto from "./produto";
import areaMembro from "./areaMembro";
import curso from "./curso";
import modulo from "./modulo";
import conteudo from "./conteudo";
import cupom from "./cupom";
import pixel from "./pixel";
import checkout from "./checkout";
import produtor from "./produtor";
import afiliacao from "./afiliacao";
import venda from "./venda";
import requerente from "./requerente";
import transacao from "./transacao";
import * as VendaController from "../controllers/vendaController";
import dashboard from "./dashboard";
import webhook from "./webhook";

const router = Router()

router.use('/usuario',usuario)
router.use('/cliente',privateRoute,cliente)
router.use('/produto',privateRoute,produto)
router.use('/areaMembro',areaMembro)
router.use('/curso',privateRoute,curso)
router.use('/modulo',privateRoute,modulo)
router.use('/conteudo',privateRoute,conteudo)
router.use('/cupom',privateRoute,cupom)
router.use('/pixel',privateRoute,pixel)
router.use('/checkout',checkout)
router.use('/produtor',produtor)
router.use('/afiliacao',privateRoute,afiliacao)
router.use('/requerente',privateRoute,requerente)
router.use('/transacao',privateRoute,transacao)
router.use('/dashboard',privateRoute,dashboard)
router.use('/webhook',privateRoute,webhook)
router.use('/venda',venda)

// Migrar para api de Integração
router.post('/saqja/venda',VendaController.Retorno)

router.post('/teste/retornoWebook',(req,res)=>{
    console.log('retornoWebook-> ',req.body)
})

export default router