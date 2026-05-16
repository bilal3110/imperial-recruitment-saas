<script setup>
const cardData = [
  {
    icon: "⚔",
    label: "Total Recruits",
    value: 128000,
    trend: { type: "up", text: "+8 this week" },
    barFill: 100,
    barLabel: "128,000 / 128,000",
    prompt: "Show me the full recruits list",
    class: "total",
  },
  {
    icon: "🛡",
    label: "Loyal Soldiers",
    value: 97000,
    trend: { type: "up", text: "+4 this week" },
    barFill: 75.8,
    barLabel: "97,000 / 128,000 (76%)",
    prompt: "Show me loyal soldiers breakdown",
    class: "good",
  },
  {
    icon: "☠",
    label: "Potential Rebels",
    value: 12000,
    trend: { type: "down", text: "+3 this week" },
    barFill: 9.4,
    barLabel: "12,000 / 128,000 (9%)",
    prompt: "Show me the list of potential rebels and their threat level",
    class: "danger",
  },
  {
    icon: "⛺",
    label: "Training Camps",
    value: 43000,
    trend: { type: "neut", text: "no change" },
    barFill: 47,
    barLabel: "43,000 / 87,000 (50%)",
    prompt: "Show me the training camps and their capacity",
    class: "total",
  },
];
</script>
<template>
  <div class="kpi-root">
    <div class="kpi-header">
      <span class="kpi-header-line"></span>
      <span class="kpi-header-title">✦ &nbsp; Imperial Overview &nbsp; ✦</span>
      <span class="kpi-header-line right"></span>
    </div>

    <div class="kpi-grid">
      <div class="kpi-card" v-for="(card, index) in cardData" :key="index">
        <span class="kpi-card__icon">{{ card.icon }}</span>
        <div class="kpi-card__label">{{ card.label }}</div>
        <div class="kpi-card__value">{{ card.value }}</div>
        <div class="kpi-card__trend" :class="`trend-${card.trend.type}`">
          {{ card.trend.text }}
        </div>
        <div class="kpi-card__bar-track">
          <div
            class="kpi-card__bar-fill"
            :style="{ width: `${card.barFill}%` }"
          ></div>
        </div>
        <div class="kpi-card__bar-label">
          <span>0</span><span>{{ card.barLabel }}</span>
        </div>
        <span class="kpi-card__corner" @click="sendPrompt(card.prompt)">
          View all →
        </span>
      </div>
    </div>
  </div>
</template>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@700&family=Cinzel:wght@400;600;700&family=EB+Garamond:ital,wght@0,400;0,500;1,400&display=swap");

.kpi-root {
  --gold: #c9972a;
  --gold-light: #e8b84b;
  --gold-pale: #f5e6c0;
  --gold-dim: rgba(201, 151, 42, 0.12);
  --gold-border: rgba(201, 151, 42, 0.25);
  --ink: #1a1208;
  --ink-deep: #0f0b05;
  --parchment: #f7f0dc;
  --parchment-muted: #c8b98a;
  --text-muted: rgba(247, 240, 220, 0.45);
  --danger: #8b1a1a;
  --danger-dim: rgba(139, 26, 26, 0.15);
  --success-dim: rgba(42, 120, 60, 0.15);
  --success: #2a783c;
  font-family: "Cinzel", serif;
  padding: 0;
}

.kpi-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
}

.kpi-header-line {
  flex: 1;
  height: 1px;
  background: linear-gradient(90deg, var(--gold-border), transparent);
}

.kpi-header-line.right {
  background: linear-gradient(90deg, transparent, var(--gold-border));
}

.kpi-header-title {
  font-family: "Cinzel", serif;
  font-size: 9px;
  letter-spacing: 0.35em;
  text-transform: uppercase;
  color: var(--gold);
  opacity: 0.7;
  white-space: nowrap;
}

.kpi-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 14px;
}

.kpi-card {
  background: var(--parchment);
  border: 1px solid var(--gold-border);
  border-radius: 3px;
  padding: 18px 20px 16px;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  transition:
    transform 0.2s,
    box-shadow 0.2s,
    border-color 0.2s;
  text-decoration: none;
}

.kpi-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--gold);
  opacity: 0.4;
}

.kpi-card.danger::before {
  background: var(--danger);
  opacity: 0.6;
}
.kpi-card.good::before {
  background: var(--success);
  opacity: 0.5;
}

.kpi-card:hover {
  transform: translateY(-2px);
  border-color: rgba(201, 151, 42, 0.55);
  box-shadow:
    0 8px 24px rgba(15, 11, 5, 0.18),
    0 0 0 1px rgba(201, 151, 42, 0.15);
}

.kpi-card__icon {
  font-size: 18px;
  margin-bottom: 10px;
  display: block;
  opacity: 0.55;
  color: var(--ink);
}
.kpi-card.danger .kpi-card__icon {
  color: var(--danger);
  opacity: 0.7;
}
.kpi-card.good .kpi-card__icon {
  color: var(--success);
  opacity: 0.7;
}

.kpi-card__label {
  font-family: "Cinzel", serif;
  font-size: 9px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--ink);
  opacity: 0.5;
  margin-bottom: 6px;
}

.kpi-card__value {
  font-family: "Cinzel Decorative", serif;
  font-size: 28px;
  font-weight: 700;
  color: var(--ink-deep);
  line-height: 1;
  margin-bottom: 10px;
}

.kpi-card.danger .kpi-card__value {
  color: var(--danger);
}
.kpi-card.good .kpi-card__value {
  color: var(--success);
}

.kpi-card__trend {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-family: "EB Garamond", serif;
  font-size: 12px;
  font-style: italic;
  padding: 2px 8px;
  border-radius: 2px;
  margin-bottom: 12px;
}

.trend-up {
  background: var(--success-dim);
  color: var(--success);
}
.trend-down {
  background: var(--danger-dim);
  color: var(--danger);
}
.trend-neut {
  background: var(--gold-dim);
  color: var(--ink);
  opacity: 0.6;
}

.kpi-card__bar-track {
  height: 3px;
  background: rgba(26, 18, 8, 0.1);
  border-radius: 2px;
  overflow: hidden;
  margin-top: 4px;
}

.kpi-card__bar-fill {
  height: 100%;
  border-radius: 2px;
  background: var(--gold);
  transition: width 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

.kpi-card.danger .kpi-card__bar-fill {
  background: var(--danger);
}
.kpi-card.good .kpi-card__bar-fill {
  background: var(--success);
}

.kpi-card__bar-label {
  display: flex;
  justify-content: space-between;
  margin-top: 5px;
  font-family: "EB Garamond", serif;
  font-size: 11px;
  color: var(--ink);
  opacity: 0.4;
}

.kpi-card__corner {
  position: absolute;
  bottom: 10px;
  right: 12px;
  font-size: 9px;
  font-family: "Cinzel", serif;
  letter-spacing: 0.15em;
  color: var(--gold);
  opacity: 0.35;
  text-transform: uppercase;
  text-decoration: none;
}

.kpi-card__corner:hover {
  opacity: 0.7;
}
</style>
