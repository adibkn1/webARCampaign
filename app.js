document.getElementById('rakhiForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const termsChecked = document.getElementById('terms').checked;
    
    if (!termsChecked) {
        document.getElementById('formMessage').textContent = 'Accept terms and conditions to send Rakhi';
        return;
    }

    document.getElementById('formMessage').textContent = 'Sending your Rakhi...';
    // Add form submission logic here if needed
});

document.getElementById('terms').addEventListener('change', function() {
    if (this.checked) {
        document.getElementById('formMessage').textContent = '';
    } else {
        document.getElementById('formMessage').textContent = 'Accept terms and conditions to send Rakhi';
    }
});
