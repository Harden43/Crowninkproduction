// document.addEventListener('DOMContentLoaded', function() {
//     let currentSound = null;
//     let currentPlayBtn = null;
//
//     function resetPlayButton(btn) {
//         btn.textContent = '▶ Play';
//         btn.classList.remove('playing');
//     }
//
//     document.querySelectorAll('.play-btn').forEach(btn => {
//         btn.addEventListener('click', function() {
//             const audioUrl = this.dataset.audio;
//
//             if (currentSound && currentPlayBtn === this) {
//                 // Stop current playing sound
//                 currentSound.stop();
//                 currentSound = null;
//                 resetPlayButton(this);
//                 return;
//             }
//
//             // Stop previous sound if exists
//             if (currentSound) {
//                 currentSound.stop();
//                 resetPlayButton(currentPlayBtn);
//             }
//
//             // Play new sound
//             currentSound = new Howl({
//                 src: [audioUrl],
//                 format: ['mp3'],
//                 onend: function() {
//                     resetPlayButton(btn);
//                     currentSound = null;
//                 }
//             });
//
//             currentSound.play();
//             this.textContent = '⏸ Pause';
//             this.classList.add('playing');
//             currentPlayBtn = this;
//         });
//     });
//
//     document.querySelectorAll('.buy-btn').forEach(btn => {
//         btn.addEventListener('click', function() {
//             const beatId = this.dataset.id;
//             // Implement purchase functionality
//             console.log(`Purchasing beat ${beatId}`);
//         });
//     });
// });


document.addEventListener("DOMContentLoaded", () => {
    const playButtons = document.querySelectorAll(".play-btn");

    playButtons.forEach((button) => {
        let sound;
        button.addEventListener("click", () => {
            const audioUrl = button.getAttribute("data-audio");

            if (!sound) {
                sound = new Howl({
                    src: [audioUrl],
                    html5: true, // Enable streaming for larger files
                    onload: () => {
                        const parent = button.closest(".beat-controls");
                        const durationElem = parent.querySelector(".duration");
                        durationElem.textContent = formatTime(sound.duration());
                    },
                    onplay: () => {
                        requestAnimationFrame(updateProgress);
                    }
                });
            }

            if (sound.playing()) {
                sound.pause();
                button.textContent = "▶ Play";
            } else {
                sound.play();
                button.textContent = "⏸ Pause";
            }

            const updateProgress = () => {
                const parent = button.closest(".beat-controls");
                const progressBar = parent.querySelector(".progress-bar");
                const currentTimeElem = parent.querySelector(".current-time");

                progressBar.value = (sound.seek() / sound.duration()) * 100;
                currentTimeElem.textContent = formatTime(sound.seek());

                if (sound.playing()) {
                    requestAnimationFrame(updateProgress);
                }
            };

            const progressBar = button.closest(".beat-controls").querySelector(".progress-bar");
            progressBar.addEventListener("input", (e) => {
                const seekTime = (e.target.value / 100) * sound.duration();
                sound.seek(seekTime);
            });
        });
    });

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
    };
});


// cursor

document.addEventListener("DOMContentLoaded", () => {
    const customCursor = document.querySelector(".custom-cursor");

    document.addEventListener("mousemove", (e) => {
        customCursor.style.left = `${e.pageX}px`;
        customCursor.style.top = `${e.pageY}px`;
    });

    document.addEventListener("mousedown", () => {
        customCursor.style.transform = "scale(1.5)"; // Enlarge on click
    });

    document.addEventListener("mouseup", () => {
        customCursor.style.transform = "scale(1)"; // Restore size
    });
});
