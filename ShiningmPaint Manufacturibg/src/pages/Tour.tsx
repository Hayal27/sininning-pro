import type { FC } from 'react';
import { useState } from 'react';
import { Calendar, Clock, Users, MapPin, Phone, Mail, CheckCircle, Factory, Shield, Award } from 'lucide-react';
import { Button, Card } from '../components/ui';
import { COMPANY_INFO } from '../utils/constants';
import { contactService } from '../services/contact';

const Tour: FC = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [groupSize, setGroupSize] = useState('');
  const [contactInfo, setContactInfo] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const availableTimes = [
    '9:00 AM', '10:00 AM', '11:00 AM', 
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'
  ];

  const tourHighlights = [
    {
      icon: Factory,
      title: 'Production Facilities',
      description: 'See our state-of-the-art manufacturing equipment and quality control processes'
    },
    {
      icon: Shield,
      title: 'Quality Testing Lab',
      description: 'Witness our rigorous testing procedures that ensure product excellence'
    },
    {
      icon: Award,
      title: 'Innovation Center',
      description: 'Explore our R&D facilities where new formulations are developed'
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const tourRequest = {
        ...contactInfo,
        subject: 'Factory Tour Request',
        message: `Tour Request Details:
        
Date: ${selectedDate}
Time: ${selectedTime}
Group Size: ${groupSize}
Company: ${contactInfo.company}

Additional Message:
${contactInfo.message}`,
        inquiry_type: 'general' as const
      };

      const response = await contactService.submitContactForm(tourRequest);
      
      if (response.success) {
        setSubmitStatus({
          type: 'success',
          message: 'Tour request submitted successfully! We will contact you within 24 hours to confirm your visit.'
        });
        
        // Reset form
        setSelectedDate('');
        setSelectedTime('');
        setGroupSize('');
        setContactInfo({
          name: '',
          email: '',
          phone: '',
          company: '',
          message: ''
        });
      } else {
        throw new Error(response.message || 'Failed to submit tour request');
      }
    } catch (error: any) {
      setSubmitStatus({
        type: 'error',
        message: error.message || 'Failed to submit tour request. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Factory Tour Experience
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get an exclusive behind-the-scenes look at our manufacturing processes and see how we create world-class paints and coatings
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Tour Information */}
          <div>
            <Card className="mb-8" padding="lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">What You'll Experience</h2>
              <div className="space-y-6">
                {tourHighlights.map((highlight, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <highlight.icon className="w-6 h-6 text-blue-600" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {highlight.title}
                      </h3>
                      <p className="text-gray-600">
                        {highlight.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card padding="lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Tour Details</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-600">Duration: 90 minutes</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Users className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-600">Group size: 1-20 people</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-600">{COMPANY_INFO.address}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-600">Safety equipment provided</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-600">Refreshments included</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Booking Form */}
          <div>
            <Card padding="lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Book Your Tour</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Date Selection */}
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Date *
                  </label>
                  <input
                    type="date"
                    id="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Time Selection */}
                <div>
                  <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Time *
                  </label>
                  <select
                    id="time"
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select a time</option>
                    {availableTimes.map((time) => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                </div>

                {/* Group Size */}
                <div>
                  <label htmlFor="groupSize" className="block text-sm font-medium text-gray-700 mb-2">
                    Group Size *
                  </label>
                  <select
                    id="groupSize"
                    value={groupSize}
                    onChange={(e) => setGroupSize(e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select group size</option>
                    <option value="1-5">1-5 people</option>
                    <option value="6-10">6-10 people</option>
                    <option value="11-15">11-15 people</option>
                    <option value="16-20">16-20 people</option>
                  </select>
                </div>

                {/* Contact Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={contactInfo.name}
                      onChange={(e) => setContactInfo(prev => ({ ...prev, name: e.target.value }))}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={contactInfo.email}
                      onChange={(e) => setContactInfo(prev => ({ ...prev, email: e.target.value }))}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      value={contactInfo.phone}
                      onChange={(e) => setContactInfo(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                      Company/Organization
                    </label>
                    <input
                      type="text"
                      id="company"
                      value={contactInfo.company}
                      onChange={(e) => setContactInfo(prev => ({ ...prev, company: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Special Requests or Questions
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    value={contactInfo.message}
                    onChange={(e) => setContactInfo(prev => ({ ...prev, message: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Any specific areas of interest or special requirements..."
                  />
                </div>

                {/* Status Messages */}
                {submitStatus.type && (
                  <div className={`p-4 rounded-md flex items-center space-x-2 ${
                    submitStatus.type === 'success' 
                      ? 'bg-green-50 text-green-800 border border-green-200' 
                      : 'bg-red-50 text-red-800 border border-red-200'
                  }`}>
                    {submitStatus.type === 'success' ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      <Mail className="w-5 h-5" />
                    )}
                    <span>{submitStatus.message}</span>
                  </div>
                )}

                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Submitting Request...
                    </>
                  ) : (
                    <>
                      <Calendar className="w-4 h-4 mr-2" />
                      Request Tour
                    </>
                  )}
                </Button>
              </form>
            </Card>

            {/* Contact Info */}
            <Card className="mt-6" padding="lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Questions?</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-600">{COMPANY_INFO.phone}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-600">{COMPANY_INFO.email}</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tour;
