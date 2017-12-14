
var samepassword = function(){
  if(document.getElementById('singup_password').value === document.getElementById('singup_confirm_password').value){
    return true;
  }
  event.preventDefault();
  document.querySelector("label").textContent="passwords are not the same";
  return false;
}
