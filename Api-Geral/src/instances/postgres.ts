import { Sequelize } from "sequelize";
import dotenv from 'dotenv'
dotenv.config()
export  const sequelize  = new Sequelize(
    process.env.DB_POSTGRES as string,
    process.env.USER_POSTGRES as string,
    process.env.PASSWORD_POSTGRES as string
,{
    dialect:'postgres',
    port:parseInt(process.env.PORT_POSTGRES as string),
    host:process.env.HOST_POSTGRES as string
})