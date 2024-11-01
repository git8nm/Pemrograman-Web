<?php
namespace App\Electronics;

abstract class Product {
    protected $name;
    protected $price;

    public function __construct($name, $price) {
        $this->name = $name;
        $this->price = $price;
    }
    //public function __get($property) {
    //    if ($property === 'name') {
    //        return $this->name;
    //    } elseif ($property === 'price') {
    //        return $this->price;
    //    }
    //    return "Property '$property' does not exist.";
    //}

    abstract public function getDescription();
}
