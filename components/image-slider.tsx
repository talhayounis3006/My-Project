"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"

interface SliderImage {
  url: string
  alt: string
  subtitle?: string
}

interface ImageSliderProps {
  images: SliderImage[]
}

export function ImageSlider({ images }: ImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const goToSlide = useCallback((index: number) => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentIndex(index)
    setTimeout(() => setIsTransitioning(false), 1000)
  }, [isTransitioning])

  useEffect(() => {
    const interval = setInterval(() => {
      goToSlide((currentIndex + 1) % images.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [currentIndex, images.length, goToSlide])

  return (
    <div className="relative w-full h-[400px] md:h-[550px] lg:h-[650px] overflow-hidden">
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute top-0 left-0 w-full h-full transition-all duration-1000 ease-in-out ${
            index === currentIndex 
              ? "opacity-100 scale-100" 
              : "opacity-0 scale-105"
          }`}
        >
          <Image
            src={image.url || "/placeholder.svg"}
            alt={image.alt}
            fill
            className="object-cover"
            priority={index === 0}
          />
          {/* Rich gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/70" />
          
          {/* Hero content */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white p-6 max-w-3xl mx-auto">
              <div 
                className={`transition-all duration-700 delay-200 ${
                  index === currentIndex 
                    ? "opacity-100 translate-y-0" 
                    : "opacity-0 translate-y-8"
                }`}
              >
                <span className="inline-block text-xs md:text-sm font-semibold tracking-[0.25em] uppercase text-amber-300 mb-4">
                  ✦ Authentic Balkan Cuisine ✦
                </span>
              </div>
              <h2 
                className={`font-heading text-3xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight transition-all duration-700 delay-300 ${
                  index === currentIndex 
                    ? "opacity-100 translate-y-0" 
                    : "opacity-0 translate-y-8"
                }`}
              >
                {image.alt}
              </h2>
              <p 
                className={`text-base md:text-lg text-white/80 mb-8 max-w-xl mx-auto transition-all duration-700 delay-500 ${
                  index === currentIndex 
                    ? "opacity-100 translate-y-0" 
                    : "opacity-0 translate-y-8"
                }`}
              >
                {image.subtitle || "Experience the rich flavors and traditions of the Balkans"}
              </p>
            </div>
          </div>
        </div>
      ))}

      {/* Animated dot indicators */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-3">
        {images.map((_, index) => (
          <button
            key={index}
            className={`h-2 rounded-full transition-all duration-500 ${
              index === currentIndex 
                ? "bg-amber-400 w-8 shadow-lg shadow-amber-400/30" 
                : "bg-white/50 w-2 hover:bg-white/80"
            }`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Side navigation arrows */}
      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full glass-dark flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 hover:scale-110"
        onClick={() => goToSlide((currentIndex - 1 + images.length) % images.length)}
        aria-label="Previous slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
      </button>
      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full glass-dark flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 hover:scale-110"
        onClick={() => goToSlide((currentIndex + 1) % images.length)}
        aria-label="Next slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
      </button>
    </div>
  )
}
