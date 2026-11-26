import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ArrowUpRight, Menu, X } from 'lucide-react';

/* ------------------------------------------------------------------ *
 *  SquigglePillLink — white pill with animated squiggle on hover      *
 * ------------------------------------------------------------------ */
function SquigglePillLink({ href, label, onClick }) {
    const pathRef = useRef(null);
    const lengthRef = useRef(0);

    useEffect(() => {
        const p = pathRef.current;
        if (!p) return;
        const len = p.getTotalLength();
        lengthRef.current = len;
        gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
    }, []);

    const onEnter = () => {
        if (!pathRef.current) return;
        gsap.to(pathRef.current, {
            strokeDashoffset: 0,
            duration: 0.42,
            ease: 'power2.out',
            overwrite: 'auto',
        });
    };

    const onLeave = () => {
        if (!pathRef.current) return;
        gsap.to(pathRef.current, {
            strokeDashoffset: lengthRef.current,
            duration: 0.32,
            ease: 'power2.in',
            overwrite: 'auto',
        });
    };

    return (
        <a
            href={href}
            onClick={onClick}
            onMouseEnter={onEnter}
            onMouseLeave={onLeave}
            className="nav-pill-link"
        >
            <span style={{ position: 'relative', zIndex: 2 }}>{label}</span>
            {/* SVG sits OUTSIDE pill bounds (overflow: visible) */}
            <svg
                viewBox="0 0 120 48"
                fill="none"
                preserveAspectRatio="none"
                aria-hidden="true"
            >
                <path
                    ref={pathRef}
                    d="M4 28C4 28 10 6 22 8C36 10 14 27 20 36C30 50 36 2 52 10C64 16 42 34 54 40C68 47 76 1 90 12C98 18 82 38 92 38C97 38 104 24 116 24"
                    stroke="var(--brand-primary)"
                    strokeWidth="18"
                    strokeLinecap="round"
                    fill="none"
                />
            </svg>
        </a>
    );
}

/* ------------------------------------------------------------------ *
 *  Navbar                                                             *
 * ------------------------------------------------------------------ */
