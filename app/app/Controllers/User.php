<?php

namespace App\Controllers;

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

    public function create_user()
    {
        $user_model = model('UserModel');

        $json = file_get_contents('php://input');

        $data = json_decode($json);

        $file = $this->request->getFile('profilepic');
        print_r($file);
        if (! $file->isValid()) {
            throw new \RuntimeException($file->getErrorString().'('.$file->getError().')');
        }

        $newName = $file->getRandomName();
        $file->move(WRITEPATH.'uploads/profile_pics', $newName);

        $result = $user_model->create_user($data);
        if ($result) {
            // $_SESSION['message'] = 'Todo added';
            // $_SESSION['message_type'] = 'warning';
            return $this->response->setJSON($data);
            // header('Location: ../index.php');
        } 
        
        // // consoleLog("hej");
        // $user_model = model('UserModel');

        // $data = [
        //     'user' => $user_model->create_user($req)
        // ];

        // // echo view('show_users', $data);
        // return $this->response->setJSON($data);
    }
}
