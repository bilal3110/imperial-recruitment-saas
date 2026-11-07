<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { Volume2, VolumeX, FastForward } from "lucide-vue-next";
import { gsap } from "gsap";
import {
  toggleImperialAudio,
  getAudioState,
  playGateCreakChime,
} from "@/utils/audio";

const visible = ref(false);
const scene = ref(1); // 1 = Imperial Seal, 2 = Court Doors, 3 = Opening/Entered
const isAudioOn = ref(false);

const leftDoorRef = ref(null);
const rightDoorRef = ref(null);
const sealRef = ref(null);
const seamLightRef = ref(null);
const overlayRef = ref(null);

let timeline = null;

function handleSkip() {
  if (timeline) timeline.kill();
  finishIntro();
}

function finishIntro() {
  visible.value = false;
  try {
    sessionStorage.setItem("janissaries_intro_seen", "true");
  } catch (e) {}
}

function handleAudioToggle() {
  isAudioOn.value = toggleImperialAudio();
}

function runSequence() {
  visible.value = true;
  scene.value = 1;

  // Check prefers-reduced-motion
  if (
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    finishIntro();
    return;
  }

  // GSAP 3-Scene Timeline
  timeline = gsap.timeline({
    onComplete: () => {
      finishIntro();
    },
  });

  // Scene 1: Imperial Seal appears in darkness
  timeline.fromTo(
    sealRef.value,
    { opacity: 0, scale: 0.92, filter: "blur(8px)" },
    {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      duration: 1.4,
      ease: "power2.out",
      delay: 0.2,
    },
  );

  timeline.to(sealRef.value, {
    opacity: 0,
    scale: 1.08,
    duration: 0.9,
    delay: 1.2,
    ease: "power2.in",
    onComplete: () => {
      scene.value = 2;
    },
  });

  // Scene 2: Palace doors materialize, raking light on carved walnut
  timeline.fromTo(
    [leftDoorRef.value, rightDoorRef.value],
    { opacity: 0, scale: 1.05 },
    { opacity: 1, scale: 1, duration: 1.1, ease: "power2.out" },
    "+=0.1",
  );

  // Golden seam light intensifies
  timeline.fromTo(
    seamLightRef.value,
    { opacity: 0, scaleY: 0 },
    {
      opacity: 1,
      scaleY: 1,
      duration: 0.8,
      ease: "power3.out",
      onStart: () => {
        playGateCreakChime();
      },
    },
  );

  // Scene 3: Doors swing open wide into the court with 3D perspective
  timeline.to(
    seamLightRef.value,
    {
      opacity: 0,
      duration: 0.6,
    },
    "+=0.2",
  );

  timeline.to(
    leftDoorRef.value,
    {
      rotateY: -85,
      x: "-12%",
      duration: 2.2,
      ease: "power3.inOut",
    },
    "<",
  );

  timeline.to(
    rightDoorRef.value,
    {
      rotateY: 85,
      x: "12%",
      duration: 2.2,
      ease: "power3.inOut",
    },
    "<",
  );

  timeline.to(overlayRef.value, {
    opacity: 0,
    duration: 0.8,
    delay: 0.8,
    ease: "power2.inOut",
  });
}

function listenForReplay() {
  window.addEventListener("janissaries:replay-intro", () => {
    runSequence();
  });
}

onMounted(() => {
  listenForReplay();
  const seen = sessionStorage.getItem("janissaries_intro_seen");
  if (!seen) {
    runSequence();
  }
});

onUnmounted(() => {
  if (timeline) timeline.kill();
});
</script>

