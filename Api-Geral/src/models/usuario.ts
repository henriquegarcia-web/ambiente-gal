import { DataTypes,Model } from "sequelize";
import { sequelize } from "../instances/postgres";

export interface Usuario extends Model{
    id: number,
    idConta:number,
    nome:string,
    email:string,
    password:string,
    permissao:number,
    foto:string,
    token:string,
    idAreaMembro:string
}
export const Usuario = sequelize.define<Usuario>('usuario',{
    id:{
        primaryKey:true,
        autoIncrement:true,
        type:DataTypes.NUMBER
    },
    idConta:{
        type:DataTypes.NUMBER
    },
    nome:{
        type:DataTypes.STRING
    },
    email:{
        type:DataTypes.STRING
    },
    password:{
        type:DataTypes.STRING
    },
    permissao:{
        type:DataTypes.NUMBER
    },
    foto:{
        type:DataTypes.STRING
    },
    token:{
        type:DataTypes.STRING
    },
    idAreaMembro:{
        type:DataTypes.STRING
    }
},{
    tableName:'usuario',
    timestamps:false
})