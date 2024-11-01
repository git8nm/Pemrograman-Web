<?php
namespace App\Electronics;

class Laptop extends Product {
    use DisplayTrait;

    private $processor;
    private $ram;

    public function __construct($name, $price, $processor, $ram) {
        parent::__construct($name, $price);
        $this->processor = $processor;
        $this->ram = $ram;
    }

    public function getDescription() {
        return "This is a {$this->name} laptop with a {$this->processor} processor and {$this->ram}GB RAM.";
    }

    //public function __get($property) {
    //    return "Property '$property' does not exist.";
    //}
}

class Smartphone extends Product {
    use DisplayTrait;

    private $cameraQuality;
    private $batteryCapacity;

    public function __construct($name, $price, $cameraQuality, $batteryCapacity) {
        parent::__construct($name, $price);
        $this->cameraQuality = $cameraQuality;
        $this->batteryCapacity = $batteryCapacity;
    }

    public function getDescription() {
        return "This is a {$this->name} smartphone with a {$this->cameraQuality}MP camera and {$this->batteryCapacity}mAh battery.";
    }

    //public function __call($name, $arguments) {
    //    return "Method '$name' does not exist.";
    //}
}
