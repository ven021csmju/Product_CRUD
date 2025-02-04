<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
class order extends Model
{
    use HasFactory;
    protected $table = 'orders';
    protected $fillable = ['customer_id', 'product_id', 'quantity', 'total_price'];
}
