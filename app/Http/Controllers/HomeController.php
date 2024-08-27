<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;
use App\Models\Product;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index(Request $request)
    {
        $query = Product::with(['category', 'images']);

        if ($request->has('category') && $request->category !== '') {
            $query->where('category_id', $request->category);
        }

        if ($request->has('search') && $request->search !== '') {
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        $products = $query->with(['category', 'images'])->paginate(3)->withQueryString();

        return Inertia::render('Welcome', [
            'products' => $products,
            'categories' => Category::orderBy('order')->get(),
            'search' => $request->search,
            'selectedCategory' => $request->category,
        ]);
    }
}
