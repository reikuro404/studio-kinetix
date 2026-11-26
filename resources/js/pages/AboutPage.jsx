import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { X } from 'lucide-react';
import MagneticHeading from '../components/MagneticHeading';

gsap.registerPlugin(ScrollTrigger);

const PILL_SVG_PATH =
    'M275.442 89.5C275.442 89.5 315.942 46.9995 298.942 28C263.713 -11.373 199.942 117 178.442 89.5C159.869 65.7436 223.442 40.9995 209.942 19C185.09 -21.5005 106.942 115 83.9422 89.5C64.5454 67.9953 122.442 36.4999 106.942 19C80.2505 -11.1362 41.4424 89.5 14.4422 64.5C-2.00465 49.2716 32.4422 10 32.4422 10';

function CapabilityPill({ label }) {
    const pathRef = useRef(null);
    const lenRef = useRef(0);
    const [hovered, setHovered] = useState(false);

    useEffect(() => {
        const p = pathRef.current;
        if (!p) return;
        const len = p.getTotalLength();
        lenRef.current = len;
        gsap.set(p, { strokeDasharray: len, strokeDashoffset: len, strokeWidth: 0 });
    }, []);

    const onEnter = () => {
        setHovered(true);
        if (!pathRef.current) return;
        gsap.to(pathRef.current, {
            strokeDashoffset: 0,
            strokeWidth: 200,
            duration: 0.48,
            ease: 'power2.out',
            overwrite: 'auto',
        });
    };

    const onLeave = () => {
        setHovered(false);
        if (!pathRef.current) return;
        gsap.to(pathRef.current, {
            strokeDashoffset: lenRef.current,
            strokeWidth: 0,
            duration: 0.36,
            ease: 'power2.in',
            overwrite: 'auto',
        });
    };

    return (
        <div
            role="listitem"
            onMouseEnter={onEnter}
            onMouseLeave={onLeave}
            className="do-cms--pill relative overflow-hidden cursor-default"
        >
            <div
                className="do-pill-text relative z-[2] transition-colors duration-300"
                style={{ color: hovered ? '#FFFFFF' : undefined }}
            >
                {label}
            </div>
            <div className="do-pill-fill absolute inset-0 w-full h-full pointer-events-none z-[1]">
                <svg
                    width="100%"
                    height="100%"
                    viewBox="0 0 314 104"
                    preserveAspectRatio="none"
                    fill="none"
                    className="w-full h-full block"
                >
                    <path
                        ref={pathRef}
                        d={PILL_SVG_PATH}
                        stroke="var(--brand-primary)"
                        strokeWidth="0"
                        strokeLinecap="round"
                    />
                </svg>
            </div>
        </div>
    );
}

