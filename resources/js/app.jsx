import React, { useCallback, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutAndShowcase from './components/AboutAndShowcase';
import ProjectsSection from './components/ProjectsSection';
import ServicesSection from './components/ServicesSection';
import TestimonialsAndFaq from './components/TestimonialsAndFaq';
import ContactModal from './components/ContactModal';
import Footer from './components/Footer';

import WorkPage from './pages/WorkPage';
import AboutPage from './pages/AboutPage';
import CaseStudyPage from './pages/CaseStudyPage';

gsap.registerPlugin(ScrollTrigger);

function parsePath(pathname) {
    const clean = pathname.replace(/\/+$/, '') || '/';
    if (clean === '/work') return { page: 'work', slug: null };
    if (clean === '/about') return { page: 'about', slug: null };
    if (clean.startsWith('/work/')) return { page: 'case-study', slug: clean.slice(6) };
    return { page: 'home', slug: null };
}

function App() {
    const data = window.__STUDIO_DATA__;
    const [route, setRoute] = useState(() => ({
        page: window.__STUDIO_PAGE__ || 'home',
        slug: window.__STUDIO_SLUG__ || null,
    }));
    const [ready, setReady] = useState(false);
    const [contactOpen, setContactOpen] = useState(false);
    const [theme, setTheme] = useState(() => localStorage.getItem('kinetix_theme') || 'blue'); // blue | red | green

    useEffect(() => {
        localStorage.setItem('kinetix_theme', theme);
        if (theme === 'blue') {
            document.documentElement.removeAttribute('data-theme');
        } else {
            document.documentElement.setAttribute('data-theme', theme);
        }
    }, [theme]);

    // Sync Lenis smooth scroll with GSAP ticker for 60-120 FPS scroll animations
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.15,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
        });

        lenis.on('scroll', ScrollTrigger.update);
        const updateLenis = (time) => lenis.raf(time * 1000);
        gsap.ticker.add(updateLenis);
        gsap.ticker.lagSmoothing(0);

        return () => {
            gsap.ticker.remove(updateLenis);
            lenis.destroy();
        };
    }, []);

    useEffect(() => {
        const onPop = () => {
            setRoute(parsePath(window.location.pathname));
            window.scrollTo(0, 0);
            setTimeout(() => ScrollTrigger.refresh(), 80);
        };
        window.addEventListener('popstate', onPop);
        return () => window.removeEventListener('popstate', onPop);
    }, []);

    useEffect(() => {
        if (ready) {
            setTimeout(() => ScrollTrigger.refresh(), 120);
        }
    }, [ready]);

    const navigate = useCallback((to) => {
        if (window.location.pathname !== to) {
            window.history.pushState({}, '', to);
        }
        setRoute(parsePath(to));
        window.scrollTo({ top: 0, behavior: 'instant' });
        setTimeout(() => ScrollTrigger.refresh(), 100);
    }, []);

    const currentProject =
        route.page === 'case-study'
            ? data.projects.find((p) => p.slug === route.slug) || data.projects[0]
            : null;

    useEffect(() => {
        if (ready) {
            setTimeout(() => ScrollTrigger.refresh(), 120);
        }
    }, [ready]);

    return (
        <div className="min-h-screen flex flex-col">
            <Preloader onComplete={() => setReady(true)} />

            <Navbar
                hours={data.brand.hours}
                onOpenContact={() => setContactOpen(true)}
                onNavigate={navigate}
                currentPage={route.page}
                theme={theme}
                onChangeTheme={setTheme}
            />

            <main className="flex-1">
                {route.page === 'home' && (
                    <>
                        <HeroSection ready={ready} />
                        <AboutAndShowcase showcase={data.showcase} />
                        <ProjectsSection
                            projects={data.projects.slice(0, 6)}
                            onNavigate={navigate}
                        />
                        <ServicesSection services={data.services} />
                        <TestimonialsAndFaq testimonials={data.testimonials} faqs={data.faqs} />
                    </>
                )}

                {route.page === 'work' && (
                    <WorkPage
                        projects={data.projects}
                        illustrations={data.about.illustrations}
                        onNavigate={navigate}
                    />
                )}

                {route.page === 'about' && (
                    <AboutPage
                        about={data.about}
                        onOpenContact={() => setContactOpen(true)}
                    />
                )}

                {route.page === 'case-study' && currentProject && (
                    <CaseStudyPage
                        project={currentProject}
                        allProjects={data.projects}
                        onNavigate={navigate}
                    />
                )}
            </main>

            <Footer
                brand={data.brand}
                onOpenContact={() => setContactOpen(true)}
                onNavigate={navigate}
            />

            <ContactModal
                open={contactOpen}
                onClose={() => setContactOpen(false)}
                brand={data.brand}
            />
        </div>
    );
}

const rootEl = document.getElementById('studio-root');
if (rootEl) {
    createRoot(rootEl).render(<App />);
}
