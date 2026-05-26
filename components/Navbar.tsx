'use client';
import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [ideasHover, setIdeasHover] = useState(false);
  const [adsHover, setAdsHover] = useState(false);

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      background: 'rgba(7,7,15,0.95)', borderBottom: '0.5px solid rgba(255,255,255,0.07)',
      backdropFilter: 'blur(20px)', height: '56px',
      display: 'flex', alignItems: 'center', padding: '0 16px', gap: '10px'
    }}>

      <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '6px', textDecoration: 'none', flexShrink: 0 }}>
        <i className="ti ti-book" style={{ fontSize: '18px', color: '#BF5FFF' }} />
        <span style={{ fontSize: 'clamp(14px, 3vw, 18px)', fontWeight: 700, letterSpacing: '-0.5px', color: '#fff' }}>
          Books<span style={{ color: '#BF5FFF' }}>Repay</span>
        </span>
      </Link>

      {/* Empire links - hidden on small mobile */}
      <div className="empire-nav" style={{ display: 'flex', gap: '6px', marginLeft: 'auto', flexShrink: 0 }}>
        <a href="https://ideasrepay.com" target="_blank" rel="noopener noreferrer"
          onMouseEnter={() => setIdeasHover(true)}
          onMouseLeave={() => setIdeasHover(false)}
          style={{
            padding: '4px 10px', borderRadius: '8px', textDecoration: 'none',
            border: ideasHover ? '0.5px solid #FFB800' : '0.5px solid rgba(255,255,255,0.08)',
            background: ideasHover ? 'rgba(255,184,0,0.08)' : 'transparent',
            transition: 'border 0.18s ease, background 0.18s ease',
          }}>
          <div style={{ fontSize: '12px', fontWeight: 700, color: '#FFB800' }}>IdeasRepay</div>
          <div style={{ fontSize: '8px', color: 'rgba(255,255,255,0.7)' }}>Build online income</div>
        </a>
        <a href="https://adsrepay.com" target="_blank" rel="noopener noreferrer"
          onMouseEnter={() => setAdsHover(true)}
          onMouseLeave={() => setAdsHover(false)}
          style={{
            padding: '4px 10px', borderRadius: '8px', textDecoration: 'none',
            border: adsHover ? '0.5px solid #00FF9D' : '0.5px solid rgba(255,255,255,0.08)',
            background: adsHover ? 'rgba(0,255,157,0.08)' : 'transparent',
            transition: 'border 0.18s ease, background 0.18s ease',
          }}>
          <div style={{ fontSize: '12px', fontWeight: 700, color: '#00FF9D' }}>AdsRepay</div>
          <div style={{ fontSize: '8px', color: 'rgba(255,255,255,0.7)' }}>Earn with microtasks</div>
        </a>
      </div>
    </nav>
  );
}
