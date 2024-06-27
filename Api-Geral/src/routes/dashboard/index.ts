import { Router } from "express";
import * as Dashboard from "../../controllers/dashboardController"
import { verificarPermissao } from "../../middlewares/authPermission";
const dashboard = Router()

dashboard.post('/',verificarPermissao(['Admin','Produtor']),Dashboard.Index)


export default dashboard