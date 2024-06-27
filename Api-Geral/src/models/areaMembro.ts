import { DataTypes,Model } from "sequelize";
import { sequelize } from "../instances/postgres";

export interface AreaMembro extends Model{
    id: number,
    idProdutor:number,
    nome:string,
    descricao:string,
    imagem:string,
    link:string
}
export const AreaMembro = sequelize.define<AreaMembro>('areaMembro',{
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
    descricao:{
        type:DataTypes.STRING
    },
    imagem:{
        type:DataTypes.STRING
    },
    link:{
        type:DataTypes.STRING
    }
},{
    tableName:'areaMembro',
    timestamps:false
})