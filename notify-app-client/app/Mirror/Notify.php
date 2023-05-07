<?php 

namespace App\Mirror;

use GuzzleHttp\Client;

class Notify
{

    public function post($room, $raw)
    {
        $client = new Client($config = [
            "http_errors" => false
        ]);

        $res = $client->post("localhost:3002", [
            "json" => $raw
        ]);

        return $res;
    }

}
