import type { FC } from 'react';
import { Card } from '../components/ui';
import { COMPANY_INFO } from '../utils/constants';

const About: FC = () => {
  return (
    <div className="min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About {COMPANY_INFO.name}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {COMPANY_INFO.description}
          </p>
        </div>

        {/* Company Story */}
        <section className="mb-16">
          <Card padding="lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 mb-4">
                Founded in {COMPANY_INFO.founded}, {COMPANY_INFO.name} has been at the forefront of paint and coating innovation for over {new Date().getFullYear() - COMPANY_INFO.founded} years. What started as a small manufacturing operation has grown into a leading provider of high-quality paints and coatings for diverse industries.
              </p>
              <p className="text-gray-600 mb-4">
                Our journey began with a simple mission: to create superior coating solutions that protect, beautify, and enhance the world around us. Through decades of research, development, and customer collaboration, we have built a reputation for excellence that spans across industrial, commercial, and residential markets.
              </p>
              <p className="text-gray-600">
                Today, with our headquarters in {COMPANY_INFO.headquarters} and a team of over {COMPANY_INFO.employees} dedicated professionals, we continue to push the boundaries of what's possible in paint and coating technology.
              </p>
            </div>
          </Card>
        </section>

        {/* Mission, Vision, Values */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-600">
                To provide innovative, high-quality paint and coating solutions that exceed customer expectations while maintaining environmental responsibility and sustainable practices.
              </p>
            </Card>
            
            <Card>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-gray-600">
                To be the global leader in paint and coating technology, recognized for our innovation, quality, and commitment to creating a more colorful and protected world.
              </p>
            </Card>
            
            <Card>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Values</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Excellence in everything we do</li>
                <li>• Innovation and continuous improvement</li>
                <li>• Environmental stewardship</li>
                <li>• Customer-centric approach</li>
                <li>• Integrity and transparency</li>
              </ul>
            </Card>
          </div>
        </section>

        {/* Leadership Team */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Leadership Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="text-center">
              <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold mb-2">John Smith</h3>
              <p className="text-blue-600 mb-2">Chief Executive Officer</p>
              <p className="text-gray-600 text-sm">
                25+ years of experience in the paint and coatings industry, leading strategic growth and innovation initiatives.
              </p>
            </Card>
            
            <Card className="text-center">
              <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold mb-2">Sarah Johnson</h3>
              <p className="text-blue-600 mb-2">Chief Technology Officer</p>
              <p className="text-gray-600 text-sm">
                Expert in chemical engineering with a focus on sustainable coating technologies and product development.
              </p>
            </Card>
            
            <Card className="text-center">
              <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold mb-2">Michael Brown</h3>
              <p className="text-blue-600 mb-2">Chief Operations Officer</p>
              <p className="text-gray-600 text-sm">
                Oversees manufacturing operations and quality assurance with a commitment to operational excellence.
              </p>
            </Card>
          </div>
        </section>

        {/* Certifications and Awards */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Certifications & Awards</h2>
          <Card>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Certifications</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• ISO 9001:2015 Quality Management</li>
                  <li>• ISO 14001:2015 Environmental Management</li>
                  <li>• OHSAS 18001 Occupational Health & Safety</li>
                  <li>• Green Building Council Certified</li>
                  <li>• EPA Compliance Certified</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">Awards</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Industry Excellence Award 2023</li>
                  <li>• Innovation in Sustainability 2022</li>
                  <li>• Best Manufacturing Practices 2021</li>
                  <li>• Customer Choice Award 2020</li>
                  <li>• Environmental Leadership Award 2019</li>
                </ul>
              </div>
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default About;
