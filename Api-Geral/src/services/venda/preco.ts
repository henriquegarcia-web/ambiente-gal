import { Taxas } from "../../utils/taxas"

export const Valor = async (carrinho:any,valida:any,idProdutor:any,cupomName:any,parcelas:any,bandeiras:any) => {
    let somatorio = await carrinho.reduce((acumulador:any,element:any)=>{return acumulador + element.preco },0)
    let valorFinal = (valida.list[0]?.cupom?.nome && cupomName && cupomName == valida.list[0]?.cupom?.nome) ? (valida.list[0]?.cupom?.tipo==1? (somatorio - ((valida.list[0]?.cupom?.valor/100) *somatorio) ) : somatorio - valida.list[0]?.cupom?.valor ):somatorio
    if(parcelas && bandeiras){
        let taxas :any= Taxas.find((item)=>item.nome)
        let valores = taxas?.parcelas.find((item:any)=>item.numero==Number(parcelas))
        valorFinal = ((((valores.juros / 100) * valorFinal) + valores.valorfixo) + valorFinal).toFixed(2)
    }
    return valorFinal
}