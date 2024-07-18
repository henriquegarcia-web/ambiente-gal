import { Request,Response,NextFunction } from "express"
import passport from "passport"
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import {ExtractJwt, Strategy as JWTStrategy} from 'passport-jwt'
import { Usuario } from "../models/usuario"

dotenv.config()
const notAuthorizedJson = {status:401,message:'Não autorizadoaa'}
const options = {
    jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey:process.env.JWT_SECRET as string
}

passport.use(new JWTStrategy(options,async (payload,done)=>{
    const user = await Usuario.findByPk(payload.id)
    if(user?.id){
        return done(null,user)
    }else{
        return done(notAuthorizedJson,false)
    }
}))
export const genereteToken = (data:object)=>{
    return jwt.sign(data,process.env.JWT_SECRET as string)
}
export const privateRoute = (req:Request,res:Response,next:NextFunction)=>{
    const authFunction = passport.authenticate('jwt',(err:any,user:any)=>{
        req.user = {id:user.id,idConta:user.idConta,nome:user.nome,email:user.email,permissao:user.permissao}
        if(user){
            next()
        }else{
            next(notAuthorizedJson)
        }
    })
    authFunction(req,res,next)
}
export default passport