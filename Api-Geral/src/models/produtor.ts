import { DataTypes, Model } from "sequelize";
import { sequelize } from "../instances/postgres";

export interface Produtor extends Model {
    id: number,
    nome: string,
    email: string,
    cpfCnpj: string,
    cep: string,
    rua: string,
    numero: string,
    bairro: string,
    cidade: string,
    estado: string,
    banco: string,
    titular: string,
    tipoConta: string,
    agencia: string,
    agenciaDig: string,
    conta: string,
    contaDig: string,
    valor: number,
    idreferencia: number,
    saque: number,
    taxaFixa: number,
    taxaVariavel: number,
    saldoDisponivel: number,
    saldoPendente: number,
    valorTotal: number,
    versoIdentidade: string,
    frenteIdentidade: string,
    cartaoCNPJ: string,
    selfieDocumento: string,
    validar:number,
    chavePix:string,
    tipoChave:string,
    taxaRetido:number,
    valorRetido:number
}
export const Produtor = sequelize.define<Produtor>('produtor', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.NUMBER
    },
    nome: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    cpfCnpj: {
        type: DataTypes.STRING
    },
    cep: {
        type: DataTypes.STRING
    },
    rua: {
        type: DataTypes.STRING
    },
    numero: {
        type: DataTypes.STRING
    },
    bairro: {
        type: DataTypes.STRING
    },
    cidade: {
        type: DataTypes.STRING
    },
    estado: {
        type: DataTypes.STRING
    },
    banco: {
        type: DataTypes.STRING
    },
    titular: {
        type: DataTypes.STRING
    },
    tipoConta: {
        type: DataTypes.STRING
    },
    agencia: {
        type: DataTypes.STRING
    },
    agenciaDig: {
        type: DataTypes.STRING
    },
    conta: {
        type: DataTypes.STRING
    },
    contaDig: {
        type: DataTypes.STRING
    },
    valor: {
        type: DataTypes.FLOAT
    },
    idreferencia: {
        type: DataTypes.NUMBER
    },
    saque: {
        type: DataTypes.NUMBER
    },
    taxaFixa: {
        type: DataTypes.NUMBER
    },
    taxaVariavel: {
        type: DataTypes.NUMBER
    },
    saldoDisponivel: {
        type: DataTypes.FLOAT
    },
    saldoPendente: {
        type: DataTypes.FLOAT
    },
    valorTotal: {
        type: DataTypes.FLOAT
    },
    versoIdentidade:{
        type: DataTypes.STRING
    },
    frenteIdentidade: {
        type: DataTypes.STRING
    },
    cartaoCNPJ: {
        type: DataTypes.STRING
    },
    selfieDocumento: {
        type: DataTypes.STRING
    },
    validar:{
        type: DataTypes.NUMBER
    },
    chavePix:{
        type: DataTypes.STRING
    },
    tipoChave:{
        type: DataTypes.STRING
    },
    taxaRetido:{
        type: DataTypes.FLOAT
    },
    valorRetido:{
        type: DataTypes.FLOAT
    }
}, {
    tableName: 'produtor',
    timestamps: false
})