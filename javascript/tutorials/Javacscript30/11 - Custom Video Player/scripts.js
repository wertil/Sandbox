// Get Elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

// Build Functions
function togglePlay() {
    if (video.paused) {
        video.play()
    } else {
        video.pause()
    }
}

function updateButton() {
    const icon = this.paused ? '►' : '❚ ❚'
    toggle.textContent = icon
}

function skip() {
    video.currentTime += parseFloat(this.dataset.skip)
}

function handleRangeUpdate() {
    video[this.name] = this.value
}

function handleProgress() {
    const percent =  (video.currentTime / video.duration) * 100
    progressBar.style.flexBasis = `${percent}%`
}

function scrub(e) {
    const progressVideo = e.offsetX / progress.offsetWidth
    video.currentTime = video.duration * progressVideo
}

// Hook up the event listeners
video.addEventListener("click", togglePlay)
video.addEventListener("play", updateButton)
video.addEventListener("pause", updateButton)
video.addEventListener("timeupdate", handleProgress)
toggle.addEventListener("click", togglePlay)
skipButtons.forEach(button => button.addEventListener("click", skip))
ranges.forEach(range => range.addEventListener("click", handleRangeUpdate))
ranges.forEach(range => range.addEventListener("mousemove", handleRangeUpdate))
let mouseDown = false
progress.addEventListener("click", scrub)
progress.addEventListener("mousemove", e => mouseDown && scrub(e))
progress.addEventListener("mousedown", () => mouseDown = true)
progress.addEventListener("mouseup", () => mouseDown = false)
