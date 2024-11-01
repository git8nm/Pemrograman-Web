<?php

namespace Controller;

include "Traits/ResponseFormatter.php";
include "Controllers/Controller.php";

use Traits\ResponseFormatter;

class ProductController extends Controller
{
    use ResponseFormatter;

    public function __construct()
    {
        $this->controllerName = "Get All Product";
        $this->controllerMethod = "GET";
    }

    public function getAllProduct()
    {
        $dummyData = [
            "id" => 1,
            "name" => "Produk A",
            "price" => 10000,
            "description" => "Ini adalah deskripsi Produk A",
            "stock" => 50
        ];

        // Menggunakan atribut dari controller
        $productAttribute = $this->getControllerAttribute();
        $response = [
            "attribute" => $productAttribute,
            "product" => $dummyData
        ];

        return $this->responseFormatter(200, "Success", $response);
    }
}