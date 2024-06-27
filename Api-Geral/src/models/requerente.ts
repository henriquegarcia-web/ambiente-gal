import { DataTypes,Model } from "sequelize";
import { sequelize } from "../instances/postgres";

export interface Requerente extends Model{
    id: number,
    nome:string,
    status:boolean,
    boletoFixa:number,
    pixVariavel:number
}
export const Requerente = sequelize.define<Requerente>('requerente',{
    id:{
        primaryKey:true,
        autoIncrement:true,
        type:DataTypes.NUMBER
    },
    nome:{
        type:DataTypes.STRING
    },
    status:{
        type:DataTypes.BOOLEAN
    },
    boletoFixa:{
        type:DataTypes.STRING
    },
    pixVariavel:{
        type:DataTypes.STRING
    }
},{
    tableName:'requerente',
    timestamps:false
})