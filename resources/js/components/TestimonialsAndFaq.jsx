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
    const faqRefs = useRef([]);
    const prevFaqRef = useRef(0);

    // Smooth GSAP FAQ accordion open/close transitions
    useEffect(() => {
        const openWidth = () => (window.innerWidth >= 992 ? '50%' : '75%');

        faqRefs.current.forEach((el, idx) => {
            if (!el) return;
            const qBlock = el.querySelector('.question-block');
            const aBlock = el.querySelector('.faq-block-btm');
            const logo = el.querySelector('.faq-logo');
            const answerText = el.querySelector('.faq-answer');
            if (!qBlock || !aBlock) return;

            const isOpen = openFaq === idx;
            const wasOpen = prevFaqRef.current === idx;

            if (isOpen && !wasOpen) {
                gsap.killTweensOf([qBlock, aBlock, logo, answerText]);
                gsap.set(aBlock, { display: 'flex', overflow: 'hidden' });
                gsap.to(qBlock, { width: openWidth(), borderWidth: '1px', duration: 0.48, ease: 'power3.out' });
                gsap.fromTo(
                    aBlock,
                    { height: 0, opacity: 0, scale: 0.85 },
                    {
                        height: 'auto',
                        opacity: 1,
                        scale: 1,
                        duration: 0.5,
                        ease: 'power3.out',
                        onComplete: () => gsap.set(aBlock, { overflow: 'visible' }),
                    }
                );
                if (logo) gsap.fromTo(logo, { scale: 0 }, { scale: 1, duration: 0.45, delay: 0.12, ease: 'back.out(2)' });
                if (answerText) gsap.fromTo(answerText, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.4, delay: 0.08, ease: 'power2.out' });
            } else if (!isOpen && wasOpen) {
                gsap.killTweensOf([qBlock, aBlock, logo, answerText]);
                gsap.set(aBlock, { overflow: 'hidden' });
                if (logo) gsap.to(logo, { scale: 0, duration: 0.2, ease: 'power2.in' });
                gsap.to(qBlock, { width: '100%', borderWidth: '0px', duration: 0.42, ease: 'power3.inOut' });
                gsap.to(aBlock, {
                    height: 0,
                    opacity: 0,
                    scale: 0.9,
                    duration: 0.36,
                    ease: 'power3.inOut',
                    onComplete: () => gsap.set(aBlock, { display: 'none' }),
                });
            }
        });

        prevFaqRef.current = openFaq;
    }, [openFaq]);

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

            {/* Exact two26.studio 2-Column Chat-Bubble FAQ + Sleeping Cat */}
            <section className="section-faq">
                <div className="section-faq-wrapper">
                    <div className="faq-left">
                        <div className="section-faq-header">
                            <div className="about-text">Frequently Asked Questions</div>
                            <div className="section-heading-wrapper">
                                <MagneticHeading className="section-heading left-align">
                                    THINGS YOU MIGHT ASK
                                </MagneticHeading>
                            </div>
                        </div>
                        <div className="cat-svg">
                            <img
                                src="/assets/media/faq-cat.svg"
                                alt="Sleeping studio cat"
                                className="w-full h-auto block select-none"
                                loading="lazy"
                            />
                        </div>
                    </div>

                    <div className="faq-right">
                        <div className="faq-list-wrapper">
                            <div role="list" className="faq-list">
                                {faqs.map((faq, idx) => {
                                    const isOpen = openFaq === idx;
                                    return (
                                        <div
                                            key={idx}
                                            ref={(el) => (faqRefs.current[idx] = el)}
                                            role="listitem"
                                            className={`faq-item ${isOpen ? 'is-open' : ''}`}
                                        >
                                            <div className="faq-block">
                                                <button
                                                    type="button"
                                                    onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                                                    className="question-block text-left cursor-pointer"
                                                    style={{
                                                        width: idx === 0 && prevFaqRef.current === 0 ? 'min(100%, 26em)' : undefined,
                                                        borderWidth: idx === 0 && prevFaqRef.current === 0 ? '1px' : undefined,
                                                        borderStyle: 'solid',
                                                        borderColor: 'var(--brand-primary)',
                                                    }}
                                                >
                                                    <div className="faq-ques">{faq.q}</div>
                                                </button>

                                                <div
                                                    className="faq-block-btm"
                                                    style={{
                                                        display: idx === 0 ? 'flex' : 'none',
                                                        transformOrigin: 'right bottom',
                                                    }}
                                                >
                                                    <div className="answer-block">
                                                        <p className="faq-answer">{faq.a}</p>
                                                    </div>
                                                    <div className="faq-logo">
                                                        <div className="faq-logo-svg">
                                                            <span
                                                                className="font-display text-sm font-extrabold tracking-tight"
                                                                style={{ color: '#EBEAE6' }}
                                                            >
                                                                KX
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
