import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function Preloader({ onComplete }) {
    const [visible, setVisible] = useState(true);
    const containerRef = useRef(null);
    const bgPath1Ref = useRef(null);
    const bgPath2Ref = useRef(null);
    const logoWrapRef = useRef(null);
    const svgRef = useRef(null);
    const ribbonRef = useRef(null);
    const wRef = useRef(null);
    const lettersRef = useRef([]);

    useEffect(() => {
        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReduced) {
            setVisible(false);
            onComplete?.();
            return;
        }

        const safetyTimer = setTimeout(() => {
            setVisible(false);
            onComplete?.();
        }, 5500);

        const ctx = gsap.context(() => {
            const svg = svgRef.current;
            const ribbon = ribbonRef.current;
            const wPath = wRef.current;
            const bg1 = bgPath1Ref.current;
            const bg2 = bgPath2Ref.current;
            const letters = lettersRef.current.filter(Boolean);

            // Background diagonal curtains
            [bg1, bg2].forEach((p) => {
                if (!p) return;
                const len = p.getTotalLength();
                gsap.set(p, { strokeDasharray: len, strokeDashoffset: 0, strokeWidth: 2400 });
            });

            // Ribbon tracer (short 7% dash that travels into W)
            let ribbonLen = 2500;
            if (ribbon) {
                ribbonLen = ribbon.getTotalLength();
                gsap.set(ribbon, {
                    strokeDasharray: `${ribbonLen * 0.07} ${ribbonLen}`,
                    strokeDashoffset: ribbonLen * 0.07,
                    strokeWidth: 0,
                });
            }

            if (wPath) {
                const lenW = wPath.getTotalLength();
                gsap.set(wPath, { strokeDasharray: lenW, strokeDashoffset: lenW, strokeWidth: 19 });
            }

            // Letters pop-in setup
            letters.forEach((letter) => {
                const bbox = letter.getBBox();
                const cx = bbox.x + bbox.width / 2;
                const cy = bbox.y + bbox.height / 2;
                gsap.set(letter, {
                    scale: 0,
                    rotation: gsap.utils.random(-25, 25),
                    strokeWidth: 6,
                    svgOrigin: `${cx} ${cy}`,
                });
            });

            if (svg) gsap.set(svg, { visibility: 'visible' });

            // Compute vertical center offset for Step D
            const allContent = [wPath, ...letters].filter(Boolean);
            let minY = Infinity;
            let maxY = -Infinity;
            allContent.forEach((p) => {
                const b = p.getBBox();
                if (b.y < minY) minY = b.y;
                if (b.y + b.height > maxY) maxY = b.y + b.height;
            });
            const svgRect = svg ? svg.getBoundingClientRect() : { height: 500 };
            const scaleRatio = svgRect.height > 0 ? svgRect.height / 1004 : 1;
            const offsetPx = ((minY + maxY) / 2 - 502) * scaleRatio;

            const tl = gsap.timeline({ delay: 0.2 }).timeScale(1.25);

            // Step A: Ribbon stroke grows and travels to W
            if (ribbon) {
                tl.to(ribbon, { strokeWidth: 19, duration: 0.9, ease: 'power2.in' }, 0)
                    .to(ribbon, { strokeDashoffset: -ribbonLen * 0.4, duration: 1.5, ease: 'power1.inOut' }, 0);
            }

            // Step B: W draws
            if (wPath) {
                tl.to(wPath, { strokeDashoffset: 0, duration: 0.9, ease: 'power2.out' }, '-=0.4');
            }

            // Step C: Ribbon departs
            if (ribbon) {
                tl.to(ribbon, { strokeDashoffset: -ribbonLen, duration: 0.9, ease: 'power2.inOut' }, '-=0.45')
                    .to(ribbon, { strokeWidth: 0, duration: 0.45, ease: 'power2.in' }, '-=0.5');
            }

            // Step D: Shift SVG upward to center stacked mark
            if (svg) {
                tl.to(svg, { y: -offsetPx, duration: 0.7, ease: 'power2.inOut' }, '+=0.05');
            }

            // Step E: Letters T, O, 2, 6 pop in with back.out(3)
            tl.to(
                letters,
                {
                    scale: 1,
                    rotation: 0,
                    duration: 0.55,
                    stagger: 0.09,
                    ease: 'back.out(3)',
                },
                '-=0.2'
            ).to(
                letters,
                {
                    strokeWidth: 0,
                    duration: 0.55,
                    stagger: 0.09,
                    ease: 'power1.in',
                },
                '<'
            );

            // Step F: Pink wipe -> Orange wipe -> Reveal page
            tl.to(logoWrapRef.current, { opacity: 0, scale: 0.94, duration: 0.28, ease: 'power2.in' }, '+=0.15');
            if (bg2) {
                const len2 = bg2.getTotalLength();
                tl.to(bg2, { strokeDashoffset: len2, duration: 0.6, ease: 'power3.inOut' }, '<0.05');
            }
            if (bg1) {
                const len1 = bg1.getTotalLength();
                tl.to(
                    bg1,
                    {
                        strokeDashoffset: -len1,
                        duration: 0.65,
                        ease: 'power3.inOut',
                        onComplete: () => {
                            clearTimeout(safetyTimer);
                            setVisible(false);
                            onComplete?.();
                        },
                    },
                    '<0.1'
                );
            }
        }, containerRef);

        return () => {
            clearTimeout(safetyTimer);
            ctx.revert();
        };
    }, [onComplete]);

    if (!visible) return null;

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-[99999] flex items-center justify-center overflow-hidden pointer-events-auto"
            aria-hidden="true"
        >
            <div className="absolute inset-0 w-full h-full pointer-events-none">
                <svg className="w-full h-full object-cover" viewBox="0 0 1500 1093" fill="none" preserveAspectRatio="none">
                    <path
                        ref={bgPath1Ref}
                        d="M1500 0C687.437 32.0206 767.477 1069.1 4.43459e-05 1093"
                        stroke="var(--brand-primary)"
                        strokeWidth="2400"
                        strokeLinecap="round"
                    />
                    <path
                        ref={bgPath2Ref}
                        d="M0 0C812.563 32.0206 732.523 1069.1 1500 1093"
                        stroke="var(--brand-accent)"
                        strokeWidth="2400"
                        strokeLinecap="round"
                    />
                </svg>
            </div>

            <div ref={logoWrapRef} className="relative z-10 w-full max-w-[900px] px-8 pointer-events-none">
                <svg
                    ref={svgRef}
                    className="w-full h-auto"
                    style={{ visibility: 'hidden' }}
                    viewBox="0 0 1451 1004"
                    fill="none"
                >
                    <path
                        ref={ribbonRef}
                        d="M9.5022 602.203C130.513 541.926 163.851 545.542 284.259 610.875C402.641 675.109 590.609 623.802 578.502 465.31C573.002 393.31 660.002 382.81 660.002 453.81C660.002 483.31 659.762 495.353 660.002 523.727C660.231 550.772 660.002 579.905 680.502 583.81C694.002 586.381 704.502 579.31 714.002 568.81C723.502 558.31 729.048 555.163 742.502 518.31C754.002 486.81 741.002 472.31 725.502 472.31C707.002 472.31 697.492 491.81 709.002 520.31C719.502 546.31 727.301 559.545 738.502 571.31C741.834 574.81 763.118 593.044 779.002 579.31C793.002 567.205 791.002 543.59 791.002 516.31C791.002 500.999 791.002 485.31 791.002 453.81C791.002 249.749 1224 388.703 1246.5 576.703C1256.82 662.894 1163 668.866 1163 619.703C1163 541.203 1350.5 512.703 1441 527.703"
                        stroke="var(--brand-primary)"
                        strokeWidth="19"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        ref={(el) => (lettersRef.current[2] = el)}
                        d="M583.585 844.138H719.842V877.476H549.228V854.833C549.228 804.451 588.266 780.388 628.391 758.33C645.026 748.972 660.741 740.032 672.11 729.337C683.144 718.977 688.16 708.282 688.16 694.579C688.16 665.252 665.088 657.231 639.341 657.231C599.3 657.231 582.582 678.955 582.582 717.974H549.228C549.228 660.239 580.575 623.81 639.341 623.81C684.147 623.81 721.513 645.868 721.513 694.579C721.513 744.042 682.475 766.017 644.691 787.406C610.669 806.122 588.6 820.409 583.585 844.138Z"
                        fill="var(--brand-primary)"
                        stroke="var(--brand-primary)"
                    />
                    <path
                        ref={(el) => (lettersRef.current[3] = el)}
                        d="M837.373 877.81C772.588 877.81 750.519 823.417 750.519 765.014C750.519 702.934 764.563 623.81 842.054 623.81C879.086 623.81 913.86 645.2 913.86 685.221H880.423C880.423 680.626 878.751 657.231 842.054 657.231C801.678 657.231 790.644 692.574 786.297 726.329C796.997 718.057 811.124 711.206 829.515 708.867C878.835 702.517 921.217 737.943 923.725 787.573C926.4 839.627 889.201 877.81 837.373 877.81ZM890.454 792.753C890.454 760.669 873.067 741.369 844.06 741.369C825.837 741.369 810.957 747.468 800.424 758.664C786.715 773.035 784.207 795.009 791.564 813.474C798.753 831.856 812.378 844.473 837.373 844.473C869.055 844.473 890.454 823.751 890.454 792.753Z"
                        fill="var(--brand-primary)"
                        stroke="var(--brand-primary)"
                    />
                    <path
                        ref={wRef}
                        d="M660.002 453.81C660.002 483.31 659.762 495.353 660.002 523.727C660.231 550.772 660.002 579.905 680.502 583.81C694.002 586.381 704.502 579.31 714.002 568.81C723.502 558.31 729.048 555.163 742.502 518.31C754.002 486.81 741.002 472.31 725.502 472.31C707.002 472.31 697.492 491.81 709.002 520.31C719.502 546.31 727.301 559.545 738.502 571.31C741.834 574.81 763.118 593.044 779.002 579.31C793.002 567.205 791.002 543.59 791.002 516.31C791.002 500.999 791.002 485.31 791.002 453.81"
                        stroke="var(--brand-primary)"
                        strokeWidth="19"
                        strokeLinecap="butt"
                        strokeLinejoin="miter"
                    />
                    <path
                        ref={(el) => (lettersRef.current[0] = el)}
                        d="M544.502 455.623H637.923V472.02H600.418V592.087H582.189V472.02H544.502V455.623Z"
                        fill="var(--brand-primary)"
                        stroke="var(--brand-primary)"
                    />
                    <path
                        ref={(el) => (lettersRef.current[1] = el)}
                        d="M811.277 523.856C811.277 489.284 828.047 453.984 867.694 453.984C906.474 453.984 924.156 488.373 924.156 523.856C924.156 558.427 907.386 593.728 867.694 593.728C828.047 593.728 811.277 558.427 811.277 523.856ZM867.694 575.554C896.13 575.554 905.928 548.088 905.928 523.856C905.928 499.669 896.13 472.203 867.694 472.203C838.938 472.203 829.459 499.305 829.459 523.856C829.459 548.27 838.938 575.554 867.694 575.554Z"
                        fill="var(--brand-primary)"
                        stroke="var(--brand-primary)"
                    />
                </svg>
            </div>
        </div>
    );
}
