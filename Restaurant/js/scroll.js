let elm = document.getElementById("h1s1");
window.addEventListener("scroll",function(){
    if(window.pageYOffset > 150){
       elm.style.background = "#fff";
       elm.style.animation = 'hight 1.5s';
    }
    else if(window.pageYOffset < 650){
        
        elm.style.background = "linear-gradient(to right, rgba(0, 0, 0, 0.9) 0%, rgba(255, 255, 255, 0.9) , rgba(0, 0, 0, 0.9) )";
        elm.style.animation = 'none';
        
    }
})
