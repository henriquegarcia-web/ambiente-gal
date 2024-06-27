import { DataTypes,Model } from "sequelize";
import { sequelize } from "../instances/postgres";

export interface Afiliacao extends Model{
    id: number,
    idProduto:string,
    idProdutor:string,
    status:boolean,
    createdAt:string
}
export const Afiliacao = sequelize.define<Afiliacao>('afiliacoes',{
    id:{
        primaryKey:true,
        autoIncrement:true,
        type:DataTypes.NUMBER
    },
    idProduto:{
        type:DataTypes.STRING
    },
    idProdutor:{
        type:DataTypes.STRING
    },
    status:{
        type:DataTypes.BOOLEAN
    },
    createdAt:{
        type:DataTypes.STRING
    }
},{
    tableName:'afiliacoes',
    timestamps:false
})