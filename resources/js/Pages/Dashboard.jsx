import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';

export default function Dashboard() {
    const handleAddCustomer = () => {
        Inertia.get('/customers/create');
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            You're logged in!
                        </div>
                    </div>
                </div>
            </div>
            <div className="container mx-auto p-6">
                <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
                <button
                    onClick={handleAddCustomer}
                    className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
                >
                    Add New Customer
                </button>
            </div>
        </AuthenticatedLayout>
    );
}
