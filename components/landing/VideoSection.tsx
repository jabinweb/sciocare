'use client';

export default function VideoSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-blue-50 to-slate-100 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-white/20 to-orange-50/30"></div>
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-96 h-96 bg-blue-200 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-orange-200 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="flex justify-center">
          {/* Video Side */}
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
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-gradient-to-br from-blue-100 to-orange-100 rounded-full blur-xl"></div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-orange-100 to-blue-100 rounded-full blur-xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
              