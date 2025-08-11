'use client';

export default function VideoSection() {
  return (
    <section id="discover" className="py-16 md:py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 relative overflow-hidden">
      {/* Dark Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-96 h-96 bg-blue-600 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-blue-600 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-6 relative z-10">
        {/* Content Header */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6 px-2 drop-shadow-lg">
            Discover ScioCare
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-4xl mx-auto leading-relaxed px-2 drop-shadow-md">
            Explore how we prepare caregivers for the real world—through practical training, role‑specific English, and workplace readiness programs designed for today&apos;s healthcare challenges.
          </p>
        </div>

        {/* Video Container with Glass Effect */}
        <div className="flex justify-center px-4">
          <div className="relative w-full max-w-4xl">
            <div className="relative rounded-xl md:rounded-2xl overflow-hidden shadow-2xl bg-white/10 backdrop-blur-md border border-white/20 p-2 md:p-3">
              {/* Video Container */}
              <div className="relative w-full" style={{ paddingBottom: '56.25%' /* 16:9 aspect ratio */ }}>
                <iframe 
                  className="absolute inset-0 w-full h-full rounded-lg md:rounded-xl"
                  src="https://videos.sproutvideo.com/embed/109bdbb71e1be7c69a/3d42d33d18df72bb" 
                  frameBorder="0" 
                  allowFullScreen 
                  referrerPolicy="no-referrer-when-downgrade" 
                  title="ScioCare Video - Healthcare Education Excellence"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
