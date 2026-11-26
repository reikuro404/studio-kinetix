import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ArrowUpRight } from 'lucide-react';
import MagneticHeading from '../components/MagneticHeading';

export default function WorkPage({ projects, illustrations, onNavigate }) {
    const [activeCategory, setActiveCategory] = useState('All');
    const gridRef = useRef(null);

    const categories = ['All', ...Array.from(new Set(projects.map((p) => p.category)))];
    const filtered =
        activeCategory === 'All'
            ? projects
            : projects.filter((p) => p.category === activeCategory);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                '.work-card-anim',
                { y: 36, opacity: 0, scale: 0.96 },
                { y: 0, opacity: 1, scale: 1, duration: 0.65, stagger: 0.08, ease: 'power3.out' }
            );
        }, gridRef);
        return () => ctx.revert();
    }, [activeCategory]);

    return (
        <div className="pt-28 md:pt-32 pb-16 md:pb-24 px-5 md:px-10 max-w-[1440px] mx-auto">
            {/* Work Hero */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-14 md:mb-20">
                <div className="lg:col-span-8">
                    <div className="flex flex-wrap gap-2 mb-5">
                        {['A few projects', 'Kind of proud'].map((tag, i) => (
                            <span
                                key={i}
                                className="px-3.5 py-1 rounded-full text-xs font-medium uppercase tracking-wider"
                                style={{ backgroundColor: 'var(--brand-accent)', color: 'var(--brand-primary)' }}
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                    <MagneticHeading
                        as="h1"
                        className="font-display text-6xl sm:text-7xl md:text-9xl uppercase leading-[0.88] tracking-tight"
                    >
                        Just a few to brag about
                    </MagneticHeading>
                </div>
                <div className="lg:col-span-4 flex flex-col items-start lg:items-end gap-4">
                    <img
                        src={illustrations.workCat}
                        alt="Studio cat illustration"
                        className="w-24 h-24 object-contain"
                    />
                    <p className="text-base opacity-75 lg:text-right">
                        A selection of brands, identities, websites and other things we&apos;ve helped bring to life. Different challenges, various approaches, same focus on getting everything right.
                    </p>
                </div>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2.5 mb-12">
                {categories.map((cat) => {
                    const active = activeCategory === cat;
                    return (
                        <button
                            key={cat}
                            type="button"
                            onClick={() => setActiveCategory(cat)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer border ${
                                active ? 'text-white' : 'opacity-75 hover:opacity-100'
                            }`}
                            style={{
                                backgroundColor: active ? 'var(--brand-primary)' : 'transparent',
                                borderColor: active ? 'var(--brand-primary)' : 'color-mix(in srgb, var(--brand-black) 18%, transparent)',
                            }}
                        >
                            {cat}
                        </button>
                    );
                })}
            </div>

            {/* Full Projects Grid */}
            <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filtered.map((project) => (
                    <a
                        key={project.slug}
                        href={`/work/${project.slug}`}
                        onClick={(e) => {
                            e.preventDefault();
                            onNavigate(`/work/${project.slug}`);
                        }}
                        className="project-card work-card-anim group flex flex-col cursor-pointer"
                    >
                        <div
                            className="relative aspect-[4/5] rounded-2xl overflow-hidden mb-4 border"
                            style={{
                                backgroundColor: 'var(--brand-secondary)',
                                borderColor: 'color-mix(in srgb, var(--brand-black) 8%, transparent)',
                            }}
                        >
                            <img
                                src={project.primaryImage}
                                alt={project.title}
                                className="img-primary w-full h-full object-cover"
                            />
                            <img
                                src={project.hoverImage}
                                alt={`${project.title} preview`}
                                className="img-hover absolute inset-0 w-full h-full object-cover"
                            />
                            <div className="absolute top-4 left-4 z-10 h-9 px-3 rounded-full bg-white/90 backdrop-blur-sm flex items-center shadow-sm">
                                <img src={project.logo} alt={project.title} className="h-5 w-auto object-contain" />
                            </div>
                            <span
                                className="absolute top-4 right-4 z-10 px-2.5 py-1 rounded-full text-[11px] font-medium text-white"
                                style={{ backgroundColor: 'var(--brand-primary)' }}
                            >
                                {project.year}
                            </span>
                        </div>
                        <div className="flex items-start justify-between gap-4 px-1">
                            <div>
                                <h2 className="font-display text-2xl md:text-3xl uppercase tracking-tight">
                                    {project.title}
                                </h2>
                                <p className="text-sm opacity-65 mt-0.5">
                                    {project.category} · {project.discipline}
                                </p>
                            </div>
                            <span
                                className="w-9 h-9 rounded-full flex items-center justify-center border shrink-0"
                                style={{ borderColor: 'color-mix(in srgb, var(--brand-black) 15%, transparent)' }}
                            >
                                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:rotate-45" />
                            </span>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
}
