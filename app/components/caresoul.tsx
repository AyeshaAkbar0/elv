"use client";
import React, { useState, useEffect, useRef, TouchEvent } from "react";
import {
  ChevronRight,
  Play,
  Pause,
  ArrowRight,
  ShieldCheck,
  Cpu,
  Video,
  Lock,
  Radio,
  Cloud,
  Moon,
} from "lucide-react";
import Link from "next/link";

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  badge: string;
  image: string;
  features: {
    label: string;
    icon: React.ReactNode;
  }[];
}

const slides: Slide[] = [
  {
    id: 1,
    title: "CCTV & Video Surveillance",
    subtitle: "Real-time monitoring. Smarter visual protection.",
    badge: "CORE SECURITY",
    image: "/carousel1.png",
    features: [
      { label: "Smart Motion & AI", icon: <Cpu className="w-4 h-4" /> },
      { label: "HD Night Vision", icon: <Video className="w-4 h-4" /> },
      { label: "Intrusion Alerts", icon: <ShieldCheck className="w-4 h-4" /> },
      { label: "ANPR Plate Recog.", icon: <Radio className="w-4 h-4" /> },
      { label: "Remote Live View", icon: <Video className="w-4 h-4" /> },
      { label: "Line-Cross Detection", icon: <Lock className="w-4 h-4" /> },
    ],
  },
  {
    id: 2,
    title: "Intelligent Video Intercoms",
    subtitle: "Seamless door access control & crystal-clear visitor verification.",
    badge: "INTERCOM & ACCESS",
    image: "/carousel2.png",
    features: [
      { label: "Face & Card Verification", icon: <Cpu className="w-4 h-4" /> },
      { label: "Two-Way HD Audio", icon: <Video className="w-4 h-4" /> },
      { label: "Remote Door Unlock", icon: <Lock className="w-4 h-4" /> },
      { label: "Night Vision Station", icon: <Moon className="w-4 h-4" /> },
      { label: "Visitor Call History", icon: <Radio className="w-4 h-4" /> },
      { label: "Cloud App Control", icon: <Cloud className="w-4 h-4" /> },
    ],
  },
  {
    id: 3,
    title: "Enterprise Access Control",
    subtitle: "Unified multi-factor credentials and biometric verification.",
    badge: "SECURE ACCESS",
    image: "/carousel3.png",
    features: [
      { label: "Facial Terminal", icon: <ShieldCheck className="w-4 h-4" /> },
      { label: "Multi-Door Interlock", icon: <Lock className="w-4 h-4" /> },
      { label: "Visitor QR Pass", icon: <Radio className="w-4 h-4" /> },
      { label: "Anti-Passback", icon: <Cpu className="w-4 h-4" /> },
      { label: "Attendance Sync", icon: <Video className="w-4 h-4" /> },
      { label: "Emergency Lockdown", icon: <Lock className="w-4 h-4" /> },
    ],
  },
];

export default function Carousel() {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  // Touch handling state for swipe gestures on mobile
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Auto-play interval logic
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 6000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying]);

  // Swipe Navigation Handlers
  const handleTouchStart = (e: TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    } else if (isRightSwipe) {
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    }
  };

  const activeData = slides[currentSlide];

  return (
    <div
      className="relative w-full min-h-[500px] lg:min-h-[650px] lg:h-[85vh] bg-neutral-950 overflow-hidden font-sans select-none flex flex-col justify-between"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background Images with Transitions */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide
              ? "opacity-100 scale-100"
              : "opacity-0 scale-105 pointer-events-none"
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover object-center sm:object-center filter brightness-75 lg:brightness-90"
          />

          {/* Dynamic Overlays for High Text Contrast */}
          <div className="absolute inset-0 bg-neutral-950/70 sm:bg-neutral-950/40 lg:hidden" />
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/80 to-transparent hidden lg:block lg:w-3/4" />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-neutral-950/60 lg:to-neutral-950/40" />
        </div>
      ))}

      {/* Content Container */}
      <div className="relative max-w-7xl mx-auto w-full h-full flex flex-col justify-between px-4 sm:px-8 lg:px-12 py-6 sm:py-10 lg:py-12 z-10 flex-grow">
        
        {/* Top Control Bar */}
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <span className="inline-flex items-center px-2.5 py-1 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs font-semibold tracking-wider uppercase bg-red-600/20 text-red-400 sm:text-red-500 border border-red-500/30 backdrop-blur-md">
            {activeData.badge}
          </span>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            aria-label={isPlaying ? "Pause autoplay" : "Start autoplay"}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-all border border-white/10 active:scale-95"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
          </button>
        </div>

        {/* Center Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center my-auto py-2">
          <div className="lg:col-span-7 space-y-4 sm:space-y-6">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight sm:leading-tight drop-shadow-lg">
              {activeData.title}
            </h1>

            <p className="text-sm sm:text-lg lg:text-xl text-neutral-300 max-w-xl font-normal sm:font-medium leading-relaxed drop-shadow-md">
              {activeData.subtitle}
            </p>

            {/* CTA Button */}
            <div className="pt-1 sm:pt-2">
              <Link href="/shop" className="w-full sm:w-auto inline-block">
              <button className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl sm:rounded-full bg-red-600 hover:bg-red-700 text-white font-semibold text-sm sm:text-base transition-all shadow-lg shadow-red-600/30 hover:shadow-red-600/50 hover:scale-[1.02] sm:hover:scale-105 active:scale-95">
                <span>Learn Now</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
              </Link>
            </div>
          </div>

          {/* Desktop Right-Side Number Navigation */}
          <div className="hidden lg:flex lg:col-span-5 justify-end items-center">
            <div className="flex flex-col items-center space-y-4 bg-neutral-900/40 backdrop-blur-xl p-4 rounded-2xl border border-white/10 shadow-2xl">
              {slides.map((slide, index) => {
                const isActive = index === currentSlide;
                return (
                  <button
                    key={slide.id}
                    onClick={() => setCurrentSlide(index)}
                    aria-label={`Go to slide ${index + 1}`}
                    className={`group relative flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ${
                      isActive
                        ? "bg-red-600 text-white font-bold shadow-md shadow-red-600/50 scale-110"
                        : "bg-white/5 text-neutral-400 hover:bg-white/15 hover:text-white"
                    }`}
                  >
                    <span className="text-sm">0{slide.id}</span>
                    {isActive && (
                      <span className="absolute -inset-1 rounded-full border border-red-500 animate-ping opacity-30 pointer-events-none" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        
      </div>

      {/* Mobile Dot Navigation */}
      <div className="relative z-10 flex lg:hidden justify-center items-center space-x-2 pb-5 pt-2">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentSlide ? "w-7 bg-red-600" : "w-2 bg-white/30"
            }`}
          />
        ))}
      </div>
    </div>
  );
}