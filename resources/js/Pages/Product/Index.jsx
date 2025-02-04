import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';

const Index = ({ products, search }) => {
    const [searchTerm, setSearchTerm] = useState(search || '');

    const handleSearch = (e) => {
        e.preventDefault();
        Inertia.get('/products', { search: searchTerm });
    };

    const handleAddProduct = () => {
        Inertia.get('/products/create');
    };

    const handleDeleteProduct = (id) => {
        if (confirm('Are you sure you want to delete this product?')) {
            Inertia.delete(`/products/${id}`);
        }
    };

    const handleAddToCart = (product) => {
        Inertia.post('/cart', {
            product_id: product.id,
            product_name: product.product_name,
            price: product.price,
            quantity: 1,
        }, { preserveScroll: true });
    };

    const handleViewCart = () => {
        Inertia.get('/cart');
    };

    const handleViewOrders = () => {
        Inertia.get('/orders');
    };

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Products</h1>
                <div>
                    <button
                        onClick={handleAddProduct}
                        className="bg-blue-500 text-white p-2 rounded mr-2"
                    >
                        Add Product
                    </button>
                    <button
                        onClick={handleViewCart}
                        className="bg-yellow-500 text-white p-2 rounded mr-2"
                    >
                        View Cart
                    </button>
                    <button
                        onClick={handleViewOrders}
                        className="bg-purple-500 text-white p-2 rounded"
                    >
                        View Orders
                    </button>
                </div>
            </div>
            <form onSubmit={handleSearch} className="mb-4 flex">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search products..."
                    className="p-2 border rounded w-full"
                />
                <button type="submit" className="bg-blue-500 text-white p-2 rounded ml-2">
                    Search
                </button>
            </form>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {products.map(product => (
                    <div key={product.id} className="border rounded-lg p-4 shadow-lg">
                        <a href={`/products/${product.id}`}>
                            <img src={`/storage/${product.image}`} alt={product.product_name} className="w-full h-48 object-cover mb-4 rounded-lg" />
                            <h2 className="text-xl font-semibold mb-2">{product.product_name}</h2>
                        </a>
                        <p className="text-gray-700 mb-1">Price: ${product.price}</p>
                        <p className="text-gray-700 mb-1">Description: {product.description}</p>
                        <p className="text-gray-700">Stock: {product.stock}</p>
                        <button
                            onClick={() => handleAddToCart(product)}
                            className="bg-green-500 text-white p-2 rounded mt-2"
                        >
                            Add to Cart
                        </button>
                        <button
                            onClick={() => handleDeleteProduct(product.id)}
                            className="bg-red-500 text-white p-2 rounded mt-2"
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Index;

