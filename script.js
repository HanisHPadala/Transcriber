// Initialize variables for speech recognition and note storage
let recognition;
let isRecording = false;
const transcriptElement = document.getElementById("transcript");
const themeCheckbox = document.getElementById("theme-checkbox");

// Set placeholder text initially
transcriptElement.classList.add("placeholder");
transcriptElement.innerText = "Your transcription will appear here...";

// Function to clear placeholder when transcription starts
function clearPlaceholder() {
    if (transcriptElement.innerText === "Your transcription will appear here...") {
        transcriptElement.innerText = "";
        transcriptElement.classList.remove("placeholder");
    }
}

// Function to restore placeholder if transcription is empty
function restorePlaceholder() {
    if (transcriptElement.innerText.trim() === "") {
        transcriptElement.classList.add("placeholder");
        transcriptElement.innerText = "Your transcription will appear here...";
    }
}

// Check if browser supports speech recognition
if ('webkitSpeechRecognition' in window) {
    recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onresult = (event) => {
        clearPlaceholder();
        let interimTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
                transcriptElement.innerText += transcript + ' ';
            } else {
                interimTranscript += transcript;
            }
        }
    };

    recognition.onend = () => {
        isRecording = false;
        document.getElementById("start-btn").innerText = "Start Transcription";
        restorePlaceholder();
    };
} else {
    alert("Your browser does not support speech recognition.");
}

// Toggle transcription on button click
document.getElementById("start-btn").addEventListener("click", () => {
    if (!isRecording) {
        clearPlaceholder();
        recognition.start();
        isRecording = true;
        document.getElementById("start-btn").innerText = "Stop Transcription";
    } else {
        recognition.stop();
        isRecording = false;
        document.getElementById("start-btn").innerText = "Start Transcription";
    }
});

// Save the transcript as a downloadable .txt file
document.getElementById("save-btn").addEventListener("click", () => {
    const note = transcriptElement.innerText.trim();
    if (note) {
        const blob = new Blob([note], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "transcription.txt";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        transcriptElement.innerText = "";  // Clear the transcript after saving
        alert("Note saved as transcription.txt!");
        restorePlaceholder();
    } else {
        alert("No transcription to save.");
    }
});

// Toggle dark and light themes
themeCheckbox.addEventListener("change", () => {
    document.body.classList.toggle("dark-theme");
    document.body.classList.toggle("light-theme");
});

// Set initial theme to light
document.body.classList.add("light-theme");
 function toggleMenu() {
    // Toggle active class on hamburger icon
    document.querySelector('.hamburger').classList.toggle('active');
    // Toggle active class on overlay
    document.getElementById('overlay').classList.toggle('active');
    // Toggle active class on navigation panel
    document.getElementById('navPanel').classList.toggle('active');
  }

  // Close the menu when clicking outside
  document.getElementById('overlay').addEventListener('click', toggleMenu);