import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ArrowUpRight, Menu, X } from 'lucide-react';

/* ------------------------------------------------------------------ *
 *  SquigglePillLink                                                   *
 *  Exact two26.studio pill with thick brush-stroke fill on hover      *
 * ------------------------------------------------------------------ */
function SquigglePillLink({ href, label, onClick }) {
    const pathRef = useRef(null);
    const lengthRef = useRef(0);

    useEffect(() => {
        const p = pathRef.current;
        if (!p) return;
        const len = p.getTotalLength();
        lengthRef.current = len;
        gsap.set(p, {
            strokeDasharray: len,
            strokeDashoffset: len,
            strokeWidth: 0,
        });
    }, []);

    const onEnter = () => {
        if (!pathRef.current) return;
        gsap.to(pathRef.current, {
            strokeDashoffset: 0,
            strokeWidth: 24,
            duration: 0.45,
            ease: 'power2.out',
            overwrite: 'auto',
        });
    };

    const onLeave = () => {
        if (!pathRef.current) return;
        gsap.to(pathRef.current, {
            strokeDashoffset: lengthRef.current,
            strokeWidth: 0,
            duration: 0.35,
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
            className="navbar-link-btn w-inline-block shadow-sm"
        >
            <div className="navlink-text">{label}</div>
            <div className="stroke-fill">
                <div className="stroke-fill-code w-embed">
                    <svg
                        width="100%"
                        height="100%"
                        viewBox="0 0 75 36"
                        fill="none"
                        preserveAspectRatio="none"
                        aria-hidden="true"
                    >
                        <path
                            ref={pathRef}
                            d="M0 21.5571C0 21.5571 6.56744 2.8501 15.4762 4.44988C25.7691 6.2982 5.66141 21.3471 12.5002 29.1915C22.9246 41.1486 29.3907 -7.93025 42.4603 1.12139C53.3211 8.6432 27.1823 26.7575 37.6982 34.7461C50.754 44.6641 58.0718 -7.92618 67.2619 5.59531C72.4564 13.2381 57.9637 30.3713 67.2619 30.3713C70.8333 30.3713 75 19.753 75 19.753"
                            stroke="currentColor"
                            strokeWidth="24"
                            strokeLinecap="round"
                        />
                    </svg>
                </div>
            </div>
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
        <header className="header">
            <nav className="navbar-wrap">
                {/* Left Floating Pills */}
                <div className="navbar-links hidden md:flex">
                    <SquigglePillLink href="/work" label="Work" onClick={(e) => handleNav(e, '/work')} />
                    <SquigglePillLink href="/about" label="About us" onClick={(e) => handleNav(e, '/about')} />
                </div>

                {/* Center Wordmark (plain orange display font) */}
                <a
                    href="/"
                    onClick={(e) => handleNav(e, '/')}
                    className="navbar-logo w-inline-block flex items-center justify-center text-center font-display text-2xl md:text-3xl font-extrabold uppercase tracking-tight"
                    style={{ color: 'var(--brand-primary)', textDecoration: 'none', width: 'auto' }}
                    aria-label="Studio Kinetix Home"
                >
                    KINETIX
                </a>

                {/* Right Controls */}
                <div className="navbar-right">
                    <div className="navbar-timing hidden lg:block">
                        Monday–Friday<br />10:00 – 17:00
                    </div>

                    {/* Black Pill CTA with Orange Circle Arrow */}
                    <button
                        type="button"
                        onClick={onOpenContact}
                        className="group hidden md:inline-flex items-center gap-3 pl-4 pr-1.5 py-1.5 rounded-full text-sm font-medium shadow-md transition-transform duration-300 hover:scale-[1.03] cursor-pointer"
                        style={{ backgroundColor: 'var(--brand-black)', color: '#FFFFFF', border: 'none' }}
                    >
                        <span style={{ color: '#FFFFFF' }}>Let&apos;s Talk</span>
                        <span
                            className="w-7 h-7 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:rotate-45"
                            style={{ backgroundColor: 'var(--brand-primary)', color: '#FFFFFF' }}
                        >
                            <ArrowUpRight className="w-4 h-4 text-white" />
                        </span>
                    </button>

                    <button
                        type="button"
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="md:hidden w-10 h-10 flex items-center justify-center rounded-full border-2 cursor-pointer shadow-sm"
                        style={{
                            borderColor: 'var(--brand-primary)',
                            backgroundColor: 'var(--brand-accent)',
                            color: 'var(--brand-primary)',
                        }}
                        aria-label="Toggle Menu"
                    >
                        {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>
            </nav>

            {/* Mobile Drawer */}
            {mobileOpen && (
                <div
                    className="md:hidden fixed inset-0 z-[490] p-8 pt-24 flex flex-col justify-between pointer-events-auto"
                    style={{ backgroundColor: 'var(--brand-accent)' }}
                >
                    <div className="flex flex-col gap-6">
                        <a
                            href="/work"
                            onClick={(e) => handleNav(e, '/work')}
                            className="font-display text-5xl uppercase tracking-tight"
                            style={{ color: 'var(--brand-black)' }}
                        >
                            Work
                        </a>
                        <a
                            href="/about"
                            onClick={(e) => handleNav(e, '/about')}
                            className="font-display text-5xl uppercase tracking-tight"
                            style={{ color: 'var(--brand-black)' }}
                        >
                            About us
                        </a>
                        <button
                            type="button"
                            onClick={() => {
                                setMobileOpen(false);
                                onOpenContact();
                            }}
                            className="font-display text-5xl uppercase tracking-tight text-left cursor-pointer"
                            style={{ color: 'var(--brand-primary)' }}
                        >
                            Let&apos;s Talk
                        </button>
                    </div>
                    <div className="text-sm opacity-70">{hours}</div>
                </div>
            )}
        </header>
    );
}
