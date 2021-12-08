<?php



namespace App\Controllers;

Header('Access-Control-Allow-Origin: *'); //for allow any domain, insecure
Header('Access-Control-Allow-Headers: *'); //for allow any headers, insecure
Header('Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE'); //method allowed

class Home extends BaseController
{
    public function index()
    {
        // return view('home');
        // $this->testDatabase('mysql', 'user', 'pass', 'glimradb');
        
        $user_model = model('UserModel');

        $data = [
            'users' => $user_model->get_all_users()
        ];

        // echo view('show_users', $data);
        return $this->response->setJSON($data);
    
    }

    private function testDatabase(?string $hostname = null, ?string $username = null, ?string $password = null, ?string $database = null)
    {
    $conn = mysqli_connect($hostname, $username, $password, $database);

    // Check connection
    if ($conn->connect_error) {
    var_dump("Connection failed: " . $conn->connect_error);
    die();
    }
    var_dump("Connected successfully");

    // $sql = "SELECT * FROM user";
    // if (mysqli_query($conn, $sql)) {
    // var_dump($sql);
    // } else {
    // dd("Error:", $sql, mysqli_error($conn));
    // }

    // Check insert
    
    // if (mysqli_query($conn, $sql)) {
    // $last_id = mysqli_insert_id($conn);
    // var_dump("New record created successfully. Last inserted ID is: " . $last_id);
    // } else {
    // var_dump(mysqli_error($conn));
    // die();
    // }
    }

    public function test()
    {


        $data = [
            'success' => true,
            'id' => 123,
        ];
        // $this->response->setHeader('Content-Type', 'text/html');

        return $this->response->setJSON($data);

        
        // echo json_encode(array('hometown' => "hehe", 'category' => "jejje"));
    }
    // public function test2()
    // {
    //     $user_model = model('UserModel');

    //     $data = [
    //         'users' => $user_model->get_all_users()
    //     ];

    //     // echo view('show_users', $data);
    //     echo $data;
    // }
}



// <IfModule authz_core_module>
//     Require all denied
// </IfModule>
// <IfModule !authz_core_module>
//     Deny from all
// </IfModule>






