<script setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import { 
  Users, MapPin, ShieldAlert, Award, FileSpreadsheet, 
  Coins, Compass, Scroll, ArrowRight, Eye, CheckCircle2 
} from 'lucide-vue-next';

const modules = [
  {
    num: "01",
    title: "Recruitment & Personnel Records",
    icon: Users,
    desc: "Candidate profiles, recruitment stages, and service histories tracked across all thirty-two eyalets. Automated Eşkâl Defteri registry synchronization eliminates missing sheepskin scrolls.",
    satire: "No candidate lost to bureaucratic confusion since the conquest of Rhodes."
  },
  {
    num: "02",
    title: "Provincial Governance & Quotas",
    icon: MapPin,
    desc: "Centralized intelligence dashboards for Anatolia, Rumelia, Egypt, the Levant, and the Danube frontier. Monitor local tax yields, grain reserves, and troop muster readiness before governors submit couriers.",
    satire: "Find out your regional pasha is skimming before he builds a second seaside pavilion."
  },
  {
    num: "03",
    title: "Military Divisions Matrix",
    icon: ShieldAlert,
    desc: "Personnel classification by branch and rank: Yeniçeri infantry, Sipahi heavy cavalry, Topçu siege gunners, and Cebeci royal armorers. Automated Orta unit rebalancing for upcoming campaigns.",
    satire: "Never accidentally send three thousand archers without bowstrings to a siege again."
  },
  {
    num: "04",
    title: "Loyalty Intelligence & Coup Forecasting",
    icon: Eye,
    desc: "Predictive behavioral analytics measuring unrest indicators, disciplinary reprimands, and soup-cauldron stability. Real-time alerts when regimental dissatisfaction reaches dangerous thresholds.",
    satire: "Because trusting everyone in the imperial palace is how you get a nocturnal visit from the executioner."
  },
  {
    num: "05",
    title: "Training & Garrison Postings",
    icon: Award,
    desc: "Curriculum tracking for apprentice Acemi Oğlan academies: marathon endurance, kilij mastery, and matchlock firearms. Garrison rotation scheduling for frontier fortress outposts from Belgrade to Baghdad.",
    satire: "Ensuring your vanguard knows which end of the arquebus faces the enemy."
  },
  {
    num: "06",
    title: "Imperial Treasury & Akçe Ulufe",
    icon: Coins,
    desc: "Quarterly salary payouts in standardized silver akçe coins. Automatic deductions for broken halva pots, lost arrows, and unauthorized absence during Danube river crossings.",
    satire: "The Sultan may conquer kingdoms. The accountant still requires itemized receipts."
  },
  {
    num: "07",
    title: "Campaign Forecasting & Logistics",
    icon: Compass,
    desc: "Comprehensive operational readiness projections: biscuit rations, camel baggage trains, powder kegs, and bridging pontoon availability calculated by march distance from Istanbul.",
    satire: "Calculates whether your army reaches Vienna before the autumn rains drown the camels."
  },
  {
    num: "08",
    title: "Reports, Decrees & Tughra Seals",
    icon: Scroll,
    desc: "Official imperial firmans, service discharge scrolls, and garrison decrees drafted with authenticated Tughra digital cryptography. Complete audit trails verified by the Imperial Divan.",
    satire: "Signed with the Sultan's personal mark. Forged firmans punishable by immediate impalement."
  }
];

const divanMembers = [
  {
    title: "Grand Vizier (Sadrazam)",
    role: "Chief Executive & Imperial Seal Keeper",
    desc: "The absolute deputy of the Sultan, holding the imperial seal and presiding over all Divan sessions on the sovereign's behalf."
  },
  {
    title: "The Nişancı",
    role: "Chancellor of the Imperial Tughra",
    desc: "The high scribe responsible for affixing the Sultan’s calligraphic cypher (Tughra) to laws, treaties, and provincial deeds."
  },
  {
    title: "The Defterdar",
    role: "Imperial Chief Treasurer",
    desc: "Overseer of all revenues, tax farms, mining yields, and quarterly military payrolls from the Seven Towers Treasury."
  },
  {
    title: "The Kazasker",
    role: "Chief Military Supreme Judge",
    desc: "The supreme judicial officer for Rumelia and Anatolia, appointing judges (kadis) and adjudicating military disputes."
  },
  {
    title: "Kaptan-ı Derya",
    role: "Grand Admiral of the Imperial Navy",
    desc: "Commander of the imperial shipyards (Tersâne-i Âmire) and the Mediterranean fleet, governing the Aegean islands."
  }
];
</script>

