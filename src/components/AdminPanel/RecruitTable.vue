<script setup>
import { ref } from "vue";
const recruits = ref([
  { name: "Ali", age: 19, province: "Anatolia", skill: "Sword", loyalty: 82 },
  {
    name: "Mehmet",
    age: 22,
    province: "Balkans",
    skill: "Archery",
    loyalty: 41,
  },
  {
    name: "Fatima",
    age: 18,
    province: "Cappadocia",
    skill: "Spearman",
    loyalty: 58,
  },
]);

const selectedRecruit = ref(null);

function selectRecruit(recruit) {
  console.log("Selected recruit:", recruit);
  selectedRecruit.value = recruit;
}


function approveRecruit() {
    if (selectedRecruit.value) {
        console.log("Approved recruit:", selectedRecruit.value);

        selectedRecruit.value.loyalty += 10; 
    }
    }

function rejectRecruit() {
    if (selectedRecruit.value) {
        console.log("Rejected recruit:", selectedRecruit.value);
        
        selectedRecruit.value.loyalty -= 20;
    }
}
</script>

<template>
  <div class="recruit-root">
    <div class="recruit-grid">
      <section class="recruit-panel">
        <div class="recruit-header">
          <span class="recruit-header-line"></span>
          <span class="recruit-header-title"
            >✦ &nbsp; Janissaries List &nbsp; ✦</span
          >
          <span class="recruit-header-line right"></span>
        </div>

        <div class="table-wrapper">
          <table class="recruit-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Age</th>
                <th>Province</th>
                <th>Skill</th>
                <th>Loyalty</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="recruit in recruits"
                :key="recruit.name"
                @click="selectRecruit(recruit)"
                :class="{ selected: selectedRecruit?.name === recruit.name }"
              >
                <td>{{ recruit.name }}</td>
                <td>{{ recruit.age }}</td>
                <td>{{ recruit.province }}</td>
                <td>{{ recruit.skill }}</td>
                <td>
                  <span
                    :class="`loyalty-badge ${recruit.loyalty > 50 ? 'good' : 'bad'}`"
                  >
                    {{ recruit.loyalty }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
      <aside class="recruit-side">
        <h2>Recruit Details</h2>
        <div v-if="selectedRecruit">
          <p><strong>Name:</strong> {{ selectedRecruit.name }}</p>
          <p><strong>Age:</strong> {{ selectedRecruit.age }}</p>
          <p><strong>Province:</strong> {{ selectedRecruit.province }}</p>
          <p><strong>Skill:</strong> {{ selectedRecruit.skill }}</p>
          <p><strong>Loyalty:</strong> {{ selectedRecruit.loyalty }}</p>

          <div class="btns">
            <button class="approve" @click="approveRecruit">Approve</button>
            <button class="reject" @click="rejectRecruit">Reject</button>
          </div>
        </div>
        <div
          v-else
          style="
            color: var(--ink);
            opacity: 0.7;
            font-style: italic;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;
            text-align: center;
          "
        >
          <p>Select a recruit to see details and actions.</p>
        </div>
      </aside>
    </div>
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@700&family=Cinzel:wght@400;600;700&family=EB+Garamond:ital,wght@0,400;0,500;1,400&display=swap");

.recruit-root {
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
  color: var(--ink-deep);
}

.recruit-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.8fr) minmax(280px, 1fr);
  gap: 20px;
  margin-top: 40px;
}

.recruit-panel,
.recruit-side {
  background: var(--parchment);
  border: 1px solid var(--gold-border);
  border-radius: 14px;
  padding: 22px;
  box-shadow: 0 18px 34px rgba(15, 11, 5, 0.08);
}

.recruit-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 22px;
}

.recruit-header-line {
  flex: 1;
  height: 1px;
  background: linear-gradient(90deg, var(--gold-border), transparent);
}

.recruit-header-line.right {
  background: linear-gradient(90deg, transparent, var(--gold-border));
}

.recruit-header-title {
  font-family: "Cinzel", serif;
  font-size: 10px;
  letter-spacing: 0.35em;
  text-transform: uppercase;
  color: var(--gold);
  opacity: 0.8;
  white-space: nowrap;
}

.table-wrapper {
  overflow-x: hidden;
}

.recruit-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  min-width: 680px;
}

.recruit-table tbody tr {
  cursor: pointer;
}

.recruit-table tbody tr.selected {
  background: rgba(201, 151, 42, 0.14);
}

.recruit-table th,
.recruit-table td {
  padding: 16px 14px;
  text-align: left;
  border-bottom: 1px solid rgba(26, 18, 8, 0.08);
}

.recruit-table th {
  color: var(--ink);
  opacity: 0.65;
  text-transform: uppercase;
  font-size: 11px;
  letter-spacing: 0.18em;
  background: rgba(247, 240, 220, 0.65);
  border-bottom: 1px solid rgba(201, 151, 42, 0.2);
}

.recruit-table tbody tr:last-child td {
  border-bottom: none;
}

.recruit-table tbody tr:hover {
  background: rgba(201, 151, 42, 0.08);
}

.status-pill,
.loyalty-badge {
  display: inline-flex;
  align-items: center;
  padding: 6px 12px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
}

.loyalty-badge {
  background: rgba(26, 18, 8, 0.07);
  color: var(--ink-deep);
}

.loyalty-badge.good {
  background: var(--success-dim);
  color: var(--success);
}

.loyalty-badge.bad {
  background: var(--danger-dim);
  color: var(--danger);
}

.status-pill {
  background: rgba(201, 151, 42, 0.12);
  color: var(--ink-deep);
}

.status-pill.approved {
  background: var(--success-dim);
  color: var(--success);
}

.status-pill.suspicious {
  background: var(--danger-dim);
  color: var(--danger);
}

.status-pill.pending {
  background: rgba(255, 179, 0, 0.15);
  color: #7a5b07;
}

.recruit-side h2 {
  font-family: "Cinzel Decorative", serif;
  font-size: 22px;
  margin-bottom: 18px;
  color: var(--ink-deep);
}

.recruit-side p {
  margin: 10px 0;
  line-height: 1.6;
  color: var(--ink);
}

.recruit-side strong {
  color: var(--ink-deep);
}

.btns {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-top: 24px;
}

button {
  border: 1px solid var(--gold-border);
  border-radius: 999px;
  padding: 11px 18px;
  font-family: "Cinzel", serif;
  font-size: 13px;
  cursor: pointer;
  transition:
    transform 0.18s ease,
    box-shadow 0.18s ease;
}

button.approve {
  background: var(--success);
  color: white;
  border-color: rgba(42, 120, 60, 0.35);
}

button.reject {
  background: var(--danger);
  color: white;
  border-color: rgba(139, 26, 26, 0.35);
}

button:hover {
  transform: translateY(-1px);
  box-shadow: 0 10px 20px rgba(15, 11, 5, 0.12);
}
</style>
