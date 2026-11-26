import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function AboutAndShowcase({ showcase }) {
    const aboutSectionRef = useRef(null);
    const paraRef = useRef(null);
    const pillsRef = useRef([]);
    const wrapperRef = useRef(null);
    const trackRef = useRef(null);

    const aboutText =
        'We believe creative work needs focus. That’s why we keep our team tight and our involvement high, so every project gets our full attention. We build brands from scratch or make them better.';

    // 1. Pinned Character-by-Character Scrubbed About Animation
    useEffect(() => {
        const section = aboutSectionRef.current;
        const para = paraRef.current;
        if (!section || !para) return;

        const ctx = gsap.context(() => {
            const chars = Array.from(para.querySelectorAll('.about-char'));
            const pills = pillsRef.current.filter(Boolean);

            gsap.set(section, { willChange: 'transform', force3D: true });

            gsap.set(chars, {
                color: 'color-mix(in srgb, var(--brand-primary) 40%, transparent)',
                scale: 1,
                rotation: 0,
                display: 'inline-block',
                transformOrigin: 'center center',
                willChange: 'transform, color',
            });

            gsap.set(pills, {
                opacity: 0,
                scale: 0.6,
                y: 24,
                transformOrigin: 'center center',
            });

            const getPinDistance = () => {
                const w = window.innerWidth;
                if (w < 480) return 1100;
                if (w < 992) return 1500;
                return 2000;
            };

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: 'top top',
                    end: () => `+=${getPinDistance()}`,
                    pin: section,
                    pinSpacing: true,
                    scrub: window.innerWidth < 992 ? 0.6 : 0.8,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                },
            });

            const totalChars = chars.length;
            const span = 85;

            chars.forEach((char, i) => {
                const start = (i / totalChars) * span;
                tl.to(
                    char,
                    {
                        color: 'var(--brand-primary)',
                        scale: 1.12,
                        rotation: () => gsap.utils.random(-4, 4),
                        duration: 3.5,
                        ease: 'power1.out',
                    },
                    start
                ).to(
                    char,
                    {
                        color: 'var(--brand-black)',
                        scale: 1,
                        rotation: 0,
                        duration: 3.5,
                        ease: 'power1.inOut',
                    },
                    start + 3.5
                );
            });

            if (pills[0]) tl.to(pills[0], { opacity: 1, scale: 1, y: 0, duration: 6, ease: 'back.out(2)' }, 30);
            if (pills[1]) tl.to(pills[1], { opacity: 1, scale: 1, y: 0, duration: 6, ease: 'back.out(2)' }, 62);
            if (pills[2]) tl.to(pills[2], { opacity: 1, scale: 1, y: 0, duration: 6, ease: 'back.out(2)' }, 88);
        }, aboutSectionRef);

        return () => ctx.revert();
    }, []);

    // 2. Showcase Marquee with Scroll Direction Reversal, Velocity Boost & Center Proximity Scale
    useEffect(() => {
        const wrapper = wrapperRef.current;
        const track = trackRef.current;
        if (!wrapper || !track) return;

        const slides = Array.from(track.querySelectorAll('.showcase-slide'));
        if (!slides.length) return;

        let setWidth = 0;
        const measure = () => {
            const half = slides.length / 2;
            if (slides[half] && slides[0]) {
                setWidth = slides[half].offsetLeft - slides[0].offsetLeft;
            }
        };
        measure();
        window.addEventListener('resize', measure);

        let currentX = 0;
        let targetDir = -1;
        let currentDir = -1;
        let velBoost = 0;
        const BASE_SPEED = 1.5;

        const st = ScrollTrigger.create({
            trigger: document.body,
            start: 'top top',
            end: 'bottom bottom',
            onUpdate: (self) => {
                const dir = self.direction === 1 ? -1 : 1;
                targetDir = dir;
                const vel = Math.abs(self.getVelocity() || 0);
                velBoost = Math.min(vel / 220, 10) * dir;
            },
        });

        const tick = () => {
            currentDir += (targetDir - currentDir) * 0.06;
            velBoost *= 0.92;
            currentX += BASE_SPEED * currentDir + velBoost;

            if (setWidth > 0) {
                while (currentX <= -setWidth) currentX += setWidth;
                while (currentX > 0) currentX -= setWidth;
            }

            gsap.set(track, { x: currentX, force3D: true });

            const wRect = wrapper.getBoundingClientRect();
            const wCenter = wRect.left + wRect.width / 2;
            const halfW = wRect.width * 0.45 || 400;

            slides.forEach((slide) => {
                const sRect = slide.getBoundingClientRect();
                const sCenter = sRect.left + sRect.width / 2;
                const dist = Math.abs(sCenter - wCenter);
                const norm = Math.min(1, dist / halfW);
                const targetScale = 0.94 + (1 - 0.94) * norm;
                gsap.set(slide, { scale: targetScale, transformOrigin: 'center center' });
            });
        };

        gsap.ticker.add(tick);

        return () => {
            gsap.ticker.remove(tick);
            st.kill();
            window.removeEventListener('resize', measure);
        };
    }, []);

    const pills = [
        { text: 'Professional overthinkers', rotate: '-rotate-2' },
        { text: 'Nerding out on design', rotate: 'rotate-2' },
        { text: 'Allergic to generic', rotate: '-rotate-1' },
    ];

    const words = aboutText.split(' ');
    const doubledShowcase = [...showcase, ...showcase];

    return (
        <div>
            {/* Pinned Full-Viewport About Section */}
            <section
                id="about"
                ref={aboutSectionRef}
                className="min-h-screen flex flex-col justify-center py-20 px-5 md:px-10 max-w-[1440px] mx-auto"
            >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start">
                    <div className="lg:col-span-3">
                        <span
                            className="inline-block text-xs font-medium uppercase tracking-[0.2em] px-3.5 py-1.5 rounded-full"
                            style={{ backgroundColor: 'var(--brand-accent)', color: 'var(--brand-primary)' }}
                        >
                            A bit about us
                        </span>
                    </div>

                    <div className="lg:col-span-9">
                        <p
                            ref={paraRef}
                            className="text-2xl sm:text-3xl md:text-5xl font-medium leading-[1.18] tracking-tight mb-12"
                        >
                            {words.map((word, wIdx) => (
                                <span key={wIdx} className="inline-block whitespace-nowrap mr-[0.26em]">
                                    {word.split('').map((ch, cIdx) => (
                                        <span key={cIdx} className="about-char">
                                            {ch}
                                        </span>
                                    ))}
                                </span>
                            ))}
                        </p>

                        <div className="flex flex-wrap gap-3 md:gap-4">
                            {pills.map((pill, i) => (
                                <span
                                    key={i}
                                    ref={(el) => (pillsRef.current[i] = el)}
                                    className={`about-pill inline-flex items-center px-5 py-2.5 rounded-full text-sm md:text-base font-medium border-2 ${pill.rotate}`}
                                    style={{
                                        borderColor: 'var(--brand-primary)',
                                        backgroundColor: i === 1 ? 'var(--brand-primary)' : 'var(--brand-accent)',
                                        color: i === 1 ? '#FFFFFF' : 'var(--brand-black)',
                                    }}
                                >
                                    {pill.text}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Bidirectional Velocity + Proximity-Scaled Showcase Marquee */}
            <section
                ref={wrapperRef}
                className="py-12 md:py-20 overflow-hidden border-y"
                style={{
                    backgroundColor: 'var(--brand-secondary)',
                    borderColor: 'color-mix(in srgb, var(--brand-black) 8%, transparent)',
                }}
            >
                <div ref={trackRef} className="flex flex-row items-center gap-6 w-max will-change-transform">
                    {doubledShowcase.map((item, idx) => (
                        <div
                            key={idx}
                            className="showcase-slide w-[280px] sm:w-[360px] md:w-[440px] aspect-[4/3] rounded-2xl overflow-hidden shrink-0 shadow-lg border will-change-transform"
                            style={{ borderColor: 'color-mix(in srgb, var(--brand-black) 10%, transparent)' }}
                        >
                            {item.type === 'video' ? (
                                <video autoPlay loop muted playsInline className="w-full h-full object-cover">
                                    <source src={item.webm} type="video/webm" />
                                    <source src={item.mp4} type="video/mp4" />
                                </video>
                            ) : (
                                <img
                                    src={item.src}
                                    alt={`Studio showcase ${(idx % showcase.length) + 1}`}
                                    className="w-full h-full object-cover"
                                />
                            )}
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
