/**
 * Created by Puska on 27. 11. 2016.
 */
function emailCheck(){
    var email = document.getElementById('forgotmail');
    var war = document.getElementById('emailWarning');
    if(email.value == ""){
        email.className = "redBorder";
        war.innerHTML = "Enter e-mail.";

    }else{
        return true;
    }
    document.getElementById('emailWarning').style.display="block";
    return false;
}