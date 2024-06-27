import nodemailer from 'nodemailer'
import { HTML } from './function';

const fs = require('fs');
const path = require('path');
export const CadastrarColaborador = async (email: any, password: string, permissao: string) => {
    await Enviar({
        remetente: 'admwolfy@wolfypay.com', email, titulo: 'Bem-Vindo a WolfPay!', subject: 'Criação de conta!', mensagem: `<p style="text-align:left;">Olá,
    <br> 
    Caro Colaborador,
    <br> 
    Seja bem-vindo à equipe Wolfy Pay! Estamos empolgados em tê-lo(a) conosco e confiantes de que sua contribuição será valiosa para o sucesso da nossa plataforma.
    <br> 
    Como colaborador, você terá a oportunidade de fazer parte de projetos inovadores, aprender e crescer profissionalmente. Valorizamos a criatividade, a colaboração e a dedicação ao serviço excepcional ao cliente.
    <br> 
    Lembre-se de que estamos aqui para apoiá-lo(a) em cada etapa. Seja qual for a sua função, sua contribuição é fundamental. Se tiver dúvidas ou sugestões, não hesite em compartilhá-las.
    <br> 
    Obrigado por escolher ser parte da família WolfyPay. Juntos, alcançaremos grandes conquistas!
    <br> 
    Nivel: ${permissao} <br>
    URL da Plataforma: https://app.wolfypay.com/ <br>
    Email de Usuário: ${email} <br>
    Senha: ${password} <br>   <br>    <br> 

    Bem-vindo(a) a bordo!
    <br> 
    Atenciosamente,
    <br> Equipe WolfyPay`, assunto: 'Bem-Vindo a WolfPay!'
    })
}
export const CadastrarCliente = async (email: any, password: string) => {
    await Enviar({
        remetente: 'admwolfy@wolfypay.com', email, titulo: 'Bem-Vindo a WolfPay!', subject: 'Criação de conta!', mensagem: `<p style="text-align:left; ">Olá,
    <br>
    Agradecemos por adquirir um curso através do Wolfy Pay. Agora, você tem acesso total ao conteúdo educacional.
    <br>
    Para começar a aprender, acesse a plataforma utilizando as seguintes informações de acesso:
    <br>
    URL da Plataforma: https://app.wolfypay.com/ <br>
    Email de Usuário: ${email} <br>
    Senha: ${password} <br>
    <br>
    Se tiver alguma dúvida ou precisar de suporte, não hesite em entrar em contato conosco.
    <br>
    Obrigado,</p>
    <br><br> Equipe WolfyPay`, assunto: 'Bem-Vindo a WolfPay!'
    })
}
export const CadastrarProdutor = async (email: any) => {
    await Enviar({
        remetente: 'admwolfy@wolfypay.com', email, titulo: 'Bem-Vindo a WolfPay!', subject: 'Criação de conta!', mensagem: `
    <p style="text-align:center; ">Parabéns por se juntar à WolfyPay! Agora, como produtor, você pode vender seus cursos e se afiliar a outros. Explore todas as ferramentas disponíveis para personalizar sua experiência, interagir com sua audiência e alcançar o sucesso. Estamos ansiosos para ver suas conquistas!</p>
    <br><br> Equipe WolfyPay`, assunto: 'Bem-Vindo a WolfPay!'
    })
}
export const EnviarToken = async (email: any, token: string) => {
    await Enviar({
        remetente: 'admwolfy@wolfypay.com', email, titulo: 'Token WolfPay!', subject: 'Envio de token!', mensagem: `<p style="text-align:left; ">Olá,
    <br>
    Recebemos uma solicitação para redefinir a senha da sua conta na plataforma Wolfy Pay. Para continuar com o processo de recuperação de senha, utilize o seguinte token:
    <br>
    Token de Recuperação: ${token}
    <br>
    Por favor, insira este token na página de recuperação de senha. Se você não solicitou esta alteração, recomendamos que entre em contato conosco imediatamente.
    <br>
    Lembre-se, este token é válido por um curto período. Caso precise de mais assistência ou tenha dúvidas, não hesite em entrar em contato com a nossa equipe de suporte.
    <br><br>
    Atenciosamente,
    <br> Equipe WolfyPay`, assunto: 'Bem-Vindo a WolfPay!'
    })
}
export const CompraRalizada = async (email: any) => {
    await Enviar({
        remetente: 'admwolfy@wolfypay.com', email, titulo: 'Bem-Vindo a WolfPay!', subject: 'Compra Realizada!', mensagem: `<p style="text-align:left; ">Olá,
    <br>
    Agradecemos por sua compra!
    <br>
    Gostaríamos de confirmar que recebemos seu pedido e estamos processando-o. Em breve, você receberá um segundo e-mail contendo os detalhes de acesso à sua conta.
    <br>
Se tiver alguma dúvida ou precisar de assistência, não hesite em nos contatar.
<br>
Atenciosamente,
    <br><br> Equipe WolfyPay`, assunto: 'Bem-Vindo a WolfPay!'
    })
}
export const Enviar = async (dados: any) => {
    const imagePath = path.join(__dirname, '../../../public/imagem/logo.png');
    const imageContent = fs.readFileSync(imagePath, { encoding: 'base64' });
    try {
        let transport = nodemailer.createTransport({
            host: 'smtp.zoho.com',
            port: 587,
            auth: {
                user: dados.remetente,
                pass: '751fs5@Wf!'
            }
        })
        let message = {
            from: `"${dados.titulo}" ${dados.remetente}`,
            to: dados.email,
            subject: dados.subject,
            html: HTML(dados),
            attachments: [{
                filename: 'imagem.jpg',
                content: imageContent,
                encoding: 'base64',
                cid: 'unique@nodemailer.com'
            }]
        }
        console.log(await transport.sendMail(message))

    } catch (error) {
        console.log(error)
    }


}
