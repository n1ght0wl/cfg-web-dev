window.onload=function(){
    /**FORM SUBMIT */
    const form = document.querySelector('form');
    const msg = document.getElementById('send_form_status');
        
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const serviceID = 'default_service';
        const templateID = 'template_aqxxjro';
    
       emailjs.sendForm(serviceID, templateID, this)
            .then(() => {
                msg.innerHTML = '<p>Thank you! Your request has been sent.</p>';
                form.reset();
            }, (err) => {
                msg.classList.add(".error");
                msg.innerHTML = '<p>Something went wrong.</p>';
            });
        })
    };