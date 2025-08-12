let btn = document.getElementById("button1");
let btn1 = document.getElementById("button2");
let root = document.querySelector(':root')
let colorg = btn.nextElementSibling.firstElementChild.nextElementSibling;
let colorp = btn.nextElementSibling.firstElementChild.nextElementSibling.nextElementSibling;
let colorm= btn.nextElementSibling.lastElementChild.previousElementSibling;
let colordg = btn.nextElementSibling.lastElementChild;
let thim =document.getElementById("thim");
btn.addEventListener('click',function(){
    btn.nextElementSibling.classList.toggle('thide'); 
    btn.nextElementSibling.classList.toggle('thim'); 

})
colorg.addEventListener("click",function(){
    root.style.setProperty('--color-green', '#7fb401');
    root.style.setProperty('--color-green-opy', 'rgba(55, 146, 146, 0.5)');
})
colorp.addEventListener("click",function(){
    root.style.setProperty('--color-green', '#ef527a ');
    root.style.setProperty('--color-green-opy', 'rgba(239, 82, 121, 0.5)');
})
colorm.addEventListener("click",function(){
    root.style.setProperty('--color-green', '#9055A0');
    root.style.setProperty('--color-green-opy', 'rgba(144, 85, 160, 0.5)');
})
colordg.addEventListener("click",function(){
    root.style.setProperty('--color-green', '#379292');
    root.style.setProperty('--color-green-opy', 'rgba(55, 146, 146, 0.5)');
})


window.addEventListener("scroll",function(){
    
    if(window.pageYOffset > 650){
        btn1.style.display = "block";
    }
else if(window.pageYOffset < 650){
    btn1.style.display = "none";
   }
    
})
btn1.addEventListener("click",()=>{
    window.scrollTo(top);
})


// thim.addEventListener("dblclick" ,()=>{
//     thim.style.animation = 'clode 0.5s'
// })