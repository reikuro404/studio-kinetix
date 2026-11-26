import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection({ ready }) {
    const sectionRef = useRef(null);
    const headingRef = useRef(null);
    const pillRefs = useRef([]);
    const pillTextRefs = useRef([]);
    const pathLeftRef = useRef(null);
    const pathRightRef = useRef(null);
    const videoLoopRef = useRef(null);
    const marqueeContainerRef = useRef(null);
    const marqueeBgRef = useRef(null);
    const marqueeMaskRef = useRef(null);
    const marqueeTpRef = useRef(null);
    const marqueeUnitRef = useRef(null);
    const marqueeGroupRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // 1. Initial hidden states (preserve CSS rotation on .hero-pill.one / two / three)
            pillRefs.current.forEach((p, idx) => {
                if (!p) return;
                const baseRot = idx === 0 ? 3 : idx === 1 ? -7 : -5;
                gsap.set(p, { opacity: 0, scale: 0.4, y: 20, rotation: baseRot, transformOrigin: 'center center' });
            });
            gsap.set(pillTextRefs.current.filter(Boolean), { y: '105%', opacity: 0 });
            gsap.set('.hero-line-inner', { y: '115%', opacity: 0 });

            [pathLeftRef.current, pathRightRef.current].forEach((p) => {
                if (!p) return;
                const len = p.getTotalLength();
                gsap.set(p, { strokeDasharray: len, strokeDashoffset: len, strokeWidth: 0 });
            });

            // 2. Curved SVG Marquee Ribbon + Infinite TextPath Loop
            const bgPath = marqueeBgRef.current;
            const maskPath = marqueeMaskRef.current;
            const textPath = marqueeTpRef.current;
            const unit = marqueeUnitRef.current;

            if (bgPath && maskPath && textPath) {
                const bgLen = bgPath.getTotalLength();
                const maskLen = maskPath.getTotalLength();
                gsap.set(bgPath, { strokeDasharray: bgLen, strokeDashoffset: -bgLen });
                gsap.set(maskPath, { strokeDasharray: maskLen, strokeDashoffset: -maskLen });

                const unitLength = unit ? unit.getComputedTextLength() : 1600;
                gsap.to(textPath, {
                    attr: { startOffset: -unitLength },
                    duration: unitLength / 75,
                    ease: 'none',
                    repeat: -1,
                });

                gsap.to([bgPath, maskPath], {
                    strokeDashoffset: 0,
                    duration: 1.3,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: marqueeContainerRef.current,
                        start: 'top 88%',
                        once: true,
                    },
                    onComplete: () => {
                        if (marqueeGroupRef.current) {
                            marqueeGroupRef.current.removeAttribute('mask');
                        }
                    },
                });
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    useEffect(() => {
        if (!ready) return;
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: 'power2.out' } }).timeScale(0.75);

            tl.to(
                '.hero-line-inner',
                {
                    y: '0%',
                    opacity: 1,
                    duration: 0.85,
                    stagger: 0.12,
                    ease: 'back.out(1.4)',
                },
                0
            );

            pillRefs.current.forEach((pill, i) => {
                if (!pill) return;
                const start = 0.2 + i * 0.16;
                tl.to(pill, { opacity: 1, scale: 1, y: 0, duration: 0.55, ease: 'back.out(2.5)' }, start);
                const tEl = pillTextRefs.current[i];
                if (tEl) {
                    tl.to(tEl, { y: '0%', opacity: 1, duration: 0.5, ease: 'back.out(1.6)' }, start + 0.15);
                }
            });

            [pathLeftRef.current, pathRightRef.current].forEach((p, i) => {
                if (!p) return;
                tl.to(p, { strokeDashoffset: 0, strokeWidth: 30, duration: 0.9, ease: 'power2.out' }, 0.4 + i * 0.15);
            });
        }, sectionRef);

        return () => ctx.revert();
    }, [ready]);

    return (
        <section ref={sectionRef} className="section-hero">
            <div className="section-hero-wrapper">
                <div className="hero-text">
                    <div ref={(el) => (pillRefs.current[0] = el)} className="hero-pill two">
                        <span className="block overflow-hidden">
                            <div ref={(el) => (pillTextRefs.current[0] = el)} className="hero-pill-text">
                                Independent studio
                            </div>
                        </span>
                    </div>

                    <h1 ref={headingRef} className="heading">
                        <span className="block overflow-hidden">
                            <span className="hero-line-inner block">LOOKING</span>
                        </span>
                        <span className="block overflow-hidden">
                            <span className="hero-line-inner block">SUSPICIOUSLY GOOD</span>
                        </span>
                    </h1>

                    <div ref={(el) => (pillRefs.current[1] = el)} className="hero-pill one">
                        <span className="block overflow-hidden">
                            <div ref={(el) => (pillTextRefs.current[1] = el)} className="hero-pill-text">
                                Branding &amp; design
                            </div>
                        </span>
                    </div>

                    <div ref={(el) => (pillRefs.current[2] = el)} className="hero-pill three">
                        <span className="block overflow-hidden">
                            <div ref={(el) => (pillTextRefs.current[2] = el)} className="hero-pill-text">
                                No funny business
                            </div>
                        </span>
                    </div>
                </div>

                {/* Central Hero Video Loop */}
                <div ref={videoLoopRef} className="hero-video-loop">
                    <div className="hero-video-bg w-background-video w-background-video-atom">
                        <video autoPlay loop muted playsInline style={{ objectFit: 'cover', width: '100%', height: '100%' }}>
                            <source src="/assets/media/Hero_mp4.mp4" type="video/mp4" />
                            <source src="/assets/media/Hero_webm.webm" type="video/webm" />
                        </video>
                    </div>
                </div>

                {/* Exact Left & Right Looping Ribbon SVGs */}
                <div className="hero-path-svg-left">
                    <div className="code-embed-3 w-embed">
                        <svg width="100%" height="100%" viewBox="0 0 229 599" fill="none">
                            <path
                                ref={pathLeftRef}
                                d="M33.502 584.112C104.502 557.112 147.911 474.964 143.002 393.612C139.502 335.612 106.002 281.612 59.0025 252.612C7.82072 221.032 -4.20053 385.572 52.5031 405.612C140.218 436.612 225.002 369.112 212.002 252.612C208.376 220.111 192.539 178.612 152.002 121.612C117.866 73.6124 42.0029 11.6124 42.0029 11.6124"
                                stroke="var(--brand-primary)"
                                strokeWidth="30"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>
                </div>

                <div className="hero-path-svg-right">
                    <div className="code-embed-2 w-embed">
                        <svg width="100%" height="100%" viewBox="0 0 354 487" fill="none">
                            <path
                                ref={pathRightRef}
                                d="M250.687 12.2982C192.69 52.7982 114.69 199.814 245.687 315.798C376.684 431.783 364.19 140.889 235.187 83.2982C153.19 46.6926 54.8365 106.798 30.1893 172.298C-59.5565 410.798 277.687 471.798 277.687 471.798"
                                stroke="var(--brand-primary)"
                                strokeWidth="30"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>
                </div>

                {/* Exact Curved SVG Ribbon Marquee */}
                <div ref={marqueeContainerRef} className="hero-marquee">
                    <svg viewBox="0 0 1440 370" preserveAspectRatio="xMidYMid meet" style={{ width: '100%', height: 'auto', display: 'block', overflow: 'visible' }}>
                        <defs>
                            <path
                                id="hero-marquee-curve"
                                d="M-43.0867 292.81C179.631 174.299 464.078 116.458 712.699 90.6403C934.59 67.5984 1166.5 74.6231 1436.89 105.117 L 5000 507"
                                fill="none"
                            />
                            <mask id="hero-marquee-text-mask" maskUnits="userSpaceOnUse">
                                <path
                                    ref={marqueeMaskRef}
                                    className="hero-marquee-mask-path"
                                    d="M-43.0867 292.81C179.631 174.299 464.078 116.458 712.699 90.6403C934.59 67.5984 1166.5 74.6231 1436.89 105.117"
                                    stroke="#FFFFFF"
                                    strokeWidth="220"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    fill="none"
                                />
                            </mask>
                        </defs>

                        <path
                            ref={marqueeBgRef}
                            className="hero-marquee-bg"
                            d="M-43.0867 292.81C179.631 174.299 464.078 116.458 712.699 90.6403C934.59 67.5984 1166.5 74.6231 1436.89 105.117"
                            stroke="var(--brand-primary)"
                            strokeWidth="154"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            fill="none"
                        />

                        <g ref={marqueeGroupRef} className="hero-marquee-text-group" mask="url(#hero-marquee-text-mask)">
                            <text
                                className="hero-marquee-text"
                                fill="#FFFFFF"
                                dominantBaseline="central"
                                alignmentBaseline="central"
                                fontSize="80"
                                fontWeight="800"
                                fontFamily="inherit"
                                style={{ letterSpacing: '0.04em', userSelect: 'none' }}
                            >
                                <textPath
                                    ref={marqueeTpRef}
                                    href="#hero-marquee-curve"
                                    className="hero-marquee-tp"
                                    startOffset="0"
                                    dominantBaseline="central"
                                    alignmentBaseline="central"
                                >
                                    <tspan ref={marqueeUnitRef} className="marquee-unit">
                                        LET’S MAKE IT MAKE SENSE &nbsp;•&nbsp; GOOD LOOKS INCLUDED &nbsp;•&nbsp;
                                    </tspan>
                                    {Array.from({ length: 7 }).map((_, i) => (
                                        <tspan key={i}>
                                            LET’S MAKE IT MAKE SENSE &nbsp;•&nbsp; GOOD LOOKS INCLUDED &nbsp;•&nbsp;
                                        </tspan>
                                    ))}
                                </textPath>
                            </text>
                        </g>
                    </svg>
                </div>
            </div>
        </section>
    );
}
