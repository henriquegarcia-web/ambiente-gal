import { DataTypes,Model } from "sequelize";
import { sequelize } from "../instances/postgres";

export interface Webhook extends Model{
    id: number,
    idProdutor:number,
    nome:number,
    url:number,
    evento:number,
}
export const Webhook = sequelize.define<Webhook>('webhook',{
    id:{
        primaryKey:true,
        autoIncrement:true,
        type:DataTypes.NUMBER
    },
    idProdutor:{
        type:DataTypes.NUMBER
    },
    nome:{
        type:DataTypes.NUMBER
    },
    url:{
        type:DataTypes.STRING
    },
    evento:{
        type:DataTypes.NUMBER
    },
},{
    tableName:'webhook',
    timestamps:false
})