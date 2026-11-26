import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowLeft, ArrowUpRight, X } from 'lucide-react';
import MagneticHeading from '../components/MagneticHeading';

gsap.registerPlugin(ScrollTrigger);

export default function CaseStudyPage({ project, allProjects, onNavigate }) {
    const pageRef = useRef(null);
    const [lightboxImg, setLightboxImg] = useState(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                '.case-stagger',
                { y: 36, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.7, stagger: 0.08, ease: 'power3.out' }
            );

            gsap.utils.toArray('.case-gallery-item').forEach((item) => {
                gsap.fromTo(
                    item,
                    { y: 40, opacity: 0, scale: 0.98 },
                    {
                        y: 0,
                        opacity: 1,
                        scale: 1,
                        duration: 0.75,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: item,
                            start: 'top 86%',
                            once: true,
                        },
                    }
                );
            });
        }, pageRef);

        return () => ctx.revert();
    }, [project.slug]);

    const moreWorks = allProjects.filter((p) => p.slug !== project.slug).slice(0, 3);
    const disciplines = (project.discipline || project.category || 'Branding')
        .split(/[,·/]/)
        .map((s) => s.trim())
        .filter(Boolean);

    return (
        <div ref={pageRef} className="pt-28 md:pt-36 pb-20 md:pb-28 px-5 md:px-10 max-w-[1440px] mx-auto">
            {/* Top Back Pill */}
            <div className="mb-8 md:mb-10 case-stagger">
                <a
                    href="/work"
                    onClick={(e) => {
                        e.preventDefault();
                        onNavigate('/work');
                    }}
                    className="group inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-sm font-medium border transition-all duration-300 hover:scale-[1.03]"
                    style={{
                        backgroundColor: 'var(--brand-white)',
                        borderColor: 'color-mix(in srgb, var(--brand-black) 14%, transparent)',
                        color: 'var(--brand-black)',
                    }}
                >
                    <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
                    <span>All Projects</span>
                </a>
            </div>

            {/* Case Study Hero Header */}
            <div className="mb-10 md:mb-14 case-stagger">
                <div className="flex flex-wrap items-center gap-2.5 mb-5">
                    <span
                        className="px-4 py-1.5 rounded-full text-xs font-medium uppercase tracking-wider"
                        style={{ backgroundColor: 'var(--brand-primary)', color: '#FFFFFF' }}
                    >
                        {project.category}
                    </span>
                    {project.year && (
                        <span
                            className="px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider"
                            style={{ backgroundColor: 'var(--brand-accent)', color: 'var(--brand-black)' }}
                        >
                            {project.year}
                        </span>
                    )}
                </div>

                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                    <MagneticHeading
                        as="h1"
                        className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl uppercase leading-[0.86] tracking-tight"
                    >
                        {project.title}
                    </MagneticHeading>

                    {project.logo && (
                        <div
                            className="h-14 px-5 rounded-2xl border inline-flex items-center self-start lg:self-end shrink-0"
                            style={{
                                backgroundColor: '#FFFFFF',
                                borderColor: 'color-mix(in srgb, var(--brand-black) 10%, transparent)',
                            }}
                        >
                            <img
                                src={project.logo}
                                alt={`${project.title} logo`}
                                className="h-7 w-auto object-contain"
                            />
                        </div>
                    )}
                </div>
            </div>

            {/* Hero Cover Visual */}
            <div
                className="rounded-3xl overflow-hidden border mb-12 md:mb-16 aspect-[16/9] case-stagger shadow-lg"
                style={{
                    backgroundColor: 'var(--brand-secondary)',
                    borderColor: 'color-mix(in srgb, var(--brand-black) 8%, transparent)',
                }}
            >
                <img
                    src={project.coverImage || project.primaryImage}
                    alt={project.title}
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Meta Overview Strip */}
            <div
                className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 md:p-8 rounded-3xl border mb-16 md:mb-24 case-stagger"
                style={{
                    backgroundColor: 'var(--brand-secondary)',
                    borderColor: 'color-mix(in srgb, var(--brand-black) 8%, transparent)',
                }}
            >
                <div>
                    <div className="text-xs uppercase tracking-[0.18em] opacity-55 mb-1.5">Client</div>
                    <div className="font-display text-xl md:text-2xl uppercase tracking-tight">{project.title}</div>
                </div>
                <div>
                    <div className="text-xs uppercase tracking-[0.18em] opacity-55 mb-1.5">Industry</div>
                    <div className="font-medium text-sm md:text-base">{project.category}</div>
                </div>
                <div>
                    <div className="text-xs uppercase tracking-[0.18em] opacity-55 mb-1.5">Year</div>
                    <div className="font-mono text-sm md:text-base">{project.year || '2026'}</div>
                </div>
                <div>
                    <div className="text-xs uppercase tracking-[0.18em] opacity-55 mb-1.5">Scope</div>
                    <div className="flex flex-wrap gap-1.5">
                        {disciplines.map((d, i) => (
                            <span
                                key={i}
                                className="px-2.5 py-0.5 rounded-full text-xs font-medium"
                                style={{ backgroundColor: 'var(--brand-white)', color: 'var(--brand-black)' }}
                            >
                                {d}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Context & Solution Editorial Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 mb-20 md:mb-28 case-stagger">
                <div
                    className="lg:col-span-6 p-8 md:p-10 rounded-3xl border"
                    style={{
                        backgroundColor: 'var(--brand-white)',
                        borderColor: 'color-mix(in srgb, var(--brand-black) 10%, transparent)',
                    }}
                >
                    <div className="flex items-center justify-between mb-5">
                        <span
                            className="text-xs font-medium uppercase tracking-[0.2em]"
                            style={{ color: 'var(--brand-primary)' }}
                        >
                            01 / The Context
                        </span>
                    </div>
                    <div className="space-y-4 text-base md:text-lg leading-relaxed opacity-85">
                        {project.context.map((p, i) => (
                            <p key={i}>{p}</p>
                        ))}
                    </div>
                </div>

                <div
                    className="lg:col-span-6 p-8 md:p-10 rounded-3xl border"
                    style={{
                        backgroundColor: 'var(--brand-accent)',
                        borderColor: 'color-mix(in srgb, var(--brand-primary) 22%, transparent)',
                    }}
                >
                    <div className="flex items-center justify-between mb-5">
                        <span
                            className="text-xs font-medium uppercase tracking-[0.2em]"
                            style={{ color: 'var(--brand-primary)' }}
                        >
                            02 / The Solution
                        </span>
                    </div>
                    <div className="space-y-4 text-base md:text-lg leading-relaxed opacity-90">
                        {project.solution.map((p, i) => (
                            <p key={i}>{p}</p>
                        ))}
                    </div>
                </div>
            </div>

            {/* Curated Gallery */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-24 md:mb-32">
                {project.gallery.map((img, i) => {
                    const isWide = i % 3 === 0;
                    return (
                        <button
                            key={i}
                            type="button"
                            onClick={() => setLightboxImg(img)}
                            className={`case-gallery-item group relative rounded-3xl overflow-hidden border cursor-zoom-in text-left ${
                                isWide ? 'md:col-span-2 aspect-[16/9]' : 'aspect-[4/3]'
                            }`}
                            style={{
                                backgroundColor: 'var(--brand-secondary)',
                                borderColor: 'color-mix(in srgb, var(--brand-black) 8%, transparent)',
                            }}
                        >
                            <img
                                src={img}
                                alt={`${project.title} shot ${i + 1}`}
                                loading="lazy"
                                decoding="async"
                                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                            />
                            <span
                                className="absolute bottom-4 right-4 px-3 py-1 rounded-full text-xs font-medium opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0"
                                style={{ backgroundColor: 'var(--brand-black)', color: '#FFFFFF' }}
                            >
                                View full
                            </span>
                        </button>
                    );
                })}
            </div>

            {/* More Works */}
            <div className="pt-16 border-t" style={{ borderColor: 'color-mix(in srgb, var(--brand-black) 12%, transparent)' }}>
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
                    <div>
                        <span className="text-xs font-medium uppercase tracking-[0.2em] block mb-2" style={{ color: 'var(--brand-primary)' }}>
                            Keep Exploring
                        </span>
                        <h2 className="font-display text-5xl md:text-6xl uppercase tracking-tight leading-[0.9]">
                            More Works
                        </h2>
                    </div>
                    <a
                        href="/work"
                        onClick={(e) => {
                            e.preventDefault();
                            onNavigate('/work');
                        }}
                        className="project-btn inline-flex items-center gap-2.5 self-start sm:self-auto"
                    >
                        <span className="cta-text">See all projects</span>
                        <span className="cta-btn-arrow">
                            <ArrowUpRight className="w-3.5 h-3.5" />
                        </span>
                    </a>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
                    {moreWorks.map((m) => (
                        <a
                            key={m.slug}
                            href={`/work/${m.slug}`}
                            onClick={(e) => {
                                e.preventDefault();
                                onNavigate(`/work/${m.slug}`);
                            }}
                            className="project-card group flex flex-col cursor-pointer"
                        >
                            <div
                                className="relative aspect-[4/5] rounded-2xl overflow-hidden mb-3 border"
                                style={{
                                    backgroundColor: 'var(--brand-secondary)',
                                    borderColor: 'color-mix(in srgb, var(--brand-black) 8%, transparent)',
                                }}
                            >
                                <img src={m.primaryImage} alt={m.title} loading="lazy" decoding="async" className="img-primary w-full h-full object-cover" />
                                <img src={m.hoverImage} alt={m.title} loading="lazy" decoding="async" className="img-hover absolute inset-0 w-full h-full object-cover" />
                            </div>
                            <div className="flex items-center justify-between gap-3 px-1">
                                <div>
                                    <h3 className="font-display text-2xl uppercase tracking-tight">{m.title}</h3>
                                    <p className="text-xs opacity-65">{m.category}</p>
                                </div>
                                <span
                                    className="w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300 shrink-0 group-hover:rotate-45 group-hover:text-white"
                                    style={{ borderColor: 'color-mix(in srgb, var(--brand-black) 15%, transparent)' }}
                                >
                                    <ArrowUpRight className="w-4 h-4" />
                                </span>
                            </div>
                        </a>
                    ))}
                </div>
            </div>

            {/* Lightbox Modal */}
            {lightboxImg && (
                <div
                    onClick={() => setLightboxImg(null)}
                    className="fixed inset-0 z-[700] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 md:p-10 cursor-zoom-out"
                >
                    <button
                        type="button"
                        onClick={() => setLightboxImg(null)}
                        aria-label="Close lightbox"
                        className="fixed top-6 right-6 w-11 h-11 rounded-full bg-white text-black flex items-center justify-center shadow-lg cursor-pointer hover:scale-105 transition-transform"
                    >
                        <X className="w-5 h-5" />
                    </button>
                    <img
                        src={lightboxImg}
                        alt={project.title}
                        onClick={(e) => e.stopPropagation()}
                        className="max-w-full max-h-[88vh] rounded-2xl object-contain shadow-2xl cursor-default"
                    />
                </div>
            )}
        </div>
    );
}
