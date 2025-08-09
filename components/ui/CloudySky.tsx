'use client';

import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';

interface CloudySkyProps {
  children?: React.ReactNode;
  className?: string;
  cloudCount?: number;
  cloudOpacity?: number;
  gradientFrom?: string;
  gradientVia?: string;
  gradientTo?: string;
}

export default function CloudySky({ 
  children, 
  className = "",
  cloudCount = 5,
  cloudOpacity = 0.2,
  gradientFrom = "from-blue-500",
  gradientVia = "via-blue-400", 
  gradientTo = "to-blue-500"
}: CloudySkyProps) {
  const [scrollY, setScrollY] = useState(0);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Generate clouds with fixed values to avoid hydration mismatch
  const clouds = useMemo(() => {
    const cloudSizes = [
      { width: 200, height: 120 }, // Smaller clouds for mobile
      { width: 180, height: 108 },
      { width: 160, height: 96 },
      { width: 140, height: 84 },
      { width: 120, height: 72 },
      { width: 170, height: 102 },
      { width: 190, height: 114 },
      { width: 150, height: 90 },
    ];

    // Better mobile positioning
    const predefinedValues = [
      { opacity: 0.25, top: 5, delay: 0, left: '10%' },
      { opacity: 0.2, top: 15, delay: 8, left: '70%' },
      { opacity: 0.3, top: 30, delay: 16, left: '0%' },
      { opacity: 0.18, top: 45, delay: 24, left: '80%' },
      { opacity: 0.22, top: 60, delay: 32, left: '20%' },
      { opacity: 0.15, top: 75, delay: 40, left: '90%' },
      { opacity: 0.28, top: 8, delay: 48, left: '40%' },
      { opacity: 0.2, top: 40, delay: 56, left: '95%' },
    ];

    return Array.from({ length: 8 }, (_, index) => {
      const size = cloudSizes[index % cloudSizes.length];
      const preset = predefinedValues[index % predefinedValues.length];
      
      return {
        width: size.width,
        height: size.height,
        className: "animate-cloud-left-to-right",
        opacity: preset.opacity,
        style: {
          top: preset.top + '%',
          left: preset.left,
          animationDuration: '80s',
          animationDelay: preset.delay + 's',
        }
      };
    });
  }, []);

  return (
    <section className={`bg-gradient-to-b ${gradientFrom} ${gradientVia} ${gradientTo} relative overflow-hidden ${className}`}>
      {/* Animated Cloud Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {clouds.slice(0, cloudCount || 8).map((cloud, index) => (
          <div
            key={`cloud-${index}`}
            className={`absolute ${cloud.className}`}
            style={{
              ...cloud.style,
              opacity: cloud.opacity,
              width: cloud.width + 'px',
              height: cloud.height + 'px',
            }}
          >
            {/* Try to load image first, fallback to CSS cloud */}
            {!imageError ? (
              <Image
                src="/cloud.png"
                alt=""
                width={cloud.width}
                height={cloud.height}
                className="w-full h-full object-contain"
                onError={() => {
                  console.log(`Cloud image failed to load, using CSS fallback`);
                  setImageError(true);
                }}
                onLoad={() => console.log(`Cloud ${index} loaded successfully`)}
              />
            ) : (
              // CSS-based cloud fallback
              <div 
                className="w-full h-full relative"
                style={{
                  background: 'white',
                  borderRadius: '50px',
                  position: 'relative',
                }}
              >
                <div 
                  className="absolute"
                  style={{
                    background: 'white',
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    top: '-25px',
                    left: '10px',
                  }}
                />
                <div 
                  className="absolute"
                  style={{
                    background: 'white',
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    top: '-35px',
                    left: '50px',
                  }}
                />
                <div 
                  className="absolute"
                  style={{
                    background: 'white',
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    top: '-20px',
                    right: '10px',
                  }}
                />
              </div>
            )}
          </div>
        ))}
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </section>
  );
}

