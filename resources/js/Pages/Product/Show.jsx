import React from 'react';
import { Inertia } from '@inertiajs/inertia';

const Show = ({ product }) => {
    const handleBack = () => {
        Inertia.get('/products');
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">{product.product_name}</h1>
            
            <div className="flex justify-center mb-6">
                <img 
                    src={`/storage/${product.image}`} 
                    alt={product.product_name} 
                    className="max-w-full h-auto rounded-lg shadow-lg"
                />
            </div>

            <p className="text-gray-700 mb-2">Price: ${product.price}</p>
            <p className="text-gray-700 mb-2">Description: {product.description}</p>
            <p className="text-gray-700">Stock: {product.stock}</p>
            <button type="button" onClick={handleBack} className="bg-gray-500 text-white p-2 rounded mt-4">Back to Products</button>
        </div>
    );
};

export default Show;
