import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ArrowUpRight, Menu, X } from 'lucide-react';

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
        gsap.to(pathRef.current, { strokeDashoffset: 0, duration: 0.42, ease: 'power2.out', overwrite: 'auto' });
    };

    const onLeave = () => {
        if (!pathRef.current) return;
        gsap.to(pathRef.current, { strokeDashoffset: lengthRef.current, duration: 0.32, ease: 'power2.in', overwrite: 'auto' });
    };

    return (
        <a
            href={href}
            onClick={onClick}
            onMouseEnter={onEnter}
            onMouseLeave={onLeave}
            className="relative inline-flex items-center px-5 py-2.5 rounded-full text-sm font-medium bg-white shadow-sm border border-black/10 transition-transform hover:scale-[1.03]"
            style={{ color: 'var(--brand-black)' }}
        >
            <span className="relative z-10">{label}</span>
            <svg
                className="absolute inset-0 w-full h-full pointer-events-none rounded-full"
                viewBox="0 0 75 36"
                fill="none"
                preserveAspectRatio="none"
                style={{ color: 'var(--brand-accent)' }}
            >
                <path
                    ref={pathRef}
                    d="M0 21.5571C0 21.5571 6.56744 2.8501 15.4762 4.44988C25.7691 6.2982 5.66141 21.3471 12.5002 29.1915C22.9246 41.1486 29.3907 -7.93025 42.4603 1.12139C53.3211 8.6432 27.1823 26.7575 37.6982 34.7461C50.754 44.6641 58.0718 -7.92618 67.2619 5.59531C72.4564 13.2381 57.9637 30.3713 67.2619 30.3713C70.8333 30.3713 75 19.753 75 19.753"
                    stroke="currentColor"
                    strokeWidth="22"
                    strokeLinecap="round"
                />
            </svg>
        </a>
    );
}

export default function Navbar({ hours, onOpenContact, onNavigate, theme, onChangeTheme }) {
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleNav = (e, path) => {
        e.preventDefault();
        setMobileOpen(false);
        onNavigate?.(path);
    };

    return (
        <header className="fixed top-0 inset-x-0 z-50 pointer-events-none">
            <div className="max-w-[1440px] mx-auto px-5 md:px-8 pt-4 md:pt-5 flex items-center justify-between gap-4">
                {/* Left Floating Pills */}
                <nav className="hidden md:flex items-center gap-2 pointer-events-auto">
                    <SquigglePillLink href="/work" label="Work" onClick={(e) => handleNav(e, '/work')} />
                    <SquigglePillLink href="/about" label="About us" onClick={(e) => handleNav(e, '/about')} />
                </nav>

                {/* Center Wordmark (plain orange, no box — matches screenshot) */}
                <a
                    href="/"
                    onClick={(e) => handleNav(e, '/')}
                    className="pointer-events-auto inline-flex items-center font-display text-2xl md:text-3xl uppercase tracking-tight"
                    style={{ color: 'var(--brand-primary)' }}
                    aria-label="Studio Kinetix Home"
                >
                    KINETIX
                </a>

                {/* Right Controls */}
                <div className="flex items-center gap-4 pointer-events-auto">
                    <span className="hidden lg:inline-block text-xs font-medium leading-tight text-left" style={{ color: 'var(--brand-black)' }}>
                        Monday–Friday<br />10:00 – 17:00
                    </span>

                    {/* Primary Color Switcher (Orange / Blue / Red / Green) */}
                    <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border border-black/10 bg-white/90 shadow-sm">
                        {[
                            { id: 'orange', color: '#ff5400', label: 'Original Orange' },
                            { id: 'blue', color: '#0047FF', label: 'Cobalt Blue' },
                            { id: 'red', color: '#E11D2E', label: 'Signal Red' },
                            { id: 'green', color: '#059669', label: 'Emerald Green' },
                        ].map((t) => (
                            <button
                                key={t.id}
                                type="button"
                                onClick={() => onChangeTheme(t.id)}
                                title={t.label}
                                aria-label={`Switch to ${t.label}`}
                                className={`w-3.5 h-3.5 rounded-full transition-transform cursor-pointer ${
                                    theme === t.id ? 'scale-125 ring-2 ring-offset-1 ring-black/40' : 'opacity-65 hover:opacity-100'
                                }`}
                                style={{ backgroundColor: t.color }}
                            />
                        ))}
                    </div>

                    {/* Black Pill CTA with Primary Circle Arrow (matches screenshot) */}
                    <button
                        type="button"
                        onClick={onOpenContact}
                        className="group hidden md:inline-flex items-center gap-3 pl-4 pr-1.5 py-1.5 rounded-full text-sm font-medium text-white shadow-md transition-transform duration-300 hover:scale-[1.03] cursor-pointer"
                        style={{ backgroundColor: 'var(--brand-black)' }}
                    >
                        <span>Let&apos;s Talk</span>
                        <span
                            className="w-7 h-7 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:rotate-45"
                            style={{ backgroundColor: 'var(--brand-primary)' }}
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
            </div>

            {/* Mobile Drawer */}
            {mobileOpen && (
                <div
                    className="md:hidden fixed inset-0 z-40 p-8 pt-24 flex flex-col justify-between pointer-events-auto"
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
