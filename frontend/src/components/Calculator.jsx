import React, { useEffect, useState } from 'react';
import { plans } from '../data/site';

// Ocena: povprečen klic traja 3 minute.
const AVG_CALL_MIN = 3;
const fmt = (n) => n.toLocaleString('sl-SI');

const Slider = ({ id, label, value, onChange, min, max, step = 1, suffix = '' }) => (
  <div className="input-group">
    <label className="input-label" htmlFor={id}>{label}</label>
    <div className="slider-container">
      <input id={id} type="range" min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(Number(e.target.value))} className="slider" />
      <span className="slider-value">{value}{suffix}</span>
    </div>
  </div>
);

const Calculator = () => {
  const [callsPerDay, setCallsPerDay] = useState(20);
  const [missed, setMissed] = useState(30);
  const [value, setValue] = useState(50);
  const [shownLoss, setShownLoss] = useState(0);

  const dailyMissed = callsPerDay * (missed / 100);
  const monthlyLoss = Math.round(dailyMissed * value * 30);
  const monthlyMinutes = Math.round(dailyMissed * 30 * AVG_CALL_MIN);
  const hours = Math.round(monthlyMinutes / 60);
  const plan = plans.find((p) => p.minutes >= monthlyMinutes) || plans[plans.length - 1];
  const net = monthlyLoss - plan.price;

  useEffect(() => {
    const steps = 30;
    let i = 0;
    const start = shownLoss;
    const timer = setInterval(() => {
      i += 1;
      setShownLoss(Math.round(start + ((monthlyLoss - start) * i) / steps));
      if (i >= steps) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [monthlyLoss]);

  return (
    <div className="calculator-content visible">
      <div className="calculator-box">
        <div className="calculator-inputs">
          <Slider id="calc-calls" label="Število klicev na dan" value={callsPerDay} onChange={setCallsPerDay} min={1} max={100} />
          <Slider id="calc-missed" label="% klicev, ki jih zamudite" value={missed} onChange={setMissed} min={0} max={100} suffix="%" />
          <Slider id="calc-value" label="Povprečna vrednost stranke (€)" value={value} onChange={setValue} min={10} max={500} step={10} suffix="€" />
        </div>

        <div className="calculator-result">
          <div className="result-row">
            <div className="result-item">
              <div className="result-label">Mesečna izguba</div>
              <div className="result-amount">{fmt(shownLoss)}€</div>
              <div className="result-subtext">izgubljeni prihodki</div>
            </div>
            <div className="result-divider"></div>
            <div className="result-item">
              <div className="result-label">Čas na telefonu</div>
              <div className="result-amount-time">{hours}h</div>
              <div className="result-subtext">vsak mesec</div>
            </div>
          </div>
        </div>

        <div className="calc-recommend">
          <div>
            <span className="calc-recommend-label">Priporočen paket</span>
            <strong>{plan.name} — {plan.price} €/mesec</strong>
            <span className="calc-recommend-sub">≈ {fmt(monthlyMinutes)} min zamujenih klicev mesečno · paket vključuje {plan.minutes} min</span>
          </div>
          {net > 0 && (
            <div className="calc-net">
              <span className="calc-recommend-label">Ocenjena razlika</span>
              <strong>+{fmt(net)} € / mesec</strong>
            </div>
          )}
        </div>
        <p className="calc-disclaimer">
          Ocena predpostavlja, da povprečen klic traja {AVG_CALL_MIN} minute in da bi vsak zamujeni klic postal stranka. Cene brez DDV.
        </p>
      </div>
    </div>
  );
};

export default Calculator;
