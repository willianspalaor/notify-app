<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use ElephantIO\Client;


class IndexController extends Controller
{
    public function get(){

        $url = 'http://localhost:3002';
        $client = new Client(Client::engine(Client::CLIENT_4X, $url));
        $client->initialize();
        $client->of('/');
        $client->emit('notify', [
            'msg' => $_GET['msg'], 
            'id' => $_GET['id']
        ]);

        // close connection
        $client->close();
    }


    public function post(Request $request){


        $url = 'http://localhost:3002';
        $client = new Client(Client::engine(Client::CLIENT_4X, $url));
        $client->initialize();
        $client->of('/');
        $client->emit('notify', $request->all());

        // close connection
        $client->close();
    }
}
