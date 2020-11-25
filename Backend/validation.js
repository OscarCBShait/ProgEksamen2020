const email = document.getElementById('email')
const password = document.getElementById('psw')
const fornavn = document.getElementById('fn')
const efternavn = document.getElementById('en')
const alder = document.getElementById('alder')
const brugernavn = document.getElementById('brugernavn')
const køn = document.getElementById('køn')

  

password.addEventListener("onkeyup", myFunction);

function myFunction() {
    var message, password;
    message = document.getElementById("pw");
    message.innerHTML = "";
    password = document.getElementById("psw").value.length;
    try { 
      if(password === "")  throw "udfyldes";
     
      password = Number(password);
      if(password <= 8) throw "være mere end 8 tegn";
      
      if(15 >= password) throw "være mindre end 16 tegn";
    
    }
    catch(err) {
      message.innerHTML = "Password skal " + err;
    }
}

 