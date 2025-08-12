let hed=document.getElementById("hed");
let back = document.getElementById("back-to-top");

window.addEventListener("scroll",function(){
    if(window.pageYOffset > 150){
        hed.style.background = "rgba(0,0,0,0.6)";
        back.style.display = "block";
        back.style.right = "10px";
        back.style.animation = "right 0.3s ";
    }
    else if(window.pageYOffset < 650){
        hed.style.background = "transparent";
        back.style.display = "none";
    }
})
back.addEventListener("click", function(){
    window.scrollTo({top: 0, behavior: "smooth" });

})