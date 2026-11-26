import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ArrowUpRight, Menu, X } from 'lucide-react';

/* ------------------------------------------------------------------ *
 *  SquigglePillLink                                                   *
 *  White pill with a thin squiggle outline that draws in on hover.   *
 * ------------------------------------------------------------------ */
function SquigglePillLink({ href, label, onClick }) {
    const pathRef = useRef(null);
    const lengthRef = useRef(0);

    useEffect(() => {
        const p = pathRef.current;
        if (!p) return;
        const len = p.getTotalLength();
        lengthRef.current = len;
        // Start fully hidden
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
            style={{
                position: 'relative',
                display: 'inline-flex',
                alignItems: 'center',
                padding: '0.52em 1.2em',
                borderRadius: 999,
                background: '#ffffff',
                border: '1.5px solid rgba(0,0,0,0.12)',
                fontSize: '0.875rem',
                fontWeight: 500,
                color: '#000000',
                textDecoration: 'none',
                whiteSpace: 'nowrap',
                boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
                cursor: 'pointer',
                transition: 'transform 0.25s cubic-bezier(0.16,1,0.3,1)',
                overflow: 'visible',
            }}
            onMouseOver={e => e.currentTarget.style.transform = 'scale(1.04)'}
            onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
        >
            <span style={{ position: 'relative', zIndex: 2 }}>{label}</span>

            {/*
              SVG overflows the pill by ~8px on all sides.
              Uses a thin strokeWidth (3) so it only shows as a squiggle outline,
              not a filled blob. The path is drawn fully hidden (strokeDashoffset=len)
              and animates to 0 on hover.
            */}
            <svg
                viewBox="0 0 100 36"
                fill="none"
                aria-hidden="true"
                style={{
                    position: 'absolute',
                    top: -8,
                    left: -8,
                    width: 'calc(100% + 16px)',
                    height: 'calc(100% + 16px)',
                    pointerEvents: 'none',
                    overflow: 'visible',
                }}
            >
                <path
                    ref={pathRef}
                    d="M4 20C4 20 10 4 20 5.5C32 7.3 16 20 22 27C30 36 36 1 50 8C60 13 44 27 54 32C64 37 70 1 82 10C89 15 76 30 85 30C89 30 95 20 100 20"
                    stroke="var(--brand-primary)"
                    strokeWidth="3"
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
export default function Navbar({ hours, onOpenContact, onNavigate }) {
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleNav = (e, path) => {
        e.preventDefault();
        setMobileOpen(false);
        onNavigate?.(path);
    };

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

                {/* ── Left: nav pills ── */}
                <nav style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    pointerEvents: 'auto',
                }} className="nav-pills-desktop">
                    <SquigglePillLink href="/work"  label="Work"     onClick={(e) => handleNav(e, '/work')} />
                    <SquigglePillLink href="/about" label="About us" onClick={(e) => handleNav(e, '/about')} />
                </nav>

                {/* ── Centre: wordmark — matches two26 font style ── */}
                <a
                    href="/"
                    onClick={(e) => handleNav(e, '/')}
                    style={{
                        pointerEvents: 'auto',
                        fontFamily: 'var(--font-display)',
                        fontSize: 'clamp(1.4rem, 2.2vw, 1.75rem)',
                        fontWeight: 900,
                        textTransform: 'uppercase',
                        letterSpacing: '-0.01em',
                        color: 'var(--brand-primary)',
                        textDecoration: 'none',
                        lineHeight: 1,
                        userSelect: 'none',
                    }}
                    aria-label="Studio Kinetix"
                >
                    KINETIX
                </a>

                {/* ── Right: hours + CTA ── */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    pointerEvents: 'auto',
                }}>
                    {/* Hours */}
                    <span style={{
                        fontSize: '0.7rem',
                        fontWeight: 500,
                        lineHeight: 1.5,
                        color: 'var(--brand-black)',
                        whiteSpace: 'nowrap',
                    }} className="hours-desktop">
                        Monday–Friday<br />10:00 – 17:00
                    </span>

                    {/* CTA: Let's Talk */}
                    <button
                        type="button"
                        onClick={onOpenContact}
                        className="nav-cta-btn"
                        aria-label="Let's Talk"
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.45rem',
                            padding: '0.38rem 0.38rem 0.38rem 1rem',
                            borderRadius: 999,
                            background: 'var(--brand-black)',
                            border: 'none',
                            color: '#fff',
                            fontSize: '0.875rem',
                            fontWeight: 500,
                            cursor: 'pointer',
                            boxShadow: '0 2px 10px rgba(0,0,0,0.25)',
                            whiteSpace: 'nowrap',
                            transition: 'transform 0.25s cubic-bezier(0.16,1,0.3,1), box-shadow 0.25s',
                        }}
                        onMouseOver={e => { e.currentTarget.style.transform = 'scale(1.04)'; e.currentTarget.style.boxShadow = '0 4px 18px rgba(0,0,0,0.35)'; }}
                        onMouseOut={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.25)'; }}
                    >
                        <span style={{ color: '#fff' }} className="cta-label-desktop">Let's Talk</span>
                        <span style={{
                            width: '1.75rem',
                            height: '1.75rem',
                            borderRadius: '50%',
                            background: 'var(--brand-primary)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                            transition: 'transform 0.3s cubic-bezier(0.16,1,0.3,1)',
                        }}
                            className="nav-cta-arrow"
                        >
                            <ArrowUpRight size={15} color="#fff" />
                        </span>
                    </button>

                    {/* Mobile hamburger */}
                    <button
                        type="button"
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="nav-hamburger"
                        style={{
                            width: 40,
                            height: 40,
                            borderRadius: '50%',
                            border: '2px solid var(--brand-primary)',
                            background: 'var(--brand-accent)',
                            color: 'var(--brand-primary)',
                            display: 'none',
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

            {/* Responsive rules injected inline so no Tailwind conflicts */}
            <style>{`
                @media (max-width: 767px) {
                    .nav-pills-desktop { display: none !important; }
                    .hours-desktop     { display: none !important; }
                    .cta-label-desktop { display: none !important; }
                    .nav-hamburger     { display: flex !important; }
                }
                @media (min-width: 768px) {
                    .nav-hamburger { display: none !important; }
                }
                @media (max-width: 1023px) {
                    .hours-desktop { display: none !important; }
                }
                /* Arrow rotates on CTA hover */
                .nav-cta-btn:hover .nav-cta-arrow {
                    transform: rotate(45deg) !important;
                }
            `}</style>
        </header>
    );
}
