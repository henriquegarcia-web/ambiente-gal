import { DataTypes,Model } from "sequelize";
import { sequelize } from "../instances/postgres";

export interface Transacao extends Model{
    id: number,
    idProdutor:number,
    valor:number,
    data:Date,
    time:Date,
    status:boolean,
    validador:string,
    valorLiquido:number,
    taxa:number,
    saldoRetido:number,
    tipoValor:number,
}
export const Transacao = sequelize.define<Transacao>('transacao',{
    id:{
        primaryKey:true,
        autoIncrement:true,
        type:DataTypes.NUMBER
    },
    idProdutor:{
        type:DataTypes.NUMBER
    },
    valor:{
        type:DataTypes.NUMBER
    },
    data:{
        type:DataTypes.DATE
    },
    hora:{
        type:DataTypes.TIME
    },
    status:{
        type:DataTypes.NUMBER
    },
    validador:{
        type:DataTypes.STRING
    },
    saldoDisponivel:{
        type: DataTypes.NUMBER
    },
    taxa:{
        type: DataTypes.NUMBER
    },
    valorLiquido:{
        type: DataTypes.NUMBER
    },
    saldoRetido:{
        type: DataTypes.NUMBER
    },
    tipoValor:{
        type: DataTypes.NUMBER
    }
},{
    tableName:'transacao',
    timestamps:false
})