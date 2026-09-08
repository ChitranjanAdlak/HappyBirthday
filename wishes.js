// ===== MUSIC CONTROL =====
const bgMusic = document.getElementById('bgMusic');
const musicToggle = document.getElementById('musicToggle');
const musicIcon = musicToggle.querySelector('.music-icon');

// Start Page 2 music after user interaction
function startMusic() {
    if (!bgMusic) return;

    bgMusic.play().then(() => {
        musicToggle.classList.add('playing');
        musicIcon.textContent = '🎵';
    }).catch(() => {
        musicIcon.textContent = '🔇';
    });
}

// Music ON / OFF
function toggleMusic() {
    if (bgMusic.paused) {
        bgMusic.play().then(() => {
            musicToggle.classList.add('playing');
            musicIcon.textContent = '🎵';
        });
    } else {
        bgMusic.pause();
        musicToggle.classList.remove('playing');
        musicIcon.textContent = '🔇';
    }
}

musicToggle.addEventListener('click', toggleMusic);

// Start music when user clicks the first wish button
document.querySelector('.shuffle-button').addEventListener('click', startMusic);


// ===== CUSTOMIZE: Add your reasons here! =====
// Each reason has:
// - text: The message to display
// - emoji: An emoji shown before the text
// - gif: Animation file to show (optional, use animation-1.gif or animation-2.gif)
const reasons = [
    {
        text: "“Tumhari smile mein pata nahi kya magic hai… ek baar dekh lo toh mood automatically better ho jaata hai. 😊✨",
        emoji: "✨",
        gif: "gif1.gif"
    },
    {
        text: " Tum hamesha yese hi kush rehna.or kabhi apne dreams ko mat chhodna. 💫🦋",
        emoji: "💫",
        gif: "gif2.gif"
    },
    {
        text: "Tumhari smile mein kuch toh special hai… tum smile karti ho na, toh ek normal sa moment bhi beautiful ban jaata hai.Bass gussa karna chhod do. 😊✨",
        emoji: "🌟",
        gif: "gif1.gif"
    },
    {
        text: "I hope ye birthday tumhari life mein naye dreams, beautiful memories aur bahut saari happiness lekar aaye. 🌸🎂",
        emoji: "💖",
        gif: "gif2.gif"
    },
    {
        text: "Aur haan… chahe future mein kitna bhi change aaye, bas aise hi khud par believe karte rehna aur shine karte rehna. ⭐🎉",
        emoji: "🎊",
        gif: "gif1.gif"
    }
    // Add more reasons as needed!
];

// State management
let currentReasonIndex = 0;
const reasonsContainer = document.getElementById('reasons-container');
const shuffleButton = document.querySelector('.shuffle-button');
const reasonCounter = document.querySelector('.reason-counter');
let isTransitioning = false;

// Create reason card with gif
function createReasonCard(reason) {
    const card = document.createElement('div');
    card.className = 'reason-card';

    const text = document.createElement('div');
    text.className = 'reason-text';
    text.innerHTML = `${reason.emoji} ${reason.text}`;

    const gifOverlay = document.createElement('div');
    gifOverlay.className = 'gif-overlay';
    gifOverlay.innerHTML = `<img src="${reason.gif}" alt="Celebration">`;

    card.appendChild(text);
    card.appendChild(gifOverlay);

    gsap.from(card, {
        opacity: 0,
        y: 50,
        duration: 0.5,
        ease: "back.out"
    });

    return card;
}

// Display new reason
function displayNewReason() {
    if (isTransitioning) return;
    isTransitioning = true;

    if (currentReasonIndex < reasons.length) {
        const card = createReasonCard(reasons[currentReasonIndex]);
        reasonsContainer.appendChild(card);

        // Update counter
        reasonCounter.textContent = `Reason ${currentReasonIndex + 1} of ${reasons.length}`;

        currentReasonIndex++;

        // Check if we should transform the button
        if (currentReasonIndex === reasons.length) {
            gsap.to(shuffleButton, {
                scale: 1.1,
                duration: 0.5,
                ease: "elastic.out",
                onComplete: () => {
                    // CUSTOMIZE: Change button text
                    shuffleButton.textContent = "Continue to Timeline 💫";
                    shuffleButton.classList.add('story-mode');
                    shuffleButton.addEventListener('click', () => {
                        gsap.to('body', {
                            opacity: 0,
                            duration: 1,
                            onComplete: () => {
                                window.location.href = 'timeline.html';
                            }
                        });
                    });
                }
            });
        }

        // Create floating elements
        createFloatingElement();

        setTimeout(() => {
            isTransitioning = false;
        }, 500);
    } else {
        window.location.href = "timeline.html";
    }
}

// Initialize button click
shuffleButton.addEventListener('click', () => {
    gsap.to(shuffleButton, {
        scale: 0.9,
        duration: 0.1,
        yoyo: true,
        repeat: 1
    });
    displayNewReason();
});

// Floating elements function
// ===== FLOATING MESSAGES =====
function createFloatingElement() {

    const messages = [
        "Keep Smiling 😊",
        "You Can Do It ✨",
        "Dream Big 💫",
        "Believe In Yourself 💖",
        "Keep Growing 🌸",
        "Never Give Up 🦋",
        "Your Future Is Bright ✨",
        "Stay Happy Always 💕",
        "You're Doing Great 🌷",
        "Keep Shining ⭐"
    ];

    const element = document.createElement('div');

    element.className = 'floating-message';

    element.textContent =
        messages[Math.floor(Math.random() * messages.length)];

    element.style.left = Math.random() * window.innerWidth + 'px';
    element.style.top = window.innerHeight + 50 + 'px';

    element.style.fontSize =
        (Math.random() * 5 + 16) + 'px';

    document.body.appendChild(element);

    gsap.to(element, {
        y: -(window.innerHeight + 200),
        x: Math.random() * 200 - 100,
        duration: Math.random() * 8 + 10,
        opacity: 0,
        ease: "none",
        onComplete: () => element.remove()
    });
}

// Custom cursor
const cursor = document.querySelector('.custom-cursor');
document.addEventListener('mousemove', (e) => {
    gsap.to(cursor, {
        x: e.clientX - 15,
        y: e.clientY - 15,
        duration: 0.2
    });
});

// Create initial floating elements
setInterval(createFloatingElement, 2000);
