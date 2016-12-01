function formCheck(){


    var usr1 = document.getElementById('usr1');
    var mail = document.getElementById('mail');
    var pass1 = document.getElementById('pw1');
    var pass2 = document.getElementById('pw2');

    var war = document.getElementById('formWarning');

    if(usr1.value == ""){
        usr1.className = "redBorder";
        war.innerHTML = "Enter username.";

    }else if(mail.value == ""){
        mail.className = "redBorder";
        war.innerHTML = "Enter e-mail address.";

    }else if(checkEmail(mail) == false){
        mail.className = "redBorder";
        war.innerHTML = "E-mail address is not valid.";

    }else if(pass1.value == "" && pass2.value == ""){
        pass1.className = "redBorder";
        war.innerHTML = "Enter password.";

    }else if(pass1.value != pass2.value){
        pass2.className = "redBorder";
        war.innerHTML = "Passwords did not match.";

    }else{
        // save to database
        accounts.push([usr1.value, mail.value, pass1.value]);
        return true;
    }

    if(usr1.value != ""){
        usr1.className = "";

    }else if(mail.value != ""){
        mail.className = "";

    }else if(checkEmail(mail)){
        mail.className = "";

    }else if(pass1.value != "" && pass2.value != ""){
        pass1.className = "";

    }else if(pass1.value == pass2.value){
        pass2.className = "";
    }

    document.getElementById('formWarning').style.display="block";
    return false;
}


var accounts = [["username", "mail", "password"]];

function loginCheck(){
    var usr = document.getElementById('usr');
    var pass = document.getElementById('pw');
    var war = document.getElementById('loginWarning');

    if(usr.value == ""){
        usr.className = "redBorder";
        war.innerHTML = "Enter username or e-mail.";

    }else if(pass.value == ""){
        pass.className = "redBorder";
        war.innerHTML = "Enter password.";

    }else{
        war.innerHTML = "Username or password is incorrect.";
        for(var i=0; i<accounts.length; i++){
            if((accounts[i][0] == usr.value || accounts[i][1] == usr.value)
                && accounts[i][2] == pass.value){
                return true;
            }
        }
    }
    if(usr.value != ""){
        usr.className = "";

    }else if(pass.value != ""){
        pass.className = "";
    }

    document.getElementById('loginWarning').style.display="block";
    return false;
}

function checkEmail(email) {
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    if (!filter.test(email.value)) {
        return false;
    }
}