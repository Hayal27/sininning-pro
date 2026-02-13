import React, { useState, useEffect } from 'react';
import { apiService } from '../services/api';
import { PlusIcon, PencilIcon, TrashIcon, XMarkIcon, BriefcaseIcon, UserGroupIcon, DocumentTextIcon, EyeIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

interface CareerItem {
    id: number;
    title: string;
    department: string;
    location: string;
    type: string;
    description: string;
    requirements: string;
    application_start_date?: string;
    application_deadline?: string;
    is_active: boolean;
    posted_at: string;
}

interface ApplicationItem {
    id: number;
    career_id: number;
    job_title: string;
    name: string;
    email: string;
    phone: string;
    cover_letter: string;
    cv_path: string;
    applied_at: string;
}

const ManageCareers: React.FC = () => {
    const [careers, setCareers] = useState<CareerItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingItem, setEditingItem] = useState<CareerItem | null>(null);
    const [applications, setApplications] = useState<ApplicationItem[]>([]);
    const [activeTab, setActiveTab] = useState<'jobs' | 'applications'>('jobs');
    const [selectedApplication, setSelectedApplication] = useState<ApplicationItem | null>(null);
    const [showApplicationModal, setShowApplicationModal] = useState(false);

    // Filtering states
    const [appSearch, setAppSearch] = useState('');
    const [appJobFilter, setAppJobFilter] = useState('');

    const [formData, setFormData] = useState({
        title: '',
        department: 'General',
        location: 'Addis Ababa',
        type: 'full-time',
        description: '',
        requirements: '',
        application_start_date: '',
        application_deadline: '',
        is_active: true
    });

    useEffect(() => {
        if (activeTab === 'jobs') {
            fetchCareers();
        } else {
            fetchApplications();
        }
    }, [activeTab]);

    const fetchApplications = async () => {
        try {
            setLoading(true);
            const response: any = await apiService.get('/careers/applications');
            if (response && response.success) {
                setApplications(response.data);
            }
        } catch (error) {
            console.error('Failed to fetch applications', error);
        } finally {
            setLoading(false);
        }
    };

    const handleViewApplication = (app: ApplicationItem) => {
        setSelectedApplication(app);
        setShowApplicationModal(true);
    };

    const closeApplicationModal = () => {
        setShowApplicationModal(false);
        setSelectedApplication(null);
    };

    const getUniqueJobTitles = () => {
        const titles = new Set(applications.map(app => app.job_title));
        return Array.from(titles);
    };

    const filteredApplications = applications.filter(app => {
        const matchesSearch =
            app.name.toLowerCase().includes(appSearch.toLowerCase()) ||
            app.email.toLowerCase().includes(appSearch.toLowerCase());
        const matchesJob = appJobFilter ? app.job_title === appJobFilter : true;

        return matchesSearch && matchesJob;
    });

    const fetchCareers = async () => {
        try {
            setLoading(true);
            // Add cache busting timestamp
            const response: any = await apiService.get('/careers/admin', { _t: new Date().getTime() });
            if (response && response.success) {
                setCareers(response.data);
            }
        } catch (error) {
            console.error('Failed to fetch careers', error);
        } finally {
            setLoading(false);
        }
    };

    const handleOpenModal = (item?: CareerItem) => {
        if (item) {
            setEditingItem(item);
            setFormData({
                title: item.title,
                department: item.department,
                location: item.location,
                type: item.type,
                description: item.description,
                requirements: item.requirements || '',
                application_start_date: item.application_start_date ? new Date(item.application_start_date).toISOString().split('T')[0] : '',
                application_deadline: item.application_deadline ? new Date(item.application_deadline).toISOString().split('T')[0] : '',
                is_active: item.is_active
            });
        } else {
            setEditingItem(null);
            setFormData({
                title: '',
                department: 'General',
                location: 'Addis Ababa',
                type: 'full-time',
                description: '',
                requirements: '',
                application_start_date: '',
                application_deadline: '',
                is_active: true
            });
        }
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setEditingItem(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // Clean payload: Convert empty strings to null for dates
            const payload = {
                ...formData,
                application_start_date: formData.application_start_date || null,
                application_deadline: formData.application_deadline || null
            };

            // Debugging: Alert the user to what's being sent. This validates if the form captured the input.
            alert(`Sending Job Data:\nTitle: ${payload.title}\nDeadline: ${payload.application_deadline || 'None'}`);
            console.log('Submitting payload:', payload);

            if (editingItem) {
                await apiService.put(`/careers/${editingItem.id}`, payload);
            } else {
                await apiService.post('/careers', payload);
            }
            handleCloseModal();
            fetchCareers();
        } catch (error) {
            console.error('Failed to save job', error);
            alert('Failed to save job posting');
        }
    };

    // ... (inside render)



    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this job posting?')) return;
        try {
            await apiService.delete(`/careers/${id}`);
            fetchCareers();
        } catch (error) {
            console.error('Failed to delete job', error);
        }
    };

    if (loading) return <div className="p-8 text-center">Loading...</div>;

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">Careers</h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-2 text-lg">Manage job openings and applications</p>
                </div>
                {activeTab === 'jobs' && (
                    <button
                        onClick={() => handleOpenModal()}
                        className="flex items-center px-6 py-3 bg-gradient-to-r from-teal-600 to-emerald-600 text-white rounded-xl hover:from-teal-700 hover:to-emerald-700 transition-all shadow-lg hover:shadow-2xl hover:scale-105 font-semibold"
                    >
                        <PlusIcon className="h-5 w-5 mr-2" />
                        Post Job
                    </button>
                )}
            </div>

            {/* Tabs */}
            <div className="flex space-x-4 border-b border-gray-200 dark:border-gray-700">
                <button
                    onClick={() => setActiveTab('jobs')}
                    className={`py-3 px-6 font-medium text-sm transition-all relative ${activeTab === 'jobs'
                        ? 'text-teal-600 border-b-2 border-teal-600'
                        : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                        }`}
                >
                    <div className="flex items-center gap-2">
                        <BriefcaseIcon className="w-5 h-5" />
                        Job Postings
                    </div>
                </button>
                <button
                    onClick={() => setActiveTab('applications')}
                    className={`py-3 px-6 font-medium text-sm transition-all relative ${activeTab === 'applications'
                        ? 'text-teal-600 border-b-2 border-teal-600'
                        : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                        }`}
                >
                    <div className="flex items-center gap-2">
                        <UserGroupIcon className="w-5 h-5" />
                        Applications
                    </div>
                </button>
            </div>

            {activeTab === 'jobs' ? (
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gradient-to-r from-teal-50 to-emerald-50 dark:from-teal-900/20 dark:to-emerald-900/20">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Title</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Department</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Type</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Deadline</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                            {careers.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center">
                                            <BriefcaseIcon className="h-5 w-5 text-gray-400 mr-2" />
                                            <span className="text-sm font-medium text-gray-900 dark:text-white">{item.title}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{item.department}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 capitalize">{item.type.replace('-', ' ')}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                        {item.application_deadline ? new Date(item.application_deadline).toLocaleDateString() : '-'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${item.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                            }`}>
                                            {item.is_active ? 'Active' : 'Closed'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button onClick={() => handleOpenModal(item)} className="text-indigo-600 hover:text-indigo-900 mr-4">
                                            <PencilIcon className="h-5 w-5" />
                                        </button>
                                        <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-900">
                                            <TrashIcon className="h-5 w-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="space-y-4">
                    {/* Filters */}
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 flex flex-col md:flex-row gap-4">
                        <div className="relative flex-1">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search by name or email..."
                                value={appSearch}
                                onChange={(e) => setAppSearch(e.target.value)}
                                className="pl-10 block w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-teal-500 focus:border-teal-500 sm:text-sm py-2"
                            />
                        </div>
                        <div className="w-full md:w-64">
                            <select
                                value={appJobFilter}
                                onChange={(e) => setAppJobFilter(e.target.value)}
                                className="block w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-teal-500 focus:border-teal-500 sm:text-sm py-2"
                            >
                                <option value="">All Jobs</option>
                                {getUniqueJobTitles().map((title, idx) => (
                                    <option key={idx} value={title}>{title}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="bg-gradient-to-r from-teal-50 to-emerald-50 dark:from-teal-900/20 dark:to-emerald-900/20">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Applicant</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Job Applied For</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Contact</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Applied Date</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                {filteredApplications.length > 0 ? filteredApplications.map((app) => (
                                    <tr key={app.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <span className="text-sm font-medium text-gray-900 dark:text-white">{app.name}</span>
                                                {app.cover_letter && (
                                                    <span className="text-xs text-gray-500 truncate max-w-xs">{app.cover_letter.substring(0, 50)}...</span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                            {app.job_title}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex flex-col text-sm text-gray-500 dark:text-gray-400">
                                                <span>{app.email}</span>
                                                <span>{app.phone}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                            {new Date(app.applied_at).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <div className="flex items-center justify-end space-x-3">
                                                <button
                                                    onClick={() => handleViewApplication(app)}
                                                    className="text-teal-600 hover:text-teal-900 flex items-center gap-1"
                                                    title="View Details"
                                                >
                                                    <EyeIcon className="h-5 w-5" />
                                                </button>
                                                <a
                                                    href={`${import.meta.env.VITE_API_URL.replace(/\/api$/, '')}/uploads/cvs/${app.cv_path}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-indigo-600 hover:text-indigo-900 flex items-center gap-1"
                                                    title="Download CV"
                                                >
                                                    <DocumentTextIcon className="h-5 w-5" />
                                                </a>
                                            </div>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                                            No applications found matching your criteria.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Application Detail Modal */}
            {showApplicationModal && selectedApplication && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4">
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-2xl overflow-hidden max-h-[90vh] flex flex-col">
                        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                                Application Details
                            </h3>
                            <button onClick={closeApplicationModal} className="text-gray-500 hover:text-gray-700">
                                <XMarkIcon className="h-6 w-6" />
                            </button>
                        </div>
                        <div className="p-6 overflow-y-auto space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Applicant</h4>
                                    <p className="text-lg font-semibold text-gray-900 dark:text-white">{selectedApplication.name}</p>
                                </div>
                                <div>
                                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Applying For</h4>
                                    <p className="text-lg font-semibold text-gray-900 dark:text-white">{selectedApplication.job_title}</p>
                                </div>
                                <div>
                                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Email</h4>
                                    <p className="text-gray-700 dark:text-gray-300">{selectedApplication.email}</p>
                                </div>
                                <div>
                                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Phone</h4>
                                    <p className="text-gray-700 dark:text-gray-300">{selectedApplication.phone || 'N/A'}</p>
                                </div>
                                <div>
                                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Applied Date</h4>
                                    <p className="text-gray-700 dark:text-gray-300">{new Date(selectedApplication.applied_at).toLocaleString()}</p>
                                </div>
                            </div>

                            <div>
                                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Cover Letter</h4>
                                <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                                    <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                                        {selectedApplication.cover_letter || 'No cover letter provided.'}
                                    </p>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-end">
                                <a
                                    href={`${import.meta.env.VITE_API_URL.replace(/\/api$/, '')}/uploads/cvs/${selectedApplication.cv_path}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
                                >
                                    <DocumentTextIcon className="h-5 w-5 mr-2" />
                                    Download CV
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4">
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-3xl overflow-hidden max-h-[90vh] flex flex-col">
                        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                                {editingItem ? 'Edit Job Posting' : 'Post New Job'}
                            </h3>
                            <button onClick={handleCloseModal} className="text-gray-500 hover:text-gray-700">
                                <XMarkIcon className="h-6 w-6" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Job Title</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Department</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.department}
                                        onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Location</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.location}
                                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Type</label>
                                    <select
                                        value={formData.type}
                                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="full-time">Full-time</option>
                                        <option value="part-time">Part-time</option>
                                        <option value="contract">Contract</option>
                                        <option value="internship">Internship</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Application Start Date</label>
                                    <input
                                        type="date"
                                        value={formData.application_start_date || ''}
                                        onChange={(e) => {
                                            console.log('Start Date Changed:', e.target.value);
                                            setFormData({ ...formData, application_start_date: e.target.value });
                                        }}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">When applications open</p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Application Deadline</label>
                                    <input
                                        type="date"
                                        value={formData.application_deadline || ''}
                                        onChange={(e) => {
                                            console.log('Deadline Changed:', e.target.value);
                                            setFormData({ ...formData, application_deadline: e.target.value });
                                        }}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">Last day to apply</p>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                                <textarea
                                    required
                                    rows={4}
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Requirements</label>
                                <textarea
                                    rows={4}
                                    value={formData.requirements}
                                    onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500"
                                    placeholder="Bullet points or new lines..."
                                />
                            </div>

                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="is_active"
                                    checked={formData.is_active}
                                    onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <label htmlFor="is_active" className="ml-2 block text-sm text-gray-900 dark:text-white">
                                    Job posting is active
                                </label>
                            </div>

                            <div className="flex justify-end pt-4">
                                <button
                                    type="button"
                                    onClick={handleCloseModal}
                                    className="mr-3 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                >
                                    Save Job
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageCareers;
