// Web Audio API synthesized atmospheric court ambiance & imperial chime
let audioCtx = null;
let ambientGain = null;
let isAudioEnabled = false;

export function initAudio() {
  if (typeof window === 'undefined') return;
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) {
      audioCtx = new AudioContext();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
}

export function toggleImperialAudio() {
  initAudio();
  if (!audioCtx) return false;
  isAudioEnabled = !isAudioEnabled;
  if (isAudioEnabled) {
    playCourtDrone();
    playGateCreakChime();
  } else {
    stopCourtDrone();
  }
  return isAudioEnabled;
}

export function getAudioState() {
  return isAudioEnabled;
}

export function playGateCreakChime() {
  if (!isAudioEnabled || !audioCtx) return;
  try {
    const now = audioCtx.currentTime;
    // Resonant brass gong / palace chime harmonic
    const fundamental = 110; // A2 deep resonance
    const freqs = [fundamental, fundamental * 1.5, fundamental * 2.76, fundamental * 4.2];
    
    freqs.forEach((f, idx) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      const filter = audioCtx.createBiquadFilter();

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(600, now);
      filter.frequency.exponentialRampToValueAtTime(120, now + 3.5);

      osc.type = idx === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(f, now);

      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.08 / (idx + 1), now + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.8);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start(now);
      osc.stop(now + 4.0);
    });
  } catch (e) {
    // Graceful fallback
  }
}

export function playSealClick() {
  if (!isAudioEnabled || !audioCtx) return;
  try {
    const now = audioCtx.currentTime;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(320, now);
    osc.frequency.exponentialRampToValueAtTime(140, now + 0.2);

    gain.gain.setValueAtTime(0.05, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start(now);
    osc.stop(now + 0.3);
  } catch (e) {}
}

function playCourtDrone() {
  if (!audioCtx) return;
  try {
    const now = audioCtx.currentTime;
    ambientGain = audioCtx.createGain();
    ambientGain.gain.setValueAtTime(0.0001, now);
    ambientGain.gain.linearRampToValueAtTime(0.035, now + 2);

    const osc1 = audioCtx.createOscillator();
    osc1.type = 'sawtooth';
    osc1.frequency.setValueAtTime(55, now); // A1 deep drone

    const osc2 = audioCtx.createOscillator();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(82.5, now); // E2 fifth

    const filter = audioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(180, now);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(ambientGain);
    ambientGain.connect(audioCtx.destination);

    osc1.start(now);
    osc2.start(now);
  } catch (e) {}
}

function stopCourtDrone() {
  if (ambientGain && audioCtx) {
    try {
      const now = audioCtx.currentTime;
      ambientGain.gain.linearRampToValueAtTime(0.0001, now + 0.6);
      setTimeout(() => {
        ambientGain = null;
      }, 700);
    } catch (e) {}
  }
}
