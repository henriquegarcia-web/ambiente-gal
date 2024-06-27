import { DataTypes,Model } from "sequelize";
import { sequelize } from "../instances/postgres";

export interface Produto extends Model{
    id: number,
    idProdutor:number,
    idAreaMembro:number,
    nome:string,
    descricao:string,
    preco:string,
    tipo:string,
    imagem:string,
    afiliacao:boolean,
    porcentagemAfialiacao:string,
}
export const Produto = sequelize.define<Produto>('produto',{
    id:{
        primaryKey:true,
        autoIncrement:true,
        type:DataTypes.NUMBER
    },
    idProdutor:{
        type:DataTypes.NUMBER
    },
    idAreaMembro:{
        type:DataTypes.NUMBER
    },
    nome:{
        type:DataTypes.STRING
    },
    descricao:{
        type:DataTypes.STRING
    },
    preco:{
        type:DataTypes.STRING
    },
    tipo:{
        type:DataTypes.STRING
    },
    imagem:{
        type:DataTypes.STRING
    },
    afiliacao:{
        type:DataTypes.BOOLEAN
    },
    porcentagemAfialiacao:{
        type:DataTypes.STRING
    }
},{
    tableName:'produto',
    timestamps:false
})