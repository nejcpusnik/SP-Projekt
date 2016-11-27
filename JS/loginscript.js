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
        war.innerHTML = "Log-in credentials did not match.";
        for(var i=0; i<accounts.length; i++){
            if((accounts[i][0] == usr.value || accounts[i][1] == usr.value)
                && accounts[i][2] == pass.value){
                return true;
            }
        }
    }

    document.getElementById('loginWarning').style.display="block";
    return false;
}