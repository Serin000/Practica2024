import { Head, Link } from '@inertiajs/react';
import Footer from '../Layouts/Footer.jsx';
import Navbar from '../Layouts/Navbar.jsx';
import SearchBar from '../Components/SearchBar.jsx'; // Import your SearchBar component
import { Fragment } from 'react';

export default function Welcome({ auth, products, categories, search, selectedCategory }) {
    return (
        <>
            <Head title="Welcome" />
            <div className="flex flex-col min-h-screen">
                <Navbar auth={auth} />
                <main className="container flex-1 mx-auto">
                    <h1 className="text-3xl mt-6 mb-4">Products</h1>

                    <SearchBar
                        initialSearch={search}
                        initialCategory={selectedCategory}
                        categories={categories}
                    />

                    <div className="grid grid-cols-3 gap-4">
                        {products.data.map(product => (
                            <div className="w-full p-4" key={product.id}>
                                <div className="bg-gray-500 border-4 border-gray-600 rounded-lg">
                                    <div className="flex items-center justify-center overflow-hidden h-40">
                                        {product.images.length > 0 && (
                                            <img
                                                src={product.images[0].url}
                                                alt={product.name}
                                                className="w-full h-full object-cover"
                                            />
                                        )}
                                    </div>
                                    <div className="text-lg font-bold px-2 mt-2 leading-7 text-gray-800">{product.name}</div>
                                    <div className="px-2 mt-2 text-red-800 font-medium">#{product.category.name}</div>
                                    <div className="px-2 mt-2 font-medium text-gray-900">€{product.price}</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-center mt-4">
                        {products.links.map((link, key) => (
                            <Fragment key={key}>
                                {link.url && !link.active && (
                                    <Link className="bg-gray-800 p-2 text-white mr-2" href={link.url}>
                                        <span dangerouslySetInnerHTML={{ __html: link.label }} />
                                    </Link>
                                )}
                                {link.url && link.active && (
                                    <span className="bg-gray-700 p-2 text-white mr-2">{link.label}</span>
                                )}
                            </Fragment>
                        ))}
                    </div>
                </main>
                <Footer/>
            </div>
        </>
    );
}
