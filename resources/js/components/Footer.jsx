import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Footer({ brand, onOpenContact, onNavigate }) {
    const footerRef = useRef(null);
    const wordmarkRef = useRef(null);
    const headingLineRefs = useRef([]);

    useEffect(() => {
        const footer = footerRef.current;
        const wordmark = wordmarkRef.current;
        if (!footer || !wordmark) return;

        const ctx = gsap.context(() => {
            // 1. Heading lines bounce reveal
            const lines = headingLineRefs.current.filter(Boolean);
            gsap.set(lines, { y: '115%', opacity: 0 });
            gsap.to(lines, {
                y: '0%',
                opacity: 1,
                duration: 0.8,
                stagger: 0.1,
                ease: 'back.out(1.6)',
                scrollTrigger: {
                    trigger: footer,
                    start: 'top 80%',
                    toggleActions: 'play none none none',
                },
            });

            // 2. Signature Wolff Olins Elastic Wordmark Stretch & Bounce
            gsap.set(wordmark, {
                scaleY: 0.15,
                transformOrigin: 'bottom center',
                willChange: 'transform',
            });

            let hasBounced = false;
            ScrollTrigger.create({
                trigger: footer,
                start: 'top bottom',
                end: 'bottom bottom',
                invalidateOnRefresh: true,
                onUpdate: (self) => {
                    const vel = Math.abs(self.getVelocity() || 0);
                    const velStretch = Math.min(vel / 1500, 0.25);

                    if (self.progress >= 0.9) {
                        if (!hasBounced) {
                            hasBounced = true;
                            gsap.killTweensOf(wordmark);
                            gsap.to(wordmark, {
                                scaleY: 1,
                                duration: 1.4,
                                ease: 'elastic.out(1.2, 0.35)',
                                overwrite: 'auto',
                            });
                        }
                    } else {
                        hasBounced = false;
                        const base =
                            self.direction === 1
                                ? 0.15 + self.progress * 1.15 + velStretch
                                : 0.15 + self.progress * 0.95;
                        gsap.to(wordmark, {
                            scaleY: Math.max(0.15, Math.min(base, 1.4)),
                            duration: 0.1,
                            ease: 'power1.out',
                            overwrite: 'auto',
                        });
                    }
                },
                onLeaveBack: () => {
                    hasBounced = false;
                    gsap.set(wordmark, { scaleY: 0.15 });
                },
            });
        }, footerRef);

        return () => ctx.revert();
    }, []);

    return (
        <footer
            ref={footerRef}
            className="relative overflow-hidden pt-16 md:pt-24 pb-4 px-5 md:px-10 text-white"
            style={{ backgroundColor: 'var(--brand-primary)' }}
        >
            {/* Curvy ribbon texture across footer */}
            <div
                className="absolute inset-0 opacity-20 pointer-events-none bg-no-repeat bg-cover bg-center"
                style={{ backgroundImage: "url('/assets/media/footer-texture.svg')" }}
            />

            <div className="relative z-10 max-w-[1440px] mx-auto">
                {/* Top Row: Stacked Headline + CTA on left, Menu + Socials on right */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-16 md:pb-24">
                    <div className="lg:col-span-6">
                        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-[0.98] tracking-tight mb-7">
                            {["Okay, that's", 'enough', 'website'].map((line, i) => (
                                <span key={i} className="block overflow-hidden">
                                    <span ref={(el) => (headingLineRefs.current[i] = el)} className="block">
                                        {line}
                                    </span>
                                </span>
                            ))}
                        </h2>

                        {/* Black Pill CTA with Primary Circle Arrow */}
                        <button
                            type="button"
                            onClick={onOpenContact}
                            className="group inline-flex items-center gap-3 pl-5 pr-1.5 py-1.5 rounded-full text-sm font-medium shadow-lg transition-transform duration-300 hover:scale-105 cursor-pointer"
                            style={{ backgroundColor: 'var(--brand-black)', color: '#FFFFFF' }}
                        >
                            <span style={{ color: '#FFFFFF' }}>Let&apos;s Talk</span>
                            <span
                                className="w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:rotate-45"
                                style={{ backgroundColor: 'var(--brand-primary)', color: '#FFFFFF' }}
                            >
                                <ArrowUpRight className="w-4 h-4 text-white" />
                            </span>
                        </button>
                    </div>

                    <div className="lg:col-span-6 grid grid-cols-2 sm:grid-cols-3 gap-8 text-base">
                        <div>
                            <div className="text-white/70 text-sm mb-3">Main Menu</div>
                            <ul className="space-y-2.5 font-medium">
                                <li>
                                    <a
                                        href="/work"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            onNavigate?.('/work');
                                        }}
                                        className="hover:opacity-75"
                                    >
                                        Work
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="/about"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            onNavigate?.('/about');
                                        }}
                                        className="hover:opacity-75"
                                    >
                                        About us
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <div className="text-white/70 text-sm mb-3">Hours</div>
                            <p className="text-sm text-white/90">{brand.hours}</p>
                        </div>

                        <div>
                            <div className="text-white/70 text-sm mb-3">Socials</div>
                            <ul className="space-y-2.5 font-medium">
                                <li>
                                    <a href="https://instagram.com" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 hover:opacity-75">
                                        Instagram <ArrowUpRight className="w-3.5 h-3.5" />
                                    </a>
                                </li>
                                <li>
                                    <a href="https://behance.net" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 hover:opacity-75">
                                        Behance <ArrowUpRight className="w-3.5 h-3.5" />
                                    </a>
                                </li>
                                <li>
                                    <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 hover:opacity-75">
                                        LinkedIn <ArrowUpRight className="w-3.5 h-3.5" />
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Middle Info Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-6 pb-8 text-sm">
                    <div className="lg:col-span-6">
                        <div className="text-white/75 mb-1">Email us</div>
                        <a href={`mailto:${brand.emails[0].email}`} className="font-semibold text-base hover:underline block">
                            {brand.emails[0].email}
                        </a>
                        <div className="text-xs text-white/75 mt-1">© Copyright 2026 - {brand.name}</div>
                    </div>
                    <div className="lg:col-span-3">
                        <p className="font-medium leading-snug">
                            Handmade by humans.
                            <br />
                            Well, digitally
                        </p>
                    </div>
                    <div className="lg:col-span-3 lg:text-right">
                        <p className="font-medium leading-snug">
                            Bucharest,
                            <br />
                            Romania
                        </p>
                    </div>
                </div>

                {/* Edge-to-Edge Giant Elastic Wordmark */}
                <div className="overflow-hidden pt-2">
                    <div
                        ref={wordmarkRef}
                        className="font-display uppercase text-center leading-[0.78] tracking-[-0.03em] select-none w-full text-[23vw] lg:text-[21vw]"
                        style={{ color: 'var(--brand-white)' }}
                    >
                        KINETIX
                    </div>
                </div>
            </div>
        </footer>
    );
}
