import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import {
  EyeIcon,
  EyeSlashIcon,
  EnvelopeIcon,
  LockClosedIcon,
  ChartBarIcon,
  ShieldCheckIcon,
  GlobeAltIcon,
  ArrowRightIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';
import { useAuthStore } from '../store/authStore';
import { showNotification } from '../store/uiStore';
import { validateForm, validationRules } from '../utils/validation';

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const { login, isAuthenticated, isLoading } = useAuthStore();

  // Redirect if already authenticated
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    const validationErrors = validateForm(formData, {
      email: validationRules.email,
      password: { required: true, message: 'Password is required' },
    });

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await login(formData.email, formData.password);
      showNotification.success('Welcome back!', 'You have been successfully logged in.');
    } catch (error: any) {
      showNotification.error(
        'Login Failed',
        error.response?.data?.message || 'Invalid email or password'
      );
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#f8fafc]">
      {/* Left Panel - Branding & Visuals */}
      <div className="hidden lg:flex lg:w-5/12 relative overflow-hidden bg-[#0f172a]">
        {/* Vibrant Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-700 to-blue-900 opacity-90 z-0"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 z-0 mix-blend-overlay"></div>

        {/* Animated Abstract Shapes */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-1/2 -left-20 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-32 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

        {/* Content */}
        <div className="relative z-10 w-full flex flex-col justify-between p-12 text-white h-full">
          <div>
            <div className="flex items-center space-x-3 mb-10">
              <div className="h-12 w-12  /20 backdrop-blur-lg rounded-xl flex items-center justify-center border border-white/30 shadow-xl">
                <SparklesIcon className="h-7 w-7 text-yellow-300" />
              </div>
              <span className="text-2xl font-bold tracking-tight text-white"> ShinningPaint</span>
            </div>

            <h1 className="text-4xl xl:text-5xl font-extrabold text-white mb-6 leading-tight">
              Crafting Colors <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-pink-300">Defining Excellence.</span>
            </h1>

            <p className="text-lg text-indigo-100 max-w-sm font-light leading-relaxed">
              Experience the next generation of manufacturing management with our powerful, intuitive dashboard.
            </p>
          </div>

          <div className="space-y-6">
            {/* Feature 1 */}
            <div className="flex items-center space-x-4 p-4 rounded-2xl  /10 backdrop-blur-md border border-white/10 transition-transform hover:scale-105 duration-300">
              <div className="p-3 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg shadow-lg">
                <ChartBarIcon className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-white text-lg">Smart Analytics</h3>
                <p className="text-sm text-blue-100">Visualize production data in real-time.</p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex items-center space-x-4 p-4 rounded-2xl  /10 backdrop-blur-md border border-white/10 transition-transform hover:scale-105 duration-300 delay-100">
              <div className="p-3 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-lg shadow-lg">
                <ShieldCheckIcon className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-white text-lg">Secure Access</h3>
                <p className="text-sm text-emerald-100">Enterprise-grade security protocol.</p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex items-center space-x-4 p-4 rounded-2xl  /10 backdrop-blur-md border border-white/10 transition-transform hover:scale-105 duration-300 delay-200">
              <div className="p-3 bg-gradient-to-br from-orange-400 to-pink-500 rounded-lg shadow-lg">
                <GlobeAltIcon className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-white text-lg">Global Reach</h3>
                <p className="text-sm text-pink-100">Connect facilities across the world.</p>
              </div>
            </div>
          </div>

          <div className="text-sm text-indigo-200/60 font-medium">
            ©2025  ShinningPaint Manufacturing •v1.0
          </div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="w-full lg:w-7/12 flex items-center justify-center p-6 sm:p-12 relative bg-[#F3F4F6]">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#4f46e5 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }}></div>

        <div className="w-full max-w-[500px]   shadow-[0_20px_50px_rgba(8,_112,_184,_0.07)] rounded-[2.5rem] p-8 sm:p-12 border border-gray-100 relative overflow-hidden animate-slide-in">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>

          {/* Mobile Header */}
          <div className="lg:hidden text-center mb-8">
            <div className="mx-auto h-14 w-14 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg mb-4 text-white">
              <SparklesIcon className="h-8 w-8" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900"> ShinningPaint</h2>
          </div>

          <div className="text-left mb-10">
            <h2 className="text-4xl font-black text-gray-900 tracking-tight mb-2">Hello Again!</h2>
            <p className="text-lg text-gray-500 font-medium">
              Welcome back to your workspace.
            </p>
          </div>

          <form className="space-y-7" onSubmit={handleSubmit}>
            <div className="space-y-6">
              {/* Email Field */}
              <div className="group">
                <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2 pl-1">
                  Email Address
                </label>
                <div className="relative transform transition-all duration-200 group-hover:-translate-y-1">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <EnvelopeIcon className="h-6 w-6 text-indigo-400 group-focus-within:text-indigo-600 transition-colors" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className={`block w-full pl-12 pr-4 py-4 bg-gray-50 border-2 ${errors.email ? 'border-red-300 bg-red-50/30' : 'border-gray-100 group-hover:border-indigo-200'
                      } rounded-2xl text-gray-900 placeholder-gray-400 font-medium focus:outline-none focus:border-indigo-500 focus:  focus:ring-4 focus:ring-indigo-500/10 transition-all duration-200`}
                    placeholder="john@ Shinningpaint.com"
                  />
                  {/* Decorative status indicator */}
                  {!errors.email && formData.email.length > 5 && (
                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center text-emerald-500 animate-fade-in">
                      <ShieldCheckIcon className="h-5 w-5" />
                    </div>
                  )}
                </div>
                {errors.email && (
                  <p className="mt-2 text-sm text-red-600 font-medium flex items-center animate-fade-in pl-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-600 mr-2"></span>
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div className="group">
                <div className="flex items-center justify-between mb-2 pl-1">
                  <label htmlFor="password" className="block text-sm font-bold text-gray-700">
                    Password
                  </label>
                  <a href="#" className="text-sm font-bold text-indigo-600 hover:text-indigo-700 hover:underline">
                    Forgot password?
                  </a>
                </div>
                <div className="relative transform transition-all duration-200 group-hover:-translate-y-1">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <LockClosedIcon className="h-6 w-6 text-indigo-400 group-focus-within:text-indigo-600 transition-colors" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className={`block w-full pl-12 pr-12 py-4 bg-gray-50 border-2 ${errors.password ? 'border-red-300 bg-red-50/30' : 'border-gray-100 group-hover:border-indigo-200'
                      } rounded-2xl text-gray-900 placeholder-gray-400 font-medium focus:outline-none focus:border-indigo-500 focus:  focus:ring-4 focus:ring-indigo-500/10 transition-all duration-200`}
                    placeholder="••••••••••••"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-4 flex items-center hover:text-indigo-600 text-gray-400 transition-colors cursor-pointer focus:outline-none"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeSlashIcon className="h-6 w-6" />
                    ) : (
                      <EyeIcon className="h-6 w-6" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-2 text-sm text-red-600 font-medium flex items-center animate-fade-in pl-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-600 mr-2"></span>
                    {errors.password}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center pl-1">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded-md cursor-pointer transition-colors"
              />
              <label htmlFor="remember-me" className="ml-3 block text-sm font-medium text-gray-600 cursor-pointer select-none">
                Keep me logged in
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="group w-full flex justify-center items-center py-4 px-6 border border-transparent rounded-2xl shadow-xl shadow-indigo-600/20 text-base font-bold text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 hover:bg-gradient-to-br focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-70 disabled:cursor-not-allowed transform transition-all duration-200 hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-600/30 active:scale-[0.99]"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Authenticating...
                </div>
              ) : (
                <>
                  Sign In to Dashboard
                  <ArrowRightIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform font-bold" />
                </>
              )}
            </button>

            <div className="mt-8 pt-6 text-center border-t border-gray-100">

            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
