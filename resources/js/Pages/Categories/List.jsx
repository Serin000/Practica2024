import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";

export default function List({ categories }) {
    const { delete: deleteEntry } = useForm({});

    const handleDelete = (id) => {
        deleteEntry(route('categories.delete', [id]), {
            onFinish: () => {
                router.reload({ only: ['categories'] });
            },
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Category list" />
            <div className="w-full">
                <div className="py-4 px-4">
                    <div className={'text-xl font-bold'}>Categories</div>

                    <div className={'flex justify-end my-2'}>
                        <Link href={route('categories.create')}>
                            <FontAwesomeIcon icon={faPlus} /> Add new category
                        </Link>
                    </div>

                    <div className="mt-6">
                        <div className={'grid grid-cols-4'}>
                            <div className={'font-bold mb-3'}>ID</div>
                            <div className={'font-bold mb-3'}>Name</div>
                            <div className={'font-bold mb-3'}>Order</div>
                            <div className={'font-bold mb-3'}>Actions</div>

                            {categories.data.map((category, index) => (
                                <Fragment key={index}>
                                    <div className={'mb-2'}>{category.id}</div>
                                    <div className={'mb-2'}>{category.name}</div>
                                    <div className={'mb-2'}>{category.order}</div>
                                    <div className={'mb-2'}>
                                        <Link href={route('categories.update', [category.id])}>
                                            <FontAwesomeIcon icon={faPencil} className={'text-blue-900'} />
                                        </Link>

                                        <FontAwesomeIcon onClick={() => handleDelete(category.id)} icon={faTrash} className={'text-red-900 ml-2 cursor-pointer'} />
                                    </div>
                                </Fragment>
                            ))}
                        </div>
                    </div>

                    <div className="mt-4 flex justify-center">
                        <div className="flex space-x-2">
                            {categories.links.map((link, index) => (
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
