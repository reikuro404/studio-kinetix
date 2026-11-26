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
            // Word-level highlight (34 words vs 190 chars = ~6x lighter, zero layout thrash)
            const wordEls = Array.from(para.querySelectorAll('.about-word'));
            const pills = pillsRef.current.filter(Boolean);

            gsap.set(wordEls, {
                color: 'color-mix(in srgb, var(--brand-primary) 40%, transparent)',
            });
            gsap.set(pills, { opacity: 0, scale: 0.7, y: 20, transformOrigin: 'center center' });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: 'top top',
                    end: () => `+=${window.innerWidth < 480 ? 900 : window.innerWidth < 992 ? 1200 : 1600}`,
                    pin: section,
                    pinSpacing: true,
                    scrub: 0.5,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                },
            });

            const totalWords = wordEls.length;
            wordEls.forEach((word, i) => {
                const start = (i / totalWords) * 82;
                tl.to(
                    word,
                    {
                        color: 'var(--brand-primary)',
                        duration: 4,
                        ease: 'none',
                    },
                    start
                ).to(
                    word,
                    {
                        color: 'var(--brand-black)',
                        duration: 4,
                        ease: 'none',
                    },
                    start + 4
                );
            });

            if (pills[0]) tl.to(pills[0], { opacity: 1, scale: 1, y: 0, duration: 7, ease: 'back.out(1.8)' }, 30);
            if (pills[1]) tl.to(pills[1], { opacity: 1, scale: 1, y: 0, duration: 7, ease: 'back.out(1.8)' }, 62);
            if (pills[2]) tl.to(pills[2], { opacity: 1, scale: 1, y: 0, duration: 7, ease: 'back.out(1.8)' }, 86);
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
        let isVisible = false;

        const measure = () => {
            const half = slides.length / 2;
            if (slides[half] && slides[0]) {
                setWidth = slides[half].offsetLeft - slides[0].offsetLeft;
            }
        };
        measure();
        window.addEventListener('resize', measure);

        // Only run ticker work when slider is near/in viewport
        const io = new IntersectionObserver(
            ([entry]) => {
                isVisible = entry.isIntersecting;
            },
            { rootMargin: '200px 0px' }
        );
        io.observe(wrapper);

        let currentX = 0;
        let targetDir = -1;
        let currentDir = -1;
        let velBoost = 0;

        const st = ScrollTrigger.create({
            trigger: document.body,
            start: 'top top',
            end: 'bottom bottom',
            onUpdate: (self) => {
                if (!isVisible) return;
                const dir = self.direction === 1 ? -1 : 1;
                targetDir = dir;
                const vel = Math.abs(self.getVelocity() || 0);
                velBoost = Math.min(vel / 240, 9) * dir;
            },
        });

        const tick = () => {
            if (!isVisible) return;
            currentDir += (targetDir - currentDir) * 0.06;
            velBoost *= 0.92;
            currentX += 1.4 * currentDir + velBoost;

            if (setWidth > 0) {
                while (currentX <= -setWidth) currentX += setWidth;
                while (currentX > 0) currentX -= setWidth;
            }

            // Pure GPU transform — zero getBoundingClientRect() layout thrashing!
            track.style.transform = `translate3d(${currentX}px, 0, 0)`;
        };

        gsap.ticker.add(tick);
        return () => {
            gsap.ticker.remove(tick);
            st.kill();
            io.disconnect();
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
                                <span key={wIdx} className="about-word inline-block mr-[0.26em]">
                                    {word}
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
                    <div ref={trackRef} className="showcase-slider will-change-transform">
                        {doubledShowcase.map((item, idx) => (
                            <div key={idx} className="showcase-slide">
                                {item.type === 'video' ? (
                                    <video autoPlay loop muted playsInline preload="metadata" className="w-full h-full object-cover">
                                        <source src={item.mp4} type="video/mp4" />
                                        <source src={item.webm} type="video/webm" />
                                    </video>
                                ) : (
                                    <img
                                        src={item.src}
                                        alt={`Showcase ${(idx % showcase.length) + 1}`}
                                        loading="lazy"
                                        decoding="async"
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