export default function Navbar({ hours, onOpenContact, onNavigate, theme, onChangeTheme }) {
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleNav = (e, path) => {
        e.preventDefault();
        setMobileOpen(false);
        onNavigate?.(path);
    };

    const themes = [
        { id: 'orange', color: '#ff5400', label: 'Orange' },
        { id: 'blue',   color: '#0047FF', label: 'Blue'   },
        { id: 'red',    color: '#E11D2E', label: 'Red'    },
        { id: 'green',  color: '#059669', label: 'Green'  },
    ];

    return (
        <header style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 500,
            pointerEvents: 'none',
        }}>
            <div style={{
                maxWidth: 1440,
                margin: '0 auto',
                padding: '1.1rem 2rem 0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '1rem',
            }}>
                {/* ── Left nav pills ── */}
                <nav style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', pointerEvents: 'auto' }}
                     className="hidden-mobile">
                    <SquigglePillLink href="/work"  label="Work"     onClick={(e) => handleNav(e, '/work')} />
                    <SquigglePillLink href="/about" label="About us" onClick={(e) => handleNav(e, '/about')} />
                </nav>

                {/* ── Centre wordmark ── */}
                <a
                    href="/"
                    onClick={(e) => handleNav(e, '/')}
                    style={{
                        pointerEvents: 'auto',
                        fontFamily: 'var(--font-display)',
                        fontSize: 'clamp(1.3rem, 2.5vw, 1.8rem)',
                        fontWeight: 800,
                        textTransform: 'uppercase',
                        letterSpacing: '-0.02em',
                        color: 'var(--brand-primary)',
                        textDecoration: 'none',
                        lineHeight: 1,
                    }}
                    aria-label="Studio Kinetix"
                >
                    KINETIX
                </a>

                {/* ── Right controls ── */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', pointerEvents: 'auto' }}>
                    {/* Hours */}
                    <span style={{
                        fontSize: '0.72rem',
                        fontWeight: 500,
                        lineHeight: 1.4,
                        color: 'var(--brand-black)',
                        whiteSpace: 'nowrap',
                    }} className="hidden-tablet">
                        Monday–Friday<br />10:00 – 17:00
                    </span>

                    {/* Theme dots */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        padding: '0.4rem 0.65rem',
                        borderRadius: 999,
                        border: '1.5px solid rgba(0,0,0,0.12)',
                        background: 'rgba(255,255,255,0.92)',
                        boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
                    }} className="hidden-mobile">
                        {themes.map((t) => (
                            <button
                                key={t.id}
                                type="button"
                                onClick={() => onChangeTheme(t.id)}
                                title={t.label}
                                aria-label={`Switch to ${t.label}`}
                                style={{
                                    width: '0.85rem',
                                    height: '0.85rem',
                                    borderRadius: '50%',
                                    background: t.color,
                                    border: 'none',
                                    cursor: 'pointer',
                                    padding: 0,
                                    transform: theme === t.id ? 'scale(1.3)' : 'scale(1)',
                                    outline: theme === t.id ? '2px solid rgba(0,0,0,0.3)' : 'none',
                                    outlineOffset: 2,
                                    transition: 'transform 0.2s, outline 0.2s',
                                    opacity: theme === t.id ? 1 : 0.6,
                                }}
                            />
                        ))}
                    </div>

                    {/* CTA: Let's Talk */}
                    <button
                        type="button"
                        onClick={onOpenContact}
                        className="nav-cta-btn hidden-mobile"
                        aria-label="Let's Talk"
                    >
                        <span style={{ color: '#fff' }}>Let's Talk</span>
                        <span className="nav-cta-arrow">
                            <ArrowUpRight size={16} color="#fff" />
                        </span>
                    </button>

                    {/* Mobile hamburger */}
                    <button
                        type="button"
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="show-mobile"
                        style={{
                            width: 40,
                            height: 40,
                            borderRadius: '50%',
                            border: '2px solid var(--brand-primary)',
                            background: 'var(--brand-accent)',
                            color: 'var(--brand-primary)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                        }}
                        aria-label="Toggle Menu"
                    >
                        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </div>

            {/* ── Mobile drawer ── */}
            {mobileOpen && (
                <div style={{
                    position: 'fixed',
                    inset: 0,
                    zIndex: 490,
                    padding: '6rem 2rem 2rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    background: 'var(--brand-accent)',
                    pointerEvents: 'auto',
                }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        {[['Work', '/work'], ['About us', '/about']].map(([label, path]) => (
                            <a key={path} href={path}
                               onClick={(e) => handleNav(e, path)}
                               style={{
                                   fontFamily: 'var(--font-display)',
                                   fontSize: 'clamp(2.5rem, 10vw, 4rem)',
                                   fontWeight: 800,
                                   textTransform: 'uppercase',
                                   color: 'var(--brand-black)',
                                   textDecoration: 'none',
                               }}>
                                {label}
                            </a>
                        ))}
                        <button type="button"
                            onClick={() => { setMobileOpen(false); onOpenContact(); }}
                            style={{
                                fontFamily: 'var(--font-display)',
                                fontSize: 'clamp(2.5rem, 10vw, 4rem)',
                                fontWeight: 800,
                                textTransform: 'uppercase',
                                color: 'var(--brand-primary)',
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                textAlign: 'left',
                                padding: 0,
                            }}>
                            Let's Talk
                        </button>
                    </div>
                    <span style={{ fontSize: '0.8rem', opacity: 0.6 }}>{hours}</span>
                </div>
            )}

            {/* Responsive utility styles */}
            <style>{`
                @media (min-width: 768px) {
                    .hidden-mobile { display: flex !important; }
                    .show-mobile   { display: none !important; }
                }
                @media (max-width: 767px) {
                    .hidden-mobile  { display: none !important; }
                    .show-mobile    { display: flex !important; }
                }
                @media (min-width: 992px) {
                    .hidden-tablet { display: block !important; }
                }
                @media (max-width: 991px) {
                    .hidden-tablet { display: none !important; }
                }
            `}</style>
        </header>
    );
}
