import { DataTypes,Model } from "sequelize";
import { sequelize } from "../instances/postgres";

export interface Pixel extends Model{
    id: number,
    idProdutor:number,
    nome:string,
    idPixel:string,
    api:string,
    descricao:string,
    tipo:number,
    plataforma:number
}
export const Pixel = sequelize.define<Pixel>('pixel',{
    id:{
        primaryKey:true,
        autoIncrement:true,
        type:DataTypes.NUMBER
    },
    idProdutor:{
        type:DataTypes.NUMBER
    },
    nome:{
        type:DataTypes.STRING
    },
    idPixel:{
        type:DataTypes.STRING
    },
    api:{
        type:DataTypes.STRING
    },
    descricao:{
        type:DataTypes.STRING
    },
    tipo:{
        type:DataTypes.STRING
    },
    plataforma:{
        type:DataTypes.STRING
    },
},{
    tableName:'pixel',
    timestamps:false
})