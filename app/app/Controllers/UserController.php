<?php

namespace App\Controllers;

class User extends BaseController
{
    public function route_get_all_users()
    {
        $user_model = model('UserModel');

        $data = [
            'users' => $user_model->get_all_users()
        ];

        // echo view('show_users', $data);
        echo "$data";
    }
}