<template>
  <div class="administration-page">
    <!-- HERO SECTION -->
    <section class="page-hero">
      <div 
        class="page-hero-bg" 
        style="background-image: url('/images/divan-council.jpg')"
      ></div>
      <div class="page-hero-overlay"></div>

      <div class="page-hero-content">
        <p class="eyebrow">Janissaries CRM · Fictional Product Suite</p>
        <h1>The Machinery<br>Behind the Empire.</h1>
        <p class="hero-desc">
          Conquest may expand an empire, but administration keeps it alive. Explore the fictional military and personnel management system inspired by classical Ottoman statecraft.
        </p>
        <div class="hero-cta-btn-wrap">
          <RouterLink to="/demo" class="btn-imperial gold">
            <span>Launch Live CRM Demonstration</span>
            <ArrowRight :size="16" />
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- HISTORICAL DIVAN CONTEXT SECTION -->
    <section class="imperial-section paper divan-context-section">
      <div class="divan-grid">
        <div class="divan-text-col">
          <span class="section-label">Historical Institutional Inspiration</span>
          <h2 class="section-title">The Divan-ı Hümayun, Not a Generic Dashboard.</h2>
          <p class="divan-lead">
            The Divan-ı Hümayun was the imperial council of the Ottoman Empire, meeting in the Second Courtyard of Topkapi Palace beneath the Tower of Justice (Adalet Kulesi).
          </p>
          <p class="divan-body">
            High on the wall behind a gilded lattice window (the Kasr-ı Adl), the Sultan could sit unseen, listening to every deliberation. Viziers never knew if the sovereign was listening at any given moment—a powerful mechanism of transparency and accountability that inspired this software’s surveillance architecture.
          </p>
          <div class="historical-credit-note">
            <span>Historical reality & satirical CRM functionality, visibly distinct.</span>
          </div>
        </div>

        <div class="divan-council-cards">
          <div v-for="m in divanMembers" :key="m.title" class="council-member-card">
            <span class="member-role">{{ m.role }}</span>
            <h4 class="member-title">{{ m.title }}</h4>
            <p class="member-desc">{{ m.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 8 PRODUCT MODULES GRID -->
    <section class="imperial-section night modules-grid-section">
      <div class="section-header-center">
        <p class="section-label">Eight Imperial Modules</p>
        <h2 class="section-title">Built for an Empire That Has No Intention of Slowing Down</h2>
        <p class="modules-sub">
          Engineered to replace unruly quills, disorganized sheepskin scrolls, and rebellious cauldron-overturning with systematic imperial precision.
        </p>
      </div>

      <div class="modules-octa-grid">
        <div v-for="m in modules" :key="m.num" class="module-card">
          <div class="module-card-top">
            <span class="module-num">{{ m.num }}</span>
            <component :is="m.icon" :size="22" class="module-icon" />
          </div>

          <h3 class="module-title">{{ m.title }}</h3>
          <p class="module-desc">{{ m.desc }}</p>

          <div class="module-satire-badge">
            <span class="satire-quote">“{{ m.satire }}”</span>
          </div>
        </div>
      </div>

      <div class="modules-bottom-cta">
        <RouterLink to="/demo" class="btn-imperial gold">
          <span>Test Drive All Modules in Live Demo</span>
          <ArrowRight :size="16" />
        </RouterLink>
      </div>
    </section>

    <!-- SATIRICAL ARCHITECTURE COMPARISON -->
    <section class="imperial-section walnut comparison-section">
      <div class="comparison-wrap">
        <p class="section-label">System Comparison</p>
        <h2 class="section-title">Traditional Quills vs. Janissaries CRM</h2>

        <div class="comparison-table-wrap">
          <table class="comparison-table">
            <thead>
              <tr>
                <th>Administrative Dimension</th>
                <th>Traditional Divan Method (c. 1520)</th>
                <th>Janissaries CRM (v1.453)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Recruitment Tracking</strong></td>
                <td>34 sheepskin scrolls carried by pack mules; easily eaten by camels.</td>
                <td>Instantaneous Eşkâl registry indexing with candidate portrait review.</td>
              </tr>
              <tr>
                <td><strong>Provincial Quotas</strong></td>
                <td>Couriers ride three weeks through mountain blizzards to deliver tax counts.</td>
                <td>Real-time provincial loyalty gauges and revenue ledgers across all 32 eyalets.</td>
              </tr>
              <tr>
                <td><strong>Coup Risk Management</strong></td>
                <td>Wait until the Janissaries overturn their soup cauldrons in the courtyard.</td>
                <td>Predictive loyalty telemetry alerts the Grand Vizier before cauldrons budge.</td>
              </tr>
              <tr>
                <td><strong>Quarterly Payroll (Ulufe)</strong></td>
                <td>Defterdar manually counts sacks of silver coins; shortfalls cause mutinies.</td>
                <td>Automated akçe ledger with itemized deductions for broken halva pots.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="comparison-footer-action">
          <RouterLink to="/demo" class="btn-imperial gold">
            <span>Enter the Interactive Court Demo</span>
            <ArrowRight :size="15" />
          </RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.page-hero {
  min-height: 60vh;
}
.hero-cta-btn-wrap {
  margin-top: 32px;
}

/* DIVAN CONTEXT SECTION */
.divan-grid {
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: clamp(40px, 6vw, 80px);
  align-items: flex-start;
}
.divan-lead {
  font-family: var(--font-serif);
  font-size: 22px;
  line-height: 1.55;
  color: var(--burgundy);
  margin-bottom: 20px;
}
.divan-body {
  font-size: 18px;
  line-height: 1.65;
  color: #4D4030;
  margin-bottom: 28px;
}
.historical-credit-note {
  font-family: var(--font-heading);
  font-size: 11px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--burgundy);
  border-left: 2px solid var(--burgundy);
  padding-left: 14px;
}

.divan-council-cards {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.council-member-card {
  background: #EFE6D5;
  border: 1px solid rgba(138, 114, 69, 0.25);
  padding: 20px 24px;
  transition: all 0.25s;
}
.council-member-card:hover {
  background: #FAF4E8;
  border-color: var(--burgundy);
  transform: translateX(4px);
}
.member-role {
  font-family: var(--font-sans);
  font-size: 9px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--burgundy);
  font-weight: 700;
}
.member-title {
  font-family: var(--font-display);
  font-size: 18px;
  color: var(--ink);
  margin: 4px 0 6px;
}
.member-desc {
  font-size: 15px;
  color: #554835;
  margin: 0;
  line-height: 1.5;
}

/* 8 MODULES GRID */
.section-header-center {
  text-align: center;
  max-width: 820px;
  margin: 0 auto 60px;
}
.modules-sub {
  font-size: 20px;
  color: var(--parchment);
  line-height: 1.55;
  opacity: 0.9;
}

.modules-octa-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 26px;
  margin-bottom: 50px;
}
.module-card {
  background: var(--walnut-card);
  border: 1px solid var(--gold-border);
  padding: 32px 26px;
  display: flex;
  flex-direction: column;
  transition: all 0.3s var(--ease-imperial);
}
.module-card:hover {
  transform: translateY(-5px);
  border-color: var(--gold);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
}
.module-card-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.module-num {
  font-family: var(--font-display);
  font-size: 24px;
  color: var(--gold);
  font-weight: 700;
}
.module-icon {
  color: var(--gold-bright);
}
.module-title {
  font-family: var(--font-display);
  font-size: 20px;
  color: var(--gold-pale);
  line-height: 1.25;
  margin: 0 0 14px;
}
.module-desc {
  font-size: 16px;
  line-height: 1.6;
  color: var(--parchment);
  opacity: 0.88;
  margin: 0 0 20px;
  flex: 1;
}
.module-satire-badge {
  padding-top: 14px;
  border-top: 1px solid rgba(185, 154, 91, 0.16);
}
.satire-quote {
  font-family: var(--font-serif);
  font-style: italic;
  font-size: 14px;
  color: var(--gold);
  line-height: 1.45;
  display: block;
}
.modules-bottom-cta {
  text-align: center;
}

/* COMPARISON TABLE */
.comparison-wrap {
  max-width: 1000px;
  margin: 0 auto;
}
.comparison-table-wrap {
  overflow-x: auto;
  margin: 40px 0;
  border: 1px solid var(--gold-border);
  background: var(--walnut-card);
}
.comparison-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}
.comparison-table th {
  padding: 16px 20px;
  font-family: var(--font-heading);
  font-size: 11px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--gold);
  background: rgba(0, 0, 0, 0.4);
  border-bottom: 1px solid var(--gold-border);
}
.comparison-table td {
  padding: 18px 20px;
  border-bottom: 1px solid rgba(185, 154, 91, 0.14);
  font-size: 16px;
  line-height: 1.55;
  color: var(--parchment);
}
.comparison-table tr:hover td {
  background: rgba(185, 154, 91, 0.04);
}
.comparison-table td strong {
  font-family: var(--font-display);
  color: var(--gold-pale);
}
.comparison-footer-action {
  text-align: center;
}

@media (max-width: 1100px) {
  .modules-octa-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 850px) {
  .divan-grid {
    grid-template-columns: 1fr;
  }
}
@media (max-width: 600px) {
  .modules-octa-grid {
    grid-template-columns: 1fr;
  }
}
</style>
