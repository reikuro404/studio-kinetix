import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MagneticHeading from './MagneticHeading';

gsap.registerPlugin(ScrollTrigger);

export default function ServicesSection({ services }) {
    const sectionRef = useRef(null);
    const bodyRef = useRef(null);
    const pathRef = useRef(null);
    const badgeRefs = useRef([]);
    const descRefs = useRef([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const path = pathRef.current;
            if (path) {
                const len = path.getTotalLength();
                gsap.set(path, {
                    strokeDasharray: len,
                    strokeDashoffset: len,
                });
            }

            badgeRefs.current.forEach((b) => {
                if (b) gsap.set(b, { width: 0, scale: 0, opacity: 0, overflow: 'hidden' });
            });
            descRefs.current.forEach((d) => {
                if (d) gsap.set(d, { scale: 0.7, opacity: 0, transformOrigin: 'left center' });
            });

            const masterTl = gsap.timeline({
                scrollTrigger: {
                    trigger: bodyRef.current,
                    start: 'top 70%',
                    end: 'bottom 75%',
                    scrub: 1.2,
                    invalidateOnRefresh: true,
                },
            });

            if (path) {
                masterTl.to(path, { strokeDashoffset: 0, ease: 'none', duration: 1 }, 0);
            }

            const total = services.length;
            services.forEach((_, idx) => {
                const point = total > 1 ? idx / (total - 1) : 0;
                const start = Math.max(0, point - 0.04);
                const badge = badgeRefs.current[idx];
                const desc = descRefs.current[idx];

                if (badge) {
                    masterTl.to(
                        badge,
                        {
                            width: 44,
                            scale: 1,
                            opacity: 1,
                            duration: 0.14,
                            ease: 'back.out(3.5)',
                        },
                        start
                    );
                }
                if (desc) {
                    masterTl.to(
                        desc,
                        {
                            scale: 1,
                            opacity: 1,
                            duration: 0.14,
                            ease: 'back.out(1.8)',
                        },
                        start + 0.03
                    );
                }
            });
        }, sectionRef);

        return () => ctx.revert();
    }, [services]);

    return (
        <section
            ref={sectionRef}
            className="relative py-24 md:py-36 overflow-hidden border-y"
            style={{
                backgroundColor: 'var(--brand-secondary)',
                borderColor: 'color-mix(in srgb, var(--brand-black) 8%, transparent)',
            }}
        >
            {/* Winding Background SVG Path drawn on scroll */}
            <div className="absolute inset-0 pointer-events-none opacity-25 flex justify-end">
                <svg className="w-[75%] md:w-[58%] h-full object-contain" viewBox="0 0 1616 2187" fill="none">
                    <path
                        ref={pathRef}
                        d="M1601 15C1241.24 56.6913 1025.14 308.977 1139.71 377.393C1191.45 408.29 1240.74 339.444 1181.39 282.059C1075.45 179.627 937.582 215.243 741.458 298.287C701.638 315.147 622.383 350.59 552.298 410.201C487.298 465.486 487.725 549.018 534.765 563.77C581.804 578.523 632.714 579.634 681.058 587.392C729.731 595.202 767.011 617.17 797.836 657.756C833.766 705.065 838.864 772.034 862.127 825.767C890.491 891.283 966.341 911.2 1033.5 915.638C1130.56 922.052 1195.74 891.215 1286.16 899.069C1347.7 904.414 1457.75 932.208 1466.92 1059.42C1477.81 1210.68 1340.4 1252.99 1221.76 1286.05C1118.2 1314.91 997.775 1397.54 862.127 1334.5C757.468 1285.86 666.411 1293.34 650.401 1384.21C634.391 1475.07 710.968 1532.13 837.283 1542.81C963.598 1553.5 1146.44 1534.93 1181.39 1676C1226.53 1858.21 954.075 1839.5 797.836 1839.5C661.891 1839.5 422.283 1807.72 385.5 1700C340.427 1568 635.939 1584.37 465.5 1917C414.516 2016.5 310 2165.31 15 2165.31"
                        stroke="var(--brand-primary)"
                        strokeWidth="22"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </div>

            <div className="relative z-10 max-w-[1440px] mx-auto px-5 md:px-10">
                <div className="mb-14 md:mb-20">
                    <span
                        className="inline-block text-xs font-medium uppercase tracking-[0.2em] mb-3"
                        style={{ color: 'var(--brand-primary)' }}
                    >
                        Our Services
                    </span>
                    <div>
                        <MagneticHeading className="font-display text-6xl sm:text-7xl md:text-8xl uppercase leading-[0.9] tracking-tight">
                            This is our thing
                        </MagneticHeading>
                    </div>
                </div>

                <div
                    ref={bodyRef}
                    className="divide-y"
                    style={{ borderColor: 'color-mix(in srgb, var(--brand-black) 12%, transparent)' }}
                >
                    {services.map((service, idx) => (
                        <div
                            key={idx}
                            className="py-7 md:py-10 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-center"
                        >
                            <div className="md:col-span-6 flex items-center gap-3">
                                <span
                                    ref={(el) => (badgeRefs.current[idx] = el)}
                                    className="inline-flex items-center justify-center h-11 rounded-full text-xs font-mono text-white shrink-0"
                                    style={{ backgroundColor: 'var(--brand-primary)' }}
                                >
                                    0{idx + 1}
                                </span>
                                <h3 className="font-display text-3xl sm:text-4xl md:text-5xl uppercase tracking-tight">
                                    {service.title}
                                </h3>
                            </div>
                            <div ref={(el) => (descRefs.current[idx] = el)} className="md:col-span-6">
                                <p className="text-base md:text-lg opacity-80 leading-relaxed">{service.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