<template>
  <div
    v-if="visible"
    ref="overlayRef"
    class="imperial-gate-overlay"
    role="dialog"
    aria-label="The Imperial Court Opening Sequence"
  >
    <!-- Controls Top Bar -->
    <div class="intro-controls">
      <button
        class="ctrl-btn audio-btn"
        :class="{ active: isAudioOn }"
        @click="handleAudioToggle"
        :aria-label="
          isAudioOn ? 'Mute imperial sound' : 'Enable imperial court ambiance'
        "
      >
        <Volume2 v-if="isAudioOn" :size="15" />
        <VolumeX v-else :size="15" />
        <span>{{ isAudioOn ? "Sound On" : "Court Ambiance" }}</span>
      </button>

      <button
        class="ctrl-btn skip-btn"
        @click="handleSkip"
        aria-label="Skip introductory gate animation"
      >
        <span>Enter Court</span>
        <FastForward :size="14" />
      </button>
    </div>

    <!-- Scene 1: Imperial Seal -->
    <div v-show="scene === 1" ref="sealRef" class="seal-container">
      <div class="tughra-crest">
        <svg
          class="tughra-svg"
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <!-- Stylized Imperial Tughra lines -->
          <circle
            cx="100"
            cy="100"
            r="92"
            stroke="url(#goldGrad)"
            stroke-width="2"
            stroke-dasharray="4 6"
          />
          <circle
            cx="100"
            cy="100"
            r="84"
            stroke="url(#goldGrad)"
            stroke-width="1.2"
          />
          <!-- Crescent & Star Motif -->
          <path
            d="M125 70 C85 75 75 125 115 145 C75 140 60 90 100 65 C108 60 118 63 125 70 Z"
            fill="url(#goldGrad)"
          />
          <polygon
            points="128,100 133,108 143,108 135,114 138,124 130,118 122,124 125,114 117,108 127,108"
            fill="url(#goldGrad)"
          />
          <!-- Calligraphic strokes -->
          <path
            d="M45 130 C75 105 135 105 160 130 M55 140 C85 118 125 118 150 140"
            stroke="url(#goldGrad)"
            stroke-width="2.5"
            stroke-linecap="round"
          />
          <path
            d="M90 40 L90 145 M102 35 L102 145 M114 42 L114 140"
            stroke="url(#goldGrad)"
            stroke-width="2"
            stroke-linecap="round"
          />
          <defs>
            <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#E5C378" />
              <stop offset="50%" stop-color="#B99A5B" />
              <stop offset="100%" stop-color="#7C5D23" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div class="seal-text">
        <span class="seal-eyebrow">Devlet-i Aliyye-i Osmâniyye</span>
        <h1 class="seal-brand">JANISSARIES</h1>
        <div class="seal-line">
          <span class="star">✦</span>
          <p class="decree">By Imperial Decree</p>
          <span class="star">✦</span>
        </div>
        <p class="seal-sub">The Sublime Porte Opens Its Registry</p>
      </div>
    </div>

    <!-- Scene 2 & 3: The Massive Ottoman Palace Doors -->
    <div v-show="scene >= 2" class="doors-stage">
      <!-- Seam Golden Light Burst -->
      <div ref="seamLightRef" class="door-seam-light"></div>

      <!-- Left Door Leaf -->
      <div ref="leftDoorRef" class="door-leaf door-left">
        <div class="door-texture left-texture"></div>
        <div class="door-frame-overlay">
          <div class="door-boss boss-top"></div>
          <div class="door-ring-knocker knocker-left"></div>
          <div class="door-boss boss-bottom"></div>
        </div>
        <div class="door-shadow-edge edge-right"></div>
      </div>

      <!-- Right Door Leaf -->
      <div ref="rightDoorRef" class="door-leaf door-right">
        <div class="door-texture right-texture"></div>
        <div class="door-frame-overlay">
          <div class="door-boss boss-top"></div>
          <div class="door-ring-knocker knocker-right"></div>
          <div class="door-boss boss-bottom"></div>
        </div>
        <div class="door-shadow-edge edge-left"></div>
      </div>

      <!-- Outer Arch Frame (Topkapi Stone Arches) -->
      <div class="arch-surround">
        <div class="arch-keystone">
          <span>1299</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.imperial-gate-overlay {
  position: fixed;
  inset: 0;
  z-index: 9990;
  background: #070504;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  perspective: 1600px;
}

/* Controls */
.intro-controls {
  position: absolute;
  top: 28px;
  left: 32px;
  right: 32px;
  z-index: 9999;
  display: flex;
  justify-content: space-between;
  align-items: center;
  pointer-events: auto;
}

.ctrl-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(15, 11, 8, 0.75);
  border: 1px solid var(--gold-border);
  color: var(--parchment);
  padding: 10px 18px;
  font-family: var(--font-heading);
  font-size: 11px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  backdrop-filter: blur(8px);
  transition: all 0.25s var(--ease-imperial);
}
.ctrl-btn:hover {
  background: var(--gold-dim);
  border-color: var(--gold);
  color: var(--gold-pale);
}
.ctrl-btn.active {
  border-color: var(--gold-bright);
  color: var(--gold-bright);
}

/* Scene 1: Imperial Seal */
.seal-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 650px;
  padding: 20px;
  z-index: 10;
}

.tughra-crest {
  width: 140px;
  height: 140px;
  margin-bottom: 28px;
  filter: drop-shadow(0 0 25px rgba(212, 175, 55, 0.35));
}
.tughra-svg {
  width: 100%;
  height: 100%;
}

