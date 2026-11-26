import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import MagneticHeading from '../components/MagneticHeading';

gsap.registerPlugin(ScrollTrigger);

export default function AboutPage({ about, onOpenContact }) {
    const pageRef = useRef(null);
    const heroLineRef = useRef(null);
    const bodyPathRef = useRef(null);
    const storyParaRef = useRef(null);
    const heroIllusRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // 1. Hero entrance stagger + Hero SVG line draw (viewBox 0 0 492 789)
            gsap.fromTo(
                '.about-page-stagger',
                { y: 40, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: 'power3.out' }
            );

            if (heroLineRef.current) {
                const len = heroLineRef.current.getTotalLength();
                gsap.set(heroLineRef.current, { strokeDasharray: len, strokeDashoffset: len, strokeWidth: 0 });
                gsap.to(heroLineRef.current, {
                    strokeDashoffset: 0,
                    strokeWidth: 30,
                    duration: 1.2,
                    delay: 0.2,
                    ease: 'power2.out',
                });
            }

            if (heroIllusRef.current) {
                gsap.to(heroIllusRef.current, {
                    y: -14,
                    rotation: 2,
                    duration: 2.8,
                    repeat: -1,
                    yoyo: true,
                    ease: 'sine.inOut',
                });
            }

            // 2. Giant 3457px-tall winding body SVG path scrubbed by ScrollTrigger
            if (bodyPathRef.current) {
                const len = bodyPathRef.current.getTotalLength();
                gsap.set(bodyPathRef.current, { strokeDasharray: len, strokeDashoffset: len });
                gsap.to(bodyPathRef.current, {
                    strokeDashoffset: 0,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: '.about-body-flow',
                        start: 'top 65%',
                        end: 'bottom 85%',
                        scrub: 1.1,
                    },
                });
            }

            // 3. Story word-by-word scroll highlight (lightweight, 60fps)
            if (storyParaRef.current) {
                const words = Array.from(storyParaRef.current.querySelectorAll('.about-page-word'));
                gsap.set(words, { opacity: 0.28, color: 'var(--brand-primary)' });
                gsap.to(words, {
                    opacity: 1,
                    color: 'var(--brand-black)',
                    stagger: 0.06,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: storyParaRef.current,
                        start: 'top 78%',
                        end: 'bottom 55%',
                        scrub: 0.6,
                    },
                });
            }

            // 4. Team cards staggered bounce entrance
            gsap.fromTo(
                '.team-card-anim',
                { y: 45, opacity: 0, scale: 0.94 },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 0.75,
                    stagger: 0.14,
                    ease: 'back.out(1.4)',
                    scrollTrigger: {
                        trigger: '.team-grid-anim',
                        start: 'top 80%',
                    },
                }
            );
        }, pageRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={pageRef} className="relative overflow-hidden pt-28 md:pt-32 pb-16 md:pb-24">
            {/* Exact Original About Hero SVG Line (Right Side) */}
            <svg
                className="hidden md:block absolute right-0 top-12 w-64 lg:w-80 h-auto pointer-events-none opacity-85 z-0"
                viewBox="0 0 492 789"
                fill="none"
            >
                <path
                    ref={heroLineRef}
                    d="M346.027 773.963C346.027 773.963 123.155 751.726 37.5236 580.463C-5.47612 494.463 12.1589 403.856 98.5229 359.463C259.022 276.963 386.528 426.963 423.028 500.963C469.82 595.828 230.528 683.463 212.028 548.463C195.241 425.963 407.22 329.963 451.028 251.963C519.452 130.133 435.528 24.9629 380.528 15.9629C337.028 8.84469 282.028 42.1764 282.028 85.9629C282.028 142.463 359.528 181.463 359.528 181.463"
                    stroke="var(--brand-primary)"
                    strokeWidth="30"
                    strokeLinecap="round"
                />
            </svg>

            <div className="relative z-10 max-w-[1440px] mx-auto px-5 md:px-10">
                {/* Hero */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-20 md:mb-28">
                    <div className="lg:col-span-8 about-page-stagger">
                        <span
                            className="inline-block px-3.5 py-1 rounded-full text-xs font-medium uppercase tracking-wider mb-5"
                            style={{ backgroundColor: 'var(--brand-accent)', color: 'var(--brand-primary)' }}
                        >
                            Independent Design Studio
                        </span>
                        <MagneticHeading
                            as="h1"
                            className="font-display text-6xl sm:text-7xl md:text-9xl uppercase leading-[0.88] tracking-tight mb-6"
                        >
                            {about.headline}
                        </MagneticHeading>
                        <p className="text-xl md:text-2xl opacity-80 max-w-2xl leading-relaxed">
                            {about.intro}
                        </p>
                    </div>
                    <div className="lg:col-span-4 about-page-stagger flex justify-center">
                        <img
                            ref={heroIllusRef}
                            src={about.illustrations.hero}
                            alt="Studio illustration"
                            className="w-full max-w-sm h-auto object-contain"
                        />
                    </div>
                </div>
            </div>

            {/* Body Flow with Giant 3457px-tall Winding SVG Path */}
            <div className="about-body-flow relative max-w-[1440px] mx-auto px-5 md:px-10">
                <svg
                    className="hidden md:block absolute inset-x-0 top-0 w-full h-full pointer-events-none opacity-15 z-0"
                    viewBox="0 0 1440 3457"
                    fill="none"
                    preserveAspectRatio="xMidYMin slice"
                >
                    <path
                        ref={bodyPathRef}
                        d="M723.846 50.0081C650.835 174.483 836.793 262.47 825.385 406.936C799.653 732.805 98.5142 598.392 111.169 948.003C123.495 1288.51 1122.55 1135.95 1155.5 1698.51C1177.93 2081.41 570.052 2505.13 400.796 2311.05C308.932 2205.72 378.305 2027.34 533.817 2045.1C673.838 2061.1 699.146 2203.11 688.426 2277.8C657.968 2490.01 565.5 2804.01 688.426 3098.51"
                        stroke="var(--brand-primary)"
                        strokeWidth="100"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>

                {/* How We Started */}
                <div
                    className="relative z-10 p-8 md:p-14 rounded-3xl border mb-20 md:mb-28 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center about-page-stagger"
                    style={{
                        backgroundColor: 'color-mix(in srgb, var(--brand-secondary) 92%, transparent)',
                        borderColor: 'color-mix(in srgb, var(--brand-black) 8%, transparent)',
                    }}
                >
                    <div className="lg:col-span-7">
                        <span
                            className="text-xs font-medium uppercase tracking-[0.2em] block mb-3"
                            style={{ color: 'var(--brand-primary)' }}
                        >
                            How We Started
                        </span>
                        <h2 className="font-display text-4xl md:text-6xl uppercase leading-[0.95] tracking-tight mb-6">
                            {about.storyTitle}
                        </h2>
                        <div ref={storyParaRef} className="space-y-4 text-base md:text-lg leading-relaxed">
                            {about.story.map((p, i) => (
                                <p key={i}>
                                    {p.split(' ').map((word, wIdx) => (
                                        <span key={wIdx} className="about-page-word inline-block mr-[0.26em]">
                                            {word}
                                        </span>
                                    ))}
                                </p>
                            ))}
                        </div>
                    </div>
                    <div className="lg:col-span-5 flex flex-col items-center gap-6">
                        <img
                            src={about.illustrations.studio}
                            alt="Studio life illustration"
                            className="w-full max-w-xs h-auto object-contain"
                        />
                    </div>
                </div>

                {/* Team */}
                <div className="relative z-10 mb-12">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                        <div>
                            <span
                                className="text-xs font-medium uppercase tracking-[0.2em] block mb-2"
                                style={{ color: 'var(--brand-primary)' }}
                            >
                                Less size, more scope
                            </span>
                            <h2 className="font-display text-5xl md:text-7xl uppercase leading-[0.9] tracking-tight">
                                This is pretty much everyone
                            </h2>
                        </div>
                        <button
                            type="button"
                            onClick={onOpenContact}
                            className="group inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full text-sm font-medium text-white cursor-pointer transition-transform hover:scale-105"
                            style={{ backgroundColor: 'var(--brand-primary)' }}
                        >
                            <span>Work with us</span>
                            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:rotate-45" />
                        </button>
                    </div>

                    <div className="team-grid-anim grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {about.team.map((member, idx) => (
                            <div
                                key={idx}
                                className="team-card-anim rounded-3xl overflow-hidden border group"
                                style={{
                                    backgroundColor: 'var(--brand-accent)',
                                    borderColor: 'color-mix(in srgb, var(--brand-primary) 20%, transparent)',
                                }}
                            >
                                <div className="aspect-[4/5] overflow-hidden">
                                    <img
                                        src={member.photo}
                                        alt={member.name}
                                        loading="lazy"
                                        decoding="async"
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                </div>
                                <div className="p-6">
                                    <h3 className="font-display text-3xl uppercase tracking-tight">{member.name}</h3>
                                    <p className="text-sm opacity-70 mt-1">{member.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
