import React from 'react';
import { Inertia } from '@inertiajs/inertia';

const Show = ({ product }) => {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">{product.product_name}</h1>
            <img src={`/storage/${product.image}`} alt={product.product_name} className="w-full h-48 object-cover mb-4 rounded-lg" />
            <p className="text-gray-700 mb-1">Price: ${product.price}</p>
            <p className="text-gray-700 mb-1">Description: {product.description}</p>
            <p className="text-gray-700 mb-1">Stock: {product.stock}</p>
        </div>
    );
};

export default Show;