export default function AboutPage({ about, ready = true }) {
    const pageRef = useRef(null);
    const heroLineRef = useRef(null);
    const heroIllusRef = useRef(null);
    const pillTwoRef = useRef(null);
    const pillOneRef = useRef(null);
    const bodyPathRef = useRef(null);
    const moodWrapperRef = useRef(null);
    const moodTrackRef = useRef(null);
    const valueCardRefs = useRef([]);
    const valueProgRefs = useRef([]);

    const [selectedMember, setSelectedMember] = useState(null);

    const moodboard = about.moodboard || [];
    const values = about.values || [];
    const capabilities = about.capabilities || [];

    // 1. Initial hidden states + scroll-triggered sections
    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.set('.about-hero-line', { y: '115%', opacity: 0 });
            if (pillTwoRef.current) gsap.set(pillTwoRef.current, { opacity: 0, scale: 0.4, y: 20, rotation: 3, transformOrigin: 'center center' });
            if (pillOneRef.current) gsap.set(pillOneRef.current, { opacity: 0, scale: 0.4, y: 20, rotation: -7, transformOrigin: 'center center' });
            gsap.set('.about-hero-btm-anim', { y: 30, opacity: 0 });

            if (heroLineRef.current) {
                const len = heroLineRef.current.getTotalLength();
                gsap.set(heroLineRef.current, { strokeDasharray: len, strokeDashoffset: len, strokeWidth: 0 });
            }

            if (heroIllusRef.current) {
                gsap.to(heroIllusRef.current, {
                    y: -12,
                    rotation: 2,
                    duration: 2.8,
                    repeat: -1,
                    yoyo: true,
                    ease: 'sine.inOut',
                    force3D: true,
                });
            }

            // 2. Story & Team entrance + winding path draw on scroll
            gsap.fromTo(
                '.about-story-anim',
                { y: 36, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.7,
                    stagger: 0.12,
                    ease: 'power3.out',
                    force3D: true,
                    scrollTrigger: { trigger: '.about-story-team', start: 'top 80%', once: true },
                }
            );

            gsap.fromTo(
                '.about-team-card-anim',
                { y: 40, opacity: 0, scale: 0.96 },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 0.65,
                    stagger: 0.12,
                    ease: 'power3.out',
                    force3D: true,
                    scrollTrigger: { trigger: '.about-team-btm', start: 'top 85%', once: true },
                }
            );

            if (bodyPathRef.current) {
                const pathEl = bodyPathRef.current.querySelector('path');
                const storyTeamWrapper = pageRef.current?.querySelector('.about-story-team-wrapper');
                const isMobile = window.innerWidth < 768;
                const baseWidth = isMobile ? 50 : window.innerWidth < 992 ? 75 : 100;

                if (pathEl) {
                    const len = pathEl.getTotalLength();
                    gsap.set(pathEl, {
                        strokeDasharray: len,
                        strokeDashoffset: len,
                        strokeWidth: baseWidth,
                    });

                    // TWEEN 1: Path Draw Progress
                    const drawTl = gsap.timeline({
                        scrollTrigger: {
                            trigger: '.about-story-team',
                            start: 'top 80%',
                            end: 'bottom bottom',
                            scrub: 0.8,
                            invalidateOnRefresh: true,
                        },
                    });
                    drawTl
                        .to(pathEl, { strokeDashoffset: len * (isMobile ? 0.45 : 0.75), duration: isMobile ? 0.05 : 0.08, ease: 'power1.out' })
                        .to(pathEl, { strokeDashoffset: len * (isMobile ? 0.1 : 0.12), duration: isMobile ? 0.07 : 0.12, ease: 'power2.inOut' })
                        .to(pathEl, { strokeDashoffset: 0, duration: isMobile ? 0.03 : 0.05, ease: 'power1.out' })
                        .to({}, { duration: isMobile ? 0.17 : 0.07 });

                    // TWEEN 2: Stroke Width Expansion (100 -> 2500) + Orange Flood
                    const floodStart = isMobile ? 0.1 : 0.2;
                    const floodDuration = isMobile ? 0.03 : 0.05;
                    const bgDuration = isMobile ? 0.06 : 0.1;

                    const floodTl = gsap.timeline({
                        scrollTrigger: {
                            trigger: '.about-story-team',
                            start: 'top 80%',
                            end: 'bottom bottom',
                            scrub: 0.8,
                            invalidateOnRefresh: true,
                        },
                    });

                    floodTl.to(pathEl, { strokeWidth: 2500, duration: floodDuration, ease: 'power2.inOut' }, floodStart);

                    if (storyTeamWrapper) {
                        floodTl.fromTo(
                            storyTeamWrapper,
                            { backgroundColor: 'rgba(255, 84, 0, 0)' },
                            { backgroundColor: 'rgba(255, 84, 0, 1)', duration: bgDuration, ease: 'power2.inOut' },
                            floodStart
                        );
                    }

                    floodTl.to({}, { duration: 0.32 - (floodStart + bgDuration) }, floodStart + bgDuration);
                }
            }

            // 3. Sticky Value Cards + Progress Bar Scrub
            valueCardRefs.current.forEach((card, idx) => {
                const prog = valueProgRefs.current[idx];
                if (!card || !prog) return;
                gsap.set(prog, { scaleX: 0, transformOrigin: 'left center' });
                gsap.to(prog, {
                    scaleX: 1,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 68%',
                        end: 'bottom 35%',
                        scrub: 0.4,
                    },
                });
            });
        }, pageRef);

        const refreshId = setTimeout(() => ScrollTrigger.refresh(), 160);
        return () => {
            clearTimeout(refreshId);
            ctx.revert();
        };
    }, []);

    // 2. Hero Entrance Timeline triggered when Preloader finishes (ready=true)
    useEffect(() => {
        const fallback = setTimeout(() => {
            gsap.set('.about-hero-line', { y: '0%', opacity: 1 });
            if (pillTwoRef.current) gsap.set(pillTwoRef.current, { opacity: 1, scale: 1, y: 0, rotation: 3 });
            if (pillOneRef.current) gsap.set(pillOneRef.current, { opacity: 1, scale: 1, y: 0, rotation: -7 });
            gsap.set('.about-hero-btm-anim', { y: 0, opacity: 1 });
            if (heroLineRef.current) gsap.set(heroLineRef.current, { strokeDashoffset: 0, strokeWidth: 30 });
        }, 1700);

        if (!ready) return () => clearTimeout(fallback);
        clearTimeout(fallback);

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
            tl.to('.about-hero-line', { y: '0%', opacity: 1, duration: 0.75, stagger: 0.12, ease: 'back.out(1.4)', force3D: true }, 0);
            if (pillTwoRef.current) tl.to(pillTwoRef.current, { opacity: 1, scale: 1, y: 0, rotation: 3, duration: 0.5, ease: 'back.out(2.4)' }, 0.18);
            if (pillOneRef.current) tl.to(pillOneRef.current, { opacity: 1, scale: 1, y: 0, rotation: -7, duration: 0.5, ease: 'back.out(2.4)' }, 0.3);
            tl.to('.about-hero-btm-anim', { y: 0, opacity: 1, duration: 0.7, force3D: true }, 0.32);
            if (heroLineRef.current) {
                tl.to(heroLineRef.current, { strokeDashoffset: 0, strokeWidth: 30, duration: 1.0, ease: 'power2.out' }, 0.15);
            }
        }, pageRef);

        return () => ctx.revert();
    }, [ready]);

    // 4. Moodboard Infinite GPU Marquee (zero layout thrash, pauses offscreen)
    useEffect(() => {
        const wrapper = moodWrapperRef.current;
        const track = moodTrackRef.current;
        if (!wrapper || !track) return;

        const slides = Array.from(track.querySelectorAll('.moodboard-slide'));
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

        const io = new IntersectionObserver(
            ([entry]) => {
                isVisible = entry.isIntersecting;
            },
            { rootMargin: '200px 0px' }
        );
        io.observe(wrapper);

        let currentX = 0;
        let velBoost = 0;

        const st = ScrollTrigger.create({
            trigger: document.body,
            start: 'top top',
            end: 'bottom bottom',
            onUpdate: (self) => {
                if (!isVisible) return;
                const dir = self.direction === 1 ? -1 : 1;
                const vel = Math.abs(self.getVelocity() || 0);
                velBoost = Math.min(vel / 240, 8) * dir;
            },
        });

        const tick = () => {
            if (!isVisible) return;
            velBoost *= 0.92;
            currentX += -1.3 + velBoost;

            if (setWidth > 0) {
                while (currentX <= -setWidth) currentX += setWidth;
                while (currentX > 0) currentX -= setWidth;
            }

            track.style.transform = `translate3d(${currentX}px, 0, 0)`;
        };

        gsap.ticker.add(tick);
        return () => {
            gsap.ticker.remove(tick);
            st.kill();
            io.disconnect();
            window.removeEventListener('resize', measure);
        };
    }, [moodboard.length]);

    const doubledMoodboard = [...moodboard, ...moodboard];

    return (
        <div ref={pageRef}>
            {/* 1. SECTION ABOUT HERO */}
            <section className="section-about-hero">
                <div className="section-about-hero-wrapper">
                    <div className="about-hero-text">
                        <h1 className="heading left-align">
                            <span className="block overflow-hidden">
                                <span className="about-hero-line block">Small studio,</span>
                            </span>
                        </h1>
                        <div ref={pillTwoRef} className="work-hero-pill two about-hero-pill-anim">
                            <div className="hero-pill-text">design studio</div>
                        </div>
                        <h1 className="heading right-align less-max">
                            <span className="block overflow-hidden">
                                <span className="about-hero-line block">big brand energy</span>
                            </span>
                        </h1>
                        <div ref={pillOneRef} className="work-hero-pill one about-hero-pill-anim">
                            <div className="hero-pill-text">Independent</div>
                        </div>
                    </div>

                    <div className="about-hero-path">
                        <div className="code-embed-2 w-embed">
                            <svg width="492" height="789" viewBox="0 0 492 789" fill="none">
                                <path
                                    ref={heroLineRef}
                                    d="M346.027 773.963C346.027 773.963 123.155 751.726 37.5236 580.463C-5.47612 494.463 12.1589 403.856 98.5229 359.463C259.022 276.963 386.528 426.963 423.028 500.963C469.82 595.828 230.528 683.463 212.028 548.463C195.241 425.963 407.22 329.963 451.028 251.963C519.452 130.133 435.528 24.9629 380.528 15.9629C337.028 8.84469 282.028 42.1764 282.028 85.9629C282.028 142.463 359.528 181.463 359.528 181.463"
                                    stroke="var(--brand-primary)"
                                    strokeWidth="30"
                                    strokeLinecap="round"
                                />
                            </svg>
                        </div>
                    </div>

                    <div className="about-hero-btm about-hero-btm-anim">
                        <div className="about-hero-svg-wrapper">
                            <img
                                ref={heroIllusRef}
                                src={about.illustrations.hero}
                                alt="Studio illustration"
                                className="about-hero-img"
                            />
                        </div>
                        <div className="abput-para-wrapper">
                            <p className="about-hero-para">{about.intro}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. ABOUT STORY & TEAM */}
            <section className="about-story-team" style={{ overflow: 'hidden' }}>
                <div className="about-story-team-wrapper">
                    <div className="about-story">
                        <div className="about-story-section">
                            <div className="about-story-svg-wrap about-story-anim">
                                <img
                                    src={about.illustrations.studio}
                                    alt="Studio story illustration"
                                    loading="lazy"
                                    className="about-story-img"
                                />
                            </div>
                            <div className="about-story-right about-story-anim">
                                <div className="about-story-text">How We Started</div>
                                <h2 className="about-story-heading">{about.storyTitle}</h2>
                                {about.story.map((p, i) => (
                                    <p key={i} className="about-story-para">
                                        {p}
                                    </p>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="about-team">
                        <div className="section-projects-header">
                            <div className="section-about-text white">Less size, more scope</div>
                            <div className="section-heading-wrapper">
                                <MagneticHeading className="section-heading white">
                                    THIS IS PRETTY MUCH EVERYONE
                                </MagneticHeading>
                            </div>
                        </div>

                        <div className="about-team-btm">
                            {about.team.map((member, idx) => (
                                <button
                                    key={idx}
                                    type="button"
                                    onClick={() => setSelectedMember(member)}
                                    className="team-card about-team-card-anim text-left cursor-pointer group"
                                >
                                    <div className="team-img-wrapper">
                                        <img
                                            src={member.photo}
                                            alt={member.name}
                                            loading="lazy"
                                            decoding="async"
                                            className="team-img transition-transform duration-500 group-hover:scale-105"
                                        />
                                    </div>
                                    <div className="team-name">{member.name}</div>
                                    <div className="team-sub">{member.role}</div>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* GPU-cached 3457px Winding Path */}
                <div className="about-story-scroll-path">
                    <div className="about-story-svg w-embed">
                        <svg
                            ref={bodyPathRef}
                            width="100%"
                            viewBox="0 0 1440 3457"
                            fill="none"
                            style={{ height: 'auto', overflow: 'visible' }}
                            className="will-change-transform"
                        >
                            <path
                                d="M723.846 50.0081C650.835 174.483 836.793 262.47 825.385 406.936C799.653 732.805 98.5142 598.392 111.169 948.003C123.495 1288.51 1122.55 1135.95 1155.5 1698.51C1177.93 2081.41 570.052 2505.13 400.796 2311.05C308.932 2205.72 378.305 2027.34 533.817 2045.1C673.838 2061.1 699.146 2203.11 688.426 2277.8C657.968 2490.01 565.5 2804.01 688.426 3098.51"
                                stroke="var(--brand-primary)"
                                strokeWidth="100"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>
                </div>
            </section>

            {/* 3. SECTION MOODBOARD */}
            <section className="section-moodboard">
                <div className="section-moodboard-wrapper">
                    <div className="section-projects-header">
                        <div className="section-about-text">Moodboard</div>
                        <div className="section-heading-wrapper">
                            <MagneticHeading className="section-heading orange">
                                Behind the work
                            </MagneticHeading>
                        </div>
                    </div>

                    <div ref={moodWrapperRef} className="moodboard-slider-wrapper">
                        <div ref={moodTrackRef} className="moodboard-slider will-change-transform">
                            {doubledMoodboard.map((src, idx) => (
                                <div key={idx} className="moodboard-slide">
                                    <img
                                        src={src}
                                        alt={`Behind the work ${(idx % moodboard.length) + 1}`}
                                        loading="lazy"
                                        decoding="async"
                                        className="moodboard-img"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. SECTION VALUES (Sticky Stacking Cards) */}
            <section className="section-values">
                <div className="section-values-wrapper">
                    {values.map((val, idx) => (
                        <div
                            key={val.num}
                            ref={(el) => (valueCardRefs.current[idx] = el)}
                            className="value-card"
                            style={{
                                position: 'sticky',
                                top: `${5 + idx * 4.5}em`,
                                zIndex: 10 + idx * 10,
                            }}
                        >
                            <div className="value-text">The Office Rules {val.num}</div>
                            <div className="value-content">
                                <h2 className="value-heading">{val.title}</h2>
                                <p className="value-para">{val.desc}</p>
                            </div>
                            <div
                                ref={(el) => (valueProgRefs.current[idx] = el)}
                                className="value-progress"
                            />
                        </div>
                    ))}
                </div>
            </section>

            {/* 5. SECTION WHAT WE DO (Paintbrush Hover Pills) */}
            <section className="section-what-we-do">
                <div className="section-what-we-do-wrapper">
                    <div className="section-projects-header">
                        <div className="section-about-text">CAPABILITIES</div>
                        <div className="section-heading-wrapper">
                            <MagneticHeading className="section-heading">
                                WE’VE GOT RANGE
                            </MagneticHeading>
                        </div>
                    </div>

                    <div className="what-we-do-cms">
                        <div role="list" className="do-cms-list">
                            {capabilities.map((cap, idx) => (
                                <CapabilityPill key={idx} label={cap} />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Team Member Popup Modal */}
            {selectedMember && (
                <div
                    onClick={() => setSelectedMember(null)}
                    className="fixed inset-0 z-[700] bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="relative max-w-2xl w-full rounded-3xl overflow-hidden grid grid-cols-1 sm:grid-cols-12 shadow-2xl"
                        style={{ backgroundColor: 'var(--brand-white)', color: 'var(--brand-black)' }}
                    >
                        <button
                            type="button"
                            onClick={() => setSelectedMember(null)}
                            aria-label="Close popup"
                            className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-transform hover:scale-105"
                            style={{ backgroundColor: 'var(--brand-black)', color: '#FFFFFF' }}
                        >
                            <X className="w-5 h-5" />
                        </button>
                        <div className="sm:col-span-5 aspect-[4/5] sm:aspect-auto">
                            <img
                                src={selectedMember.photo}
                                alt={selectedMember.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="sm:col-span-7 p-7 md:p-9 flex flex-col justify-between gap-6">
                            <div>
                                <h3 className="font-display text-4xl uppercase tracking-tight">
                                    {selectedMember.name}
                                </h3>
                                <p className="text-sm font-medium mt-1" style={{ color: 'var(--brand-primary)' }}>
                                    {selectedMember.role}
                                </p>
                                <p className="text-base leading-relaxed opacity-85 mt-5">
                                    {selectedMember.bio}
                                </p>
                            </div>
                            {selectedMember.tags && (
                                <div className="flex flex-wrap gap-2">
                                    {selectedMember.tags.map((tag, i) => (
                                        <span
                                            key={i}
                                            className="px-3 py-1 rounded-full text-xs font-medium"
                                            style={{ backgroundColor: 'var(--brand-accent)', color: 'var(--brand-primary)' }}
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
