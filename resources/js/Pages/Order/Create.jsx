import React, { useState } from "react";
import { Head, usePage, router } from "@inertiajs/react";

const CreateOrder = () => {
    const { customers } = usePage().props;
    const [customerId, setCustomerId] = useState("");
    const [cart, setCart] = useState([
        { product_id: 1, quantity: 2, price: 100 },
        { product_id: 2, quantity: 1, price: 200 }
    ]);

    const handleSubmit = (e) => {
        e.preventDefault();
        router.post("/orders", { customer_id: customerId, cart });
    };

    return (
        <div className="container mx-auto p-6">
            <Head title="Create Order" />
            <h1 className="text-3xl font-bold mb-6">Select Customer</h1>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-2 font-semibold">Select Customer:</label>
                    <select
                        className="border p-2 w-full mb-4"
                        value={customerId}
                        onChange={(e) => setCustomerId(e.target.value)}
                        required
                    >
                        <option value="">-- Choose a Customer --</option>
                        {customers.map((customer) => (
                            <option key={customer.id} value={customer.id}>
                                {customer.name} ({customer.email})
                            </option>
                        ))}
                    </select>
                </div>

                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Place Order
                </button>
            </form>
        </div>
    );
};

export default CreateOrder;
