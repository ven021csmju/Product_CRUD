import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Index = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get('/api/products')
            .then(response => {
                setProducts(response.data.data);
            })
            .catch(error => {
                console.error('There was an error fetching the products!', error);
            });
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Products</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {products.map(product => (
                    <div key={product.id} className="border rounded-lg p-4 shadow-lg">
                        <h2 className="text-xl font-semibold mb-2">{product.product_name}</h2>
                        <p className="text-gray-700 mb-1">Price: ${product.price}</p>
                        <p className="text-gray-700 mb-1">Description: {product.description}</p>
                        <p className="text-gray-700">Stock: {product.stock}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Index;

