<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import ProfileUrl from "@/assets/images/logo.png";

const router = useRouter();

function handleLogin() {
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    const userError = document.getElementById("user-err");
    const passError = document.getElementById("pass-err");
    const toast = document.getElementById("toast");
    
    let valid = true;
    
    if (!usernameInput.value.trim()) {
        userError.classList.add("show");
        valid = false;
    } else {
        userError.classList.remove("show");
    }
    
    if (!passwordInput.value.trim()) {
        passError.classList.add("show");
        valid = false;
    } else {
        passError.classList.remove("show");
    }
    
    if (valid) {
        toast.classList.add("show");
        setTimeout(() => {
            toast.classList.remove("show");
            // Redirect to admin dashboard
            router.push("/admin/dashboard");
        }, 2000);
    }
}
</script>

<template>
  <section>
    <div class="login-card">
      <div class="corner ctlx"></div>
      <div class="corner ctrx"></div>
      <div class="corner cblx"></div>
      <div class="corner cbrx"></div>
      <div class="card-top-bar"></div>
      <div class="card-body">
        <div class="brand-block">
          <div class="brand-seal">
            <!-- <i class="ti ti-crown" aria-hidden="true"></i> -->
            <img
              :src="ProfileUrl"
              alt="Profile Picture"
              width="70"
              height="70"
              style="border-radius: 50%; border: 1px solid var(--gold-border)"
            />
          </div>
          <div class="brand-title">Janissaries</div>
          <div class="brand-sub">CRM · Imperial Scale</div>
        </div>
        <div class="divider">
          <div class="dline"></div>
          <div class="dgem"></div>
          <div class="dline"></div>
        </div>

        <form @submit.prevent="handleLogin">
          <div class="field-group">
            <label class="field-label" for="username"
              >Imperial Title or Username</label
            >
            <div class="field-wrap">
              <i class="ti ti-user field-icon" aria-hidden="true"></i>
              <input
                class="ot-input"
                type="text"
                id="username"
                placeholder="e.g. Sultan Mehmet"
                autocomplete="username"
              />
            </div>
            <div class="error-msg" id="user-err">
              Enter your imperial title to proceed.
            </div>
          </div>

          <div class="field-group">
            <label class="field-label" for="password">Secret Cipher</label>
            <div class="field-wrap">
              <i class="ti ti-lock field-icon" aria-hidden="true"></i>
              <input
                class="ot-input"
                type="password"
                id="password"
                placeholder="Known only to the Grand Vizier…"
                autocomplete="current-password"
              />
              <button
                class="pw-toggle"
                id="pw-toggle"
                type="button"
                aria-label="Toggle password visibility"
              >
                <i class="ti ti-eye" id="pw-icon"></i>
              </button>
            </div>
            <div class="error-msg" id="pass-err">
              The cipher must not be left empty.
            </div>
          </div>

          <div class="row-between">
            <label class="remember-wrap">
              <input class="ot-check" type="checkbox" id="remember" />
              <span class="remember-label">Remember me</span>
            </label>
            <a class="forgot-link" href="#" @click.prevent>Forgot cipher?</a>
          </div>

          <button class="submit-btn" type="submit">
            ✦ &nbsp; Enter the Sublime Porte &nbsp; ✦
          </button>
        </form>

        <div class="separator">
          <div class="sep-line"></div>
          <span class="sep-text">or</span>
          <div class="sep-line"></div>
        </div>

        <button class="guest-btn" type="button">Enter as Emissary (Guest)</button>
      </div>

      <div class="card-footer">
        <p class="footer-text">
          New to the Empire? &nbsp;
          <a class="footer-link" href="#" @click.prevent>Request enrollment</a>
          &nbsp;from your Pasha.
        </p>
      </div>

      <div class="toast" id="toast">Access granted — welcome, Commander.</div>
    </div>
  </section>
</template>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Cinzel+Decorative:wght@400;700&family=IM+Fell+English:ital@0;1&display=swap");

section {
  --gold: #c9972a;
  --gold-light: #e8b84b;
  --gold-pale: #f5e6c0;
  --gold-dim: rgba(201, 151, 42, 0.12);
  --gold-border: rgba(201, 151, 42, 0.28);
  --ink: #1a1208;
  --ink-deep: #0f0b05;
  --parchment: #f7f0dc;
  --parchment-muted: #c8b98a;
  --text-muted: rgba(26, 18, 8, 0.45);
  --danger: #8b1a1a;
  --success: #2a783c;
  background: #1a1208;
  font-family: "Cinzel", serif;
  min-height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3rem 1rem;
  position: relative;
  overflow: hidden;
}

