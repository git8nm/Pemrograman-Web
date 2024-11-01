<?php
namespace App\Electronics;

trait DisplayTrait {
    public function displayInfo() {
        echo "Product: {$this->name}, Price: {$this->price}\n";
    }
}
