import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { apiService, API_BASE_URL } from '../services/api';
import { X, Calendar, User, ChevronLeft, ChevronRight } from 'lucide-react';

interface NewsItem {
    id: number;
    title: string;
    summary: string;
    content: string;
    images: string[];
    category: string;
    author: string;
    published_at: string;
}

const News = () => {
    const [news, setNews] = useState<NewsItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const location = useLocation();

    useEffect(() => {
        fetchNews();
    }, [page]);

    const fetchNews = async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams();
            params.append('page', page.toString());
            params.append('limit', '6');
            params.append('_t', new Date().getTime().toString());

            const response: any = await apiService.get(`/news?${params.toString()}`);
            if (response && response.success) {
                setNews(response.data);
                if (response.pagination) {
                    setTotalPages(response.pagination.pages);
                }
            }
        } catch (error) {
            console.error('Failed to fetch news', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const newsId = queryParams.get('id');

        if (newsId && news.length > 0) {
            const newsItem = news.find(n => n.id === parseInt(newsId));
            if (newsItem) {
                openNewsDetail(newsItem);
            }
        }
    }, [location.search, news]);

    const openNewsDetail = (newsItem: NewsItem) => {
        // Ensure images is always an array
        const parsedNewsItem = {
            ...newsItem,
            images: parseImages(newsItem.images)
        };
        setSelectedNews(parsedNewsItem);
        setCurrentImageIndex(0);
    };

    const closeNewsDetail = () => {
        setSelectedNews(null);
        setCurrentImageIndex(0);
    };

    const nextImage = () => {
        if (selectedNews && selectedNews.images.length > 0) {
            setCurrentImageIndex((prev) => (prev + 1) % selectedNews.images.length);
        }
    };

    const prevImage = () => {
        if (selectedNews && selectedNews.images.length > 0) {
            setCurrentImageIndex((prev) => (prev - 1 + selectedNews.images.length) % selectedNews.images.length);
        }
    };

    const getImageUrl = (imagePath: string) => {
        if (!imagePath) return '';
        if (imagePath.startsWith('http')) return imagePath;
        // Remove only the trailing /api, not the one in the subdomain
        return `${API_BASE_URL.replace(/\/api$/, '')}${imagePath}`;
    };

    // Helper function to safely parse images
    const parseImages = (images: any): string[] => {
        if (!images) return [];
        if (Array.isArray(images)) return images;
        if (typeof images === 'string') {
            try {
                const parsed = JSON.parse(images);
                return Array.isArray(parsed) ? parsed : [];
            } catch {
                return [];
            }
        }
        return [];
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Header */}
            <div className="pt-32 pb-16 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-center text-white">
                <div className="max-w-7xl mx-auto px-4">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Latest News & Updates</h1>
                    <p className="text-blue-100 max-w-2xl mx-auto text-lg">Stay informed about  ShinningPaint's latest innovations, company announcements, and industry insights.</p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {news.map(item => {
                            const itemImages = parseImages(item.images);
                            return (
                                <div key={item.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 flex flex-col group">
                                    {itemImages.length > 0 ? (
                                        <div className="relative overflow-hidden h-48">
                                            <img
                                                src={getImageUrl(itemImages[0])}
                                                alt={item.title}
                                                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                                            />
                                            {itemImages.length > 1 && (
                                                <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full">
                                                    +{itemImages.length - 1} more
                                                </div>
                                            )}
                                            <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-3 py-1 rounded-full font-medium">
                                                {item.category}
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="w-full h-48 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center">
                                            <span className="text-gray-400 dark:text-gray-500">No Image</span>
                                        </div>
                                    )}
                                    <div className="p-6 flex-1 flex flex-col">
                                        <div className="mb-4">
                                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                                {item.title}
                                            </h3>
                                            <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
                                                <span className="flex items-center gap-1">
                                                    <Calendar className="w-4 h-4" />
                                                    {new Date(item.published_at).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                                                </span>
                                                {item.author && (
                                                    <span className="flex items-center gap-1">
                                                        <User className="w-4 h-4" />
                                                        {item.author}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <p className="text-gray-600 dark:text-gray-300 line-clamp-3 flex-1 mb-4">
                                            {item.summary || item.content}
                                        </p>
                                        <button
                                            onClick={() => openNewsDetail(item)}
                                            className="text-blue-600 dark:text-blue-400 font-medium hover:text-blue-800 dark:hover:text-blue-300 self-start transition-colors flex items-center gap-1 group/btn"
                                        >
                                            Read more
                                            <span className="transform group-hover/btn:translate-x-1 transition-transform">&rarr;</span>
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
                {!loading && news.length === 0 && (
                    <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                        <p className="text-gray-500 dark:text-gray-400 text-lg">No news articles found at the moment.</p>
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
                            <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
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
                            <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                        </button>
                    </div>
                )}
            </div>

            {/* News Detail Modal */}
            {selectedNews && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={closeNewsDetail}>
                    <div
                        className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl w-full max-w-[95vw] h-[95vh] overflow-hidden animate-slide-up flex flex-col"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal Header */}
                        <div className="sticky top-0 z-10 px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center bg-white dark:bg-gray-800">
                            <div className="flex items-center gap-3">
                                <span className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full font-medium">
                                    {selectedNews.category}
                                </span>
                                <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                                    <span className="flex items-center gap-1">
                                        <Calendar className="w-4 h-4" />
                                        {new Date(selectedNews.published_at).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                                    </span>
                                    {selectedNews.author && (
                                        <span className="flex items-center gap-1">
                                            <User className="w-4 h-4" />
                                            {selectedNews.author}
                                        </span>
                                    )}
                                </div>
                            </div>
                            <button
                                onClick={closeNewsDetail}
                                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Modal Content - Scrollable area */}
                        <div className="flex-1 overflow-y-auto custom-scrollbar">
                            {/* Thumbnail Gallery - Sticky */}
                            {selectedNews.images && selectedNews.images.length > 1 && (
                                <div className="sticky top-0 z-20 flex gap-3 p-4 overflow-x-auto bg-white/90 dark:bg-gray-800/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 shadow-sm">
                                    {selectedNews.images.map((img, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setCurrentImageIndex(idx)}
                                            className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-300 transform hover:scale-105 ${idx === currentImageIndex
                                                ? 'border-blue-600 ring-4 ring-blue-600/20 shadow-lg'
                                                : 'border-transparent hover:border-blue-400'
                                                }`}
                                        >
                                            <img
                                                src={getImageUrl(img)}
                                                alt={`Thumbnail ${idx + 1}`}
                                                className="w-full h-full object-cover"
                                            />
                                        </button>
                                    ))}
                                </div>
                            )}

                            {/* Image Gallery */}
                            {selectedNews.images && selectedNews.images.length > 0 && (
                                <div className="relative bg-gray-900 flex flex-col items-center">
                                    <div className="w-full flex justify-center p-8 bg-gray-200 dark:bg-gray-950/50">
                                        <img
                                            src={getImageUrl(selectedNews.images[currentImageIndex])}
                                            alt={selectedNews.title}
                                            className="max-w-full h-auto shadow-[0_20px_50px_rgba(0,0,0,0.3)] rounded-lg transition-all duration-500"
                                            style={{ minWidth: '70%' }}
                                        />
                                        {selectedNews.images.length > 1 && (
                                            <>
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); prevImage(); }}
                                                    className="absolute left-8 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-blue-600 text-white p-4 rounded-full transition-all duration-300 shadow-2xl z-30 group/btn"
                                                >
                                                    <ChevronLeft className="w-8 h-8 transform group-hover/btn:-translate-x-1 transition-transform" />
                                                </button>
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); nextImage(); }}
                                                    className="absolute right-8 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-blue-600 text-white p-4 rounded-full transition-all duration-300 shadow-2xl z-30 group/btn"
                                                >
                                                    <ChevronRight className="w-8 h-8 transform group-hover/btn:translate-x-1 transition-transform" />
                                                </button>
                                                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-md text-white text-sm font-bold px-6 py-2 rounded-full shadow-2xl z-30 border border-white/20">
                                                    {currentImageIndex + 1} / {selectedNews.images.length}
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Article Content */}
                            <div className="p-12 max-w-5xl mx-auto">
                                <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-8 leading-tight">
                                    {selectedNews.title}
                                </h2>

                                {selectedNews.summary && (
                                    <div className="mb-10 p-6 bg-blue-50 dark:bg-blue-900/10 border-l-8 border-blue-600 rounded-xl shadow-sm">
                                        <p className="text-xl text-gray-700 dark:text-gray-300 italic font-medium leading-relaxed">
                                            {selectedNews.summary}
                                        </p>
                                    </div>
                                )}

                                <div className="prose prose-xl dark:prose-invert max-w-none">
                                    <div className="text-gray-700 dark:text-gray-300 whitespace-pre-line leading-relaxed text-lg">
                                        {selectedNews.content}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <style>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 8px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: #f1f1f1;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #888;
                    border-radius: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #555;
                }
                .dark .custom-scrollbar::-webkit-scrollbar-track {
                    background: #1f2937;
                }
                .dark .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #4b5563;
                }
                .dark .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #6b7280;
                }
                @keyframes slide-up {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-slide-up {
                    animation: slide-up 0.3s ease-out;
                }
            `}</style>
        </div>
    );
};

export default News;
