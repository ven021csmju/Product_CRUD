import React from 'react';
import { Inertia } from '@inertiajs/inertia';

const Cart = ({ cart }) => {
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
        // Implement order placement logic here
        alert('Order placed successfully!');
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Cart</h1>
            <div className="grid grid-cols-1 gap-4">
                {Object.values(cart).map(item => (
                    <div key={item.product_id} className="border rounded-lg p-4 shadow-lg">
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
            <div className="mt-4 p-4 border rounded-lg shadow-lg">
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
