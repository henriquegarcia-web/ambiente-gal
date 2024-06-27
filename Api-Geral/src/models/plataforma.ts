import { DataTypes,Model } from "sequelize";
import { sequelize } from "../instances/postgres";

export interface Plataforma extends Model{
    id: number,
    valor:number,
}
export const Plataforma = sequelize.define<Plataforma>('plataforma',{
    id:{
        primaryKey:true,
        autoIncrement:true,
        type:DataTypes.NUMBER
    },
    valor:{
        type:DataTypes.NUMBER
    }
},{
    tableName:'plataforma',
    timestamps:false
})