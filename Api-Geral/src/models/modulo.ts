import { DataTypes,Model } from "sequelize";
import { sequelize } from "../instances/postgres";

export interface Modulo extends Model{
    id: number,
    idProdutor:number,
    idCurso:number,
    nome:string,
    descricao:string,
    imagem:string,
}
export const Modulo = sequelize.define<Modulo>('modulo',{
    id:{
        primaryKey:true,
        autoIncrement:true,
        type:DataTypes.NUMBER
    },
    idProdutor:{
        type:DataTypes.NUMBER
    },
    idCurso:{
        type:DataTypes.NUMBER
    },
    nome:{
        type:DataTypes.STRING
    },
    descricao:{
        type:DataTypes.STRING
    },
    imagem:{
        type:DataTypes.STRING
    }
},{
    tableName:'modulo',
    timestamps:false
})