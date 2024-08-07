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

    // Generate a unique link
    const uniqueLink = generateUniqueLink(sisterName, brotherName);

    // Copy link to clipboard and open share dialog
    navigator.clipboard.writeText(uniqueLink).then(() => {
        // Proceed with sharing only if copy is successful
        openShareDialog(uniqueLink);
    }).catch(err => {
        console.error('Could not copy link: ', err);
    });
});

function generateUniqueLink(sisterName, brotherName) {
    // Use a simple random number for demo purposes
    const uniqueId = Math.random().toString(36).substr(2, 9);
    return `https://example.com/rakhi?from=${encodeURIComponent(sisterName)}&to=${encodeURIComponent(brotherName)}&id=${uniqueId}`;
}

function openShareDialog(link) {
    const imageFilePath = 'Images/digitalRakhiLink.jpg'; // Adjust path as needed

    // Fetch the image as a blob
    fetch(imageFilePath)
        .then(response => response.blob())
        .then(blob => {
            const filesArray = [new File([blob], 'digitalRakhiLink.jpg', { type: 'image/jpeg' })];

            // Check if the navigator can share files
            if (navigator.canShare && navigator.canShare({ files: filesArray })) {
                navigator.share({
                    title: 'Send Digital Rakhi',
                    text: 'Share this special Rakhi link with your brother!',
                    url: link,
                    files: filesArray
                }).then(() => {
                    console.log('Thanks for sharing!');
                }).catch(err => {
                    console.error('Could not share: ', err);
                });
            } else {
                // Fallback if file sharing is not supported
                alert('Sharing files is not supported on this device. Please copy the link manually.');
            }
        })
        .catch(err => {
            console.error('Error fetching the image: ', err);
        });
}

