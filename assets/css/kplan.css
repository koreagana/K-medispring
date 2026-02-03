/* =========================
   KPLAN - AGI Gateway (no kms)
   ========================= */

.agi-gateway{ margin: 1.5rem 0; }

.agi-card{
  position: relative;
  border: 1px solid rgba(60,68,73,.16);
  border-radius: 14px;
  padding: 1.4rem 1.4rem 1.2rem;
  overflow: hidden;
  background: #fff;
}

.agi-card::before{
  content:"";
  position:absolute;
  inset:-2px;
  background:
    radial-gradient(1200px 400px at 20% 10%, rgba(78,151,209,.20), transparent 55%),
    radial-gradient(900px 380px at 80% 30%, rgba(0,160,214,.14), transparent 60%),
    radial-gradient(800px 500px at 50% 110%, rgba(61,68,73,.08), transparent 55%);
  pointer-events:none;
}

.agi-card::after{
  content:"";
  position:absolute;
  inset:0;
  background: linear-gradient(120deg,
    rgba(78,151,209,.08),
    rgba(255,255,255,0) 38%,
    rgba(0,160,214,.07) 68%,
    rgba(255,255,255,0)
  );
  opacity:.9;
  transform: translateX(-18%);
  animation: agiGlow 6.5s ease-in-out infinite;
  pointer-events:none;
}

@keyframes agiGlow{
  0%{ transform: translateX(-18%); opacity:.55; }
  50%{ transform: translateX(18%); opacity:.95; }
  100%{ transform: translateX(-18%); opacity:.55; }
}

.agi-top{
  display:flex;
  gap:.9rem;
  align-items:flex-start;
  position:relative;
  z-index:1;
}

.agi-signal{
  width:34px; height:22px;
  display:flex; gap:4px;
  align-items:flex-end;
  margin-top:.2rem;
}
.agi-signal span{
  display:block;
  width:6px;
  border-radius:3px;
  background: rgba(61,68,73,.55);
  animation: agiBars 1.2s ease-in-out infinite;
}
.agi-signal span:nth-child(1){ height:10px; animation-delay:0s; }
.agi-signal span:nth-child(2){ height:18px; animation-delay:.12s; }
.agi-signal span:nth-child(3){ height:13px; animation-delay:.24s; }

@keyframes agiBars{
  0%,100%{ transform: scaleY(.65); opacity:.55; }
  50%{ transform: scaleY(1.05); opacity:.95; }
}

.agi-eyebrow{ font-size:.82rem; letter-spacing:.06em; opacity:.72; }
.agi-headline{ margin:.15rem 0 0; font-size:1.55rem; line-height:1.25; }

.agi-sub{
  margin:.6rem 0 1.1rem;
  opacity:.86;
  position:relative;
  z-index:1;
}

.agi-grid{
  display:grid;
  grid-template-columns: 1.1fr .9fr;
  gap: 1rem;
  position:relative;
  z-index:1;
}
@media (max-width:980px){ .agi-grid{ grid-template-columns:1fr; } }

.agi-choices{
  display:grid;
  grid-template-columns: 1fr 1fr;
  gap:.7rem;
}
@media (max-width:520px){ .agi-choices{ grid-template-columns:1fr; } }

.agi-choice{
  border:1px solid rgba(60,68,73,.14);
  border-radius:12px;
  padding:.75rem .8rem;
  background: rgba(255,255,255,.75);
  display:flex;
  flex-direction:column;
  gap:.35rem;
  cursor:pointer;
  transition: transform .18s ease, border-color .18s ease, box-shadow .18s ease;
}
.agi-choice:hover{
  transform: translateY(-1px);
  border-color: rgba(78,151,209,.35);
  box-shadow: 0 8px 22px rgba(0,0,0,.06);
}

.agi-choice input{
  position:absolute;
  opacity:0;
  pointer-events:none;
}

.agi-chip{ display:inline-flex; align-items:center; gap:.5rem; font-weight:700; }
.agi-chip::before{
  content:"";
  width:14px; height:14px;
  border-radius:4px;
  border:1px solid rgba(60,68,73,.28);
  background:#fff;
}

.agi-hint{ font-size:.9rem; opacity:.72; }

.agi-choice.is-on{
  border-color: rgba(78,151,209,.55);
  box-shadow: 0 10px 24px rgba(78,151,209,.14);
}
.agi-choice.is-on .agi-chip::before{
  background: rgba(78,151,209,.12);
  border-color: rgba(78,151,209,.55);
  box-shadow: inset 0 0 0 3px rgba(78,151,209,.22);
}

.agi-panel{
  border:1px solid rgba(60,68,73,.14);
  border-radius:12px;
  padding:.9rem;
  background: rgba(255,255,255,.7);
  position:relative;
  overflow:hidden;
}

.agi-thinkline{
  position:absolute;
  inset:0;
  background: linear-gradient(90deg, rgba(0,0,0,0), rgba(78,151,209,.16), rgba(0,0,0,0));
  transform: translateX(-70%);
  animation: agiScan 2.6s ease-in-out infinite;
  opacity:.55;
  pointer-events:none;
}
@keyframes agiScan{
  0%{ transform: translateX(-70%); opacity:.15; }
  50%{ transform: translateX(70%); opacity:.6; }
  100%{ transform: translateX(-70%); opacity:.15; }
}

.agi-label{ font-size:.82rem; letter-spacing:.06em; opacity:.75; margin-bottom:.35rem; }
.agi-output{ font-size:1.02rem; line-height:1.55; min-height:3.2em; }

.agi-actions{ display:flex; gap:.6rem; margin-top:.75rem; flex-wrap:wrap; }
.agi-actions .ghost{
  background: transparent !important;
  box-shadow: inset 0 0 0 1px rgba(60,68,73,.18);
}

.agi-micro{ margin-top:.6rem; font-size:.86rem; opacity:.72; }

@media (prefers-reduced-motion: reduce){
  .agi-card::after, .agi-signal span, .agi-thinkline{ animation:none !important; }
  .agi-choice{ transition:none !important; }
}
