import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";

export default function List({ products, categories }) {
    const { data, setData } = useForm({
        category: '',
    });

    const handleCategoryChange = (e) => {
        setData('category', e.target.value);
    };

    const handleFilterSubmit = (e) => {
        e.preventDefault();
        const category = data.category;
        const url = category ? 
            route('products.list') + `?category=${category}` : 
            route('products.list');

        window.location.href = url;
    };

    const { delete: deleteEntry } = useForm({});

    const handleDelete = (id) => {
        deleteEntry(route('products.delete', [id]), {
            onFinish: () => {
                window.location.reload();
            },
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Product list" />
            <div className="w-full">
                <div className="py-4 px-4">
                    <div className={'text-xl font-bold'}>Products</div>

                    <div className={'flex justify-end my-2'}>
                        <Link href={route('products.create')}>
                            <FontAwesomeIcon icon={faPlus} /> Add new product
                        </Link>
                    </div>

                    <form onSubmit={handleFilterSubmit} className="flex items-center mb-4 text-black">
                        <select
                            value={data.category}
                            onChange={handleCategoryChange}
                            className="p-2 pr-12 border border-gray-500 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
                        >
                            <option value="">All Categories</option>
                            {categories.map(cat => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                        </select>
                        <button type="submit" className="ml-2 p-2 bg-gray-800 text-white rounded hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500">
                            Filter
                        </button>
                    </form>

                    <div className="mt-6">
                        <div className={'grid grid-cols-5'}>
                            <div className={'font-bold mb-3'}>ID</div>
                            <div className={'font-bold mb-3'}>Name</div>
                            <div className={'font-bold mb-3'}>Category</div>
                            <div className={'font-bold mb-3'}>Price</div>
                            <div className={'font-bold mb-3'}>Actions</div>

                            {products.data.map((product, index) => (
                                <Fragment key={index}>
                                    <div className={'mb-2'}>{product.id}</div>
                                    <div className={'mb-2'}>{product.name}</div>
                                    <div className={'mb-2'}>{product.category.name}</div>
                                    <div className={'mb-2'}>{product.price}</div>
                                    <div className={'mb-2'}>
                                        <Link href={route('products.update', [product.id])}>
                                            <FontAwesomeIcon icon={faPencil} className={'text-blue-900'} />
                                        </Link>

                                        <FontAwesomeIcon onClick={() => handleDelete(product.id)} icon={faTrash} className={'text-red-900 ml-2 cursor-pointer'} />
                                    </div>
                                </Fragment>
                            ))}
                        </div>
                    </div>

                    <div className="mt-4 flex justify-center">
                        <div className="flex space-x-2">
                            {products.links.map((link, index) => (
                                <Link
                                    key={index}
                                    href={link.url}
                                    className={`px-3 py-1 border border-gray-400 rounded-md text-sm ${link.active ? 'bg-gray-800 text-white font-bold' : 'bg-gray-700 text-white border-gray-500'} hover:bg-gray-600 hover:text-white ${!link.url ? 'cursor-not-allowed opacity-50' : ''}`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
