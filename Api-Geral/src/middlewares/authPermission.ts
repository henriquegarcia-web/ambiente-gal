import { Request, Response, NextFunction } from "express";

const notAuthorizedJson = { status: 401, message: 'Não autorizado' };

export const verificarPermissao = (nivelRequerido: any) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const user: any = req.user;
        let listPermission = AuthPermissao
        listPermission = listPermission.filter((item)=>nivelRequerido.includes(item.nome))
        let niveis = listPermission.map((item)=>item.nivel)
        if ( niveis.includes(user.permissao) ) {
            next();
        } else {
            next(notAuthorizedJson);
        }
    };
};
export const AuthPermissao = [
    { nome:'Admin',nivel:1 },
    { nome:'Cliente',nivel:2 },
    { nome:'Produtor',nivel:3 },
    { nome:'Gerente',nivel:4 },
    { nome:'Funcionario',nivel:5 }
] ;
export const AuthPermissaoModulos = [
    { nome:'Admin',nivel:1,modulos:[{nome:'Dashboard',id:1},{nome:'Produtor',id:2},{nome:'usuario',id:3},{nome:'Adquerente',id:4}] },
    { nome:'Cliente',nivel:2 ,modulos:[{nome:'Área de Membros -> Link',id:5},{nome:'Checkout -> Link',id:6}]},
    { nome:'Produtor',nivel:3,modulos:[{nome:'Dashboard',id:1},{nome:'Pixel',id:7},{nome:'Cupom',id:8},{nome:'Produtos',id:9},{nome:'Área de Membros',id:10},{nome:'Clientes',id:11},{nome:'Checkout',id:12},{nome:'Afiliados',id:13},{nome:'Marketplace',id:14},{nome:'Financeiro',id:15},{nome:'Relatorio',id:16},{nome:'Integracões',id:17}] },
    { nome:'Gerente',nivel:4 ,modulos:[{nome:'Dashboard',id:1},{nome:'Produtor',id:2},{nome:'usuario',id:3},{nome:'Adquerente',id:4}]},
    { nome:'Funcionario',nivel:5 ,modulos:[{nome:'Dashboard',id:1},{nome:'Produtor',id:2},{nome:'usuario',id:3},{nome:'Adquerente',id:4}]}
] ;
const modulos =[{nome:'Dashboard',id:1},{nome:'Produtor',id:2},{nome:'usuario',id:3},{nome:'Adquerente',id:4},{nome:'Área de Membros -> Link',id:5},{nome:'Checkout -> Link',id:6},{nome:'Pixel',id:7},{nome:'Cupom',id:8},{nome:'Produtos',id:9},{nome:'Área de Membros',id:10},{nome:'Clientes',id:11},{nome:'Checkout',id:12},{nome:'Afiliados',id:13},{nome:'Marketplace',id:14},{nome:'Financeiro',id:15},{nome:'Relatorio',id:16},{nome:'Integracões',id:17}]