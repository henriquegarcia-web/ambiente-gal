import { DataTypes,Model } from "sequelize";
import { sequelize } from "../instances/postgres";

export interface ConteudoMateriais extends Model{
    id: number,
    idConteudo:number,
    descricao:number,
    arquivo:string,
}
export const ConteudoMateriais = sequelize.define<ConteudoMateriais>('conteudoMaterial',{
    id:{
        primaryKey:true,
        autoIncrement:true,
        type:DataTypes.NUMBER
    },
    idConteudo:{
        type:DataTypes.NUMBER
    },
    descricao:{
        type:DataTypes.STRING
    },
    arquivo:{
        type:DataTypes.STRING
    }
},{
    tableName:'conteudoMaterial',
    timestamps:false
})