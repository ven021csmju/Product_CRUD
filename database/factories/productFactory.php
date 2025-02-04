<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\product>
 */
class productFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'Product_name' => $this->faker->name,
            'price' => $this->faker->randomNumber(2),
            'description' => $this->faker->text,
            'image' => $this->faker->imageUrl(),
            'stock' => $this->faker->randomNumber(2),
        ];
    }
}
