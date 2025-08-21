import type { FC } from 'react';
import { Card } from '../components/ui';

const Manufacturing: FC = () => {
  return (
    <div className="min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Manufacturing Excellence
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            State-of-the-art facilities and advanced processes ensure consistent quality and innovation
          </p>
        </div>

        {/* Manufacturing Capabilities */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Capabilities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <div className="h-48 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg mb-4"></div>
              <h3 className="text-xl font-semibold mb-2">Automated Production Lines</h3>
              <p className="text-gray-600 mb-4">
                Fully automated mixing and packaging systems ensure consistent quality and efficiency.
              </p>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>• 24/7 production capability</li>
                <li>• Precision mixing systems</li>
                <li>• Quality monitoring</li>
              </ul>
            </Card>
            
            <Card>
              <div className="h-48 bg-gradient-to-br from-green-400 to-green-600 rounded-lg mb-4"></div>
              <h3 className="text-xl font-semibold mb-2">Quality Control Laboratory</h3>
              <p className="text-gray-600 mb-4">
                Advanced testing facilities with state-of-the-art analytical equipment.
              </p>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>• Spectroscopy analysis</li>
                <li>• Performance testing</li>
                <li>• Environmental compliance</li>
              </ul>
            </Card>
            
            <Card>
              <div className="h-48 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg mb-4"></div>
              <h3 className="text-xl font-semibold mb-2">Custom Formulation</h3>
              <p className="text-gray-600 mb-4">
                Dedicated R&D facilities for developing custom solutions and new products.
              </p>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>• Custom color matching</li>
                <li>• Specialized formulations</li>
                <li>• Rapid prototyping</li>
              </ul>
            </Card>
          </div>
        </section>

        {/* Production Statistics */}
        <section className="mb-16">
          <Card padding="lg" className="bg-gray-50">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Production Statistics</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-blue-600 mb-2">50,000+</div>
                <div className="text-gray-600">Gallons per Day</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-blue-600 mb-2">99.8%</div>
                <div className="text-gray-600">Quality Rate</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-blue-600 mb-2">24/7</div>
                <div className="text-gray-600">Production Hours</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-blue-600 mb-2">500+</div>
                <div className="text-gray-600">Product Variants</div>
              </div>
            </div>
          </Card>
        </section>

        {/* Quality Assurance */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Quality Assurance</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <h3 className="text-xl font-semibold mb-4">Testing Procedures</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Raw material inspection and testing
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  In-process quality monitoring
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Final product performance testing
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Batch tracking and documentation
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Customer feedback integration
                </li>
              </ul>
            </Card>
            
            <Card>
              <h3 className="text-xl font-semibold mb-4">Certifications</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  ISO 9001:2015 Quality Management
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  ISO 14001:2015 Environmental Management
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  OHSAS 18001 Health & Safety
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  EPA Environmental Compliance
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Green Building Council Certified
                </li>
              </ul>
            </Card>
          </div>
        </section>

        {/* Sustainability */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Sustainability Initiatives</h2>
          <Card padding="lg">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">♻️</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Waste Reduction</h3>
                <p className="text-gray-600 text-sm">
                  95% waste recycling rate with zero landfill policy
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">💧</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Water Conservation</h3>
                <p className="text-gray-600 text-sm">
                  Closed-loop water systems reducing consumption by 60%
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">⚡</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Clean Energy</h3>
                <p className="text-gray-600 text-sm">
                  50% renewable energy with solar panel installations
                </p>
              </div>
            </div>
          </Card>
        </section>

        {/* Facility Tour CTA */}
        <section>
          <Card padding="lg" className="bg-blue-50 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Visit Our Facilities
            </h2>
            <p className="text-xl text-gray-600 mb-6">
              Schedule a tour to see our manufacturing excellence in action
            </p>
            <a
              href="mailto:tours@Shinningpaint.com"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Schedule a Tour
            </a>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default Manufacturing;
