import React, { useRef, useState } from 'react';
import { Play, Pause } from 'lucide-react';
import { getIndustryById } from '../data/industries';

const SampleCall = ({ industryId = 'zdravstveni-domovi', label = 'Primer: naročanje na pregled v ambulanti' }) => {
  const sample = getIndustryById(industryId);
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  if (!sample?.audioDemo) return null;

  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) a.play().catch(() => setPlaying(false));
    else a.pause();
  };

  return (
    <div className="sample-call">
      <button type="button" className="sample-call-btn" onClick={toggle} aria-label={playing ? 'Ustavi posnetek' : 'Predvajaj posnetek klica'}>
        {playing ? <Pause size={20} /> : <Play size={20} />}
      </button>
      <div className="sample-call-text">
        <strong>Poslušajte pravi klic</strong>
        <span>{label}</span>
      </div>
      <audio
        ref={audioRef}
        src={sample.audioDemo}
        preload="none"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
      />
    </div>
  );
};

export default SampleCall;