section {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 2rem;
}
.login-card {
  width: 100%;
  max-width: 420px;
  background: linear-gradient(160deg, #241a0a 0%, #1a1208 60%, #120e06 100%);
  border: 1px solid var(--gold-border);
  position: relative;
  z-index: 1;
  animation: riseIn 0.5s ease both;
}
.login-card::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--gold), transparent);
}
.corner {
  position: absolute;
  width: 14px;
  height: 14px;
}
.ctlx {
  top: 8px;
  left: 8px;
  border-top: 1px solid var(--gold);
  border-left: 1px solid var(--gold);
}
.ctrx {
  top: 8px;
  right: 8px;
  border-top: 1px solid var(--gold);
  border-right: 1px solid var(--gold);
}
.cblx {
  bottom: 8px;
  left: 8px;
  border-bottom: 1px solid var(--gold);
  border-left: 1px solid var(--gold);
}
.cbrx {
  bottom: 8px;
  right: 8px;
  border-bottom: 1px solid var(--gold);
  border-right: 1px solid var(--gold);
}
.card-top-bar {
  height: 5px;
  background: var(--gold);
  opacity: 0.65;
}
.card-body {
  padding: 2rem 2rem 2rem;
}
.brand-block {
  text-align: center;
  margin-bottom: 1.8rem;
}
.brand-seal {
  width: 70px;
  height: 70px;
  /* border: 2px solid var(--gold-border); */
  /* border-radius: 50%; */
  margin: 0 auto 0.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--gold-dim);
  font-size: 22px;
  color: var(--gold);
}
.brand-title {
  font-family: "Cinzel Decorative", serif;
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--gold-light);
  letter-spacing: 0.08em;
  margin-bottom: 2px;
}
.brand-sub {
  font-size: 9px;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: var(--parchment-muted);
  opacity: 0.7;
}
.divider {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin: 0.5rem 0 1.6rem;
}
.dline {
  flex: 1;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    var(--gold-border),
    transparent
  );
}
.dgem {
  width: 5px;
  height: 5px;
  background: var(--gold);
  transform: rotate(45deg);
}
.field-group {
  margin-bottom: 1.2rem;
}
.field-label {
  display: block;
  font-size: 9px;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: var(--parchment-muted);
  margin-bottom: 7px;
}
.field-wrap {
  position: relative;
}
.field-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--gold);
  opacity: 0.6;
  font-size: 15px;
  pointer-events: none;
  font-family: "tabler-icons";
}
.ot-input {
  width: 100%;
  background: rgba(201, 151, 42, 0.06);
  border: 1px solid var(--gold-border);
  color: var(--parchment);
  font-family: "Cinzel", serif;
  font-size: 12px;
  letter-spacing: 0.05em;
  padding: 11px 12px 11px 38px;
  outline: none;
  transition:
    border-color 0.2s,
    background 0.2s;
  border-radius: 0;
}
.ot-input::placeholder {
  color: var(--text-muted);
  font-family: "IM Fell English", serif;
  font-style: italic;
  font-size: 12px;
}
.ot-input:focus {
  border-color: var(--gold);
  background: rgba(201, 151, 42, 0.1);
}
.pw-toggle {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: var(--gold);
  opacity: 0.5;
  font-size: 15px;
  transition: opacity 0.2s;
  font-family: "tabler-icons";
  line-height: 1;
}
.pw-toggle:hover {
  opacity: 1;
}
.row-between {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.6rem;
}
.remember-wrap {
  display: flex;
  align-items: center;
  gap: 7px;
  cursor: pointer;
}
.ot-check {
  width: 14px;
  height: 14px;
  border: 1px solid var(--gold-border);
  background: var(--gold-dim);
  appearance: none;
  cursor: pointer;
  position: relative;
  flex-shrink: 0;
}
.ot-check:checked::after {
  content: "";
  position: absolute;
  inset: 3px;
  background: var(--gold);
}
.remember-label {
  font-size: 9px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--parchment-muted);
}
.forgot-link {
  font-size: 9px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--gold);
  opacity: 0.7;
  text-decoration: none;
  cursor: pointer;
}
.forgot-link:hover {
  opacity: 1;
}
.submit-btn {
  width: 100%;
  background: linear-gradient(180deg, #d9a830 0%, #b8831e 100%);
  border: 1px solid var(--gold);
  color: var(--ink-deep);
  font-family: "Cinzel", serif;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.35em;
  text-transform: uppercase;
  padding: 13px;
  cursor: pointer;
  transition:
    opacity 0.2s,
    transform 0.1s;
  margin-bottom: 1.4rem;
  border-radius: 0;
}
.submit-btn:hover {
  opacity: 0.9;
}
.submit-btn:active {
  transform: scale(0.99);
}
.submit-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.separator {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 1.4rem;
}
.sep-line {
  flex: 1;
  height: 1px;
  background: var(--gold-border);
}
.sep-text {
  font-size: 8px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--text-muted);
}
.guest-btn {
  width: 100%;
  background: transparent;
  border: 1px solid var(--gold-border);
  color: var(--parchment-muted);
  font-family: "Cinzel", serif;
  font-size: 9px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  padding: 10px;
  cursor: pointer;
  transition:
    border-color 0.2s,
    color 0.2s,
    background 0.2s;
  border-radius: 0;
  margin-bottom: 1.4rem;
}
.guest-btn:hover {
  border-color: var(--gold);
  color: var(--gold);
  background: var(--gold-dim);
}
.card-footer {
  border-top: 1px solid var(--gold-border);
  padding: 1rem 2rem;
  text-align: center;
}
.footer-text {
  font-family: "IM Fell English", serif;
  font-style: italic;
  font-size: 11px;
  color: var(--text-muted);
  line-height: 1.7;
}
.footer-link {
  color: var(--gold);
  opacity: 0.8;
  text-decoration: none;
  cursor: pointer;
  font-style: normal;
}
.footer-link:hover {
  opacity: 1;
}
.toast {
  position: absolute;
  bottom: 1.5rem;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(42, 120, 60, 0.15);
  border: 1px solid var(--success);
  color: #4aad64;
  font-size: 9px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  padding: 8px 20px;
  white-space: nowrap;
  opacity: 0;
  transition: opacity 0.3s;
  pointer-events: none;
}
.toast.show {
  opacity: 1;
}
.error-msg {
  font-size: 9px;
  color: #c54040;
  letter-spacing: 0.1em;
  margin-top: 5px;
  display: none;
}
.error-msg.show {
  display: block;
}
@keyframes riseIn {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
