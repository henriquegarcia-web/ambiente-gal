import { DataTypes,Model } from "sequelize";
import { sequelize } from "../instances/postgres";

export interface Curso extends Model{
    id: number,
    idProdutor:number,
    idAreaMembro:number,
    nome:string,
    descricao:string,
    imagem:string,
}
export const Curso = sequelize.define<Curso>('curso',{
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
    imagem:{
        type:DataTypes.STRING
    }
},{
    tableName:'curso',
    timestamps:false
})