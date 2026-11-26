import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ArrowUp, Plus } from 'lucide-react';
import MagneticHeading from './MagneticHeading';

const ANGLE_PALETTE = [-7.5, 6.8, -5.5, 8.2, -8.5, 6.2];

export default function TestimonialsAndFaq({ testimonials, faqs }) {
    const [activeCard, setActiveCard] = useState(0);
    const [openFaq, setOpenFaq] = useState(0);

    const stageRef = useRef(null);
    const cardRefs = useRef([]);
    const arrowRef = useRef(null);
    const isAnimatingRef = useRef(false);
    const arrowDirRef = useRef(0);

    const totalCards = testimonials.length;

    // Physical deck initialization
    useEffect(() => {
        cardRefs.current.forEach((card, i) => {
            if (!card) return;
            const order = (i - activeCard + totalCards) % totalCards;
            card.style.zIndex = totalCards - order;
            gsap.set(card, {
                x: 0,
                y: 0,
                rotation: i === activeCard ? 0 : ANGLE_PALETTE[i % ANGLE_PALETTE.length],
                scale: 1,
                opacity: 1,
                force3D: true,
                transformOrigin: 'center center',
            });
        });
    }, [totalCards]);

    // Floating cursor nav-arrow inside Testimonials stage
    useEffect(() => {
        const stage = stageRef.current;
        const arrow = arrowRef.current;
        if (!stage || !arrow) return;

        const isTouch = window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 992;
        if (isTouch) {
            arrow.style.display = 'none';
            return;
        }

        gsap.set(arrow, { scale: 0, opacity: 0, xPercent: -50, yPercent: -50, rotation: 0 });
        const setX = gsap.quickTo(arrow, 'x', { duration: 0.14, ease: 'power2.out' });
        const setY = gsap.quickTo(arrow, 'y', { duration: 0.14, ease: 'power2.out' });

        const onEnter = (e) => {
            const r = stage.getBoundingClientRect();
            const mx = e.clientX - r.left;
            const my = e.clientY - r.top;
            const dir = my < r.height / 2 ? 0 : 180;
            arrowDirRef.current = dir;
            gsap.set(arrow, { x: mx, y: my, rotation: dir });
            gsap.to(arrow, { scale: 1, opacity: 1, duration: 0.28, ease: 'back.out(2)', overwrite: 'auto' });
        };

        const onMove = (e) => {
            const r = stage.getBoundingClientRect();
            const mx = e.clientX - r.left;
            const my = e.clientY - r.top;
            setX(mx);
            setY(my);
            const targetDir = my < r.height / 2 ? 0 : 180;
            if (arrowDirRef.current !== targetDir) {
                arrowDirRef.current = targetDir;
                gsap.to(arrow, { rotation: targetDir, duration: 0.25, ease: 'power2.out', overwrite: 'auto' });
            }
        };

        const onLeave = () => {
            gsap.to(arrow, { scale: 0, opacity: 0, duration: 0.2, ease: 'power2.in', overwrite: 'auto' });
        };

        stage.addEventListener('mouseenter', onEnter);
        stage.addEventListener('mousemove', onMove);
        stage.addEventListener('mouseleave', onLeave);
        return () => {
            stage.removeEventListener('mouseenter', onEnter);
            stage.removeEventListener('mousemove', onMove);
            stage.removeEventListener('mouseleave', onLeave);
        };
    }, []);

    const shuffleCard = (direction) => {
        if (isAnimatingRef.current || totalCards <= 1) return;
        isAnimatingRef.current = true;

        const outIdx = activeCard;
        const nextIdx =
            direction === 'next'
                ? (activeCard + 1) % totalCards
                : (activeCard - 1 + totalCards) % totalCards;

        const outCard = cardRefs.current[outIdx];
        const inCard = cardRefs.current[nextIdx];

        const tl = gsap.timeline({
            onComplete: () => {
                setActiveCard(nextIdx);
                isAnimatingRef.current = false;
            },
        });

        // Fling outgoing card up or down, reorder zIndex mid-flight, then tuck back into deck
        const flingY = direction === 'next' ? -130 : 130;
        const flingRot = direction === 'next' ? -14 : 14;

        tl.to(outCard, {
            y: flingY,
            rotation: flingRot,
            scale: 0.94,
            duration: 0.28,
            ease: 'power2.in',
        })
            .add(() => {
                cardRefs.current.forEach((c, i) => {
                    if (!c) return;
                    const order = (i - nextIdx + totalCards) % totalCards;
                    c.style.zIndex = totalCards - order;
                });
            })
            .to(outCard, {
                y: 0,
                rotation: ANGLE_PALETTE[outIdx % ANGLE_PALETTE.length],
                scale: 1,
                duration: 0.4,
                ease: 'power3.out',
            })
            .to(
                inCard,
                {
                    rotation: 0,
                    scale: 1,
                    duration: 0.4,
                    ease: 'back.out(1.6)',
                },
                0.15
            );
    };

    const handleStageClick = (e) => {
        const r = stageRef.current?.getBoundingClientRect();
        if (!r) return;
        const isTopHalf = e.clientY - r.top < r.height / 2;
        shuffleCard(isTopHalf ? 'prev' : 'next');
    };

    return (
        <div>
            {/* Physical Stacked Deck Testimonials */}
            <section className="section-testimonials py-20 md:py-28 px-5 md:px-10 max-w-[1440px] mx-auto">
                <div className="section-projects-header mb-12">
                    <div className="section-about-text">TESTIMONIALS</div>
                    <div className="section-heading-wrapper">
                        <MagneticHeading className="section-heading">
                            APPARENTLY, THEY LIKE US
                        </MagneticHeading>
                    </div>
                </div>

                {/* Stacked Deck Stage */}
                <div
                    ref={stageRef}
                    onClick={handleStageClick}
                    className="relative max-w-3xl mx-auto py-12 px-4 cursor-pointer select-none"
                >
                    {/* Floating Custom Cursor Arrow */}
                    <div
                        ref={arrowRef}
                        className="absolute top-0 left-0 pointer-events-none z-50 w-14 h-14 rounded-full flex items-center justify-center text-white shadow-xl"
                        style={{ backgroundColor: 'var(--brand-primary)' }}
                    >
                        <ArrowUp className="w-6 h-6" />
                    </div>

                    {/* Grid stack: all cards occupy row 1 col 1 */}
                    <div className="grid grid-cols-1">
                        {testimonials.map((t, idx) => (
                            <article
                                key={idx}
                                ref={(el) => (cardRefs.current[idx] = el)}
                                style={{
                                    gridArea: '1 / 1',
                                    backgroundColor: idx % 2 === 0 ? 'var(--brand-accent)' : 'var(--brand-white)',
                                    borderColor: 'color-mix(in srgb, var(--brand-primary) 28%, transparent)',
                                }}
                                className="rounded-3xl p-7 sm:p-10 md:p-12 border-2 shadow-xl will-change-transform"
                            >
                                <span className="text-xs font-mono uppercase tracking-widest opacity-55">
                                    0{idx + 1} / 0{totalCards}
                                </span>
                                <h3 className="font-display text-2xl sm:text-4xl uppercase leading-[1.04] tracking-tight mt-2 mb-5">
                                    &ldquo;{t.headline}&rdquo;
                                </h3>
                                <p className="text-sm sm:text-lg leading-relaxed opacity-85 mb-8">
                                    {t.quote}
                                </p>
                                <div className="flex items-center gap-4">
                                    <img
                                        src={t.avatar}
                                        alt={t.name}
                                        className="w-12 h-12 rounded-full object-cover border-2"
                                        style={{ borderColor: 'var(--brand-primary)' }}
                                    />
                                    <div>
                                        <div className="font-medium text-base">{t.name}</div>
                                        <div className="text-xs opacity-65">{t.role}</div>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>

                    {/* Dynamic Sidebar Horizontal Ticks */}
                    <div className="mt-10 flex items-center justify-center gap-3 pointer-events-none">
                        {testimonials.map((_, idx) => (
                            <div
                                key={idx}
                                className="h-[3px] rounded-full transition-all duration-300"
                                style={{
                                    width: activeCard === idx ? '34px' : '14px',
                                    opacity: activeCard === idx ? 1 : 0.3,
                                    backgroundColor: 'var(--brand-primary)',
                                }}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Chat-Bubble Split FAQ Accordion (exact two26.studio style) */}
            <section className="section-faq py-20 md:py-28 px-5 md:px-10 max-w-[1440px] mx-auto">
                <div className="section-projects-header mb-12">
                    <div className="section-about-text">Frequently Asked Questions</div>
                    <div className="section-heading-wrapper">
                        <MagneticHeading className="section-heading">
                            THINGS YOU MIGHT ASK
                        </MagneticHeading>
                    </div>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, idx) => {
                        const isOpen = openFaq === idx;
                        return (
                            <div
                                key={idx}
                                className="border-b pb-4"
                                style={{ borderColor: 'color-mix(in srgb, var(--brand-black) 10%, transparent)' }}
                            >
                                <button
                                    type="button"
                                    onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                                    className={`flex items-center justify-between gap-4 text-left cursor-pointer px-5 py-4 rounded-2xl transition-all duration-500 ease-out ${
                                        isOpen ? 'w-[85%] lg:w-[52%]' : 'w-full'
                                    }`}
                                    style={{
                                        borderWidth: isOpen ? '1px' : '0px',
                                        borderStyle: 'solid',
                                        borderColor: 'var(--brand-primary)',
                                        backgroundColor: isOpen ? 'var(--brand-accent)' : 'transparent',
                                    }}
                                >
                                    <span className="text-lg md:text-xl font-medium tracking-tight">{faq.q}</span>
                                    <span
                                        className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300"
                                        style={{
                                            backgroundColor: isOpen ? 'var(--brand-primary)' : 'var(--brand-secondary)',
                                            color: isOpen ? '#FFFFFF' : 'var(--brand-black)',
                                            transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                                        }}
                                    >
                                        <Plus className="w-4 h-4" />
                                    </span>
                                </button>

                                <div
                                    className={`flex justify-end transition-all duration-500 ease-out origin-bottom-right ${
                                        isOpen ? 'opacity-100 scale-100 mt-3 max-h-96' : 'opacity-0 scale-75 max-h-0 overflow-hidden'
                                    }`}
                                >
                                    <div
                                        className="w-full md:w-[54%] p-5 md:p-6 rounded-2xl text-white"
                                        style={{ backgroundColor: 'var(--brand-primary)' }}
                                    >
                                        <p className="text-sm md:text-base leading-relaxed">{faq.a}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>
        </div>
    );
}
