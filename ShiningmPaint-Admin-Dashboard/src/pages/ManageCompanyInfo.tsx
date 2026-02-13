import React, { useState, useEffect } from 'react';
import {
    MapPin, Phone, Mail, Clock, Save,
    RotateCcw, Globe, Facebook, Twitter,
    Linkedin, Instagram, Headphones, DollarSign,
    Building2, CheckCircle2, AlertCircle, Plus,
    Trash2, Edit, Check, X, Star
} from 'lucide-react';
import { settingsService } from '../services/settings';
import { officesService, type Office } from '../services/offices';

const ManageCompanyInfo = () => {
    // Basic Settings
    const [settings, setSettings] = useState<Record<string, string>>({});
    const [offices, setOffices] = useState<Office[]>([]);

    // UI State
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
    const [showOfficeModal, setShowOfficeModal] = useState(false);
    const [editingOffice, setEditingOffice] = useState<Office | null>(null);

    // Office Form State
    const [officeForm, setOfficeForm] = useState<Office>({
        name: '',
        address: '',
        phone: '',
        email: '',
        hours_mon_fri: '8:00 AM - 6:00 PM',
        hours_sat: '9:00 AM - 4:00 PM',
        hours_sun: 'Closed',
        is_primary: false
    });

    useEffect(() => {
        fetchAllData();
    }, []);

    const fetchAllData = async () => {
        try {
            setLoading(true);
            const [settingsRes, officesRes] = await Promise.all([
                settingsService.getSettings(),
                officesService.getOffices()
            ]);

            if (settingsRes.success) setSettings(settingsRes.data);
            if (officesRes.success) setOffices(officesRes.data);
        } catch (error) {
            console.error('Failed to fetch data:', error);
            setMessage({ type: 'error', text: 'Failed to load information.' });
        } finally {
            setLoading(false);
        }
    };

    const handleSettingChange = (key: string, value: string) => {
        setSettings(prev => ({ ...prev, [key]: value }));
    };

    const handleSettingsSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setSaving(true);
            const response = await settingsService.updateSettings(settings);
            if (response.success) {
                setMessage({ type: 'success', text: 'Social links and department details updated!' });
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'Failed to save settings.' });
        } finally {
            setSaving(false);
        }
    };

    const openOfficeModal = (office?: Office) => {
        if (office) {
            setEditingOffice(office);
            setOfficeForm(office);
        } else {
            setEditingOffice(null);
            setOfficeForm({
                name: '',
                address: '',
                phone: '',
                email: '',
                hours_mon_fri: '8:00 AM - 6:00 PM',
                hours_sat: '9:00 AM - 4:00 PM',
                hours_sun: 'Closed',
                is_primary: offices.length === 0
            });
        }
        setShowOfficeModal(true);
    };

    const handleOfficeSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setSaving(true);
            let response;
            if (editingOffice?.id) {
                response = await officesService.updateOffice(editingOffice.id, officeForm);
            } else {
                response = await officesService.createOffice(officeForm);
            }

            if (response.success) {
                setMessage({ type: 'success', text: `Office ${editingOffice ? 'updated' : 'added'} successfully!` });
                setShowOfficeModal(false);
                const res = await officesService.getOffices();
                if (res.success) setOffices(res.data);
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'Failed to save office details.' });
        } finally {
            setSaving(false);
        }
    };

    const handleDeleteOffice = async (id: number) => {
        if (!window.confirm('Are you sure you want to delete this contact/branch?')) return;
        try {
            const response = await officesService.deleteOffice(id);
            if (response.success) {
                setOffices(offices.filter(o => o.id !== id));
                setMessage({ type: 'success', text: 'Office removed successfully.' });
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'Failed to delete office.' });
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="space-y-8 max-w-6xl mx-auto pb-20">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">Company Presence</h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-2 text-lg">
                        Manage your branches, contact details, and social ecosystem
                    </p>
                </div>
            </div>

            {message && (
                <div className={`p-4 rounded-2xl flex items-center space-x-3 border shadow-sm animate-in fade-in slide-in-from-top-4 ${message.type === 'success'
                        ? 'bg-green-50 dark:bg-green-900/10 text-green-700 dark:text-green-400 border-green-100 dark:border-green-800'
                        : 'bg-red-50 dark:bg-red-900/10 text-red-700 dark:text-red-400 border-red-100 dark:border-red-800'
                    }`}>
                    {message.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                    <span className="font-semibold">{message.text}</span>
                    <button onClick={() => setMessage(null)} className="ml-auto text-current opacity-50 hover:opacity-100"><X className="w-4 h-4" /></button>
                </div>
            )}

            {/* Offices Section */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-xl overflow-hidden">
                <div className="p-8 border-b border-gray-50 dark:border-gray-700 flex justify-between items-center bg-gray-50/30 dark:bg-gray-800/30">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                            <MapPin className="w-6 h-6" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Branches & Contact Points</h2>
                            <p className="text-sm text-gray-500">You can add multiple offices, stores, or branches here</p>
                        </div>
                    </div>
                    <button
                        onClick={() => openOfficeModal()}
                        className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold transition-all shadow-lg hover:shadow-blue-500/40 transform hover:-translate-y-0.5 active:translate-y-0"
                    >
                        <Plus className="w-5 h-5" /> Add New Branch
                    </button>
                </div>

                <div className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                        {offices.map(office => (
                            <div key={office.id} className={`group relative p-6 rounded-3xl border-2 transition-all duration-300 hover:shadow-2xl ${office.is_primary
                                    ? 'border-blue-500 bg-blue-50/30 dark:bg-blue-900/10'
                                    : 'border-gray-100 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700'
                                }`}>
                                {office.is_primary && (
                                    <div className="absolute -top-3 left-6 px-3 py-1 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg">
                                        Primary HQ
                                    </div>
                                )}

                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">{office.name}</h3>
                                    <div className="flex gap-2">
                                        <button onClick={() => openOfficeModal(office)} className="p-2 hover:bg-blue-100 dark:hover:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl transition-colors">
                                            <Edit className="w-5 h-5" />
                                        </button>
                                        <button onClick={() => office.id && handleDeleteOffice(office.id)} className="p-2 hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 rounded-xl transition-colors">
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-400">
                                        <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                                        <span>{office.address}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                                        <Phone className="w-4 h-4 text-gray-400" />
                                        <span>{office.phone}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                                        <Mail className="w-4 h-4 text-gray-400" />
                                        <span>{office.email}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Social & Departments - Compact version */}
            <form onSubmit={handleSettingsSubmit} className="space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Social Media */}
                    <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-xl">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 rounded-xl flex items-center justify-center">
                                <Globe className="w-6 h-6" />
                            </div>
                            <h2 className="text-xl font-bold dark:text-white">Social Ecosystem</h2>
                        </div>
                        <div className="space-y-5">
                            <div className="relative">
                                <Facebook className="absolute left-4 top-3.5 w-5 h-5 text-blue-600" />
                                <input
                                    type="url"
                                    value={settings.social_facebook || ''}
                                    onChange={(e) => handleSettingChange('social_facebook', e.target.value)}
                                    placeholder="Facebook URL"
                                    className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 dark:text-white transition-all"
                                />
                            </div>
                            <div className="relative">
                                <Linkedin className="absolute left-4 top-3.5 w-5 h-5 text-sky-700" />
                                <input
                                    type="url"
                                    value={settings.social_linkedin || ''}
                                    onChange={(e) => handleSettingChange('social_linkedin', e.target.value)}
                                    placeholder="LinkedIn URL"
                                    className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 dark:text-white transition-all"
                                />
                            </div>
                            <div className="relative">
                                <Instagram className="absolute left-4 top-3.5 w-5 h-5 text-pink-500" />
                                <input
                                    type="url"
                                    value={settings.social_instagram || ''}
                                    onChange={(e) => handleSettingChange('social_instagram', e.target.value)}
                                    placeholder="Instagram URL"
                                    className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 dark:text-white transition-all"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Department Specifics */}
                    <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-xl">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 text-purple-600 rounded-xl flex items-center justify-center">
                                <Headphones className="w-6 h-6" />
                            </div>
                            <h2 className="text-xl font-bold dark:text-white">Department Channels</h2>
                        </div>
                        <div className="space-y-6">
                            <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-700">
                                <label className="text-xs font-black text-gray-400 uppercase tracking-widest block mb-3">Sales Department</label>
                                <div className="grid grid-cols-1 gap-3">
                                    <input
                                        type="email"
                                        value={settings.contact_sales_email || ''}
                                        onChange={(e) => handleSettingChange('contact_sales_email', e.target.value)}
                                        placeholder="Sales Email"
                                        className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl outline-none text-sm dark:text-white"
                                    />
                                </div>
                            </div>
                            <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-700">
                                <label className="text-xs font-black text-gray-400 uppercase tracking-widest block mb-3">Technical Support</label>
                                <div className="grid grid-cols-1 gap-3">
                                    <input
                                        type="email"
                                        value={settings.contact_tech_email || ''}
                                        onChange={(e) => handleSettingChange('contact_tech_email', e.target.value)}
                                        placeholder="Tech Email"
                                        className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl outline-none text-sm dark:text-white"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end pt-4">
                    <button
                        type="submit"
                        disabled={saving}
                        className="flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-black shadow-xl shadow-blue-500/20 transform hover:-translate-y-1 transition-all disabled:opacity-50 active:scale-95"
                    >
                        {saving ? <div className="animate-spin rounded-full h-5 w-5 border-2 border-white/30 border-t-white"></div> : <Save className="w-5 h-5" />}
                        {saving ? 'Processing...' : 'Save Social & Departments'}
                    </button>
                </div>
            </form>

            {/* Office Modal */}
            {showOfficeModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in transition-all">
                    <div className="bg-white dark:bg-gray-800 w-full max-w-2xl rounded-[40px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
                        <div className="p-8 border-b border-gray-50 dark:border-gray-700 flex justify-between items-center bg-gray-50/50 dark:bg-gray-800/50">
                            <h2 className="text-2xl font-black text-gray-900 dark:text-white">
                                {editingOffice ? 'Edit Branch Info' : 'Add New Branch'}
                            </h2>
                            <button onClick={() => setShowOfficeModal(false)} className="p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-2xl transition-colors">
                                <X className="w-6 h-6 text-gray-400" />
                            </button>
                        </div>

                        <form onSubmit={handleOfficeSubmit} className="p-8 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-600 dark:text-gray-400">Branch Name</label>
                                    <input
                                        required
                                        type="text"
                                        value={officeForm.name}
                                        onChange={(e) => setOfficeForm({ ...officeForm, name: e.target.value })}
                                        className="w-full px-5 py-3 bg-gray-50 dark:bg-gray-900 border-2 border-gray-100 dark:border-gray-700 rounded-2xl focus:border-blue-500 outline-none dark:text-white transition-all"
                                        placeholder="e.g. Sales Branch"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-600 dark:text-gray-400">Email Address</label>
                                    <input
                                        type="email"
                                        value={officeForm.email}
                                        onChange={(e) => setOfficeForm({ ...officeForm, email: e.target.value })}
                                        className="w-full px-5 py-3 bg-gray-50 dark:bg-gray-900 border-2 border-gray-100 dark:border-gray-700 rounded-2xl focus:border-blue-500 outline-none dark:text-white transition-all"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-600 dark:text-gray-400">Phone Number</label>
                                    <input
                                        type="text"
                                        value={officeForm.phone}
                                        onChange={(e) => setOfficeForm({ ...officeForm, phone: e.target.value })}
                                        className="w-full px-5 py-3 bg-gray-50 dark:bg-gray-900 border-2 border-gray-100 dark:border-gray-700 rounded-2xl focus:border-blue-500 outline-none dark:text-white transition-all"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-600 dark:text-gray-400">Primary Headquarters?</label>
                                    <button
                                        type="button"
                                        onClick={() => setOfficeForm({ ...officeForm, is_primary: !officeForm.is_primary })}
                                        className={`w-full py-3 rounded-2xl border-2 flex items-center justify-center gap-2 font-bold transition-all ${officeForm.is_primary
                                                ? 'bg-blue-600 border-blue-600 text-white shadow-lg'
                                                : 'border-gray-100 dark:border-gray-700 text-gray-400'
                                            }`}
                                    >
                                        <Star className={`w-4 h-4 ${officeForm.is_primary ? 'fill-current' : ''}`} />
                                        {officeForm.is_primary ? 'Primary Office' : 'Normal Branch'}
                                    </button>
                                </div>
                                <div className="md:col-span-2 space-y-2">
                                    <label className="text-sm font-bold text-gray-600 dark:text-gray-400">Full Address</label>
                                    <textarea
                                        required
                                        rows={2}
                                        value={officeForm.address}
                                        onChange={(e) => setOfficeForm({ ...officeForm, address: e.target.value })}
                                        className="w-full px-5 py-3 bg-gray-50 dark:bg-gray-900 border-2 border-gray-100 dark:border-gray-700 rounded-2xl focus:border-blue-500 outline-none dark:text-white transition-all resize-none"
                                    />
                                </div>
                            </div>

                            <div className="flex gap-4 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setShowOfficeModal(false)}
                                    className="flex-1 py-4 text-sm font-black text-gray-500 hover:text-gray-600 transition-all uppercase tracking-widest"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="flex-[2] py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-3xl font-black shadow-xl shadow-blue-500/20 transform hover:-translate-y-1 transition-all active:scale-95 flex items-center justify-center gap-2 uppercase tracking-widest text-sm"
                                >
                                    {saving ? <div className="animate-spin rounded-full h-4 w-4 border-2 border-white/30 border-t-white"></div> : <Check className="w-5 h-5" />}
                                    {editingOffice ? 'Update Details' : 'Save Branch'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageCompanyInfo;
