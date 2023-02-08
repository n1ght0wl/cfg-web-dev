$(document).ready(function(){
    console.log("Hello");
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

window.onload = function () {
    /**CARD FORM SUBMIT */
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
          msg.innerHTML = "<p>Thank you! Your request has been sent.</p>";
          form.reset();
        },
        (err) => {
          msg.classList.add(".error");
          msg.innerHTML = "<p>Something went wrong.</p>";
        }
      );
    });
  };