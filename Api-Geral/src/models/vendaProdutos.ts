import { DataTypes,Model } from "sequelize";
import { sequelize } from "../instances/postgres";

export interface VendaProdutos extends Model{
    id: number,
    idProdutor:number,
    idProduto:number,
    idVenda:number,
    valor:string,
}
export const VendaProdutos = sequelize.define<VendaProdutos>('vendaProdutos',{
    id:{
        primaryKey:true,
        autoIncrement:true,
        type:DataTypes.NUMBER
    },
    idProdutor:{
        type:DataTypes.NUMBER
    },
    idProduto:{
        type:DataTypes.NUMBER
    },
    idVenda:{
        type:DataTypes.NUMBER
    },
    valor:{
        type:DataTypes.STRING
    }
},{
    tableName:'vendaProdutos',
    timestamps:false
})