// alert("Thsi application was created by Daud Abdul-Gafar Olamilekan")
function openham(){
    document.getElementById("sec2").style.width='100%';
    document.getElementById("sec2").style.transition='0.5s';
    document.getElementById("ham").style.display="none";
    document.getElementById("cancel").style.display='block';
    document.body.style.overflow='hidden';

}
function closeham(){
    document.getElementById("sec2").style.width='0%';
    document.getElementById("ham").style.display="block";
    document.getElementById("cancel").style.display='none';
    document.body.style.overflow='auto';

}


// window.onscroll = function(){
//     let scrolling = window.scrollY;
//     let sec2 = document.getElementsByClassName("sect2")[0];
//     let offh = sec2.offsetHeight;
//     let offt = sec2.offsetTop;
//     if(scrolling >= offt && scrolling <= offh + offt){
//        sec2.classList.add('myanime');
//     }
//     else{
//       sec2.classList.remove('myanime');
//     }
//   }


//  ***** solution1
window.onload = ()=>{
  thedots.style.height='9%';
  
}
// for the dots  ***** problem1

let thedots = document.getElementById("mydots")
document.getElementById("thedot").onclick = function(){
  // let tdots = getComputedStyle(thedots)
  thedots.style.transition ='0.5s'
  // 61.1094px
  // thedots.style.height='9%';

  if(thedots.style.height === '9%'){
    thedots.style.height='20%';
  }
  else {
    thedots.style.height='9%';
   }
  // alert(tdots.height)

}
// document.getElementById("thedot").addEventListener('click',() => {
//   // document.getElementById("mydots").style.height='20%';
//    if(thedots.style.height == "9%"){
//     document.getElementById("mydots").style.height='20%';
//    }
//    else{
//     document.getElementById("mydots").style.height='9%';
//    }
// })
function hidedots(){
  document.getElementById('mydots').style.display="none";
}  
// window.onscroll = function(){
    
//     let scrolling = window.scrollY;
//     let sec2 = document.getElementsByClassName("sect");
//     for(let i = 0; i < sec2.length; i++){
        
//         let offh = sec2[i].offsetHeight;
//         let offt = sec2[i].offsetTop;
//         if(scrolling >= offt && scrolling <= offh + offt){
//            sec2[i].classList.add('myanime');
        
//         }
//         else{
//           sec2[i].classList.remove('myanime');
        
//         }
       
//     }
//   }
  function changer(){
     let myswitch = document.getElementById("switch")
     if (myswitch.value === "first"){
        myswitch.value="second";
       document.documentElement.style.setProperty("--myblue","rgb(139, 10, 26)");
       document.documentElement.style.setProperty("--mytransblue","rgba(139, 10, 26,0.8)")
       document.documentElement.style.setProperty("--mycyan","rgb(248, 226, 49)")
     }
     else{
      myswitch.value="first";
      document.documentElement.style.setProperty("--myblue","rgb(12, 75, 2)");
      document.documentElement.style.setProperty("--mytransblue","rgba(12, 75, 2, 0.8)")
      document.documentElement.style.setProperty("--mycyan","rgb(16, 235, 56)")
     }
  }

function gotohome(){
  if(window.innerWidth < 800){
    closeham();
    window.location.href="#home";

  }
  else{
    window.location.href="#home";
    
  }
}

function gotocourse(){
  if(window.innerWidth < 800){
    closeham()
    document.getElementById("course").scrollIntoView({behavior:"smooth"});
  }
  else{
      document.getElementById("course").scrollIntoView({behavior:"smooth"});

    }
}
function gotolectures(){
    if(window.innerWidth < 800){
      closeham()
  window.location.href="#lecturer";

    }
    else{
      window.location.href="#lecturer";

    }
}
function gotogpcal(){
  if(window.innerWidth < 800){
    closeham()
  document.getElementById("gpcal").scrollIntoView({behavior:"smooth"});

  }
  document.getElementById("gpcal").scrollIntoView({behavior:"smooth"});
}
function gotoabout(){
    if(window.innerWidth < 800){
      closeham();
  window.location.href="#about";
    }
    else{
  window.location.href="#about";

    }
}




function gotoexco(){
  location.href='nacosexco.html'
}
// ### the carousel javascript begining ######


// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}


//#########################################################################

let slideIndex = 1;
showSlides(slideIndex);

// Auto-change slides every 3 seconds
let slideTimer = setInterval(function() {
  plusSlides(1);
}, 3000);

// Next/previous controls
function plusSlides(n) {
  clearInterval(slideTimer); // Stop auto-change on manual interaction
  showSlides(slideIndex += n);
  slideTimer = setInterval(function() {
    plusSlides(1);
  }, 3000); // Restart auto-change
}

// Thumbnail image controls
function currentSlide(n) {
  clearInterval(slideTimer); // Stop auto-change on manual interaction
  showSlides(slideIndex = n);
  slideTimer = setInterval(function() {
    plusSlides(1);
  }, 3000); // Restart auto-change
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}

// ### the carousel javascript ending ########

document.getElementById("faq1").onclick = function(){
  let faq1 = document.getElementsByClassName("thefaq")[0];
  // alert(faq1.offsetHeight);
  if (faq1.offsetHeight <=" 60"){
    faq1.style.transition = '.5s';
    faq1.style.height='200px';
    document.getElementsByClassName("arrnav")[0].innerHTML="&uparrow;";
  }
  else{
    faq1.style.height='60px'
    document.getElementsByClassName("arrnav")[0].innerHTML="&downarrow;";


  }
}
document.getElementById("faq2").onclick = function(){
  let faq2 = document.getElementsByClassName("thefaq")[1];

  if (faq2.offsetHeight <= "60"){
    faq2.style.transition = '.5s';
    faq2.style.height='200px';
    document.getElementsByClassName("arrnav")[1].innerHTML="&uparrow;";
  }
  else{
    faq2.style.height='60px';
        document.getElementsByClassName("arrnav")[1].innerHTML="&downarrow;";
  }
}
document.getElementById("faq3").onclick = function(){
  let faq3 = document.getElementsByClassName("thefaq")[2];

  if (faq3.offsetHeight <= "60"){
    faq3.style.transition = '.5s';
    faq3.style.height='200px';
    document.getElementsByClassName("arrnav")[2].innerHTML="&uparrow;";
  }
  else{
    faq3.style.height='60px';
        document.getElementsByClassName("arrnav")[2].innerHTML="&downarrow;";
  }
}

