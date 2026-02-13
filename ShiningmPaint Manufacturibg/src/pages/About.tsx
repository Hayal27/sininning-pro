import type { FC } from 'react';
import { useState, useEffect } from 'react';
import { Shield, Award, Users, Target, Lightbulb, TrendingUp, Star, ChevronLeft, ChevronRight, Quote, Palette, Globe } from 'lucide-react';

const About: FC = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const testimonials = [
    {
      name: "Ahmed Hassan",
      position: "Project Manager",
      company: "Yonab Construction",
      testimonial: "Shinning Paint's thermoplastic road marking paints have exceeded our expectations. The durability and visibility are outstanding, making our highway projects stand out for their quality and safety standards.",
      rating: 5,
      avatar: "YC"
    },
    {
      name: "Li Wei",
      position: "Infrastructure Director",
      company: "China Railway 21 Group",
      testimonial: "We've partnered with Shinning Paint on multiple large-scale projects. Their products meet international standards and their customer support is exceptional. Highly recommend for any major infrastructure work.",
      rating: 5,
      avatar: "CR"
    },
    {
      name: "Sara Mengistu",
      position: "Engineering Lead",
      company: "Lucy Engineering",
      testimonial: "The quality and consistency of Shinning Paint products have made them our go-to supplier. Their eco-friendly solutions align perfectly with our sustainability goals while delivering superior performance.",
      rating: 5,
      avatar: "LE"
    },
    {
      name: "Daniel Tesfaye",
      position: "Operations Manager",
      company: "Unitrac Steel",
      testimonial: "Professional service, premium quality products, and reliable delivery. Shinning Paint has been instrumental in helping us complete our road marking projects on time and within budget.",
      rating: 5,
      avatar: "US"
    },
    {
      name: "Michael Assefa",
      position: "Construction Director",
      company: "Simon Electro Mechanical",
      testimonial: "The technical expertise and product innovation from Shinning Paint have significantly improved our project outcomes. Their glass beads provide excellent nighttime visibility for road safety.",
      rating: 5,
      avatar: "SE"
    },
    {
      name: "Yohannes Bekele",
      position: "Site Engineer",
      company: "Kibish Construction",
      testimonial: "Outstanding road marking solutions! The paint adheres well in all weather conditions and maintains its brightness even after heavy traffic. Great value for money and excellent customer service.",
      rating: 5,
      avatar: "KC"
    },
    {
      name: "Fatima Ali",
      position: "Project Coordinator",
      company: "FE Construction",
      testimonial: "Shinning Paint's commitment to quality and innovation is evident in every product. Their thermoplastic paints have transformed our road marking projects with superior durability and visibility.",
      rating: 5,
      avatar: "FC"
    },
    {
      name: "Abebe Tadesse",
      position: "Engineering Manager",
      company: "Welabu Construction",
      testimonial: "We've been using Shinning Paint products for years, and they never disappoint. The consistency in quality, competitive pricing, and responsive support team make them our preferred partner.",
      rating: 5,
      avatar: "WC"
    }
  ];

  // Auto-scroll testimonials
  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isPaused, testimonials.length]);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-800 dark:to-purple-800 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 animate-[fadeIn_1s_ease-in]">
              About <span className="bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">Shinning Paint</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-100 max-w-3xl mx-auto leading-relaxed">
              "We paint safety and quality on the road" - Leading manufacturer of premium road marking paints
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Introduction */}
        <section className="mb-16">
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-xl border border-gray-200/50 dark:border-gray-700/50">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">About Us</h2>
            <div className="space-y-4 text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              <p>
                Shining Paints manufacturing PLC is a leading manufacturer and supplier of premium hot-melt thermoplastic road marking paints based in Addis Ababa, Ethiopia. Since our establishment, we have been dedicated to improving road safety and infrastructure visibility across Ethiopia and the wider East African region through high-performance, durable, and environmentally conscious coating solutions.
              </p>
              <p>
                We specialize in thermoplastic road marking materials used for highways, urban roads, airports, parking lots, and industrial zones, complying with international standards and tailored to withstand Ethiopia’s diverse climatic conditions.
              </p>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Vision Card */}
            <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-500/15 via-purple-400/10 to-purple-300/5 dark:from-purple-500/20 dark:via-purple-400/15 dark:to-purple-300/10 backdrop-blur-xl border border-purple-400/30 dark:border-purple-400/40 p-8 shadow-xl hover:shadow-2xl transition-all duration-700 hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-400/10 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-purple-500/50">
                  <Lightbulb className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Our Vision</h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  To be the most trusted and innovative provider of road safety solutions in Africa, contributing to safer roads and sustainable infrastructure development.
                </p>
              </div>
            </div>

            {/* Mission Card */}
            <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-500/15 via-blue-400/10 to-blue-300/5 dark:from-blue-500/20 dark:via-blue-400/15 dark:to-blue-300/10 backdrop-blur-xl border border-blue-400/30 dark:border-blue-400/40 p-8 shadow-xl hover:shadow-2xl transition-all duration-700 hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-500/50">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Our Mission</h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  To deliver high-quality, durable thermoplastic paints that enhance road visibility and safety, while supporting local employment, skill development, and environmental sustainability.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Core Products & Services */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Core Products & Services</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">Comprehensive road safety solutions</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-gray-700 hover:border-blue-500 transition-colors">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-xl flex items-center justify-center mb-6">
                <Palette className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Thermoplastic Paints</h4>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400 text-sm">
                <li className="flex items-center gap-2">✅ High retro-reflectivity & skid resistance</li>
                <li className="flex items-center gap-2">✅ Fast-drying & weather-resistant</li>
                <li className="flex items-center gap-2">✅ Available in white, yellow, and custom colors</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-gray-700 hover:border-purple-500 transition-colors">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-xl flex items-center justify-center mb-6">
                <Star className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Glass Beads</h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Pre-mix & Inlaid Glass Beads for enhanced night visibility and retro-reflection across all road types.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-gray-700 hover:border-cyan-500 transition-colors">
              <div className="w-12 h-12 bg-cyan-100 dark:bg-cyan-900 rounded-xl flex items-center justify-center mb-6">
                <Users className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Application Services</h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Professional road marking application with trained teams, technical support, and high-precision equipment.
              </p>
            </div>
          </div>
        </section>

        {/* Why Choose Shining Paints? */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Why Choose Shining Paints?</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">What sets us apart in the East African market</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
                <Award className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <h4 className="font-bold text-gray-900 dark:text-white mb-1">Local Manufacturing</h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Faster delivery, cost-effective, and adapted to local conditions.</p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
              <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <h4 className="font-bold text-gray-900 dark:text-white mb-1">Quality Assurance</h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Our products meet ASTM, EN, and Ethiopian Road Authority standards.</p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
              <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <h4 className="font-bold text-gray-900 dark:text-white mb-1">Durability</h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Resistant to heavy traffic, rain, and UV exposure.</p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
              <div className="w-10 h-10 bg-cyan-100 dark:bg-cyan-900 rounded-lg flex items-center justify-center mb-4">
                <Lightbulb className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
              </div>
              <h4 className="font-bold text-gray-900 dark:text-white mb-1">Eco-Friendly</h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Low VOC emissions, lead-free formulations for environmental safety.</p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
              <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-5 h-5 text-orange-600 dark:text-orange-400" />
              </div>
              <h4 className="font-bold text-gray-900 dark:text-white mb-1">Experienced Team</h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Skilled technicians and engineers with sector-specific expertise.</p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
              <div className="w-10 h-10 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center mb-4">
                <Globe className="w-5 h-5 text-red-600 dark:text-red-400" />
              </div>
              <h4 className="font-bold text-gray-900 dark:text-white mb-1">National Reach</h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Serving clients throughout Ethiopia, including government & private projects.</p>
            </div>
          </div>
        </section>

        {/* Projects & clientele */}
        <section className="mb-16">
          <div className="bg-gradient-to-br from-blue-900 to-indigo-950 rounded-3xl p-8 md:p-12 text-white shadow-2xl">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-bold mb-6">Projects & Clientele</h2>
              <p className="text-blue-100 mb-8 text-lg">We have successfully supplied materials and services for high-impact infrastructure projects across the nation.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 bg-white/10 p-4 rounded-xl backdrop-blur-sm">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span>Regional highway marking projects</span>
                </div>
                <div className="flex items-center gap-3 bg-white/10 p-4 rounded-xl backdrop-blur-sm">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span>Addis Ababa city road safety upgrades</span>
                </div>
                <div className="flex items-center gap-3 bg-white/10 p-4 rounded-xl backdrop-blur-sm">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span>Industrial zone and airport markings</span>
                </div>
                <div className="flex items-center gap-3 bg-white/10 p-4 rounded-xl backdrop-blur-sm">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span>Partnerships with major contractors</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Client Testimonials Carousel */}
        <section className="mb-16">
          <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-xl border border-gray-200/50 dark:border-gray-700/50">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">What Our Clients Say</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">Trusted by leading construction and engineering firms</p>
            </div>

            <div
              className="relative max-w-4xl mx-auto"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              {/* Testimonial Card */}
              <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 md:p-12 shadow-xl transform transition-all duration-500">
                <div className="absolute top-8 left-8 text-blue-200 dark:text-blue-900 opacity-50">
                  <Quote className="w-16 h-16" />
                </div>

                <div className="relative z-10">
                  <div className="flex justify-center mb-6">
                    {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                      <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                    ))}
                  </div>

                  <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 text-center mb-8 italic leading-relaxed">
                    "{testimonials[currentTestimonial].testimonial}"
                  </p>

                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4 shadow-lg">
                      {testimonials[currentTestimonial].avatar}
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                      {testimonials[currentTestimonial].name}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {testimonials[currentTestimonial].position}
                    </p>
                    <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 mt-1">
                      {testimonials[currentTestimonial].company}
                    </p>
                  </div>
                </div>
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={prevTestimonial}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 w-12 h-12 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-blue-600 hover:text-white transition-all duration-300 z-20"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextTestimonial}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 w-12 h-12 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-blue-600 hover:text-white transition-all duration-300 z-20"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </section>

        {/* Commitment to Ethiopia */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 md:p-12 shadow-2xl text-white">
            <h2 className="text-3xl font-bold mb-8 text-center">Commitment to Ethiopia</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="space-y-4">
                <p className="text-lg">As an Ethiopian-registered company, we are committed to:</p>
                <ul className="space-y-4 text-blue-100">
                  <li className="flex items-start gap-3">
                    <span className="font-bold text-yellow-400">01.</span>
                    <span>Creating local jobs and specialized training programs for Ethiopian youth.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="font-bold text-yellow-400">02.</span>
                    <span>Supporting national road safety initiatives and providing technical expertise.</span>
                  </li>
                </ul>
              </div>
              <div className="space-y-4">
                <ul className="space-y-4 text-blue-100 mt-11">
                  <li className="flex items-start gap-3">
                    <span className="font-bold text-yellow-400">03.</span>
                    <span>Promoting sustainable and safe infrastructure throughout the region.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="font-bold text-yellow-400">04.</span>
                    <span>Ensuring timely delivery and reliable after-sales support for government projects.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Strip */}
        <section className="mb-16">
          <div className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-3xl p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Shining Paints PLC</h3>
            <div className="flex flex-wrap justify-center gap-8 text-gray-600 dark:text-gray-400 mb-6">
              <span className="flex items-center gap-2">📍 Addis Ababa, Ethiopia (Huajian Industry Park)</span>
              <span className="flex items-center gap-2">📞 +251 963 877 777</span>
              <span className="flex items-center gap-2">📧 420884970@qq.com</span>
            </div>
            <p className="text-blue-600 dark:text-blue-400 font-serif italic text-xl">
              *Making Roads Safer, One Line at a Time.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
