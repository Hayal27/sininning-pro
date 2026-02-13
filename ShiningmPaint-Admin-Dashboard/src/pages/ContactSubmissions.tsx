import { useState, useEffect } from 'react';
import type { FC } from 'react';
import { Search, Filter, Mail, Phone, Building, Calendar, User, MessageSquare, CheckCircle, Clock, AlertCircle, XCircle } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { API_BASE_URL } from '../services/api';

interface ContactSubmission {
    id: number;
    name: string;
    email: string;
    company?: string;
    phone?: string;
    subject: string;
    message: string;
    inquiry_type: 'general' | 'technical' | 'sales' | 'support';
    status: 'new' | 'in_progress' | 'resolved' | 'closed';
    priority: 'low' | 'medium' | 'high';
    assigned_to?: number;
    assigned_first_name?: string;
    assigned_last_name?: string;
    notes?: string;
    ip_address?: string;
    created_at: string;
    updated_at: string;
    resolved_at?: string;
}

const ContactSubmissions: FC = () => {
    const { token } = useAuthStore();
    const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('');
    const [inquiryTypeFilter, setInquiryTypeFilter] = useState<string>('');
    const [selectedSubmission, setSelectedSubmission] = useState<ContactSubmission | null>(null);
    const [showDetailModal, setShowDetailModal] = useState(false);

    useEffect(() => {
        fetchSubmissions();
    }, [statusFilter, inquiryTypeFilter, searchTerm]);

    const fetchSubmissions = async () => {
        try {
            setLoading(true);
            const params = new URLSearchParams();
            if (statusFilter) params.append('status', statusFilter);
            if (inquiryTypeFilter) params.append('inquiry_type', inquiryTypeFilter);
            if (searchTerm) params.append('search', searchTerm);

            const response = await fetch(`${API_BASE_URL}/contact?${params}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const data = await response.json();
            if (data.success) {
                setSubmissions(data.data);
            }
        } catch (error) {
            console.error('Failed to fetch contact submissions:', error);
        } finally {
            setLoading(false);
        }
    };

    const updateSubmissionStatus = async (id: number, status: string) => {
        try {
            const response = await fetch(`${API_BASE_URL}/contact/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ status })
            });

            if (response.ok) {
                fetchSubmissions();
                if (selectedSubmission?.id === id) {
                    setSelectedSubmission({ ...selectedSubmission, status: status as any });
                }
            }
        } catch (error) {
            console.error('Failed to update status:', error);
        }
    };

    const getStatusBadge = (status: string) => {
        const styles = {
            new: 'bg-blue-100 text-blue-800',
            in_progress: 'bg-yellow-100 text-yellow-800',
            resolved: 'bg-green-100 text-green-800',
            closed: 'bg-gray-100 text-gray-800'
        };
        const icons = {
            new: <Mail className="w-4 h-4" />,
            in_progress: <Clock className="w-4 h-4" />,
            resolved: <CheckCircle className="w-4 h-4" />,
            closed: <XCircle className="w-4 h-4" />
        };
        return (
            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${styles[status as keyof typeof styles]}`}>
                {icons[status as keyof typeof icons]}
                {status.replace('_', ' ').toUpperCase()}
            </span>
        );
    };

    const getPriorityBadge = (priority: string) => {
        const styles = {
            low: 'bg-gray-100 text-gray-800',
            medium: 'bg-yellow-100 text-yellow-800',
            high: 'bg-red-100 text-red-800'
        };
        return (
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[priority as keyof typeof styles]}`}>
                {priority.toUpperCase()}
            </span>
        );
    };

    return (
        <div className="space-y-6">
            <div className="mb-6">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-rose-600 to-red-600 bg-clip-text text-transparent">Contact Submissions</h1>
                <p className="text-gray-600 dark:text-gray-400 mt-2 text-lg">Manage and respond to customer inquiries</p>
            </div>

            {/* Filters */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-rose-500 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search by name, email..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-3.5 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 rounded-xl border-2 border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all"
                        />
                    </div>

                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-4 py-3.5 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl border-2 border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all"
                    >
                        <option value="">All Status</option>
                        <option value="new">New</option>
                        <option value="in_progress">In Progress</option>
                        <option value="resolved">Resolved</option>
                        <option value="closed">Closed</option>
                    </select>

                    <select
                        value={inquiryTypeFilter}
                        onChange={(e) => setInquiryTypeFilter(e.target.value)}
                        className="px-4 py-3.5 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl border-2 border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all"
                    >
                        <option value="">All Types</option>
                        <option value="general">General</option>
                        <option value="technical">Technical</option>
                        <option value="sales">Sales</option>
                        <option value="support">Support</option>
                    </select>

                    <button
                        onClick={() => {
                            setSearchTerm('');
                            setStatusFilter('');
                            setInquiryTypeFilter('');
                        }}
                        className="px-4 py-3.5 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 text-gray-700 dark:text-gray-200 rounded-xl hover:from-gray-200 hover:to-gray-300 dark:hover:from-gray-600 dark:hover:to-gray-500 transition-all font-semibold"
                    >
                        Clear Filters
                    </button>
                </div>
            </div>

            {/* Submissions Table */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gradient-to-r from-rose-50 to-red-50 dark:from-rose-900/20 dark:to-red-900/20">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Contact</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Subject</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Type</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Priority</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {loading ? (
                                <tr>
                                    <td colSpan={7} className="px-6 py-12 text-center text-text-secondary">
                                        Loading...
                                    </td>
                                </tr>
                            ) : submissions.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="px-6 py-12 text-center text-text-secondary">
                                        No contact submissions found
                                    </td>
                                </tr>
                            ) : (
                                submissions.map((submission) => (
                                    <tr key={submission.id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                        <td className="px-6 py-4">
                                            <div>
                                                <div className="font-medium text-text-primary">{submission.name}</div>
                                                <div className="text-sm text-text-secondary">{submission.email}</div>
                                                {submission.company && (
                                                    <div className="text-xs text-text-secondary flex items-center gap-1 mt-1">
                                                        <Building className="w-3 h-3" />
                                                        {submission.company}
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-text-primary line-clamp-2">{submission.subject}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="capitalize text-sm text-text-secondary">{submission.inquiry_type}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            {getStatusBadge(submission.status)}
                                        </td>
                                        <td className="px-6 py-4">
                                            {getPriorityBadge(submission.priority)}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-text-secondary">
                                            {new Date(submission.created_at).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4">
                                            <button
                                                onClick={() => {
                                                    setSelectedSubmission(submission);
                                                    setShowDetailModal(true);
                                                }}
                                                className="text-primary-600 hover:text-primary-700 font-medium text-sm"
                                            >
                                                View Details
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Detail Modal */}
            {showDetailModal && selectedSubmission && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-surface rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <div className="flex items-start justify-between mb-6">
                                <div>
                                    <h2 className="text-2xl font-bold text-text-primary mb-2">{selectedSubmission.subject}</h2>
                                    <div className="flex items-center gap-2">
                                        {getStatusBadge(selectedSubmission.status)}
                                        {getPriorityBadge(selectedSubmission.priority)}
                                    </div>
                                </div>
                                <button
                                    onClick={() => setShowDetailModal(false)}
                                    className="text-text-secondary hover:text-text-primary"
                                >
                                    <XCircle className="w-6 h-6" />
                                </button>
                            </div>

                            <div className="space-y-6">
                                {/* Contact Info */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-sm font-medium text-text-secondary">Name</label>
                                        <div className="flex items-center gap-2 mt-1">
                                            <User className="w-4 h-4 text-text-secondary" />
                                            <span className="text-text-primary">{selectedSubmission.name}</span>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-text-secondary">Email</label>
                                        <div className="flex items-center gap-2 mt-1">
                                            <Mail className="w-4 h-4 text-text-secondary" />
                                            <a href={`mailto:${selectedSubmission.email}`} className="text-primary-600 hover:underline">
                                                {selectedSubmission.email}
                                            </a>
                                        </div>
                                    </div>
                                    {selectedSubmission.phone && (
                                        <div>
                                            <label className="text-sm font-medium text-text-secondary">Phone</label>
                                            <div className="flex items-center gap-2 mt-1">
                                                <Phone className="w-4 h-4 text-text-secondary" />
                                                <a href={`tel:${selectedSubmission.phone}`} className="text-primary-600 hover:underline">
                                                    {selectedSubmission.phone}
                                                </a>
                                            </div>
                                        </div>
                                    )}
                                    {selectedSubmission.company && (
                                        <div>
                                            <label className="text-sm font-medium text-text-secondary">Company</label>
                                            <div className="flex items-center gap-2 mt-1">
                                                <Building className="w-4 h-4 text-text-secondary" />
                                                <span className="text-text-primary">{selectedSubmission.company}</span>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Message */}
                                <div>
                                    <label className="text-sm font-medium text-text-secondary flex items-center gap-2 mb-2">
                                        <MessageSquare className="w-4 h-4" />
                                        Message
                                    </label>
                                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 text-text-primary whitespace-pre-wrap">
                                        {selectedSubmission.message}
                                    </div>
                                </div>

                                {/* Status Update */}
                                <div>
                                    <label className="text-sm font-medium text-text-secondary mb-2 block">Update Status</label>
                                    <div className="flex gap-2">
                                        {['new', 'in_progress', 'resolved', 'closed'].map((status) => (
                                            <button
                                                key={status}
                                                onClick={() => updateSubmissionStatus(selectedSubmission.id, status)}
                                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${selectedSubmission.status === status
                                                    ? 'bg-primary-600 text-white'
                                                    : 'bg-gray-100 dark:bg-gray-800 text-text-secondary hover:bg-gray-200'
                                                    }`}
                                            >
                                                {status.replace('_', ' ').toUpperCase()}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Metadata */}
                                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                                    <div>
                                        <label className="text-sm font-medium text-text-secondary">Submitted</label>
                                        <div className="flex items-center gap-2 mt-1 text-text-primary">
                                            <Calendar className="w-4 h-4" />
                                            {new Date(selectedSubmission.created_at).toLocaleString()}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-text-secondary">Inquiry Type</label>
                                        <div className="mt-1 text-text-primary capitalize">{selectedSubmission.inquiry_type}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ContactSubmissions;
