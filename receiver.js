function fadeAway() {
    const container = document.querySelector('.container');
    container.style.opacity = '0'; // Fade out effect
    setTimeout(() => {
        container.style.display = 'none'; // Completely hide after fade
    }, 1000); // Matches the transition time
}
