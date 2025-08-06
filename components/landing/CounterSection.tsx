import { Award, Users, Clock, TrendingUp } from 'lucide-react';

export default function CounterSection() {
  const stats = [
    {
      icon: Users,
      number: "1,000+",
      label: "Healthcare Professionals",
      sublabel: "Successfully Trained",
      gradient: "from-blue-400 to-blue-600"
    },
    {
      icon: Clock,
      number: "200+",
      label: "Hours of Content",
      sublabel: "Comprehensive Learning",
      gradient: "from-orange-400 to-orange-600"
    },
    {
      icon: TrendingUp,
      number: "95%",
      label: "Completion Rate",
      sublabel: "Student Success",
      gradient: "from-blue-500 to-orange-500"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-orange-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23374151' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-50 to-orange-50 rounded-full border border-blue-100 mb-6">
            <Award className="w-4 h-4 text-blue-600 mr-2" />
            <span className="text-sm font-medium text-gray-700">Proven Excellence</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Impact That Speaks for Itself
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our commitment to excellence in healthcare education is reflected in these meaningful outcomes
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            
            return (
              <div key={index} className="group relative">
                {/* Card */}
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1">
                  {/* Icon */}
                  <div className={`w-16 h-16 bg-gradient-to-br ${stat.gradient} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  
                  {/* Number */}
                  <div className="mb-4">
                    <div className={`text-4xl md:text-5xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-2`}>
                      {stat.number}
                    </div>
                  </div>
                  
                  {/* Labels */}
                  <div className="space-y-1">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {stat.label}
                    </h3>
                    <p className="text-gray-600 font-medium">
                      {stat.sublabel}
                    </p>
                  </div>
                  
                  {/* Decorative element */}
                  <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${stat.gradient} opacity-5 rounded-2xl transform rotate-45 translate-x-8 -translate-y-8`} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Text */}
        <div className="text-center mt-16">
          <p className="text-gray-500 text-sm">
            Trusted by leading healthcare institutions worldwide • Accredited programs • Industry-recognized certifications
          </p>
        </div>
      </div>
    </section>
  );
}
