$("form span").hide();

$("#password").keyup(errorMessageEvent).keyup(enableButton);
$("#confirm_password").keyup(matchPass).keyup(enableButton);

function isPassValid(){
    return $("#password").val().length > 6;
}

function isPassMatching(){
    return $("#confirm_password").val() === $("#password").val();
}

function isButtonEnabled(){
    if (isPassValid()){
        $(this).next().hide()
    }else{
        $(this).next().show()
    }
}

function errorMessageEvent(){
    if(isPassValid()){
        $(this).next().hide();
    }else{
        $(this).next().show();
    }
}

function matchPass(){
    if(isPassMatching()){
        $(this).next().hide()
    }else {
        $(this).next().show()
    }
}

function enableButton(){
    $("#submit").prop("disabled", !isButtonEnabled);
    if(!isButtonEnabled()){
        $('#submit').css({backgroundColor: "#D3D3D3", color: "#000"});
    }else{
        $('#submit').css({backgroundColor: "#2F558E", color: "#FFF"});
    }
}