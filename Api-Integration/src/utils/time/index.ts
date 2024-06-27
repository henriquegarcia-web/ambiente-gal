export const Times = async ()=>{
    let data = new Date();
    let horas= data.getHours();
    let min = data.getMinutes();
    let sec = data.getSeconds();
    let horaAtual = horas+':'+min+':'+sec
    let dia = String(data.getDate()).padStart(2, '0');
    let mes = String(data.getMonth() + 1).padStart(2, '0');
    let ano = data.getFullYear();
    let dataAtual = ano + '-' + mes + '-' + dia;  
    let dataAtualNew = (((Number(mes) +1) >12)?ano+1:ano)  + '-' +  (((Number(mes) +1) >12)?( ((Number(mes))<10)?'0'+((Number(mes))):((Number(mes) +1))):(Number(mes) +1)<10?'0'+(Number(mes) +1):'01') + '-' + (Number(dia)<10?'0'+dia:dia); 
    let times = {data:dataAtual,hora:horaAtual,dataAtualNew}
    return times
}