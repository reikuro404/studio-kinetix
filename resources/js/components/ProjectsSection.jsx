import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import MagneticHeading from './MagneticHeading';

gsap.registerPlugin(ScrollTrigger);

const MASK_PATH_D =
    'M25.007 729.507C25.007 729.507 136.507 1065.7 290.007 969.007C506.711 832.495 -164.765 175.16 89.5069 44.5066C315.057 -71.3883 462.507 559.507 615.507 515.007C768.507 470.507 615.507 25.0068 615.507 25.0068';

export default function ProjectsSection({ projects, onNavigate }) {
    const sectionRef = useRef(null);
    const maskRefs = useRef([]);
    const cardRefs = useRef([]);
    const brushMaskPathRefs = useRef([]);
    const brushStrokePathRefs = useRef([]);
    const timelinesRef = useRef([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // 1. 3D Perspective + Clip-Mask Reveal on Scroll (exact two26.studio params)
            maskRefs.current.forEach((maskEl, idx) => {
                const cardEl = cardRefs.current[idx];
                if (!maskEl || !cardEl) return;

                gsap.set(maskEl, {
                    clipPath: 'inset(42.5% 42.5% 42.5% 42.5%)',
                    borderRadius: '36px',
                    overflow: 'hidden',
                    willChange: 'clip-path, border-radius',
                });

                const hTilt = idx % 2 === 0 ? -16 : 16;
                const zTilt = idx % 2 === 0 ? -4 : 4;
                gsap.set(cardEl, {
                    scale: 1.45,
                    rotationX: 25,
                    rotationY: hTilt,
                    rotation: zTilt,
                    transformPerspective: 800,
                    transformOrigin: 'center center',
                    willChange: 'transform',
                });

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: maskEl,
                        start: 'top 85%',
                        toggleActions: 'play none none reverse',
                    },
                });

                tl.to(maskEl, {
                    clipPath: 'inset(0% 0% 0% 0%)',
                    borderRadius: '16px',
                    duration: 1.25,
                    ease: 'power3.out',
                }, 0).to(cardEl, {
                    scale: 1,
                    rotationX: 0,
                    rotationY: 0,
                    rotation: 0,
                    duration: 1.25,
                    ease: 'power3.out',
                }, 0);
            });

            // 2. Setup Brush-Stroke SVG Mask Hover Timelines
            brushMaskPathRefs.current.forEach((maskPath, idx) => {
                const strokePath = brushStrokePathRefs.current[idx];
                if (!maskPath) return;

                const len = maskPath.getTotalLength();
                gsap.set(maskPath, {
                    strokeDasharray: len,
                    strokeDashoffset: len,
                    strokeWidth: 0,
                });

                if (strokePath) {
                    const sLen = strokePath.getTotalLength();
                    gsap.set(strokePath, {
                        strokeDasharray: sLen,
                        strokeDashoffset: sLen,
                        strokeWidth: 0,
                    });
                }

                const hoverTl = gsap.timeline({ paused: true });
                if (strokePath) {
                    hoverTl.to(strokePath, {
                        strokeDashoffset: 0,
                        strokeWidth: 38,
                        duration: 0.45,
                        ease: 'power2.out',
                    }, 0);
                }
                hoverTl.to(maskPath, {
                    strokeDashoffset: 0,
                    strokeWidth: 1200,
                    duration: 0.65,
                    ease: 'power2.inOut',
                }, 0.08);

                timelinesRef.current[idx] = hoverTl;
            });
        }, sectionRef);

        return () => ctx.revert();
    }, [projects]);

    return (
        <section id="projects" ref={sectionRef} className="py-24 md:py-32 px-5 md:px-10 max-w-[1440px] mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 md:mb-20">
                <div>
                    <span
                        className="inline-block text-xs font-medium uppercase tracking-[0.2em] mb-3"
                        style={{ color: 'var(--brand-primary)' }}
                    >
                        Featured Projects
                    </span>
                    <div>
                        <MagneticHeading className="font-display text-6xl sm:text-7xl md:text-8xl uppercase leading-[0.9] tracking-tight">
                            Selected Works
                        </MagneticHeading>
                    </div>
                </div>
                <p className="max-w-sm text-sm md:text-base opacity-70">
                    Brands built with strategy, sharp visuals, and zero filler. Hover any card to paint-reveal the work.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 md:gap-9">
                {projects.map((project, idx) => (
                    <article
                        key={project.slug}
                        onClick={() => onNavigate?.(`/work/${project.slug}`)}
                        onMouseEnter={() => timelinesRef.current[idx]?.play()}
                        onMouseLeave={() => timelinesRef.current[idx]?.reverse()}
                        className="group cursor-pointer flex flex-col"
                    >
                        <div
                            ref={(el) => (maskRefs.current[idx] = el)}
                            className="relative aspect-[4/5] mb-4 border"
                            style={{
                                backgroundColor: 'var(--brand-secondary)',
                                borderColor: 'color-mix(in srgb, var(--brand-black) 8%, transparent)',
                            }}
                        >
                            <div ref={(el) => (cardRefs.current[idx] = el)} className="relative w-full h-full">
                                <img
                                    src={project.primaryImage}
                                    alt={project.title}
                                    className="w-full h-full object-cover"
                                />

                                {/* Accent Brush Stroke Foreground */}
                                <svg
                                    className="absolute inset-0 w-full h-full pointer-events-none z-10"
                                    viewBox="0 0 709 1012"
                                    preserveAspectRatio="xMidYMid slice"
                                >
                                    <path
                                        ref={(el) => (brushStrokePathRefs.current[idx] = el)}
                                        d={MASK_PATH_D}
                                        stroke="var(--brand-primary)"
                                        strokeWidth="0"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        fill="none"
                                    />
                                </svg>

                                {/* Brush-Stroke Masked Hover Image */}
                                <svg
                                    className="absolute inset-0 w-full h-full pointer-events-none z-20"
                                    viewBox="0 0 709 1012"
                                    preserveAspectRatio="xMidYMid slice"
                                >
                                    <defs>
                                        <mask id={`proj-mask-${idx}`} maskUnits="userSpaceOnUse" x="-200" y="-200" width="1109" height="1412">
                                            <path
                                                ref={(el) => (brushMaskPathRefs.current[idx] = el)}
                                                d={MASK_PATH_D}
                                                stroke="#FFFFFF"
                                                strokeWidth="0"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                fill="none"
                                            />
                                        </mask>
                                    </defs>
                                    <image
                                        href={project.hoverImage}
                                        x="0"
                                        y="0"
                                        width="709"
                                        height="1012"
                                        preserveAspectRatio="xMidYMid slice"
                                        mask={`url(#proj-mask-${idx})`}
                                    />
                                </svg>

                                {/* Floating Logo Badge */}
                                <div className="absolute top-4 left-4 z-30 h-9 px-3 rounded-full bg-white/90 backdrop-blur-sm flex items-center shadow-sm">
                                    <img
                                        src={project.logo}
                                        alt={`${project.title} mark`}
                                        className="h-5 w-auto object-contain"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex items-start justify-between gap-4 px-1">
                            <div>
                                <h3 className="font-display text-2xl md:text-3xl uppercase tracking-tight group-hover:translate-x-1 transition-transform duration-300">
                                    {project.title}
                                </h3>
                                <p className="text-sm opacity-65 mt-0.5">{project.category}</p>
                            </div>
                            <span
                                className="w-9 h-9 rounded-full flex items-center justify-center border transition-colors duration-300 shrink-0 group-hover:text-white"
                                style={{
                                    borderColor: 'color-mix(in srgb, var(--brand-black) 15%, transparent)',
                                }}
                            >
                                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:rotate-45" />
                            </span>
                        </div>
                    </article>
                ))}
            </div>

            {/* Exact .projects-end layout from two26.studio */}
            <div className="projects-end">
                <div className="projects-end-inner-wrapper">
                    <p className="projects-end-para">WE COULD KEEP GOING, BUT THERE’S A WHOLE PAGE FOR THAT.</p>
                    <div className="projects-pill-first">
                        <div className="hero-pill-text">The plot thickens</div>
                    </div>
                    <div className="projects-pill-second">
                        <div className="hero-pill-text">Very convenient</div>
                    </div>
                    <div className="projects-pill-fourth">
                        <div className="hero-pill-text">There’s more</div>
                    </div>
                    <a
                        href="/work"
                        onClick={(e) => {
                            e.preventDefault();
                            onNavigate?.('/work');
                        }}
                        className="project-btn w-inline-block"
                    >
                        <div className="cta-text">See all projects</div>
                        <div className="cta-btn-arrow">
                            <ArrowUpRight className="w-3.5 h-3.5" />
                        </div>
                    </a>
                </div>
            </div>
        </section>
    );
}
