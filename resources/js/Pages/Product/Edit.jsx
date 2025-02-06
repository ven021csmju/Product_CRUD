import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';

const Edit = ({ product }) => {
    const [productName, setProductName] = useState(product.product_name);
    const [price, setPrice] = useState(product.price);
    const [description, setDescription] = useState(product.description);
    const [stock, setStock] = useState(product.stock);
    const [image, setImage] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('product_name', productName);
        formData.append('price', price);
        formData.append('description', description);
        formData.append('stock', stock);
        if (image) {
            formData.append('image', image);
        }
        formData.append('_method', 'PUT'); // Add this line to specify the method

        Inertia.post(`/products/${product.id}`, formData, {
            onSuccess: () => {
                Inertia.get('/products');
            },
        });
    };

    const handleBack = () => {
        Inertia.get('/products');
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Edit Product</h1>
            <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4">
                <div>
                    <label className="block text-gray-700">Product Name</label>
                    <input
                        type="text"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Price</label>
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Stock</label>
                    <input
                        type="number"
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Image</label>
                    <input
                        type="file"
                        onChange={(e) => setImage(e.target.files[0])}
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div className="flex justify-between">
                    <button type="submit" className="bg-blue-500 text-white p-2 rounded">Update Product</button>
                    <button type="button" onClick={handleBack} className="bg-gray-500 text-white p-2 rounded">Back to Products</button>
                </div>
            </form>
        </div>
    );
};

export default Edit;