.seal-eyebrow {
  display: block;
  font-family: var(--font-heading);
  font-size: 12px;
  letter-spacing: 0.35em;
  text-transform: uppercase;
  color: var(--gold);
  margin-bottom: 12px;
  opacity: 0.85;
}

.seal-brand {
  font-family: var(--font-display);
  font-size: clamp(38px, 6vw, 68px);
  font-weight: 900;
  letter-spacing: 0.22em;
  color: var(--gold-pale);
  margin: 0;
  text-shadow: 0 0 35px rgba(185, 154, 91, 0.4);
}

.seal-line {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin: 18px 0 12px;
  color: var(--gold);
}
.seal-line .star {
  font-size: 10px;
  opacity: 0.8;
}
.seal-line .decree {
  margin: 0;
  font-family: var(--font-serif);
  font-size: 21px;
  font-style: italic;
  color: var(--parchment);
}

.seal-sub {
  margin: 0;
  font-family: var(--font-sans);
  font-size: 11px;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: var(--muted);
}

/* Scene 2 & 3: Doors */
.doors-stage {
  position: absolute;
  inset: 0;
  display: flex;
  perspective: 1500px;
  overflow: hidden;
}

.door-leaf {
  position: relative;
  width: 50.1%;
  height: 100%;
  transform-style: preserve-3d;
  background-color: #17110c;
  overflow: hidden;
}

.door-left {
  transform-origin: left center;
}
.door-right {
  transform-origin: right center;
}

/* Authentic Carved Walnut Door Texture from generated palace doors */
.door-texture {
  position: absolute;
  inset: 0;
  background-image: url("/images/palace-doors.jpg");
  background-size: 200% 100%;
  filter: contrast(1.15) brightness(0.92);
}
.left-texture {
  background-position: left center;
}
.right-texture {
  background-position: right center;
}

/* Ornamental Accents & Knockers */
.door-frame-overlay {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.door-boss {
  position: absolute;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: radial-gradient(circle, #d4af37 0%, #7a5b1f 70%, #2a1d0d 100%);
  border: 2px solid rgba(255, 230, 160, 0.4);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.7);
}
.boss-top {
  top: 18%;
  left: 50%;
  transform: translateX(-50%);
}
.boss-bottom {
  bottom: 22%;
  left: 50%;
  transform: translateX(-50%);
}

.door-ring-knocker {
  position: absolute;
  top: 50%;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 10px solid #b99a5b;
  box-shadow:
    0 8px 25px rgba(0, 0, 0, 0.8),
    inset 0 2px 6px rgba(255, 255, 255, 0.3);
  transform: translateY(-50%);
}
.knocker-left {
  right: 18%;
}
.knocker-right {
  left: 18%;
}

/* Door Seam Light */
.door-seam-light {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  width: 6px;
  transform: translateX(-50%);
  background: linear-gradient(
    180deg,
    rgba(255, 230, 160, 0.2) 0%,
    rgba(255, 245, 210, 1) 50%,
    rgba(255, 230, 160, 0.2) 100%
  );
  box-shadow: 0 0 35px 12px rgba(212, 175, 55, 0.85);
  z-index: 20;
  pointer-events: none;
}

.door-shadow-edge {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 30px;
  pointer-events: none;
}
.edge-right {
  right: 0;
  background: linear-gradient(90deg, transparent, rgba(0, 0, 0, 0.7));
}
.edge-left {
  left: 0;
  background: linear-gradient(270deg, transparent, rgba(0, 0, 0, 0.7));
}

/* Arch Frame */
.arch-surround {
  position: absolute;
  inset: 0;
  pointer-events: none;
  border: 24px solid #1c1713;
  box-shadow: inset 0 0 50px rgba(0, 0, 0, 0.9);
  z-index: 15;
}
.arch-keystone {
  position: absolute;
  top: -2px;
  left: 50%;
  transform: translateX(-50%);
  background: #2d231c;
  border: 1px solid var(--gold-border);
  padding: 6px 20px;
  font-family: var(--font-heading);
  font-size: 10px;
  letter-spacing: 0.25em;
  color: var(--gold);
}

@media (max-width: 768px) {
  .intro-controls {
    top: 18px;
    left: 16px;
    right: 16px;
  }
  .arch-surround {
    border-width: 10px;
  }
  .door-ring-knocker {
    width: 50px;
    height: 50px;
    border-width: 6px;
  }
}
</style>
