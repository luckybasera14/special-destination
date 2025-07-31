document.addEventListener('DOMContentLoaded', () => {
    createHearts();

    const startBtn = document.getElementById('start-btn');
    const birthdayBlast = document.getElementById('birthday-blast');
    const birthdaySong = document.getElementById('birthday-song');

    // Persistent music playback logic
    if (birthdaySong) {
        const musicState = localStorage.getItem('musicState'); // Use a single key for state
        if (musicState) {
            const { playing, currentTime } = JSON.parse(musicState);
            if (playing) {
                birthdaySong.currentTime = currentTime;
                birthdaySong.play().catch(e => console.log("Autoplay prevented: ", e)); // Catch potential autoplay errors
            }
        }

        // Update localStorage on play/pause/timeupdate
        birthdaySong.addEventListener('play', () => {
            localStorage.setItem('musicState', JSON.stringify({ playing: true, currentTime: birthdaySong.currentTime }));
        });
        birthdaySong.addEventListener('pause', () => {
            localStorage.setItem('musicState', JSON.stringify({ playing: false, currentTime: birthdaySong.currentTime }));
        });
        birthdaySong.addEventListener('timeupdate', () => {
            // Only update if playing to avoid unnecessary writes
            if (!birthdaySong.paused) {
                localStorage.setItem('musicState', JSON.stringify({ playing: true, currentTime: birthdaySong.currentTime }));
            }
        });
    }

    if (startBtn) {
        startBtn.addEventListener('click', () => {
            startBtn.style.display = 'none';
            window.location.href = 'page2.html';
        });
    }

    // Logic for Lights On page (page3.html)
    const lightsOnBtn = document.getElementById('lights-on-btn');
    const starsContainer = document.querySelector('.stars-container');
    if (lightsOnBtn) {
        // Create stars immediately for the dark theme
        for (let i = 0; i < 100; i++) {
            const star = document.createElement('div');
            star.classList.add('star');
            star.style.left = Math.random() * 100 + 'vw';
            star.style.top = Math.random() * 100 + 'vh';
            star.style.width = Math.random() * 3 + 1 + 'px';
            star.style.height = star.style.width;
            star.style.animationDuration = (Math.random() * 3 + 2) + 's';
            star.style.animationDelay = Math.random() * 2 + 's';
            starsContainer.appendChild(star);
        }

        lightsOnBtn.addEventListener('click', () => {
            document.body.classList.remove('dark-theme'); // Switch to light theme
            // starsContainer.classList.remove('hidden'); // REMOVED: CSS handles visibility
            lightsOnBtn.style.display = 'none';
            setTimeout(() => {
                window.location.href = 'page4.html';
            }, 1500); // Short delay for effect
        });
    }

    // Logic for Play Music page (page4.html)
    const playMusicBtn = document.getElementById('play-music-btn');
    const visualizerContainer = document.querySelector('.visualizer-container');
    if (playMusicBtn) {
        playMusicBtn.addEventListener('click', () => {
            if (birthdaySong) {
                birthdaySong.play();
                localStorage.setItem('musicState', JSON.stringify({ playing: true, currentTime: birthdaySong.currentTime }));
            }
            playMusicBtn.style.display = 'none';
            visualizerContainer.classList.remove('hidden');
            setTimeout(() => {
                window.location.href = 'page5.html';
            }, 2000); // Short delay for effect
        });
    }

    // Logic for Happy Birthday Blast page (page6.html)
    if (window.location.pathname.includes('page6.html')) {
        birthdayBlast.classList.remove('hidden');
        if (birthdaySong && birthdaySong.paused) {
            birthdaySong.play().catch(e => console.log("Autoplay prevented on blast page: ", e));
        }

        createBalloons(50, 'blast');
        createCrackers(100, 'blast');
        startConfetti(300);

        setTimeout(() => {
            window.location.href = 'page7.html';
        }, 3000); // Show blast for 3 seconds
    }

    // Logic for Fly the Balloons page (page7.html)
    const flyBalloonsBtn = document.getElementById('fly-balloons-btn');
    if (flyBalloonsBtn) {
        flyBalloonsBtn.addEventListener('click', (e) => {
            e.preventDefault();
            createBalloons(30, 'continuous'); // Create continuous balloons
            setTimeout(() => {
                window.location.href = e.target.href;
            }, 1000); // Short delay before navigating
        });
    }

    // Logic for final page (page9.html) - continuous balloons
    if (window.location.pathname.includes('page9.html')) {
        createBalloons(30, 'continuous');

        // Digital Photo Album interaction
        document.querySelectorAll('.album-item').forEach(item => {
            item.addEventListener('click', () => {
                const message = item.querySelector('.album-message');
                if (message) {
                    message.classList.toggle('hidden');
                }
            });
        });
    }
});

function createHearts() {
    const heartsContainer = document.createElement('div');
    heartsContainer.classList.add('hearts-bg');
    document.body.prepend(heartsContainer);

    for (let i = 0; i < 30; i++) {
        const heart = document.createElement('li');
        heart.classList.add('heart');
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = (Math.random() * 5 + 10) + 's';
        heart.style.animationDelay = Math.random() * 5 + 's';
        heartsContainer.appendChild(heart);
    }
}

function createBalloons(count, type) {
    const container = document.body;
    for (let i = 0; i < count; i++) {
        const balloon = document.createElement('div');
        balloon.classList.add('balloon');
        if (type === 'blast') {
            balloon.style.left = Math.random() * 100 + 'vw';
            balloon.style.animationDuration = (Math.random() * 2 + 1) + 's';
            balloon.style.animationName = 'blastFloat';
        } else if (type === 'continuous') {
            balloon.style.left = Math.random() * 100 + 'vw';
            balloon.style.animationDuration = (Math.random() * 5 + 5) + 's';
            balloon.style.animationName = 'floatUp'; // Use the existing floatUp animation
        }
        container.appendChild(balloon);
    }
}

function createCrackers(count, type) {
    const container = document.body;
    for (let i = 0; i < count; i++) {
        const cracker = document.createElement('div');
        cracker.classList.add('cracker');
        if (type === 'blast') {
            cracker.style.left = Math.random() * 100 + 'vw';
            cracker.style.top = Math.random() * 100 + 'vh';
            cracker.style.animationDuration = (Math.random() * 0.5 + 0.5) + 's';
            cracker.style.animationName = 'blastExplode';
        }
        container.appendChild(cracker);
    }
}

function startConfetti(count) {
    const confettiContainer = document.createElement('div');
    confettiContainer.classList.add('confetti-container');
    document.body.appendChild(confettiContainer);

    for (let i = 0; i < count; i++) {
        createConfettiPiece(confettiContainer);
    }

    setTimeout(() => {
        confettiContainer.remove();
    }, 5000);
}

function createConfettiPiece(container) {
    const confetti = document.createElement('div');
    confetti.classList.add('confetti-piece');
    confetti.style.left = Math.random() * 100 + 'vw';
    confetti.style.top = Math.random() * 100 + 'vh';
    confetti.style.backgroundColor = randomColor();
    confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
    confetti.style.animationDelay = Math.random() * 2 + 's';
    container.appendChild(confetti);

    setTimeout(() => {
        confetti.remove();
    }, 5000);
}

function randomColor() {
    const colors = ['#ff0a54', '#ff477e', '#ff85a1', '#fbb1b1', '#f9bec7', '#f7cad0', '#fae0e4'];
    return colors[Math.floor(Math.random() * colors.length)];
}
