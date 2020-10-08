// yarn add nodemailer

//importa o nodemailer
const nodemailer = require("nodemailer");


// Passa os dados do email para o envio
let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: true,
    auth:{
        user: "williampereira21@gmail.com",
        pass: "gears123"
    }
});


transporter.sendMail({
    from: "williampereira21@gmail.com",
    to: "williampereira21@gmail.com",
    subject: "Oi, sou o William e estou trabalhando com o nodemailer",
    text: "William teste emeial - GreenCode",
    html: "Olá meu nome é William teste email com node",
    html: "Teste com site da greencode <a href='https://http://greencodebr.com.br/'>nodemailer</a> Email!"
}).then(message => {
    console.log(message);
}).catch(err => {
    console.log(err);
})