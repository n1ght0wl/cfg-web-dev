/**PHOTO CAROUSEL */
$(document).ready(function(){
    $('.slider').slick({
        accessibility: true,
        arrows: false,
        dots: true,
        speed: 500,
        fade: true,
        cssEase: 'linear'
    });
    $('.check-photo').click(function() {
      $('.check-photo').not(this).prop('checked', false);
   });
});

/**CARD FORM SUBMIT */
window.onload = function () {
    
    const form = document.querySelector("form");
    const msg = document.getElementById("send_form_status");   
    form.addEventListener("submit", function (event) {
      event.preventDefault();  
      const serviceID = "default_service";
      const templateID = "template_9lq3s3d";
      const currentPhoto = document.querySelector(".check-photo:checked");
      currentPhoto.id = "current";
      const currentSrc = currentPhoto.value;
      console.log(currentSrc);    
      emailjs.sendForm(serviceID, templateID, this).then(
        () => {
          form.reset();
        }
      );
    });
};

/**THEME SWITCHER */
const magicSwitch = document.querySelector(".magic-btn");
const currentBody = document.querySelector("body");