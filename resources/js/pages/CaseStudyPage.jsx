import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import MagneticHeading from '../components/MagneticHeading';

export default function CaseStudyPage({ project, allProjects, onNavigate }) {
    const pageRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                '.case-stagger',
                { y: 36, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.75, stagger: 0.1, ease: 'power3.out' }
            );
        }, pageRef);
        return () => ctx.revert();
    }, [project.slug]);

    const moreWorks = allProjects.filter((p) => p.slug !== project.slug).slice(0, 3);

    return (
        <div ref={pageRef} className="pt-28 md:pt-32 pb-16 md:pb-24 px-5 md:px-10 max-w-[1440px] mx-auto">
            {/* Back Link */}
            <a
                href="/work"
                onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/work');
                }}
                className="inline-flex items-center gap-2 text-sm font-medium mb-8 opacity-75 hover:opacity-100"
            >
                <ArrowLeft className="w-4 h-4" />
                <span>All Projects</span>
            </a>

            {/* Case Study Hero */}
            <div className="mb-12 case-stagger">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span
                        className="px-3.5 py-1 rounded-full text-xs font-medium uppercase tracking-wider"
                        style={{ backgroundColor: 'var(--brand-accent)', color: 'var(--brand-primary)' }}
                    >
                        {project.category}
                    </span>
                    <span className="text-xs font-mono opacity-60">{project.year} · {project.discipline}</span>
                </div>
                <MagneticHeading
                    as="h1"
                    className="font-display text-6xl sm:text-7xl md:text-9xl uppercase leading-[0.88] tracking-tight"
                >
                    {project.title}
                </MagneticHeading>
            </div>

            <div className="rounded-3xl overflow-hidden border mb-16 md:mb-24 aspect-[16/9] case-stagger">
                <img
                    src={project.coverImage || project.primaryImage}
                    alt={project.title}
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Context & Solution */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20 case-stagger">
                <div className="lg:col-span-6">
                    <span
                        className="text-xs font-medium uppercase tracking-[0.2em] block mb-3"
                        style={{ color: 'var(--brand-primary)' }}
                    >
                        The Context
                    </span>
                    <div className="space-y-4 text-base md:text-lg leading-relaxed opacity-85">
                        {project.context.map((p, i) => (
                            <p key={i}>{p}</p>
                        ))}
                    </div>
                </div>
                <div className="lg:col-span-6">
                    <span
                        className="text-xs font-medium uppercase tracking-[0.2em] block mb-3"
                        style={{ color: 'var(--brand-primary)' }}
                    >
                        The Solution
                    </span>
                    <div className="space-y-4 text-base md:text-lg leading-relaxed opacity-85">
                        {project.solution.map((p, i) => (
                            <p key={i}>{p}</p>
                        ))}
                    </div>
                </div>
            </div>

            {/* Gallery */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-24">
                {project.gallery.map((img, i) => (
                    <div
                        key={i}
                        className={`rounded-2xl overflow-hidden border ${i === 0 ? 'md:col-span-2 aspect-[16/9]' : 'aspect-[4/3]'}`}
                        style={{ borderColor: 'color-mix(in srgb, var(--brand-black) 8%, transparent)' }}
                    >
                        <img src={img} alt={`${project.title} shot ${i + 1}`} loading="lazy" decoding="async" className="w-full h-full object-cover" />
                    </div>
                ))}
            </div>

            {/* More Works */}
            <div className="pt-16 border-t" style={{ borderColor: 'color-mix(in srgb, var(--brand-black) 12%, transparent)' }}>
                <div className="flex items-end justify-between mb-10">
                    <div>
                        <span className="text-xs uppercase tracking-[0.2em] block mb-2" style={{ color: 'var(--brand-primary)' }}>
                            Featured Project
                        </span>
                        <h2 className="font-display text-5xl md:text-6xl uppercase tracking-tight">More Works</h2>
                    </div>
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
                            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden mb-3 border">
                                <img src={m.primaryImage} alt={m.title} className="img-primary w-full h-full object-cover" />
                                <img src={m.hoverImage} alt={m.title} className="img-hover absolute inset-0 w-full h-full object-cover" />
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="font-display text-2xl uppercase">{m.title}</h3>
                                    <p className="text-xs opacity-65">{m.category}</p>
                                </div>
                                <ArrowUpRight className="w-4 h-4 opacity-60 group-hover:opacity-100" />
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}
