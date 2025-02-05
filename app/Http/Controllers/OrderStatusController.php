<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Customer;
use App\Models\Product;
use App\Models\Order;
use Carbon\Carbon;

class OrderStatusController extends Controller
{
    public function salesData()
    {
        // 1. ยอดขายตามลูกค้า
        $customerSales = Order::with('customer')
            ->selectRaw('customer_id, SUM(total_price) as total_spent')
            ->groupBy('customer_id')
            ->get()
            ->map(fn($order) => [
                'name' => $order->customer->name,
                'total_spent' => $order->total_spent,
            ]);

        // 2. ยอดขายตามสินค้า
        $productSales = Order::with('product')
            ->selectRaw('product_id, SUM(quantity) as total_sold')
            ->groupBy('product_id')
            ->get()
            ->map(fn($order) => [
                'product_name' => $order->product->name,
                'total_sold' => $order->total_sold,
            ]);

        // 3. ยอดขายตามช่วงเวลา (รายวัน)
        $salesOverTime = Order::selectRaw('DATE(created_at) as date, SUM(total_price) as total_sales')
            ->groupBy('date')
            ->orderBy('date')
            ->get();

        return response()->json([
            'customer_sales' => $customerSales,
            'product_sales' => $productSales,
            'sales_over_time' => $salesOverTime,
        ]);
    }
}