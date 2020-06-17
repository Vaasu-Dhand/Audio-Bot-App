const play = document.getElementById('btn-play');
const pause = document.getElementById('btn-pause');
const stop = document.getElementById('btn-stop');
const speed = document.getElementById('speed');
const input = document.getElementById('input');
let currentCharacter;

const utterance = new SpeechSynthesisUtterance(input);

utterance.addEventListener('end', () => {
    input.disabled = false;
})
utterance.addEventListener('boundary', e => {
    currentCharacter = e.charIndex
})

play.addEventListener('click', () => {
    playText(input.value)
})

function playText(text) {
    if (speechSynthesis.paused && speechSynthesis.speaking) {
        return speechSynthesis.resume();
    }
    if (speechSynthesis.speaking) return
    utterance.text = text
    utterance.rate = speed.value || 1;
    input.disabled = true;
    speechSynthesis.speak(utterance);
}

pause.addEventListener('click', () => {
    if (speechSynthesis.speaking) speechSynthesis.pause();  
})

stop.addEventListener('click', () => stopText())

speed.addEventListener('click', 
    stopText()
)

function stopText() {
    speechSynthesis.resume()
    speechSynthesis.cancel()
}

speed.addEventListener('input', () => {
    stopText()
    playText(utterance.text.substring(currentCharacter));
})

//For Setting the background colors
function getRandomColor() {
    return (Math.floor(Math.random() * (255 - 10)) + 10);
}

function changeColor(){
    let color = `rgb(${getRandomColor()}, ${getRandomColor()}, ${getRandomColor()})`;
    document.body.style.background = color
}    
setInterval(changeColor, 
    1000);
