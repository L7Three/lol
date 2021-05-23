window.onload = function () {
    document.getElementById("form").onsubmit = function () {
        return checkUsername() && checkPassword() &&checkEmail();
    }
    document.getElementById("username").onblur = checkUsername;
    document.getElementById("password").onblur = checkPassword;
    document.getElementById("Email").onblur = checkEmail;
}

//校验用户名
function checkUsername() {
    var username = document.getElementById("username").value;

    var reg_username = /^([a-zA-Z0-9_-])/;
    var flag = reg_username.test(username);
    var s_username = document.getElementById("s_username");
    if (flag) {
        s_username.innerHTML = "<img src='/img/2.jpg' width='15' height='15'>";
    } else {
        s_username.innerHTML = "用户名格式有误！";
    }
    return flag;
}

//校验密码
function checkPassword(){
    var password = document.getElementById("password").value;
    var reg_password = /^\w{6,12}$/;
    var flag = reg_password.test(password);
    var s_password = document.getElementById("s_password");

    if(flag){
        s_password.innerHTML = "<img width='15' height='15' src='/img/2.jpg'/>";
    }else{
        s_password.innerHTML = "密码格式有误";
    }
    return flag;
}

//校验Email
function checkEmail(){
    var email = document.getElementById("Email").value;
    var reg_email = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
    var flag = reg_email.test(email);
    var s_email = document.getElementById("s_email");

    if(flag){
        s_email.innerHTML = "<img width='15' height='15' src='/img/2.jpg'/>";
    }else{
        s_email.innerHTML = "Email格式有误";
    }
    return flag;
}