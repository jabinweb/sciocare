'use client';

export default function VideoSection() {
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-blue-50/30 to-white"></div>
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-96 h-96 bg-blue-100 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-blue-100 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Content Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Discover ScioCare
          </h2>
          <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
            Explore how we prepare caregivers for the real world—through practical training, role‑specific English, and workplace readiness programs designed for today&apos;s healthcare challenges.
          </p>
        </div>

        {/* Video Container */}
        <div className="flex justify-center">
          <div className="relative w-full max-w-4xl">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-white border border-gray-200 p-2">
              {/* Video Container */}
              <div className="relative w-full" style={{ paddingBottom: '56.25%' /* 16:9 aspect ratio */ }}>
                <iframe 
                  className="absolute inset-0 w-full h-full rounded-xl"
                  src="https://videos.sproutvideo.com/embed/109bdbb71e1be7c69a/3d42d33d18df72bb" 
                  frameBorder="0" 
                  allowFullScreen 
                  referrerPolicy="no-referrer-when-downgrade" 
                  title="ScioCare Video - Healthcare Education Excellence"
                />
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full blur-xl"></div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full blur-xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
