import React from "react";
import { Head, usePage } from "@inertiajs/react";

const OrderIndex = () => {
    const { groupedOrders } = usePage().props;

    return (
        <div className="container mx-auto p-6">
            <Head title="Orders" />
            <h1 className="text-2xl font-bold mb-4">Orders</h1>

            {Object.entries(groupedOrders).map(([timestamp, orders]) => (
                <div key={timestamp} className="mb-6 p-4 border rounded-lg shadow-lg">
                    <h2 className="text-lg font-semibold mb-2">Order Date: {timestamp}</h2>
                    <table className="min-w-full border border-gray-300">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="border p-2">Order ID</th>
                                <th className="border p-2">Product Name</th>
                                <th className="border p-2">Quantity</th>
                                <th className="border p-2">Total Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order.id} className="border">
                                    <td className="border p-2">{order.id}</td>
                                    <td className="border p-2">
                                        {order.product ? order.product.product_name : "N/A"}
                                    </td>
                                    <td className="border p-2">{order.quantity}</td>
                                    <td className="border p-2">${order.total_price}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ))}
        </div>
    );
};

export default OrderIndex;
