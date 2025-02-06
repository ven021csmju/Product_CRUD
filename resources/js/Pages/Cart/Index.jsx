import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';

const Cart = ({ cart, customers }) => {
    const [selectedCustomer, setSelectedCustomer] = useState('');

    const handleUpdateQuantity = (productId, quantity) => {
        Inertia.patch(`/cart/${productId}`, { quantity });
    };

    const handleRemoveFromCart = (productId) => {
        Inertia.delete(`/cart/${productId}`);
    };

    const calculateTotalPrice = () => {
        return Object.values(cart).reduce((total, item) => {
            return total + item.price * item.quantity;
        }, 0);
    };

    const handlePlaceOrder = () => {
        if (!selectedCustomer) {
            alert('Please select a customer.');
            return;
        }

        Inertia.post('/orders', {
            customer_id: selectedCustomer,
            cart: Object.values(cart),
        });
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Cart</h1>
            <div className="mb-6">
                <label className="block text-gray-700">Select Customer</label>
                <select
                    value={selectedCustomer}
                    onChange={(e) => setSelectedCustomer(e.target.value)}
                    className="w-full p-2 border rounded"
                >
                    <option value="">Select a customer</option>
                    {customers.map(customer => (
                        <option key={customer.id} value={customer.id}>
                            {customer.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="grid grid-cols-1 gap-4">
                {Object.values(cart).map(item => (
                    <div key={item.product_id} className="border rounded-lg p-4 shadow-lg bg-white">
                        <h2 className="text-xl font-semibold mb-2">{item.product_name}</h2>
                        <p className="text-gray-700 mb-1">Price: ${item.price}</p>
                        <p className="text-gray-700 mb-1">Quantity: 
                            <input
                                type="number"
                                value={item.quantity}
                                onChange={(e) => handleUpdateQuantity(item.product_id, e.target.value)}
                                className="w-16 p-1 border rounded ml-2"
                            />
                        </p>
                        <button
                            onClick={() => handleRemoveFromCart(item.product_id)}
                            className="bg-red-500 text-white p-2 rounded mt-2"
                        >
                            Remove
                        </button>
                    </div>
                ))}
            </div>
            <div className="mt-6 p-4 border rounded-lg shadow-lg bg-white">
                <h2 className="text-xl font-semibold">Total Price: ${calculateTotalPrice()}</h2>
                <button
                    onClick={handlePlaceOrder}
                    className="bg-blue-500 text-white p-2 rounded mt-2"
                >
                    Place Order
                </button>
            </div>
        </div>
    );
};

export default Cart;
