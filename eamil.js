const nodemailer = require('nodemailer');
　　// 创建可重用邮件传输器
　　const transporter = nodemailer.createTransport({
　　　　host: "smtp.qq.com", // qq的邮件地址
　　　　port: 465, // 端口
　　　　secureConnection: false, // use SSL
　　　　auth: {
    　　　　　　 user: '2239641728@qq.com', //用户名
                pass: 'ahqdarvwqsipdifj' // SMTP授权码
　　　　}
　　});
　　const send = (mailOptions) => {
　　　　transporter.sendMail(mailOptions, function(error, info) {
　　　　　　if (error) {
　　　　　　　　return console.log(error);
　　　　　　}
　　　　　　console.log('Message send: %s', info.messageId);
　　　　});
　　}

const randomFns=()=> { // 生成6位随机数
    let code = ""
    for(let i= 0;i<6;i++){
        code += parseInt(Math.random()*10)
    }
    console.log(code);
    return code 
}
　


const sendEmail = (Email) =>{
    let emailCode = randomFns() //验证码为6位随机数，random()
　　let email = {
　　title: '英雄联盟官网注册验证码',
　　htmlBody: '<h1>Hello,亲爱的召唤师！</h1><p style="font-size: 18px;color:#000;">您的注册验证码为：<u style="font-size: 16px;color:#1890ff;">' + emailCode + '</u></p ><p style="font-size: 14px;color:#666;">五分钟内有效</p >'
　　}

    let mailOptions = {
        　　　　from: '2239641728@qq.com', // 发件人地址
        　　　　to: Email, // 收件人地址，多个收件人可以使用逗号分隔
        　　　　subject: email.title, // 邮件标题
        　　　　html: email.htmlBody // 邮件内容
        　　};
    send(mailOptions)   
    return emailCode; 
}

module.exports=sendEmail;