// Get elements
const popup = document.getElementById('popup');
const overlay = document.getElementById('overlay');
const callBtn = document.getElementById('callBtn');
const alertSound = document.getElementById('alertSound');

// Repeat alert sound every 5 seconds
function playAlertSound() {
  alertSound.play();
  setTimeout(playAlertSound, 5000);
}

// Start female voice speech alert repeatedly
function speakAlert() {
  if (!('speechSynthesis' in window)) return;

  const utterance = new SpeechSynthesisUtterance("Virus Alert! Android support call!");
  utterance.lang = 'en-US';

  // Try to select a female voice
  const voices = speechSynthesis.getVoices();
  const femaleVoice = voices.find(v => v.lang.startsWith('en') && v.name.toLowerCase().includes('female'));
  if (femaleVoice) utterance.voice = femaleVoice;

  utterance.rate = 1;
  utterance.pitch = 1;

  utterance.onend = () => {
    setTimeout(speakAlert, 4000); // repeat after 4 seconds
  };

  speechSynthesis.speak(utterance);
}

// On load
window.onload = () => {
  playAlertSound();
  speakAlert();

  // Try to enter fullscreen (browser may block it)
  if (document.documentElement.requestFullscreen) {
    document.documentElement.requestFullscreen().catch(() => {});
  }

  // Prevent back navigation
  history.pushState(null, null, location.href);
  window.onpopstate = () => {
    history.go(1);
  };
};

// Call button event - open dialer with Android support number
callBtn.addEventListener('click', () => {
  alertSound.play();
  window.location.href = "tel:+18001234567"; // Android support number
});
