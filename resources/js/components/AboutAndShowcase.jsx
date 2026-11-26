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

    useEffect(() => {
        const section = aboutSectionRef.current;
        const para = paraRef.current;
        if (!section || !para) return;

        const ctx = gsap.context(() => {
            const chars = Array.from(para.querySelectorAll('.about-char'));
            const pills = pillsRef.current.filter(Boolean);

            gsap.set(section, { willChange: 'transform', force3D: true });
            gsap.set(chars, {
                color: 'color-mix(in srgb, var(--brand-primary) 45%, transparent)',
                scale: 1,
                rotation: 0,
                display: 'inline-block',
                transformOrigin: 'center center',
            });
            gsap.set(pills, { opacity: 0, scale: 0.6, y: 24, transformOrigin: 'center center' });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: 'top top',
                    end: () => `+=${window.innerWidth < 480 ? 1150 : window.innerWidth < 992 ? 1550 : 2200}`,
                    pin: section,
                    pinSpacing: true,
                    scrub: window.innerWidth < 992 ? 0.6 : 0.8,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                },
            });

            const totalChars = chars.length;
            chars.forEach((char, i) => {
                const start = (i / totalChars) * 85;
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

            if (pills[0]) tl.to(pills[0], { opacity: 1, scale: 1, y: 0, duration: 6, ease: 'back.out(2)' }, 35);
            if (pills[1]) tl.to(pills[1], { opacity: 1, scale: 1, y: 0, duration: 6, ease: 'back.out(2)' }, 72);
            if (pills[2]) tl.to(pills[2], { opacity: 1, scale: 1, y: 0, duration: 6, ease: 'back.out(2)' }, 96);
        }, aboutSectionRef);

        return () => ctx.revert();
    }, []);

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
            currentX += 1.5 * currentDir + velBoost;

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
                const targetScale = 0.95 + (1 - 0.95) * norm;
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

    const words = aboutText.split(' ');
    const doubledShowcase = [...showcase, ...showcase];

    return (
        <div>
            {/* Exact .section-about + .about-pinned + .about-pill classes */}
            <section id="about" ref={aboutSectionRef} className="section-about">
                <div className="section-about-wrapper">
                    <div className="about-pinned">
                        <div className="about-text">A BIT ABOUT US</div>
                        <p ref={paraRef} className="about-para">
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
                        <div ref={(el) => (pillsRef.current[0] = el)} className="about-pill second">
                            <div className="hero-pill-text">Professional overthinkers</div>
                        </div>
                        <div ref={(el) => (pillsRef.current[1] = el)} className="about-pill first">
                            <div className="hero-pill-text">Nerding out on design</div>
                        </div>
                        <div ref={(el) => (pillsRef.current[2] = el)} className="about-pill third">
                            <div className="hero-pill-text">Allergic to generic</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Exact .section-slider-showcase + .showcase-slider */}
            <section className="section-slider-showcase">
                <div ref={wrapperRef} className="section-slider-wrapper">
                    <div ref={trackRef} className="showcase-slider">
                        {doubledShowcase.map((item, idx) => (
                            <div key={idx} className="showcase-slide">
                                {item.type === 'video' ? (
                                    <video autoPlay loop muted playsInline className="w-full h-full object-cover">
                                        <source src={item.mp4} type="video/mp4" />
                                        <source src={item.webm} type="video/webm" />
                                    </video>
                                ) : (
                                    <img
                                        src={item.src}
                                        alt={`Showcase ${(idx % showcase.length) + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
