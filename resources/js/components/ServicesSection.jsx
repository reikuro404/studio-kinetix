import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import lottie from 'lottie-web';
import MagneticHeading from './MagneticHeading';

gsap.registerPlugin(ScrollTrigger);

const SERVICE_CLASSES = ['one', 'two', 'three', 'four', 'five', 'six', 'seven'];
const LOTTIE_FILES = [
    '/assets/lottie/brand-strategy.json',
    '/assets/lottie/brand-identity.json',
    '/assets/lottie/web-design.json',
    '/assets/lottie/illustration.json',
    '/assets/lottie/motion-design.json',
    '/assets/lottie/packaging.json',
    '/assets/lottie/art-direction.json',
];

export default function ServicesSection({ services }) {
    const sectionRef = useRef(null);
    const bodyRef = useRef(null);
    const darkPathRef = useRef(null);
    const svgBoxRefs = useRef([]);
    const lottieRefs = useRef([]);
    const paraRefs = useRef([]);

    // 1. Mount real local Lottie animations
    useEffect(() => {
        const anims = lottieRefs.current.map((container, idx) => {
            if (!container) return null;
            return lottie.loadAnimation({
                container,
                renderer: 'svg',
                loop: true,
                autoplay: true,
                path: LOTTIE_FILES[idx % LOTTIE_FILES.length],
            });
        });

        return () => {
            anims.forEach((a) => a?.destroy());
        };
    }, [services.length]);

    // 2. Scroll-scrubbed winding path + natural 7.25em Lottie expansion
    useEffect(() => {
        const ctx = gsap.context(() => {
            const path = darkPathRef.current;
            if (path) {
                const len = path.getTotalLength();
                gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
            }

            svgBoxRefs.current.forEach((box) => {
                if (!box) return;
                // Force layout before collapsing so we capture the CSS-specified width
                box.style.visibility = 'hidden';
                const rect = box.getBoundingClientRect();
                const computed = parseFloat(getComputedStyle(box).width);
                // 7.25em at 16px root = ~116px; use whichever is larger & valid
                const naturalWidth = Math.max(rect.width, computed, 116);
                box.style.visibility = '';
                box.dataset.targetWidth = String(naturalWidth);
                gsap.set(box, { width: 0, scale: 0, opacity: 0, overflow: 'hidden', margin: '0px' });
            });

            paraRefs.current.forEach((p) => {
                if (p) gsap.set(p, { scale: 0, opacity: 0, transformOrigin: 'center center' });
            });

            const masterTl = gsap.timeline({
                scrollTrigger: {
                    trigger: bodyRef.current,
                    start: 'top 70%',
                    end: 'bottom 70%',
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
                const box = svgBoxRefs.current[idx];
                const para = paraRefs.current[idx];

                if (box) {
                    masterTl.to(
                        box,
                        {
                            width: () => parseFloat(box.dataset.targetWidth) || 116,
                            scale: 1,
                            opacity: 1,
                            duration: 0.14,
                            ease: 'back.out(3.5)',
                        },
                        start
                    );
                }
                if (para) {
                    masterTl.to(para, { scale: 1, opacity: 1, duration: 0.14, ease: 'back.out(1.8)' }, start + 0.03);
                }
            });
        }, sectionRef);

        return () => ctx.revert();
    }, [services]);

    return (
        <section ref={sectionRef} className="section-services">
            <div className="section-services-wrapper">
                <div className="section-projects-header">
                    <div className="section-about-text">Our Services</div>
                    <div className="section-heading-wrapper">
                        <MagneticHeading className="section-heading">THIS IS OUR THING</MagneticHeading>
                    </div>
                </div>

                <div ref={bodyRef} className="section-services-body">
                    <div className="services-layers">
                        {services.map((service, idx) => {
                            const words = service.title.split(' ');
                            const firstWord = words[0];
                            const secondWord = words.slice(1).join(' ');

                            return (
                                <div key={idx} className="service-layer">
                                    <div className={`service-block ${SERVICE_CLASSES[idx] || 'one'} group cursor-default`}>
                                        <div className="service-text transition-transform duration-300 group-hover:scale-[1.03]">
                                            {firstWord}
                                        </div>
                                        <div
                                            ref={(el) => (svgBoxRefs.current[idx] = el)}
                                            className="service-svg"
                                        >
                                            <div ref={(el) => (lottieRefs.current[idx] = el)} className="lottie-animation w-full h-full" />
                                        </div>
                                        {secondWord && (
                                            <div className="service-text transition-transform duration-300 group-hover:scale-[1.03]">
                                                {secondWord}
                                            </div>
                                        )}
                                        <div ref={(el) => (paraRefs.current[idx] = el)} className="service-block-para-wrapper">
                                            <p className="service-block-para">{service.desc}</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Exact Two-Layer Winding Path (light blush track + bright orange scrub) */}
                    <div className="services-path">
                        <div className="services-path-svg w-embed">
                            <svg width="100%" style={{ height: "auto" }} viewBox="0 0 1616 2187" fill="none">
                                <path
                                    d="M1601 15C1241.24 56.6913 1025.14 308.977 1139.71 377.393C1191.45 408.29 1240.74 339.444 1181.39 282.059C1075.45 179.627 937.582 215.243 741.458 298.287C701.638 315.147 622.383 350.59 552.298 410.201C487.298 465.486 487.725 549.018 534.765 563.77C581.804 578.523 632.714 579.634 681.058 587.392C729.731 595.202 767.011 617.17 797.836 657.756C833.766 705.065 838.864 772.034 862.127 825.767C890.491 891.283 966.341 911.2 1033.5 915.638C1130.56 922.052 1195.74 891.215 1286.16 899.069C1347.7 904.414 1457.75 932.208 1466.92 1059.42C1477.81 1210.68 1340.4 1252.99 1221.76 1286.05C1118.2 1314.91 997.775 1397.54 862.127 1334.5C757.468 1285.86 666.411 1293.34 650.401 1384.21C634.391 1475.07 710.968 1532.13 837.283 1542.81C963.598 1553.5 1146.44 1534.93 1181.39 1676C1226.53 1858.21 954.075 1839.5 797.836 1839.5C661.891 1839.5 422.283 1807.72 385.5 1700C340.427 1568 635.939 1584.37 465.5 1917C414.516 2016.5 310 2165.31 15 2165.31"
                                    stroke="var(--brand-accent)"
                                    strokeWidth="16"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </div>
                        <div className="services-path-svg-dark w-embed">
                            <svg width="100%" style={{ height: "auto" }} viewBox="0 0 1616 2187" fill="none">
                                <path
                                    ref={darkPathRef}
                                    d="M1601 15C1241.24 56.6913 1025.14 308.977 1139.71 377.393C1191.45 408.29 1240.74 339.444 1181.39 282.059C1075.45 179.627 937.582 215.243 741.458 298.287C701.638 315.147 622.383 350.59 552.298 410.201C487.298 465.486 487.725 549.018 534.765 563.77C581.804 578.523 632.714 579.634 681.058 587.392C729.731 595.202 767.011 617.17 797.836 657.756C833.766 705.065 838.864 772.034 862.127 825.767C890.491 891.283 966.341 911.2 1033.5 915.638C1130.56 922.052 1195.74 891.215 1286.16 899.069C1347.7 904.414 1457.75 932.208 1466.92 1059.42C1477.81 1210.68 1340.4 1252.99 1221.76 1286.05C1118.2 1314.91 997.775 1397.54 862.127 1334.5C757.468 1285.86 666.411 1293.34 650.401 1384.21C634.391 1475.07 710.968 1532.13 837.283 1542.81C963.598 1553.5 1146.44 1534.93 1181.39 1676C1226.53 1858.21 954.075 1839.5 797.836 1839.5C661.891 1839.5 422.283 1807.72 385.5 1700C340.427 1568 635.939 1584.37 465.5 1917C414.516 2016.5 310 2165.31 15 2165.31"
                                    stroke="var(--brand-primary)"
                                    strokeWidth="16"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
