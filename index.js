var email = document.querySelector('input[type=email]')

email.addEventListener('input', function(event) {
    var emailReference = event.target;
    if (emailReference.validity.typeMismatch) {
        emailReference.setCustomValidity("Enter a Proper Email");
    } else {
        emailReference.setCustomValidity('');
    }
}



);


/* dont really use this it was just from class */
