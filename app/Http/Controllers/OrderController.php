<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\OrderItem;
use Inertia\Inertia;
use App\Models\Customer;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $orders = Order::with(['product', 'customer'])->orderBy('created_at', 'desc')->get();
    
        $groupedOrders = $orders->groupBy(function ($order) {
            return $order->created_at->format('Y-m-d H:i:s');
        });
    
        return Inertia::render('Order/Index', [
            'groupedOrders' => $groupedOrders->map(function ($orders) {
                $customer = $orders->first()->customer; // ดึงข้อมูลลูกค้าคนแรกของคำสั่งซื้อชุดนี้
                return [
                    'customer_name' => $customer ? $customer->name : 'Unknown',
                    'customer_address' => $customer ? $customer->address : 'No Address',
                    'customer_phone' => $customer ? $customer->phone : 'No Phone',
                    'total_order_price' => $orders->sum('total_price'), // คำนวณผลรวมราคา
                    'orders' => $orders->map(function ($order) {
                        return [
                            'id' => $order->id,
                            'product' => $order->product,
                            'quantity' => $order->quantity,
                            'total_price' => $order->total_price,
                        ];
                    }),
                ];
            }),
        ]);
    }
    
    
    
    
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $customers = Customer::all(); // ดึงรายชื่อลูกค้าทั้งหมด

        return Inertia::render('Order/Create', [
            'customers' => $customers
        ]);
    }

    /**
     * Store a newly created order in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'customer_id' => 'required|exists:customers,id',
            'cart' => 'required|array',
        ]);

        foreach ($request->cart as $item) {
            Order::create([
                'customer_id' => $request->customer_id,
                'product_id' => $item['product_id'],
                'quantity' => $item['quantity'],
                'total_price' => $item['price'] * $item['quantity'],
            ]);
        }

        return redirect()->route('orders.index')->with('success', 'Order placed successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(order $order)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(order $order)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, order $order)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(order $order)
    {
        //
    }
}
