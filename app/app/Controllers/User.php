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

// header('Access-Control-Allow-Origin: *');
//         header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method, Authorization");
//         header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
//         $method = $_SERVER['REQUEST_METHOD'];
//         if ($method == "OPTIONS") {
//             die();
//         }




class User extends BaseController
{

    public function __construct()
    {
        header('Access-Control-Allow-Origin: *');
        header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method, Authorization");
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
        $method = $_SERVER['REQUEST_METHOD'];
        if ($method == "OPTIONS") {
            die();
        }

    $this->session = session();
    }

    public function get_all_users()
    {
        $user_model = model('UserModel');
        $data = [
            'users' => $user_model->get_all_users()
        ];
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
        return $this->response->setJSON($data);
    }

    public function is_loggedin()
    {
        $fail = array();
        if ($this->session->has('user_data')) {
            array_push($fail, ['fail' => false, 'user' => $this->session->get('user_data')]);
            return $this->response->setJSON($fail[0]);
        } else {
            array_push($fail, ['fail' => true]);
            return $this->response->setJSON($fail[0]);
        }
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

        if ($correct) {
            $res[0]->password = null;
            $res[0]->fail = false;
            $this->session->set('user_data', $res[0]);
            return $this->response->setJSON($this->session->get('user_data'));
            // $this->response->setJSON($res[0]);
        } else {
            $fail = array();
            array_push($fail, ['fail' => "Fel lösenord!"]);
            return $this->response->setJSON($fail[0]);
        }
    }

    public function user_logout()
    {
        $fail = array();
        if ($this->session->has('user_data')) {
            // $this->session->remove('user_data');
            $this->session->destroy();
            array_push($fail, ['fail' => false]);
            return $this->response->setJSON($fail[0]);
        } else {
            array_push($fail, ['fail' => true]);
            return $this->response->setJSON($fail[0]);
        }
    }

    // public function user_update()
    // {
    //     $user_model = model('UserModel');
    //     $json = file_get_contents('php://input');
    //     $data = json_decode($json);

    //     $user = $user_model->get_user($data->user_id);
    //     $correct = password_verify($data->current_password, $user[0]->password);

    //     $res = array();
    //     if ($correct) {
    //         $data->new_password = password_hash($data->new_password, PASSWORD_DEFAULT);
    //         $change = $user_model->user_update($data);
    //         array_push($res, ['fail' => false]);
    //     } else {
    //         array_push($res, ['fail' => true]);
    //     }
    //     return $this->response->setJSON($res[0]);
    // }

    public function user_theme_update()
    {
        $user_model = model('UserModel');

        $json = file_get_contents('php://input');
        $data = json_decode($json);

        $user = $user_model->get_user($data->user_id);

        $user[0]->theme == 0 ? $newTheme = 1 : $newTheme = 0;
        
        $success = $user_model->user_theme_update($data->user_id, $newTheme);

        if ($success) {
            $res = array();
            $res['newTheme'] = $newTheme;
            return $this->response->setJSON($res);
        }

    }

    public function user_update()
    {
        $user_model = model('UserModel');
        $user_id = $_POST['user_id'];
        $current_password = $_POST['current_password'];
        $new_password = $_POST['new_password'];
        $file = $this->request->getFile('image');
        $user = $user_model->get_user($user_id);

        // print_r("{$user[0]->image}");

        $res = array();
        if ($user[0]) {
            $data = array();
            $data['user_id'] = $user_id;
            if (!$file) {
                $res['image_fail'] = true;
            } else {
                if (! $file->isValid()) {
                $res['image_fail'] = true;
                throw new \RuntimeException($file->getErrorString().'('.$file->getError().')');
                } else {
                    unlink("../public/static/media/{$user[0]->image}");
                    // $files->removeFile(APPPATH . 'Filters/DevelopToolbar');
                    $newName = $file->getRandomName();
                    $file->move(WRITEPATH.'../public/static/media', $newName);
                    $data['image'] = $newName;
                    $res['image_fail'] = false;
                }
            }
            if (!$new_password || !$current_password) {
                $res['password_fail'] = true;
            } else {
                $correct = password_verify($current_password, $user[0]->password);
                if ($correct) {
                    $new_password = password_hash($new_password, PASSWORD_DEFAULT);
                    $data['new_password'] = $new_password;
                    $res['password_fail'] = false;
                } else {
                    $res['password_fail'] = true;
                }
            }
        }
        $user_model->user_update($data);
        return $this->response->setJSON($res);
    }

    public function create_user()
    {
        $user_model = model('UserModel');

        // $json = file_get_contents('php://input');

        

        // $data = json_decode($json);

        // print_r($this->request->getFile('image'));

        // print_r($_POST['name']);
        $datadata = array();

        $name = $_POST['name'];
        $email = $_POST['email'];
        $type = $_POST['type'];
        $course = $_POST['course'];

        // print_r($this->request->getVar('name'));

        $user_name_exists = $user_model->get_user_by_name($name);

        if ($user_name_exists) {
            $fail = array();
            array_push($fail, ['fail' => "$name finns redan!"]);
            return $this->response->setJSON($fail[0]);
        }

        // $password = $data->password;
        // print_r($password);
        // $data->password = password_hash($data->password, PASSWORD_DEFAULT);
        $password = password_hash($_POST['password'], PASSWORD_DEFAULT);
        // print_r($hash);

        // $data->password = $hash;


        $file = $this->request->getFile('image');
        if (! $file->isValid()) {
            throw new \RuntimeException($file->getErrorString().'('.$file->getError().')');
        };
        $newName = $file->getRandomName();
        // $file->move(WRITEPATH.'uploads/profile_pics', $newName);
        $file->move(WRITEPATH.'../public/static/media', $newName);
        
        array_push($datadata, ['name' => $name, 'password' => $password, 'email' => $email, 'type' => $type, 'image' => $newName, 'course' => $course]);


        $id = $user_model->create_user($datadata[0]);

        // $res = [
        //     'user' => $user_model->get_user($id)
        // ];

        $user = $user_model->get_user($id);
        // // print_r($user[0]->password);

        

        $user[0]->password = null;
        $user[0]->fail = false;

        // $this->session->set('user_data', $user[0]);

        // $res = [
        //     'user' => $user[0]
        // ];



        // $res->user[0]->password = null;

        // $user_model = model('UserModel');

        // $data = [
        //     'user' => $user_model->create_user($req)
        // ];

        // // echo view('show_users', $data);
        return $this->response->setJSON($user[0]);
    }

    public function delete_all_users()
    {
        $user_model = model('UserModel');

        // $user_model->delete_all_users();
        return $user_model->delete_all_users();
    }
}
