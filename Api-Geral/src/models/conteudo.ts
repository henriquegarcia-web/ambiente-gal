import { DataTypes,Model } from "sequelize";
import { sequelize } from "../instances/postgres";

export interface Conteudo extends Model{
    id: number,
    idProdutor:number,
    idModulo:number,
    nome:string,
    descricao:string,
    imagem:string,
    video:string,
    descricao1:string,
    descricao2:string,
    materiais1:string,
    materiais2:string
}
export const Conteudo = sequelize.define<Conteudo>('conteudo',{
    id:{
        primaryKey:true,
        autoIncrement:true,
        type:DataTypes.NUMBER
    },
    idProdutor:{
        type:DataTypes.NUMBER
    },
    idModulo:{
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
    video:{
        type:DataTypes.STRING
    },
    descricao1:{
        type:DataTypes.STRING
    },
    descricao2:{
        type:DataTypes.STRING
    },
    materiais1:{
        type:DataTypes.STRING
    },
    materiais2:{
        type:DataTypes.STRING
    },
},{
    tableName:'conteudo',
    timestamps:false
})