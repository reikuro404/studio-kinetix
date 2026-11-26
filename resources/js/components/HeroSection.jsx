import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection({ ready }) {
    const heroRef = useRef(null);
    const pinStageRef = useRef(null);
    const videoWrapRef = useRef(null);
    const contentRef = useRef(null);
    const lineRefs = useRef([]);
    const pillRefs = useRef([]);
    const pillTextRefs = useRef([]);
    const pathLeftRef = useRef(null);
    const pathRightRef = useRef(null);
    const marqueeRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            if (marqueeRef.current) {
                gsap.to(marqueeRef.current, {
                    xPercent: -50,
                    duration: 24,
                    ease: 'none',
                    repeat: -1,
                });
            }

            gsap.set(lineRefs.current.filter(Boolean), { y: '115%', opacity: 0 });
            gsap.set(pillRefs.current.filter(Boolean), { scale: 0.4, opacity: 0, y: 20 });
            gsap.set(pillTextRefs.current.filter(Boolean), { y: '105%', opacity: 0 });

            [pathLeftRef.current, pathRightRef.current].forEach((p) => {
                if (!p) return;
                const len = p.getTotalLength();
                gsap.set(p, { strokeDasharray: len, strokeDashoffset: len, strokeWidth: 0 });
            });

            // Scroll-triggered Background -> Rounded Card morph
            if (pinStageRef.current && videoWrapRef.current) {
                gsap.set(videoWrapRef.current, {
                    scale: 1,
                    borderRadius: '0px',
                    transformOrigin: 'center center',
                });

                const scrollTl = gsap.timeline({
                    scrollTrigger: {
                        trigger: pinStageRef.current,
                        start: 'top top',
                        end: '+=900',
                        pin: true,
                        pinSpacing: true,
                        scrub: 0.8,
                        anticipatePin: 1,
                        invalidateOnRefresh: true,
                    },
                });

                scrollTl.to(
                    videoWrapRef.current,
                    {
                        scale: 0.68,
                        borderRadius: '28px',
                        y: 36,
                        ease: 'power2.inOut',
                    },
                    0
                );

                if (contentRef.current) {
                    scrollTl.to(
                        contentRef.current,
                        {
                            y: -60,
                            opacity: 0.2,
                            ease: 'power2.inOut',
                        },
                        0
                    );
                }
            }
        }, heroRef);

        return () => ctx.revert();
    }, []);

    useEffect(() => {
        if (!ready) return;
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: 'power2.out' } }).timeScale(0.8);

            // A. Line-by-line masked heading entrance
            tl.to(
                lineRefs.current.filter(Boolean),
                {
                    y: '0%',
                    opacity: 1,
                    duration: 0.85,
                    stagger: 0.12,
                    ease: 'back.out(1.4)',
                },
                0
            );

            // B. Hero pills pop-in + masked inner text slide up
            pillRefs.current.forEach((pill, i) => {
                if (!pill) return;
                const start = 0.2 + i * 0.14;
                tl.to(pill, { opacity: 1, scale: 1, y: 0, duration: 0.55, ease: 'back.out(2.5)' }, start);
                const textEl = pillTextRefs.current[i];
                if (textEl) {
                    tl.to(textEl, { y: '0%', opacity: 1, duration: 0.5, ease: 'back.out(1.6)' }, start + 0.14);
                }
            });

            // C. Exact original Hero SVG paths draw + grow strokeWidth 0 -> 30
            [pathLeftRef.current, pathRightRef.current].forEach((p, i) => {
                if (!p) return;
                tl.to(
                    p,
                    {
                        strokeDashoffset: 0,
                        strokeWidth: 30,
                        duration: 0.95,
                        ease: 'power2.out',
                    },
                    0.35 + i * 0.15
                );
            });
        }, heroRef);

        return () => ctx.revert();
    }, [ready]);

    const tickerItems = Array.from({ length: 8 });
    const pills = [
        { label: 'Independent studio', rotate: '-rotate-2' },
        { label: 'Branding & design', rotate: 'rotate-2' },
        { label: 'No funny business', rotate: '-rotate-1' },
    ];

    return (
        <section ref={heroRef} className="relative overflow-hidden">
            {/* Full-Viewport Pinned Stage: Video starts as full-bleed BG, converts to rounded card on scroll */}
            <div
                ref={pinStageRef}
                className="relative w-full h-screen min-h-[640px] flex flex-col items-center justify-center overflow-hidden"
            >
                {/* Full-bleed Background Video that morphs into a Card */}
                <div
                    ref={videoWrapRef}
                    className="absolute inset-0 w-full h-full overflow-hidden shadow-2xl will-change-transform"
                    style={{ backgroundColor: 'var(--brand-secondary)' }}
                >
                    <video autoPlay loop muted playsInline className="w-full h-full object-cover">
                        <source src="/assets/media/Hero_webm.webm" type="video/webm" />
                        <source src="/assets/media/Hero_mp4.mp4" type="video/mp4" />
                    </video>
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{ backgroundColor: 'color-mix(in srgb, var(--brand-white) 58%, transparent)' }}
                    />
                </div>

                {/* Exact Original Left & Right Hero Ribbon SVG Paths */}
                <svg
                    className="hidden md:block absolute left-0 top-[14%] w-36 lg:w-52 h-auto pointer-events-none z-10"
                    viewBox="0 0 229 599"
                    fill="none"
                >
                    <path
                        ref={pathLeftRef}
                        d="M33.502 584.112C104.502 557.112 147.911 474.964 143.002 393.612C139.502 335.612 106.002 281.612 59.0025 252.612C7.82072 221.032 -4.20053 385.572 52.5031 405.612C140.218 436.612 225.002 369.112 212.002 252.612C208.376 220.111 192.539 178.612 152.002 121.612C117.866 73.6124 42.0029 11.6124 42.0029 11.6124"
                        stroke="var(--brand-primary)"
                        strokeWidth="30"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>

                <svg
                    className="hidden md:block absolute right-0 top-[18%] w-44 lg:w-64 h-auto pointer-events-none z-10"
                    viewBox="0 0 354 487"
                    fill="none"
                >
                    <path
                        ref={pathRightRef}
                        d="M250.687 12.2982C192.69 52.7982 114.69 199.814 245.687 315.798C376.684 431.783 364.19 140.889 235.187 83.2982C153.19 46.6926 54.8365 106.798 30.1893 172.298C-59.5565 410.798 277.687 471.798 277.687 471.798"
                        stroke="var(--brand-primary)"
                        strokeWidth="30"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>

                {/* Foreground Hero Headline & Pills */}
                <div ref={contentRef} className="relative z-20 max-w-[1440px] mx-auto px-5 md:px-10 text-center">
                    <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 mb-6 md:mb-8">
                        {pills.map((p, idx) => (
                            <div
                                key={idx}
                                ref={(el) => (pillRefs.current[idx] = el)}
                                className={`px-4 py-1.5 rounded-full text-xs md:text-sm font-medium border shadow-sm ${p.rotate}`}
                                style={{
                                    borderColor: 'var(--brand-primary)',
                                    backgroundColor: idx === 1 ? 'var(--brand-primary)' : 'var(--brand-accent)',
                                    color: idx === 1 ? '#FFFFFF' : 'var(--brand-black)',
                                }}
                            >
                                <span className="block overflow-hidden">
                                    <span ref={(el) => (pillTextRefs.current[idx] = el)} className="block">
                                        {p.label}
                                    </span>
                                </span>
                            </div>
                        ))}
                    </div>

                    <h1
                        className="font-display uppercase text-center leading-[0.86] tracking-[-0.02em] text-[14vw] sm:text-[12vw] md:text-[9.5vw] lg:text-[138px]"
                        style={{ color: 'var(--brand-black)' }}
                    >
                        <span className="block overflow-hidden">
                            <span ref={(el) => (lineRefs.current[0] = el)} className="block">
                                LOOKING
                            </span>
                        </span>
                        <span className="block overflow-hidden">
                            <span
                                ref={(el) => (lineRefs.current[1] = el)}
                                className="block"
                                style={{ color: 'var(--brand-primary)' }}
                            >
                                SUSPICIOUSLY GOOD
                            </span>
                        </span>
                    </h1>
                </div>
            </div>

            {/* Infinite Kinetic Marquee */}
            <div
                className="w-full py-3.5 md:py-4 border-y overflow-hidden select-none relative z-20"
                style={{
                    backgroundColor: 'var(--brand-primary)',
                    borderColor: 'var(--brand-primary)',
                    color: '#FFFFFF',
                }}
            >
                <div ref={marqueeRef} className="marquee-track items-center">
                    {tickerItems.map((_, idx) => (
                        <span
                            key={idx}
                            className="font-display text-xl md:text-2xl uppercase tracking-wider whitespace-nowrap px-4"
                        >
                            LET&apos;S MAKE IT MAKE SENSE &nbsp;•&nbsp; GOOD LOOKS INCLUDED &nbsp;•&nbsp;
                        </span>
                    ))}
                </div>
            </div>
        </section>
    );
}
