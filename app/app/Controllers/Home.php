<?php



namespace App\Controllers;

class Home extends BaseController
{
    public function index()
    {
        return view('home');
        // echo "123";
    }

    // public function test()
    // {
    //     $user_model = model('UserModel');

    //     $data = [
    //         'users' => $user_model->get_users()
    //     ];

    //     echo view('show_users', $data);
    // }
    public function test()
    {

//         if (isset($_SERVER['HTTP_ORIGIN'])) { 
//     header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
//     header('Access-Control-Allow-Credentials: true');
//     header('Access-Control-Max-Age: 86400');    // cache for 1 day
// }
// if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
//     if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
//         header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS"); 
//     if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
//         header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
// }

        // $arr=array("name"=>"Deepak", "age"=>21, "marks"=>75);
        // $obj=(object)$arr;

        // header('Content-Type: application/json');
        echo json_encode({"name":"Deepak","age":21,"marks":75});
    }
}
