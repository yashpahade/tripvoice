import React, { useEffect, useRef, useMemo, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { ArrowDown, Plane } from 'lucide-react';

import cabinWallJpg from '@/assets/hero/cabin-window-wall.jpg';
import skyPlateAJpg from '@/assets/hero/sky-plate-a.jpg';
import skyPlateBJpg from '@/assets/hero/sky-plate-b.jpg';
import skyPlateCJpg from '@/assets/hero/sky-plate-c.jpg';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// ==========================================
// NAMED CONSTANTS (Tunable Progress Markers)
// ==========================================
export const PIN_LENGTH_FACTOR = 6; // 600% of viewport height

export const TIMELINE_CONSTANTS = {
  // Hold at rest
  HOLD_START: 0.00,
  HOLD_END: 0.03,

  // L4 Hero text slides out horizontally
  L4_SLIDE_START: 0.03,
  L4_SLIDE_END: 0.12,

  // L2 Cabin layer scales around window center from 1 to END_SCALE
  L2_SCALE_START: 0.03,
  L2_SCALE_END: 0.30,

  // L3 Wordmark travels from window center up to navbar vertical center
  L3_TRAVEL_START: 0.08,
  L3_TRAVEL_END: 0.30,

  // Plate A drifts forward: scale 1 to 1.25, translateY -6%
  PLATE_A_DRIFT_START: 0.03,
  PLATE_A_DRIFT_END: 0.45,

  // Crossfade Plate A to Plate B; Plate B scales 1.1 to 1.3
  PLATE_A_TO_B_START: 0.28,
  PLATE_A_TO_B_END: 0.42,

  // L5 Paragraph: container rises from +25vh to -8vh, words reveal
  L5_PARA_START: 0.40,
  L5_PARA_END: 0.62,

  // L5 Paragraph holds then fades out upward with blur
  L5_PARA_FADE_START: 0.62,
  L5_PARA_FADE_END: 0.70,

  // L5 Two-column blocks fade/blur in, rise, fade/blur out staggered
  L5_COLS_START: 0.66,
  L5_COLS_END: 0.88,

  // Crossfade Plate B to Plate C
  PLATE_B_TO_C_START: 0.78,
  PLATE_B_TO_C_END: 0.90,

  // Crossfade Hero UI (wordmark + CTA pill) to Site Header
  HEADER_SWAP_START: 0.92,
  HEADER_SWAP_END: 1.00,

  // Final hold on Plate C before unpinning
  FINAL_HOLD_START: 0.90,
  FINAL_HOLD_END: 1.00,
};

const STORY_PARAGRAPH = "Every journey begins with a singular perspective. From clouds beneath your wings to destinations across the horizon, travel effortless, seamless, and unconfined.";

const HeroScrollScene = React.memo(() => {
  const containerRef = useRef(null);
  const pinnedWrapperRef = useRef(null);
  
  // Layer Refs
  const plateARef = useRef(null);
  const plateBRef = useRef(null);
  const plateCRef = useRef(null);
  const cabinLayerRef = useRef(null);
  const wordmarkRef = useRef(null);

  // L4 Elements
  const headlineLeftRef = useRef(null);
  const headlineRightRef = useRef(null);
  const smallCopyLeftRef = useRef(null);
  const scrollCueRightRef = useRef(null);

  // L5 Elements
  const storyContainerRef = useRef(null);
  const wordsContainerRef = useRef(null);
  const colOneRef = useRef(null);
  const colTwoRef = useRef(null);

  // CTA Pill
  const ctaPillRef = useRef(null);

  // Check prefers-reduced-motion
  const prefersReducedMotion = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  // Split story paragraph into words
  const wordsArray = useMemo(() => {
    return STORY_PARAGRAPH.split(' ');
  }, []);

  // Compute dynamic END_SCALE
  const computeEndScale = useCallback(() => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    // Window opening is approx 34% width, 85% height
    const rx = w * 0.17;
    const ry = h * 0.425;
    const cornerDistX = w * 0.55;
    const cornerDistY = h * 0.55;
    const minScale = Math.sqrt(Math.pow(cornerDistX / rx, 2) + Math.pow(cornerDistY / ry, 2));
    // Factor in mobile/desktop bezel clearance
    return Math.max(6.5, minScale * 1.85);
  }, []);

  // Scroll to booking section when CTA pill is clicked
  const handleScrollToBooking = useCallback(() => {
    const target = document.getElementById('booking-search-section');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  useEffect(() => {
    // 1. Prevent browser scroll restoration on refresh
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    if (prefersReducedMotion) return;

    // 2. Setup Lenis smooth scroll once
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.9,
    });

    lenis.on('scroll', ScrollTrigger.update);
    const tickerCallback = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    // 3. Create GSAP Context for StrictMode and unmount safety
    const ctx = gsap.context(() => {
      const pinLength = () => window.innerHeight * PIN_LENGTH_FACTOR;

      // Master Timeline (Progress normalized 0 to 1)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: () => `+=${pinLength()}`,
          pin: pinnedWrapperRef.current,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Target initial states
      gsap.set(plateBRef.current, { opacity: 0, scale: 1.1 });
      gsap.set(plateCRef.current, { opacity: 0 });
      gsap.set(storyContainerRef.current, { yPercent: 25, opacity: 0 });
      gsap.set(colOneRef.current, { y: 40, opacity: 0, filter: 'blur(8px)' });
      gsap.set(colTwoRef.current, { y: 40, opacity: 0, filter: 'blur(8px)' });

      const wordSpans = wordsContainerRef.current?.querySelectorAll('.story-word') || [];
      gsap.set(wordSpans, { opacity: 0.12, filter: 'blur(8px)' });

      // Calculate travel distance from window center (50vh) to navbar center (~36px)
      const getWordmarkYDistance = () => {
        const currentCenterY = window.innerHeight * 0.5;
        const targetNavY = 38; // Vertically centered in header
        return -(currentCenterY - targetNavY);
      };

      // ───────────────────────────────────────────────────────────
      // TIMELINE CHOREOGRAPHY
      // ───────────────────────────────────────────────────────────

      // 1. L4 Slides Out Horizontally (p: 0.03 -> 0.12)
      tl.to(headlineLeftRef.current, {
        x: '-120%',
        opacity: 0,
        ease: 'power2.in',
        duration: TIMELINE_CONSTANTS.L4_SLIDE_END - TIMELINE_CONSTANTS.L4_SLIDE_START,
      }, TIMELINE_CONSTANTS.L4_SLIDE_START);

      tl.to(headlineRightRef.current, {
        x: '120%',
        opacity: 0,
        ease: 'power2.in',
        duration: TIMELINE_CONSTANTS.L4_SLIDE_END - TIMELINE_CONSTANTS.L4_SLIDE_START,
      }, TIMELINE_CONSTANTS.L4_SLIDE_START);

      tl.to(smallCopyLeftRef.current, {
        x: '-80%',
        opacity: 0,
        ease: 'power2.in',
        duration: TIMELINE_CONSTANTS.L4_SLIDE_END - TIMELINE_CONSTANTS.L4_SLIDE_START,
      }, TIMELINE_CONSTANTS.L4_SLIDE_START);

      tl.to(scrollCueRightRef.current, {
        x: '80%',
        opacity: 0,
        ease: 'power2.in',
        duration: TIMELINE_CONSTANTS.L4_SLIDE_END - TIMELINE_CONSTANTS.L4_SLIDE_START,
      }, TIMELINE_CONSTANTS.L4_SLIDE_START);

      // 2. L2 Cabin Wall scales around window center from 1 to END_SCALE (p: 0.03 -> 0.30)
      tl.to(cabinLayerRef.current, {
        scale: computeEndScale,
        opacity: 0,
        ease: 'power1.inOut',
        duration: TIMELINE_CONSTANTS.L2_SCALE_END - TIMELINE_CONSTANTS.L2_SCALE_START,
      }, TIMELINE_CONSTANTS.L2_SCALE_START);

      // 3. L3 Wordmark travels from window center up to navbar (p: 0.08 -> 0.30)
      tl.to(wordmarkRef.current, {
        y: getWordmarkYDistance,
        scale: 0.85,
        letterSpacing: '0.45em',
        ease: 'power2.out',
        duration: TIMELINE_CONSTANTS.L3_TRAVEL_END - TIMELINE_CONSTANTS.L3_TRAVEL_START,
      }, TIMELINE_CONSTANTS.L3_TRAVEL_START);

      // 4. Plate A drifts forward (p: 0.03 -> 0.45)
      tl.to(plateARef.current, {
        scale: 1.25,
        yPercent: -6,
        ease: 'none',
        duration: TIMELINE_CONSTANTS.PLATE_A_DRIFT_END - TIMELINE_CONSTANTS.PLATE_A_DRIFT_START,
      }, TIMELINE_CONSTANTS.PLATE_A_DRIFT_START);

      // 5. Crossfade Plate A to Plate B (p: 0.28 -> 0.42)
      tl.to(plateBRef.current, {
        opacity: 1,
        scale: 1.3,
        ease: 'power1.inOut',
        duration: TIMELINE_CONSTANTS.PLATE_A_TO_B_END - TIMELINE_CONSTANTS.PLATE_A_TO_B_START,
      }, TIMELINE_CONSTANTS.PLATE_A_TO_B_START);

      tl.to(plateARef.current, {
        opacity: 0,
        ease: 'power1.inOut',
        duration: TIMELINE_CONSTANTS.PLATE_A_TO_B_END - TIMELINE_CONSTANTS.PLATE_A_TO_B_START,
      }, TIMELINE_CONSTANTS.PLATE_A_TO_B_START);

      // 6. L5 Paragraph rises from +25vh to -8vh and reveals words (p: 0.40 -> 0.62)
      tl.to(storyContainerRef.current, {
        yPercent: -8,
        opacity: 1,
        ease: 'power1.out',
        duration: TIMELINE_CONSTANTS.L5_PARA_END - TIMELINE_CONSTANTS.L5_PARA_START,
      }, TIMELINE_CONSTANTS.L5_PARA_START);

      if (wordSpans.length > 0) {
        tl.to(wordSpans, {
          opacity: 1,
          filter: 'blur(0px)',
          stagger: 0.005,
          ease: 'power1.out',
          duration: TIMELINE_CONSTANTS.L5_PARA_END - TIMELINE_CONSTANTS.L5_PARA_START,
        }, TIMELINE_CONSTANTS.L5_PARA_START);
      }

      // 7. L5 Paragraph holds then fades out upward (p: 0.62 -> 0.70)
      tl.to(storyContainerRef.current, {
        yPercent: -22,
        opacity: 0,
        filter: 'blur(6px)',
        ease: 'power2.in',
        duration: TIMELINE_CONSTANTS.L5_PARA_FADE_END - TIMELINE_CONSTANTS.L5_PARA_FADE_START,
      }, TIMELINE_CONSTANTS.L5_PARA_FADE_START);

      // 8. L5 Two-Column blocks fade in, rise, then fade out (p: 0.66 -> 0.88)
      const colDuration = (TIMELINE_CONSTANTS.L5_COLS_END - TIMELINE_CONSTANTS.L5_COLS_START) * 0.45;
      
      // Column 1 Fade In
      tl.to(colOneRef.current, {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        ease: 'power2.out',
        duration: colDuration,
      }, TIMELINE_CONSTANTS.L5_COLS_START);

      // Column 2 Fade In (staggered slightly)
      tl.to(colTwoRef.current, {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        ease: 'power2.out',
        duration: colDuration,
      }, TIMELINE_CONSTANTS.L5_COLS_START + 0.03);

      // Column 1 Fade Out
      tl.to(colOneRef.current, {
        opacity: 0,
        y: -30,
        filter: 'blur(6px)',
        ease: 'power2.in',
        duration: colDuration,
      }, TIMELINE_CONSTANTS.L5_COLS_END - colDuration);

      // Column 2 Fade Out
      tl.to(colTwoRef.current, {
        opacity: 0,
        y: -30,
        filter: 'blur(6px)',
        ease: 'power2.in',
        duration: colDuration,
      }, TIMELINE_CONSTANTS.L5_COLS_END - colDuration + 0.02);

      // 9. Crossfade Plate B to Plate C (p: 0.78 -> 0.90)
      tl.to(plateCRef.current, {
        opacity: 1,
        ease: 'power1.inOut',
        duration: TIMELINE_CONSTANTS.PLATE_B_TO_C_END - TIMELINE_CONSTANTS.PLATE_B_TO_C_START,
      }, TIMELINE_CONSTANTS.PLATE_B_TO_C_START);

      tl.to(plateBRef.current, {
        opacity: 0,
        ease: 'power1.inOut',
        duration: TIMELINE_CONSTANTS.PLATE_B_TO_C_END - TIMELINE_CONSTANTS.PLATE_B_TO_C_START,
      }, TIMELINE_CONSTANTS.PLATE_B_TO_C_START);

      // 10. Crossfade Hero UI to Site Header (p: 0.92 -> 1.00)
      const headerSwapDuration = TIMELINE_CONSTANTS.HEADER_SWAP_END - TIMELINE_CONSTANTS.HEADER_SWAP_START;

      tl.to([wordmarkRef.current, ctaPillRef.current], {
        opacity: 0,
        pointerEvents: 'none',
        ease: 'power1.inOut',
        duration: headerSwapDuration,
      }, TIMELINE_CONSTANTS.HEADER_SWAP_START);

      const siteHeaderEl = document.getElementById('site-header');
      if (siteHeaderEl) {
        tl.fromTo(siteHeaderEl, {
          opacity: 0,
          pointerEvents: 'none',
        }, {
          opacity: 1,
          pointerEvents: 'auto',
          ease: 'power1.inOut',
          duration: headerSwapDuration,
        }, TIMELINE_CONSTANTS.HEADER_SWAP_START);
      }

      // Toggle CTA pill visibility: visible throughout pinned hero, fades when moving into search section
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: () => `+=${pinLength()}`,
        onToggle: (self) => {
          gsap.to(ctaPillRef.current, {
            autoAlpha: self.isActive ? 1 : 0,
            duration: 0.3,
          });
        },
      });
    }, containerRef);

    // Refresh ScrollTrigger after assets and font loads
    const handleLoad = () => ScrollTrigger.refresh();
    window.addEventListener('load', handleLoad);
    window.addEventListener('resize', handleLoad);

    return () => {
      window.removeEventListener('load', handleLoad);
      window.removeEventListener('resize', handleLoad);
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      ctx.revert();
    };
  }, [prefersReducedMotion, computeEndScale]);

  return (
    <section 
      ref={containerRef} 
      className="relative w-full overflow-x-clip bg-[#090706]"
      style={{ minHeight: `${(PIN_LENGTH_FACTOR + 1) * 100}vh` }}
      data-scene="cabin-window-hero"
    >
      {/* Pinned Viewport Container (100svh) */}
      <div 
        ref={pinnedWrapperRef} 
        className="w-full h-screen h-[100svh] relative overflow-hidden flex items-center justify-center select-none"
      >
        {/* ========================================================= */}
        {/* L1: SKY PLATES (Behind Cabin)                             */}
        {/* ========================================================= */}
        <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
          {/* Sky Plate A (Photorealistic 4K soft blue sky above cloud sea) */}
          <img 
            ref={plateARef}
            src={skyPlateAJpg} 
            alt="Sky above clouds" 
            data-layer="sky-plate-a"
            className="absolute inset-0 w-full h-full object-cover will-change-transform"
          />

          {/* Sky Plate B (Photorealistic 4K top-down deep blue clouds) */}
          <img 
            ref={plateBRef}
            src={skyPlateBJpg} 
            alt="Deep cloud layers" 
            data-layer="sky-plate-b"
            className="absolute inset-0 w-full h-full object-cover will-change-transform"
          />

          {/* Sky Plate C (Photorealistic 4K pale streaky light blue sky with bottom 15% seam fade) */}
          <img 
            ref={plateCRef}
            src={skyPlateCJpg} 
            alt="Pale streaky horizon" 
            data-layer="sky-plate-c"
            className="absolute inset-0 w-full h-full object-cover will-change-transform"
            style={{
              WebkitMaskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)',
              maskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)',
            }}
          />
        </div>

        {/* Seamless bottom transition into booking search section (no hard edge) */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-[18vh] pointer-events-none bg-gradient-to-b from-transparent via-[#0F172A]/40 to-[#0F172A] z-25" 
          aria-hidden="true" 
        />

        {/* ========================================================= */}
        {/* L2: CABIN WALL LAYER (Scales around window center)       */}
        {/* ========================================================= */}
        <div 
          ref={cabinLayerRef}
          data-layer="cabin-wall"
          className="absolute inset-0 w-full h-full pointer-events-none z-10 will-change-transform origin-center flex items-center justify-center overflow-hidden"
        >
          <svg 
            viewBox="0 0 1920 1080" 
            className="w-full h-full object-cover" 
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              <mask id="cabinApertureMask">
                {/* White background: keep cabin wall visible */}
                <rect width="1920" height="1080" fill="white" />
                {/* Black cutout: transparent aperture for sky */}
                <ellipse cx="960" cy="540" rx="195" ry="275" fill="black" />
              </mask>
            </defs>
            {/* Ultra-luxury 4K Cabin Wall Image with Masked Window Opening */}
            <image 
              href={cabinWallJpg} 
              width="1920" 
              height="1080" 
              mask="url(#cabinApertureMask)" 
              preserveAspectRatio="xMidYMid slice" 
            />
            {/* Realistic inner bezel shadow/stroke for depth */}
            <ellipse 
              cx="960" 
              cy="540" 
              rx="195" 
              ry="275" 
              fill="none" 
              stroke="rgba(0, 0, 0, 0.45)" 
              strokeWidth="6" 
            />
          </svg>
        </div>

        {/* ========================================================= */}
        {/* L3: BRAND WORDMARK (Center of window -> travels to nav)   */}
        {/* ========================================================= */}
        <div 
          ref={wordmarkRef}
          data-layer="wordmark"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none will-change-transform text-center"
        >
          <h1 className="text-white text-lg sm:text-2xl md:text-3xl font-extralight tracking-[0.35em] uppercase drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
            TripNest
          </h1>
        </div>

        {/* ========================================================= */}
        {/* L4: HERO TEXT (At rest, slides out horizontally)         */}
        {/* ========================================================= */}
        <div className="absolute inset-0 w-full h-full pointer-events-none z-30 p-6 sm:p-12 md:p-16 flex flex-col justify-between">
          {/* Top Row: Left Headline & Right-aligned Headline */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mt-16 sm:mt-20 md:mt-24">
            {/* Headline 1 (Top-Left) */}
            <div 
              ref={headlineLeftRef} 
              data-hero="headline-left"
              className="max-w-md will-change-transform"
            >
              <span className="text-[10px] md:text-xs font-bold text-teal-400 uppercase tracking-widest block mb-1">
                Luxury Aviation & Expeditions
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-none drop-shadow-lg">
                Fly Beyond <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-white">
                  Borders.
                </span>
              </h2>
            </div>

            {/* Headline 2 (Lower-Right / Right-aligned) */}
            <div 
              ref={headlineRightRef} 
              data-hero="headline-right"
              className="max-w-md sm:text-right self-end sm:self-auto will-change-transform"
            >
              <span className="text-[10px] md:text-xs font-bold text-amber-400 uppercase tracking-widest block mb-1">
                Next-Gen Travel Engine
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-none drop-shadow-lg">
                Smart Travel <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-amber-200">
                  Engineered.
                </span>
              </h2>
            </div>
          </div>

          {/* Bottom Row: Small Copy (Left) & Scroll Cue (Right) */}
          <div className="flex flex-col sm:flex-row justify-between items-end gap-6 mb-12 sm:mb-16">
            {/* Small Copy Block (Bottom-Left) */}
            <div 
              ref={smallCopyLeftRef} 
              data-hero="small-copy-left"
              className="max-w-xs will-change-transform"
            >
              <p className="text-[11px] font-black tracking-widest uppercase text-white/90">
                Curated Flight Expeditions
              </p>
              <div className="w-12 h-0.5 bg-teal-400 my-2" />
              <p className="text-xs text-gray-300 leading-relaxed font-medium">
                Effortless bookings, guaranteed seat selection, and verified fares designed for modern explorers.
              </p>
            </div>

            {/* Scroll Cue (Bottom-Right) */}
            <div 
              ref={scrollCueRightRef} 
              data-hero="scroll-cue-right"
              className="flex items-center gap-3 text-right will-change-transform text-white/80"
            >
              <div className="hidden sm:block w-12 h-0.5 bg-white/40" />
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-teal-300">
                  Scroll down
                </p>
                <p className="text-xs text-gray-300 font-medium">
                  to start the journey
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* L5: STORY TEXT (Reveals midway through timeline)         */}
        {/* ========================================================= */}
        <div className="absolute inset-0 w-full h-full pointer-events-none z-30 flex flex-col justify-center px-6 sm:px-12 md:px-24">
          {/* Main Story Paragraph */}
          <div 
            ref={storyContainerRef}
            data-story="paragraph"
            className="max-w-4xl will-change-transform"
          >
            <p 
              ref={wordsContainerRef}
              className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-[3.2vw] font-semibold leading-snug drop-shadow-md"
            >
              {wordsArray.map((word, i) => (
                <span 
                  key={i} 
                  className="story-word inline-block mr-2.5 transition-all will-change-[opacity,filter]"
                >
                  {word}
                </span>
              ))}
            </p>
          </div>

          {/* Two-Column Small Blocks */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-16 max-w-4xl mt-12">
            {/* Column 1 (~44% viewport) */}
            <div 
              ref={colOneRef}
              data-story="col-1"
              className="will-change-transform"
            >
              <h4 className="text-xs font-black uppercase tracking-widest text-teal-300 mb-2">
                Precision Seat Selection
              </h4>
              <div className="w-8 h-0.5 bg-teal-400 mb-3" />
              <p className="text-xs sm:text-sm text-gray-200 leading-relaxed font-medium">
                Choose your exact window or extra-legroom seat in real-time across Airbus A320 & Boeing 737 fleets with live cabin maps.
              </p>
            </div>

            {/* Column 2 (~69% viewport) */}
            <div 
              ref={colTwoRef}
              data-story="col-2"
              className="will-change-transform"
            >
              <h4 className="text-xs font-black uppercase tracking-widest text-amber-300 mb-2">
                Zero Hidden Fares
              </h4>
              <div className="w-8 h-0.5 bg-amber-400 mb-3" />
              <p className="text-xs sm:text-sm text-gray-200 leading-relaxed font-medium">
                Transparent pricing with instant bank discounts, corporate billing, and rapid wallet refunds credited within seconds.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* L6: FIXED CTA PILL (NOT a child of pinned wrapper)        */}
      {/* ========================================================= */}
      <div 
        ref={ctaPillRef}
        data-ui="cta-pill"
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 pointer-events-auto"
      >
        <button
          onClick={handleScrollToBooking}
          className="flex items-center gap-2.5 px-6 py-3 rounded-full bg-gradient-to-r from-[#0D9488] to-[#0F766E] hover:from-[#0F766E] hover:to-[#115E59] text-white font-bold text-xs uppercase tracking-wider shadow-2xl hover:scale-105 active:scale-95 transition-all border border-teal-400/30 backdrop-blur-md cursor-pointer"
          aria-label="Book the Flight"
        >
          <Plane className="w-4 h-4 text-teal-200 rotate-45" />
          <span>Book the Flight</span>
          <ArrowDown className="w-3.5 h-3.5 text-teal-200 animate-bounce" />
        </button>
      </div>
    </section>
  );
});

HeroScrollScene.displayName = 'HeroScrollScene';

export default HeroScrollScene;
