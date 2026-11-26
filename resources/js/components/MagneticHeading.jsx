import React, { useRef } from 'react';
import gsap from 'gsap';

export default function MagneticHeading({ children, className = '', as: Tag = 'h2' }) {
    const wrapperRef = useRef(null);
    const shadowRef = useRef(null);

    const handlePointerMove = (e) => {
        const wrapper = wrapperRef.current;
        const shadow = shadowRef.current;
        if (!wrapper || !shadow) return;

        const rect = wrapper.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const dx = e.clientX - centerX;
        const dy = e.clientY - centerY;
        const distance = Math.hypot(dx, dy);
        const maxRadius = Math.max(rect.width, rect.height) / 2 || 100;

        const intensity = Math.min(1, Math.max(0.25, distance / maxRadius));
        const angle = Math.atan2(dy, dx);

        gsap.to(shadow, {
            x: Math.cos(angle) * (intensity * 4.5),
            y: Math.sin(angle) * (intensity * 4.5),
            duration: 0.2,
            ease: 'power1.out',
            overwrite: 'auto',
        });
    };

    const handlePointerLeave = () => {
        if (!shadowRef.current) return;
        gsap.to(shadowRef.current, {
            x: 0,
            y: 0,
            duration: 0.65,
            ease: 'elastic.out(1.1, 0.4)',
            overwrite: 'auto',
        });
    };

    return (
        <div
            ref={wrapperRef}
            onPointerMove={handlePointerMove}
            onPointerLeave={handlePointerLeave}
            className="relative inline-block cursor-default select-none"
        >
            <Tag className={`relative z-10 pointer-events-none ${className}`} style={{ color: 'var(--brand-black)' }}>
                {children}
            </Tag>
            <Tag
                ref={shadowRef}
                aria-hidden="true"
                className={`absolute inset-0 z-0 pointer-events-none m-0 will-change-transform ${className}`}
                style={{ color: 'var(--brand-primary)' }}
            >
                {children}
            </Tag>
        </div>
    );
}
