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
      { width: 300, height: 180 },
      { width: 250, height: 150 },
      { width: 200, height: 120 },
      { width: 180, height: 108 },
      { width: 160, height: 96 },
      { width: 220, height: 132 },
      { width: 280, height: 168 },
      { width: 190, height: 114 },
    ];

    // Use fixed values with better screen coverage
    const predefinedValues = [
      { opacity: 0.25, top: 5, delay: 0, left: '15%' },
      { opacity: 0.2, top: 20, delay: 8, left: '60%' },
      { opacity: 0.3, top: 35, delay: 16, left: '5%' },
      { opacity: 0.18, top: 50, delay: 24, left: '75%' },
      { opacity: 0.22, top: 65, delay: 32, left: '25%' },
      { opacity: 0.15, top: 80, delay: 40, left: '85%' },
      { opacity: 0.28, top: 10, delay: 48, left: '40%' },
      { opacity: 0.2, top: 45, delay: 56, left: '90%' },
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

