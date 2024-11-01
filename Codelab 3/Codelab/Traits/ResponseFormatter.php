<?php

namespace Traits;

trait ResponseFormatter
{
    // Digunakan ini trait untuk format json response
    public function responseFormatter($code, $message, $data = null)
    {
        return json_encode([
            "code" => $code,
            "message" => $message,
            "data" => $data
        ]);
    }
}