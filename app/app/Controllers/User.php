<?php

namespace App\Controllers;

// if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
//         header('Access-Control-Allow-Origin: *');
//         header('Access-Control-Allow-Methods: POST, GET, DELETE, PUT, PATCH, OPTIONS');
//         header('Access-Control-Allow-Headers: token, Content-Type');
//         header('Access-Control-Max-Age: 1728000');
//         header('Content-Length: 0');
//         header('Content-Type: text/plain');
//         die();
//     }

//     header('Access-Control-Allow-Origin: *');
//     header('Content-Type: application/json');

// header('Access-Control-Allow-Origin: *'); //for allow any domain, insecure
// header('Access-Control-Allow-Headers: X-Requested-With'); //for allow any headers, insecure
// header('Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE'); //method allowed
// header('Access-Control-Allow-Credentials: true');
// if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
//     // The request is using the POST method
//     header("HTTP/1.1 200 OK");
//     return;

// }
// Header('Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE');

// public function consoleLog($msg) 
// {
//     echo '<script type="text/javascript">' .
//     'console.log(' . $msg . ');</script>';
// }

class User extends BaseController
{

    public function __construct()
    {
        if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: POST, GET, DELETE, PUT, PATCH, OPTIONS');
        header('Access-Control-Allow-Headers: token, Content-Type');
        header('Access-Control-Max-Age: 1728000');
        header('Content-Length: 0');
        header('Content-Type: text/plain');
        die();
        }

        header('Access-Control-Allow-Origin: *');
        header('Content-Type: application/json');

        $this->session = session();
    }

    public function get_all_users()
    {
        $user_model = model('UserModel');

        $data = [
            'users' => $user_model->get_all_users()
        ];

        // echo view('show_users', $data);
        return $this->response->setJSON($data);
    }

    public function get_user()
    {
        $user_model = model('UserModel');
        if (isset($_GET['user'])) {
            $id = $_GET['user'];
        } else {
            echo "bajs";
        }
        
        

        $data = [
            'user' => $user_model->get_user($id)
        ];

        $this->session->set($data);

        print_r($this->session->get('user'));

        // echo view('show_users', $data);
        return $this->response->setJSON($data);
    }

    public function user_login()
    {
        $user_model = model('UserModel');

        $json = file_get_contents('php://input');

        $data = json_decode($json);

        $res = $user_model->get_user_by_name($data->name);

        if ($res) {
            $correct = password_verify($data->password, $res[0]->password);
        } else {
            $fail = array();
            array_push($fail, ['fail' => "Fel namn!"]);
            return $this->response->setJSON($fail[0]);
        }
{}
        if ($correct) {
            $res[0]->password = null;
            $res[0]->fail = false;
            $this->session->set('user_data',$res[0]);
            return $this->response->setJSON($this->session->get('user_data'));
            // $this->response->setJSON($res[0]);
        } else {
            $fail = array();
            array_push($fail, ['fail' => "Fel lösenord!"]);
            return $this->response->setJSON($fail[0]);
        }
    }

    public function create_user()
    {
        $user_model = model('UserModel');

        $json = file_get_contents('php://input');

        $data = json_decode($json);

        $user_name_exists = $user_model->get_user_by_name($data->name);

        if ($user_name_exists) {
            $fail = array();
            array_push($fail, ['fail' => "$data->name finns redan!"]);
            return $this->response->setJSON($fail[0]);
        }

        // $password = $data->password;
        // print_r($password);
        $data->password = password_hash($data->password, PASSWORD_DEFAULT);
        // print_r($hash);

        // $data->password = $hash;


        // $file = $this->request->getFile('profilepic');
        // print_r($file);
        // if (! $file->isValid()) {
        //     throw new \RuntimeException($file->getErrorString().'('.$file->getError().')');
        // }

        // $newName = $file->getRandomName();
        // $file->move(WRITEPATH.'uploads/profile_pics', $newName);

        
        $id = $user_model->create_user($data);

        // $res = [
        //     'user' => $user_model->get_user($id)
        // ];

        $user = $user_model->get_user($id);
        // print_r($user[0]->password);

        $user[0]->password = null;
        $user[0]->fail = false;

        $res = [
            'user' => $user[0]
        ];



        // $res->user[0]->password = null;


        // if ($result) {
        return $this->response->setJSON($res);
        // } 
        
        // // consoleLog("hej");
        // $user_model = model('UserModel');

        // $data = [
        //     'user' => $user_model->create_user($req)
        // ];

        // // echo view('show_users', $data);
        // return $this->response->setJSON($data);
    }

    public function delete_all_users()
    {
        $user_model = model('UserModel');

        // $user_model->delete_all_users();
        return $user_model->delete_all_users();
    }
}
