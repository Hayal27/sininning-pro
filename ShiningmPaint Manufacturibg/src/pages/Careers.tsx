import React, { useState, useEffect } from 'react';
import { apiService, API_BASE_URL } from '../services/api';
import axios from 'axios';
import { Briefcase, MapPin, Clock, ChevronDown, ChevronUp, X, Upload, Calendar } from 'lucide-react';

interface Career {
    id: number;
    title: string;
    department: string;
    location: string;
    type: string;
    description: string;
    requirements: string;
    posted_at: string;
    application_start_date?: string;
    application_deadline?: string;
}

const Careers = () => {
    const [careers, setCareers] = useState<Career[]>([]);
    const [loading, setLoading] = useState(true);
    const [expandedJob, setExpandedJob] = useState<number | null>(null);

    // Filter & Pagination State
    const [search, setSearch] = useState('');
    const [department, setDepartment] = useState('');
    const [location, setLocation] = useState('');
    const [type, setType] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalItems, setTotalItems] = useState(0);

    const departments = ['General', 'Engineering', 'Sales', 'Marketing', 'HR', 'Finance', 'Operations', 'Product', 'Customer Support', 'Design'];
    const locations = ['Addis Ababa', 'Remote', 'On-site', 'Hybrid'];
    const types = ['full-time', 'part-time', 'contract', 'internship'];

    // Application Modal State
    const [applyModalOpen, setApplyModalOpen] = useState(false);
    const [selectedJob, setSelectedJob] = useState<Career | null>(null);
    const [applicationData, setApplicationData] = useState<{
        name: string;
        email: string;
        phone: string;
        coverLetter: string;
        cv: File | null;
    }>({
        name: '',
        email: '',
        phone: '',
        coverLetter: '',
        cv: null
    });
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        fetchCareers();
    }, [page, department, location, type]); // Fetch when these change

    // Debounce search
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setPage(1); // Reset to page 1 on new search
            fetchCareers();
        }, 500);
        return () => clearTimeout(timeoutId);
    }, [search]);

    const fetchCareers = async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams();
            if (search) params.append('search', search);
            if (department) params.append('department', department);
            if (location) params.append('location', location);
            if (type) params.append('type', type);
            params.append('page', page.toString());
            params.append('limit', '6');
            params.append('_t', new Date().getTime().toString());

            // Use string interpolation to build the URL properly with the query string
            const response: any = await apiService.get(`/careers?${params.toString()}`);

            if (response && response.success) {
                setCareers(response.data);
                if (response.pagination) {
                    setTotalPages(response.pagination.pages);
                    setTotalItems(response.pagination.total);
                }
            }
        } catch (error) {
            console.error('Failed to fetch careers', error);
        } finally {
            setLoading(false);
        }
    };

    const handleFilterChange = (setter: React.Dispatch<React.SetStateAction<string>>, value: string) => {
        setter(value);
        setPage(1); // Reset to page 1 on filter change
    };

    const clearFilters = () => {
        setSearch('');
        setDepartment('');
        setLocation('');
        setType('');
        setPage(1);
    };

    const toggleJob = (id: number) => {
        if (expandedJob === id) {
            setExpandedJob(null);
        } else {
            setExpandedJob(id);
        }
    };

    const handleApplyClick = (e: React.MouseEvent, job: Career) => {
        e.stopPropagation(); // Prevent toggling accordion
        setSelectedJob(job);
        setApplyModalOpen(true);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setApplicationData({ ...applicationData, cv: e.target.files[0] });
        }
    };

    const submitApplication = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!applicationData.cv) return alert('Please upload your CV');

        setSubmitting(true);
        const formData = new FormData();
        formData.append('name', applicationData.name);
        formData.append('email', applicationData.email);
        formData.append('phone', applicationData.phone);
        formData.append('coverLetter', applicationData.coverLetter);
        formData.append('jobId', selectedJob!.id.toString());
        formData.append('jobTitle', selectedJob!.title);
        formData.append('cv', applicationData.cv);

        try {
            // Use direct axios call to ensure FormData headers are set correctly (with boundary)
            await axios.post(`${API_BASE_URL}/careers/apply`, formData);
            alert('Application submitted successfully! We will contact you soon.');
            setApplyModalOpen(false);
            setApplicationData({ name: '', email: '', phone: '', coverLetter: '', cv: null });
        } catch (error: any) {
            console.error('Application submission error:', error);
            const errorMessage = error.response?.data?.message || error.message || 'Failed to submit application.';
            alert(`Error: ${errorMessage}`);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Header */}
            <div className="pt-32 pb-20 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-center text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
                <div className="max-w-7xl mx-auto px-4 relative z-10">
                    <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">Join Our Team</h1>
                    <p className="text-blue-100 max-w-2xl mx-auto text-lg md:text-xl font-light">Build your career with  ShinningPaint. We are always looking for talented individuals to join our growing family.</p>
                </div>
            </div>

            {/* Filters Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 border border-gray-100 dark:border-gray-700">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {/* Search */}
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search jobs..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                            />
                            <div className="absolute left-3 top-3.5 text-gray-400">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                        </div>

                        {/* Department */}
                        <div className="relative">
                            <select
                                value={department}
                                onChange={(e) => handleFilterChange(setDepartment, e.target.value)}
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none appearance-none cursor-pointer"
                            >
                                <option value="">All Departments</option>
                                {departments.map(dept => <option key={dept} value={dept}>{dept}</option>)}
                            </select>
                            <ChevronDown className="absolute right-3 top-3.5 h-5 w-5 text-gray-400 pointer-events-none" />
                        </div>

                        {/* Type */}
                        <div className="relative">
                            <select
                                value={type}
                                onChange={(e) => handleFilterChange(setType, e.target.value)}
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none appearance-none cursor-pointer"
                            >
                                <option value="">All Types</option>
                                {types.map(t => (
                                    <option key={t} value={t}>{t.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</option>
                                ))}
                            </select>
                            <ChevronDown className="absolute right-3 top-3.5 h-5 w-5 text-gray-400 pointer-events-none" />
                        </div>

                        {/* Location */}
                        <div className="relative">
                            <select
                                value={location}
                                onChange={(e) => handleFilterChange(setLocation, e.target.value)}
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none appearance-none cursor-pointer"
                            >
                                <option value="">All Locations</option>
                                {locations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
                            </select>
                            <ChevronDown className="absolute right-3 top-3.5 h-5 w-5 text-gray-400 pointer-events-none" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Results Count */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-gray-600 dark:text-gray-400 font-medium">
                        Showing {careers.length} of {totalItems} positions
                    </h2>
                    {(search || department || type || location) && (
                        <button
                            onClick={clearFilters}
                            className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1"
                        >
                            <X className="w-4 h-4" /> Clear Filters
                        </button>
                    )}
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {careers.map(job => (
                            <div key={job.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700 group">
                                <div
                                    className="p-6 cursor-pointer flex flex-col md:flex-row justify-between items-start gap-4"
                                    onClick={() => toggleJob(job.id)}
                                >
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">{job.title}</h3>
                                        </div>

                                        <div className="flex flex-wrap gap-y-2 gap-x-6 text-sm text-gray-600 dark:text-gray-400 mt-3">
                                            <span className="flex items-center gap-1.5 bg-gray-50 dark:bg-gray-700/50 px-3 py-1 rounded-full">
                                                <Briefcase className="w-4 h-4 text-blue-500" /> {job.department}
                                            </span>
                                            <span className="flex items-center gap-1.5 bg-gray-50 dark:bg-gray-700/50 px-3 py-1 rounded-full">
                                                <MapPin className="w-4 h-4 text-red-500" /> {job.location}
                                            </span>
                                            <span className="flex items-center gap-1.5 bg-gray-50 dark:bg-gray-700/50 px-3 py-1 rounded-full">
                                                <Clock className="w-4 h-4 text-green-500" /> {job.type.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                            </span>
                                            {job.application_deadline && (
                                                <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full border ${new Date(job.application_deadline) < new Date() ? 'border-red-100 bg-red-50 text-red-600 dark:bg-red-900/20 dark:border-red-800' : 'border-orange-100 bg-orange-50 text-orange-600 dark:bg-orange-900/20 dark:border-orange-800'}`}>
                                                    <Calendar className="w-4 h-4" />
                                                    {new Date(job.application_deadline) < new Date() ? 'Closed' : `Deadline: ${new Date(job.application_deadline).toLocaleDateString()}`}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="text-gray-400 self-center md:self-start mt-2 md:mt-0">
                                        {expandedJob === job.id ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
                                    </div>
                                </div>

                                {expandedJob === job.id && (
                                    <div className="px-6 pb-8 pt-2 border-t border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50">
                                        <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
                                            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 mt-6 flex items-center gap-2">
                                                Description
                                            </h4>
                                            <p className="whitespace-pre-line mb-6 text-gray-600 dark:text-gray-300 leading-relaxed">{job.description}</p>

                                            {job.requirements && (
                                                <>
                                                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                                                        Requirements
                                                    </h4>
                                                    <p className="whitespace-pre-line mb-8 text-gray-600 dark:text-gray-300 leading-relaxed">{job.requirements}</p>
                                                </>
                                            )}

                                            <div className="bg-white dark:bg-gray-700 rounded-xl p-5 mb-8 border border-gray-100 dark:border-gray-600 shadow-sm flex flex-wrap gap-8">
                                                {job.application_start_date && (
                                                    <div>
                                                        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1">Applications Open</span>
                                                        <span className="font-medium text-gray-900 dark:text-white flex items-center gap-2">
                                                            <Calendar className="w-4 h-4 text-blue-500" />
                                                            {new Date(job.application_start_date).toLocaleDateString()}
                                                        </span>
                                                    </div>
                                                )}
                                                {job.application_deadline && (
                                                    <div>
                                                        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1">Deadline</span>
                                                        <span className={`font-medium flex items-center gap-2 ${new Date(job.application_deadline) < new Date() ? 'text-red-500' : 'text-gray-900 dark:text-white'}`}>
                                                            <Calendar className="w-4 h-4 text-red-500" />
                                                            {new Date(job.application_deadline).toLocaleDateString()}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>

                                            <div className="flex justify-start">
                                                <button
                                                    onClick={(e) => handleApplyClick(e, job)}
                                                    disabled={job.application_deadline ? new Date(job.application_deadline) < new Date() : false}
                                                    className={`px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-lg transition-all shadow-md hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none ${job.application_deadline && new Date(job.application_deadline) < new Date() ? 'from-gray-400 to-gray-500 hover:from-gray-400 hover:to-gray-500' : ''}`}
                                                >
                                                    {job.application_deadline && new Date(job.application_deadline) < new Date() ? 'Applications Closed' : 'Apply For This Position'}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
                {!loading && careers.length === 0 && (
                    <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                        <div className="bg-gray-50 dark:bg-gray-700 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Briefcase className="w-10 h-10 text-gray-400" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No jobs found</h3>
                        <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">We couldn't find any positions matching your search. Try broadening your filters or check back later.</p>
                        <button
                            onClick={clearFilters}
                            className="mt-6 px-6 py-2 bg-blue-50 text-blue-600 rounded-lg font-medium hover:bg-blue-100 transition-colors"
                        >
                            Clear Filters
                        </button>
                    </div>
                )}

                {/* Pagination */}
                {!loading && totalPages > 1 && (
                    <div className="mt-12 flex justify-center items-center gap-2">
                        <button
                            onClick={() => setPage(p => Math.max(1, p - 1))}
                            disabled={page === 1}
                            className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            <ChevronDown className="w-5 h-5 rotate-90 text-gray-600 dark:text-gray-400" />
                        </button>

                        <div className="flex gap-1">
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                                <button
                                    key={p}
                                    onClick={() => setPage(p)}
                                    className={`w-10 h-10 rounded-lg font-medium transition-colors ${page === p
                                        ? 'bg-blue-600 text-white shadow-md'
                                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                                        }`}
                                >
                                    {p}
                                </button>
                            ))}
                        </div>

                        <button
                            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                            disabled={page === totalPages}
                            className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            <ChevronDown className="w-5 h-5 -rotate-90 text-gray-600 dark:text-gray-400" />
                        </button>
                    </div>
                )}
            </div>

            {/* Application Modal */}
            {applyModalOpen && selectedJob && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-slide-up">
                        <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-800/50">
                            <div>
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Apply for {selectedJob.title}</h3>
                                <p className="text-sm text-gray-500">{selectedJob.location}</p>
                            </div>
                            <button onClick={() => setApplyModalOpen(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <form onSubmit={submitApplication} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                    value={applicationData.name}
                                    onChange={(e) => setApplicationData({ ...applicationData, name: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
                                <input
                                    type="email"
                                    required
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                    value={applicationData.email}
                                    onChange={(e) => setApplicationData({ ...applicationData, email: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone Number</label>
                                <input
                                    type="tel"
                                    required
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                    value={applicationData.phone}
                                    onChange={(e) => setApplicationData({ ...applicationData, phone: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Cover Letter</label>
                                <textarea
                                    rows={4}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none"
                                    placeholder="Tell us why you're a great fit..."
                                    value={applicationData.coverLetter}
                                    onChange={(e) => setApplicationData({ ...applicationData, coverLetter: e.target.value })}
                                ></textarea>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Upload CV (PDF/Word)</label>
                                <div className="relative border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 text-center hover:border-blue-500 transition-colors cursor-pointer group">
                                    <input
                                        type="file"
                                        accept=".pdf,.doc,.docx"
                                        required
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                        onChange={handleFileChange}
                                    />
                                    <div className="flex flex-col items-center justify-center text-gray-500 dark:text-gray-400 group-hover:text-blue-500">
                                        <Upload className="w-8 h-8 mb-2" />
                                        <span className="text-sm font-medium">
                                            {applicationData.cv ? applicationData.cv.name : 'Click to Upload CV'}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={submitting}
                                className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-70 disabled:cursor-not-allowed mt-4"
                            >
                                {submitting ? 'Submitting...' : 'Submit Application'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Careers;
