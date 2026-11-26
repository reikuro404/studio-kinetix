import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { X, Send, CheckCircle2 } from 'lucide-react';

export default function ContactModal({ open, onClose, brand }) {
    const panelRef = useRef(null);
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState('idle'); // idle | sending | sent | error

    useEffect(() => {
        if (!open) return;
        const onKeyDown = (e) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', onKeyDown);
        const ctx = gsap.context(() => {
            gsap.fromTo(
                panelRef.current,
                { y: '100%', opacity: 0.4 },
                { y: '0%', opacity: 1, duration: 0.55, ease: 'power3.out' }
            );
        });
        return () => {
            window.removeEventListener('keydown', onKeyDown);
            ctx.revert();
        };
    }, [open, onClose]);

    if (!open) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');
        try {
            const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    'X-CSRF-TOKEN': token || '',
                },
                body: JSON.stringify(form),
            });
            if (!res.ok) throw new Error('Request failed');
            setStatus('sent');
            setForm({ name: '', email: '', message: '' });
        } catch {
            setStatus('error');
        }
    };

    return (
        <div
            onClick={(e) => {
                if (e.target === e.currentTarget) onClose();
            }}
            className="fixed inset-0 z-[9999] flex items-end md:items-center justify-center bg-black/50 backdrop-blur-sm"
        >
            <div
                ref={panelRef}
                className="w-full h-full md:h-auto md:max-h-[92vh] md:max-w-5xl md:rounded-3xl overflow-y-auto p-6 md:p-14 shadow-2xl relative"
                style={{ backgroundColor: 'var(--brand-white)', color: 'var(--brand-black)' }}
            >
                <div className="flex items-center justify-between mb-10">
                    <span
                        className="text-xs font-medium uppercase tracking-[0.2em] px-3 py-1 rounded-full"
                        style={{ backgroundColor: 'var(--brand-accent)', color: 'var(--brand-primary)' }}
                    >
                        Let&apos;s Talk
                    </span>
                    <button
                        type="button"
                        onClick={onClose}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium hover:opacity-75 cursor-pointer"
                        style={{ borderColor: 'color-mix(in srgb, var(--brand-black) 20%, transparent)' }}
                    >
                        <span>Close</span>
                        <X className="w-4 h-4" />
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    <div className="lg:col-span-5 flex flex-col justify-between gap-8">
                        <div>
                            <h2 className="font-display text-5xl md:text-6xl uppercase leading-[0.9] tracking-tight mb-4">
                                Want to start a new project?{' '}
                                <span style={{ color: 'var(--brand-primary)' }}>Or just say hello!</span>
                            </h2>
                            <p className="text-sm opacity-70">{brand.hours} — {brand.location}</p>
                        </div>

                        <div className="space-y-4">
                            {brand.emails.map((item, idx) => (
                                <div key={idx}>
                                    <div className="text-xs uppercase tracking-widest opacity-55 mb-1">{item.label}</div>
                                    <a
                                        href={`mailto:${item.email}`}
                                        className="text-lg font-medium underline underline-offset-4"
                                        style={{ color: 'var(--brand-primary)' }}
                                    >
                                        {item.email}
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="lg:col-span-7">
                        {status === 'sent' ? (
                            <div
                                className="p-8 rounded-2xl border flex flex-col items-start gap-3"
                                style={{
                                    backgroundColor: 'var(--brand-accent)',
                                    borderColor: 'var(--brand-primary)',
                                }}
                            >
                                <CheckCircle2 className="w-8 h-8" style={{ color: 'var(--brand-primary)' }} />
                                <h3 className="font-display text-3xl uppercase">Message received!</h3>
                                <p className="text-base opacity-80">
                                    Thanks for reaching out. Our team will get back to you shortly.
                                </p>
                                <button
                                    type="button"
                                    onClick={() => setStatus('idle')}
                                    className="mt-2 text-sm font-medium underline cursor-pointer"
                                >
                                    Send another message
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-xs uppercase tracking-widest opacity-60 mb-1.5">Your Name</label>
                                    <input
                                        type="text"
                                        required
                                        value={form.name}
                                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                                        placeholder="Alex Popescu"
                                        className="w-full px-4 py-3.5 rounded-xl border bg-white/80 focus:outline-none"
                                        style={{ borderColor: 'color-mix(in srgb, var(--brand-black) 15%, transparent)' }}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs uppercase tracking-widest opacity-60 mb-1.5">Email Address</label>
                                    <input
                                        type="email"
                                        required
                                        value={form.email}
                                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                                        placeholder="alex@company.com"
                                        className="w-full px-4 py-3.5 rounded-xl border bg-white/80 focus:outline-none"
                                        style={{ borderColor: 'color-mix(in srgb, var(--brand-black) 15%, transparent)' }}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs uppercase tracking-widest opacity-60 mb-1.5">Project Details</label>
                                    <textarea
                                        required
                                        rows={4}
                                        value={form.message}
                                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                                        placeholder="Tell us about your brand, timeline, and goals..."
                                        className="w-full px-4 py-3.5 rounded-xl border bg-white/80 focus:outline-none resize-none"
                                        style={{ borderColor: 'color-mix(in srgb, var(--brand-black) 15%, transparent)' }}
                                    />
                                </div>

                                {status === 'error' && (
                                    <p className="text-sm text-red-600">Something went wrong. Please check your inputs.</p>
                                )}

                                <button
                                    type="submit"
                                    disabled={status === 'sending'}
                                    className="inline-flex items-center gap-2.5 px-7 py-4 rounded-full text-white font-medium cursor-pointer transition-transform hover:scale-[1.02] disabled:opacity-60"
                                    style={{ backgroundColor: 'var(--brand-primary)' }}
                                >
                                    <span>{status === 'sending' ? 'Sending...' : 'Send Message'}</span>
                                    <Send className="w-4 h-4" />
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
