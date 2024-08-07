document.getElementById('rakhiForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form from submitting normally

    // Gather form inputs
    const sisterName = document.getElementById('sisterName').value.trim();
    const brotherName = document.getElementById('brotherName').value.trim();
    const email = document.getElementById('email').value.trim();
    const mobile = document.getElementById('mobile').value.trim();
    const termsAccepted = document.getElementById('terms').checked;

    // Validate form fields
    if (!sisterName || !brotherName || !email || !mobile || !termsAccepted) {
        alert('Please fill out all fields and accept the terms.');
        return;
    }

    // Generate a unique link (you can customize this logic)
    const uniqueLink = generateUniqueLink(sisterName, brotherName);

    // Copy link to clipboard
    navigator.clipboard.writeText(uniqueLink).then(() => {
        alert('Link copied to clipboard!');
    }).catch(err => {
        console.error('Could not copy link: ', err);
    });

    // Open share dialog
    openShareDialog(uniqueLink);
});

function generateUniqueLink(sisterName, brotherName) {
    // Use a simple random number for demo purposes
    const uniqueId = Math.random().toString(36).substr(2, 9);
    return `https://example.com/rakhi?from=${encodeURIComponent(sisterName)}&to=${encodeURIComponent(brotherName)}&id=${uniqueId}`;
}

function openShareDialog(link) {
    if (navigator.share) {
        navigator.share({
            title: 'Send Digital Rakhi',
            text: 'Share this special Rakhi link with your brother!',
            url: link
        }).then(() => {
            console.log('Thanks for sharing!');
        }).catch(err => {
            console.error('Could not share: ', err);
        });
    }
}
