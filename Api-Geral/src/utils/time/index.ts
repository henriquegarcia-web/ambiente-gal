import moment from 'moment-timezone';

export const Times = async () => {
    // Obter a data e hora atual no fuso horário desejado (por exemplo, 'America/Sao_Paulo')
    let dataHoraAtual = moment().tz('America/Sao_Paulo');

    // Formatar a data e hora atual
    let dataAtual = dataHoraAtual.format('YYYY-MM-DD');
    let horaAtual = dataHoraAtual.format('HH:mm:ss');

    // Retornar a data e hora atual formatada
    return { data: dataAtual, hora: horaAtual };
}