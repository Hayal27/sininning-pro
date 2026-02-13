import React, { useState, useEffect } from 'react';
import { heroService } from '../services/hero';
import { API_BASE_URL } from '../services/api';
import type { HeroSection } from '../types';
import { PhotoIcon, XMarkIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-hot-toast';

const ManageHero: React.FC = () => {
    const [heroData, setHeroData] = useState<HeroSection | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    // Diagnostic log
    useEffect(() => {
        console.log("%c>>> HERO MANAGEMENT VERSION 2.1 LOADED <<<", "color: green; font-weight: bold; font-size: 14px;");
    }, []);

    // Form State
    const [formData, setFormData] = useState({
        title: '',
        subtitle: '',
        cta_primary_text: 'Explore Products',
        cta_primary_link: '/products',
        cta_secondary_text: 'Get Quote',
        cta_secondary_link: '/contact',
        is_active: true
    });

    // Image Management State
    const [existingImages, setExistingImages] = useState<string[]>([]);
    const [newFiles, setNewFiles] = useState<File[]>([]);
    // To track removed existing images if we were to support removing specific ones without re-uploading all.
    // However, for simplicity and since Hero usually has a specific set, we might manage a list.
    // Let's support adding/removing from the list.

    useEffect(() => {
        fetchHero();
    }, []);

    const fetchHero = async () => {
        try {
            setLoading(true);
            const data = await heroService.getHero();
            if (data) {
                setHeroData(data);
                setFormData({
                    title: data.title || '',
                    subtitle: data.subtitle || '',
                    cta_primary_text: data.cta_primary_text || 'Explore Products',
                    cta_primary_link: data.cta_primary_link || '/products',
                    cta_secondary_text: data.cta_secondary_text || 'Get Quote',
                    cta_secondary_link: data.cta_secondary_link || '/contact',
                    is_active: data.is_active ?? true
                });

                // Handle images: data.images might be JSON string or array depending on how backend sends it
                let images: string[] = [];
                if (Array.isArray(data.images)) {
                    images = data.images;
                } else if (typeof data.images === 'string') {
                    try {
                        images = JSON.parse(data.images);
                    } catch (e) {
                        try {
                            // Sometime it might be double stringified or just a string path?
                            // If it's not valid JSON, assume it's empty or handle accordingly.
                            console.warn("Could not parse images JSON", e);
                        } catch { }
                    }
                }
                setExistingImages(images);
            }
        } catch (error) {
            console.error('Failed to fetch hero data', error);
            toast.error('Failed to load hero section data');
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setFormData(prev => ({ ...prev, [name]: checked }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            setNewFiles(prev => [...prev, ...files]);
        }
    };

    const removeNewFile = (index: number) => {
        setNewFiles(prev => prev.filter((_, i) => i !== index));
    };

    const removeExistingImage = (imagePath: string) => {
        setExistingImages(prev => prev.filter(img => img !== imagePath));
    };

    const getImageUrl = (imagePath: string) => {
        if (!imagePath) return '';

        // Handle legacy hardcoded localhost URLs in database
        if (imagePath.includes('localhost:5000')) {
            imagePath = imagePath.split('/uploads/')[1];
            imagePath = `uploads/${imagePath}`;
        }

        if (imagePath.startsWith('http')) return imagePath;

        // Backend uploads (usually start with uploads/ or /uploads/)
        const baseUrl = API_BASE_URL.replace(/\/api$/, '');

        // Check for frontend static assets
        if (imagePath.startsWith('/images/')) {
            return `${window.location.origin}${imagePath}`;
        }

        const normalizedPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
        // Add cache buster to force browser to re-fetch images
        return `${baseUrl}${normalizedPath}?t=${new Date().getTime()}`;
    };

    const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>, path: string) => {
        console.error(`Failed to load image: ${path}`, e);
        // Add a red border to the image on error
        (e.target as HTMLImageElement).style.border = '2px solid red';
    };



    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setSaving(true);

            // 1. Upload new files first
            const uploadedImageUrls: string[] = [];
            for (const file of newFiles) {
                try {
                    const url = await heroService.uploadHeroImage(file);
                    if (url) {
                        // Backend usually returns relative path like "uploads/..." or full URL
                        // We store what backend gives us, usually relative path or absolute URL
                        uploadedImageUrls.push(url);
                    }
                } catch (uploadError) {
                    console.error('Failed to upload image', file.name, uploadError);
                    toast.error(`Failed to upload ${file.name}`);
                    setSaving(false);
                    return;
                }
            }

            // 2. Combine existing and new images
            const allImages = [...existingImages, ...uploadedImageUrls];

            // 3. Update Hero Section Data
            // We need the ID. If no hero data existed (which shouldn't happen due to migration), we might fail.
            // But we fetched heroData. If it's null, we might be creating or backend has issues.
            // Assuming we have an ID or our migration ensured one Record exists (ID 1 usually).
            const heroId = heroData?.id || 1;

            const updatePayload = {
                ...formData,
                images: allImages // Backend expects array, will JSON.stringify it there or here? 
                // Controller expects "images" field. 
                // If controller uses JSON.stringify(images), we send array.
            };

            await heroService.updateHero(heroId, updatePayload);

            toast.success('Hero section updated successfully');
            setNewFiles([]); // Clear uploaded files queue
            fetchHero(); // Refresh data

        } catch (error) {
            console.error('Failed to update hero', error);
            toast.error('Failed to save changes');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex h-full items-center justify-center p-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Hero Section Management
                        <span className="ml-3 px-2 py-0.5 text-xs bg-green-100 text-green-700 rounded-full font-medium">Version: 2.0 - STABLE</span>
                    </h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Customize the main landing section of your website
                    </p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 shadow-sm rounded-xl border border-gray-100 dark:border-gray-700 p-6 space-y-8">

                {/* Text Content */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 border-b pb-2 border-gray-200 dark:border-gray-700">
                        Content
                    </h3>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Headline Title
                            </label>
                            <input
                                type="text"
                                name="title"
                                required
                                value={formData.title}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 transition-colors"
                                placeholder="e.g. We Paint quality on the road"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Subtitle / Description
                            </label>
                            <textarea
                                name="subtitle"
                                rows={3}
                                required
                                value={formData.subtitle}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 transition-colors"
                                placeholder="e.g. Leading manufacturer of premium road marking paints..."
                            />
                        </div>
                    </div>
                </div>

                {/* Call to Actions */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 border-b pb-2 border-gray-200 dark:border-gray-700">
                        Call to Action Buttons
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                            <h4 className="font-medium text-sm text-blue-600 dark:text-blue-400">Primary Button</h4>
                            <div>
                                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Text</label>
                                <input
                                    type="text"
                                    name="cta_primary_text"
                                    value={formData.cta_primary_text}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Link URL</label>
                                <input
                                    type="text"
                                    name="cta_primary_link"
                                    value={formData.cta_primary_link}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white text-sm"
                                />
                            </div>
                        </div>

                        <div className="space-y-3">
                            <h4 className="font-medium text-sm text-gray-600 dark:text-gray-400">Secondary Button</h4>
                            <div>
                                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Text</label>
                                <input
                                    type="text"
                                    name="cta_secondary_text"
                                    value={formData.cta_secondary_text}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Link URL</label>
                                <input
                                    type="text"
                                    name="cta_secondary_link"
                                    value={formData.cta_secondary_link}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white text-sm"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Images */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 border-b pb-2 border-gray-200 dark:border-gray-700">
                        Background Images (Slider)
                    </h3>

                    {/* Existing Images List */}
                    {existingImages.length > 0 && (
                        <div className="space-y-2">
                            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Active Images</p>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                {existingImages.map((img, idx) => (
                                    <div key={idx} className="relative group aspect-video rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm bg-gray-100 dark:bg-gray-800">
                                        <img
                                            src={getImageUrl(img)}
                                            alt={`Hero slide ${idx + 1}`}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            style={{ minHeight: '150px', display: 'block' }}
                                            onError={(e) => {
                                                console.error('Image load failed for:', getImageUrl(img));
                                                (e.target as HTMLImageElement).src = `https://placehold.co/800x450/1e40af/ffffff?text=Load+Error+${idx + 1}`;
                                            }}
                                        />
                                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all flex items-center justify-center space-x-2">
                                            <button
                                                type="button"
                                                onClick={() => window.open(getImageUrl(img), '_blank')}
                                                className="bg-blue-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all shadow-lg hover:bg-blue-700"
                                                title="Open original"
                                            >
                                                <PhotoIcon className="h-5 w-5" />
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => removeExistingImage(img)}
                                                className="bg-red-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all shadow-lg hover:bg-red-700"
                                                title="Remove image"
                                            >
                                                <XMarkIcon className="h-5 w-5" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* New Uploads Preview */}
                    {newFiles.length > 0 && (
                        <div className="space-y-2">
                            <p className="text-sm font-medium text-blue-600 dark:text-blue-400">New Uploads (Pending Save)</p>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                {newFiles.map((file, idx) => (
                                    <div key={idx} className="relative group aspect-video rounded-lg overflow-hidden border-2 border-blue-200 dark:border-blue-800 shadow-sm bg-blue-50 dark:bg-blue-900/10">
                                        <img
                                            src={URL.createObjectURL(file)}
                                            alt={`New upload ${idx + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all flex items-center justify-center">
                                            <button
                                                type="button"
                                                onClick={() => removeNewFile(idx)}
                                                className="bg-red-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all shadow-lg hover:bg-red-700"
                                                title="Remove upload"
                                            >
                                                <XMarkIcon className="h-4 w-4" />
                                            </button>
                                        </div>
                                        <div className="absolute top-2 left-2 px-2 py-1 bg-blue-600 text-white text-[10px] font-bold rounded shadow-sm">
                                            NEW
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Upload Dropzone */}
                    <div className="relative border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center hover:border-blue-500 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all cursor-pointer group">
                        <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleFileChange}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        />
                        <div className="space-y-2 pointer-events-none">
                            <PhotoIcon className="mx-auto h-12 w-12 text-gray-400 group-hover:text-blue-500 transition-colors" />
                            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Click to upload images or drag and drop
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                Recommended size: 1920x1080px (JPG, PNG, WebP)
                            </p>
                        </div>
                    </div>
                </div>

                {/* Status */}
                <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                    <label className="flex items-center space-x-3 cursor-pointer">
                        <input
                            type="checkbox"
                            name="is_active"
                            checked={formData.is_active}
                            onChange={handleCheckboxChange}
                            className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded transition-colors"
                        />
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                            Enable Hero Section
                        </span>
                    </label>
                    <p className="text-xs text-gray-500 ml-8 mt-1">
                        If disabled, default static content might be shown or section hidden depending on frontend logic.
                    </p>
                </div>

                {/* Actions */}
                <div className="flex justify-end pt-4 space-x-4">
                    <button
                        type="button"
                        onClick={fetchHero}
                        className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        disabled={saving}
                    >
                        Reset Changes
                    </button>
                    <button
                        type="submit"
                        disabled={saving}
                        className="flex items-center px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 shadow-md hover:shadow-lg transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {saving ? (
                            <>
                                <div className="animate-spin -ml-1 mr-2 h-4 w-4 text-white border-2 border-white border-t-transparent rounded-full"></div>
                                Saving...
                            </>
                        ) : (
                            <>
                                <CheckCircleIcon className="h-5 w-5 mr-2" />
                                Save Changes
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ManageHero;
