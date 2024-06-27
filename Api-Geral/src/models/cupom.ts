import { DataTypes,Model } from "sequelize";
import { sequelize } from "../instances/postgres";

export interface Cupom extends Model{
    id: number,
    idProdutor:number,
    nome:string,
    tipo:number,
    valor:number,
    descricao:string
}
export const Cupom = sequelize.define<Cupom>('cupom',{
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
    tipo:{
        type:DataTypes.NUMBER
    },
    valor:{
        type:DataTypes.NUMBER
    },
    descricao:{
        type:DataTypes.STRING
    }
},{
    tableName:'cupom',
    timestamps:false
})