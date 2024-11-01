<?php
require_once __DIR__ . '/Controllers/Controller.php';
require_once __DIR__ . '/Traits/ResponseFormatter.php';
require_once __DIR__ . '/Controllers/ProductController.php';

use App\Electronics\Laptop;
use App\Electronics\Smartphone;

// Test Laptop
$laptop = new Laptop("Asus", 1000, "Intel i7", 16);
echo $laptop->getDescription() . "\n";
$laptop->displayInfo();

//$laptop = new Laptop("Asus", 1000, "Intel i7", 16);
//echo $laptop->name; // Output: Asus
//echo $laptop->price; // Output: 1000


// Test Smartphone
$smartphone = new Smartphone("Samsung", 800, 108, 5000);
echo $smartphone->getDescription() . "\n";
$smartphone->displayInfo();

// Fungsi tambahan
function cetakBilangan($n) {
    for ($i = 1; $i <= $n; $i++) {
        if ($i % 4 == 0 && $i % 6 == 0) {
            echo "Pemrograman Website 2024\n";
        } elseif ($i % 5 == 0) {
            echo "2024\n";
        } elseif ($i % 4 == 0) {
            echo "Pemrograman\n";
        } elseif ($i % 6 == 0) {
            echo "Website\n";
        } else {
            echo "$i\n";
        }
    }
}

// Test fungsi cetakBilangan
cetakBilangan(25);
