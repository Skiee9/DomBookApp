const BASE_URL="https://vivacious-short-battery.glitch.me/books"
const form=document.getElementById('login-form');
form.addEventListener('submit,function(e)'{
    e.preventDefault();
    const email=document.getElementById('email').value;
    const password=document.getElementById('password').value;

    if(email==='admin@empher.com' && password==='empher@123'){
        alert('Logged in as Admin');
    localStorage,setItem('loginData',JSON.stringify({email:'admin@empher.com'}));
    window.location.href='admin.html';
    }
    else if(email==='user@empher.com' && password==='user@123'){
        alert('Logged in as User');
        localStorage.setItem('loginData',JSON.stringify({email:'user@empher.com'}));
         window.location.href='books.html';}
         else{
            alert('Invalid Credentials');}

        
});