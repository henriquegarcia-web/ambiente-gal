import { DataTypes,Model } from "sequelize";
import { sequelize } from "../instances/postgres";

export interface Cliente extends Model{
    id: number,
    idProdutor:number,
    idVenda:number,
    nome:string,
    email:string,
    cpfCnpj:string,
    cep:string,
    rua:string,
    numero:string,
    bairro:string,
    cidade:string,
    estado:string
}
export const Cliente = sequelize.define<Cliente>('cliente',{
    id:{
        primaryKey:true,
        autoIncrement:true,
        type:DataTypes.NUMBER
    },
    idProdutor:{
        type:DataTypes.NUMBER
    },
    idVenda:{
        type:DataTypes.NUMBER
    },
    nome:{
        type:DataTypes.STRING
    },
    email:{
        type:DataTypes.STRING
    },
    cpfCnpj:{
        type:DataTypes.STRING
    },
    cep:{
        type:DataTypes.STRING
    },
    rua:{
        type:DataTypes.STRING
    },
    numero:{
        type:DataTypes.STRING
    },
    bairro:{
        type:DataTypes.STRING
    },
    cidade:{
        type:DataTypes.STRING
    },
    estado:{
        type:DataTypes.STRING
    }
},{
    tableName:'cliente',
    timestamps:false
})