<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
class product extends Model
{
    use HasFactory;
    protected $table = 'products';
    protected $fillable = ['product_name', 'price', 'description','image','stock'];
    

}
