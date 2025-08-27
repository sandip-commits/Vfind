"use client";

import { useState, useEffect } from 'react';
import { Search, Calendar, ArrowRight, Home, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Navbar from '../../../components/navbar';
import Image from 'next/image';

interface DevToArticle {
    id: number;
    title: string;
    description: string;
    url: string;
    published_at: string;
    tag_list: string[];
    cover_image: string;
    user: {
        name: string;
        username: string;
        profile_image: string;
    };
    organization?: {
        name: string;
        username: string;
        profile_image: string;
    };
    reading_time_minutes: number;
    public_reactions_count: number;
}

export default function Blogs() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [articles, setArticles] = useState<DevToArticle[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    // Fetch articles from Dev.to API
    useEffect(() => {
        const fetchArticles = async () => {
            try {
                setLoading(true);
                const response = await fetch('https://dev.to/api/articles?per_page=20&top=7');
                
                if (!response.ok) {
                    throw new Error('Failed to fetch articles');
                }
                
                const data: DevToArticle[] = await response.json();
                setArticles(data);
                setError(null);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
                console.error('Error fetching articles:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchArticles();
    }, []);

    // Get unique categories from articles
    const categories = ['all', ...Array.from(new Set(articles.flatMap(article => article.tag_list.slice(0, 1))))];

    const filteredArticles = articles.filter(article => {
        const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            article.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || article.tag_list.includes(selectedCategory);
        return matchesSearch && matchesCategory;
    });

    const handleBlogClick = (id: number) => {
        // Navigate to your [id] page
        router.push(`/blogs/${id}`);
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
        });
    };

    const getMainCategory = (tagList: string[]) => {
        return tagList[0] || 'General';
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Navbar />
                <div className="flex items-center justify-center h-64">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                        <p className="text-gray-600">Loading articles...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Navbar />
                <div className="flex items-center justify-center h-64">
                    <div className="text-center">
                        <p className="text-red-600 mb-4">Error: {error}</p>
                        <button 
                            onClick={() => window.location.reload()}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                        >
                            Retry
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navbar */}
            <Navbar />

            {/* Hero Section */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-100 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">EXPLORE OUR BLOGS</h1>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Breadcrumb */}
                <div className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
                    <Home className="w-4 h-4" />
                    <span>Home</span>
                    <ChevronRight className="w-4 h-4" />
                    <span className="text-blue-600 font-medium">Blog</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-3">
                        {/* Blog Header */}
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Blog</h2>

                            {/* Category Filter */}
                            <div className="flex flex-wrap gap-2 mb-6">
                                {categories.slice(0, 10).map(category => (
                                    <button
                                        key={category}
                                        onClick={() => setSelectedCategory(category)}
                                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedCategory === category
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                                        }`}
                                    >
                                        {category === 'all' ? 'All Categories' : category}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Blog Cards Grid */}
                        <div className="grid grid-cols-1 gap-6">
                            {filteredArticles.map(article => (
                                <div
                                    key={article.id}
                                    onClick={() => handleBlogClick(article.id)}
                                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group"
                                >
                                    <div className="flex">
                                        <div className="relative flex-shrink-0 w-48 h-32">
                                            <Image
                                            height={50}
                                            width={50}
                                                src={article.cover_image || '/api/placeholder/300/200'}
                                                alt={article.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                onError={(e) => {
                                                    const target = e.target as HTMLImageElement;
                                                    target.src = '/api/placeholder/300/200';
                                                }}
                                            />
                                        </div>

                                        <div className="flex-1 p-4 flex flex-col justify-between">
                                            <div>
                                                <div className="flex gap-2 items-center text-sm text-gray-500 mb-2">
                                                    <Calendar className="w-4 h-4 mr-1" />
                                                    {formatDate(article.published_at)}
                                                    <div className="">
                                                        <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                                                            {getMainCategory(article.tag_list)}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-1 ml-auto">
                                                        <span className="text-xs text-gray-400">
                                                            {article.reading_time_minutes} min read
                                                        </span>
                                                        <span className="text-xs text-gray-400">
                                                            • {article.public_reactions_count} reactions
                                                        </span>
                                                    </div>
                                                </div>

                                                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                                                    {article.title}
                                                </h3>

                                                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                                                    {article.description}
                                                </p>

                                                <div className="flex items-center gap-2 text-xs text-gray-500">
                                                    <Image
                                                     height={50}
                                            width={50}
                                                        src={article.user.profile_image}
                                                        alt={article.user.name}
                                                        className="w-5 h-5 rounded-full"
                                                    />
                                                    <span>by {article.user.name}</span>
                                                    {article.organization && (
                                                        <>
                                                            <span>•</span>
                                                            <span>{article.organization.name}</span>
                                                        </>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="flex items-center text-blue-600 text-sm font-medium group-hover:text-blue-700 mt-2">
                                                Learn More
                                                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {filteredArticles.length === 0 && !loading && (
                            <div className="text-center py-12">
                                <p className="text-gray-500 text-lg">No blog posts found matching your criteria.</p>
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="space-y-6">
                            {/* Search */}
                            <div className="bg-white rounded-lg shadow-sm p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Search</h3>
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Search for blog..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                    <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                                </div>
                            </div>

                            {/* Career Tips */}
                            <div className="bg-white rounded-lg shadow-sm p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Career Tips</h3>
                                <p className="text-gray-600 text-sm mb-4">
                                    Your career is a significant part of your life, and were here to provide guidance and support every step of the way.
                                </p>
                                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium border border-blue-600 hover:border-blue-700 px-4 py-2 rounded-lg transition-colors">
                                    Read Career Tips
                                </button>
                            </div>

                            {/* Browse by Categories */}
                            <div className="bg-white rounded-lg shadow-sm p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Browse by Categories</h3>
                                <div className="space-y-2">
                                    {categories.slice(1, 11).map(category => (
                                        <button
                                            key={category}
                                            onClick={() => setSelectedCategory(category)}
                                            className="block w-full text-left text-sm text-gray-600 hover:text-blue-600 transition-colors py-1"
                                        >
                                            {category}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Stats */}
                            <div className="bg-white rounded-lg shadow-sm p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Blog Stats</h3>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Total Articles:</span>
                                        <span className="font-medium">{articles.length}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Categories:</span>
                                        <span className="font-medium">{categories.length - 1}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}