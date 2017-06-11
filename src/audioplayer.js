try {
  // Fix up for prefixing
  window.AudioContext = window.AudioContext||window.webkitAudioContext;
  context = new AudioContext();
}
catch(e) {
  alert('Web Audio API is not supported in this browser');
}
