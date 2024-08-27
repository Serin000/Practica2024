import { useState } from 'react';

export default function SearchBar({ initialSearch, initialCategory, categories }) {
    const [search, setSearch] = useState(initialSearch || '');
    const [category, setCategory] = useState(initialCategory || '');

    const handleSearchChange = (event) => {
        setSearch(event.target.value);
    };

    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
    };

    const handleSearch = () => {
        const params = new URLSearchParams();
        if (search) params.append('search', search);
        if (category) params.append('category', category);

        window.location.search = params.toString();
    };

    return (
        <div className="flex items-center justify-center mb-6 text-white space-x-4">
            <input
                type="text"
                value={search}
                onChange={handleSearchChange}
                placeholder="Search products..."
                className="mb-4 p-2 border border-gray-600 rounded bg-gray-700 text-white placeholder-gray-400 focus:ring-gray-500 focus:border-gray-500"
            />
            <select
                value={category}
                onChange={handleCategoryChange}
                className="mb-4 p-2 border border-gray-600 rounded bg-gray-700 text-white focus:ring-gray-500 focus:border-gray-500"
            >
                <option value="">All Categories</option>
                {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
            </select>
            <button
                onClick={handleSearch}
                className="mb-4 p-2 bg-gray-800 hover:bg-gray-700 text-white rounded inline-flex items-center"
            >
                Search
            </button>
        </div>
    );
}
