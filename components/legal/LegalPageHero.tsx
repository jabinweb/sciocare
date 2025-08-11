import { LucideIcon } from 'lucide-react';

interface LegalPageHeroProps {
  title: string;
  description: string;
  icon: LucideIcon;
  lastUpdated?: string;
}

export default function LegalPageHero({ 
  title, 
  description, 
  icon: Icon, 
  lastUpdated 
}: LegalPageHeroProps) {
  return (
    <section className="bg-gradient-to-br from-blue-900/95 via-blue-800/90 to-blue-900/95 backdrop-blur-sm pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-white/10 backdrop-blur-md rounded-full">
            <Icon className="w-12 h-12 text-white" />
          </div>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{title}</h1>
        <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
          {description}
        </p>
        {lastUpdated && (
          <p className="text-sm text-white/70 mt-4">
            Last updated: {lastUpdated}
          </p>
        )}
      </div>
    </section>
  );
}
