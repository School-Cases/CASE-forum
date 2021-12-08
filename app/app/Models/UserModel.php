<?php

namespace App\Models;

use CodeIgniter\Model;

// class DBConnection {
//     private $db;
//     static private $instance = null;

//     private function __construct() {
//         $this->connection = new mysqli("glimra","mysql_glimra", "glimpass", 'glimra');
//         mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
        
//         // Check connection
//         if ($this->connection -> connect_errno) {
//           echo "Failed to connect to MySQL: " . $this->db -> connect_error;
//           exit();
//         }
//     }

//      // The object is created from within the class itself
//     // only if the class has no instance.
//     public static function getInstance()
//     {
//         if (self::$instance == null)
//         {
//             self::$instance = new DBConnection();
//         }
    
//         return self::$instance->connection;
//     }
// }

class UserModel extends Model
{
    protected $db;

    public function __construct()
    {
        $this->db = db_connect();
    }

    public function get_all_users()
    {
        $query = $this->db->query('SELECT * FROM user');
        return $query->getResult();
    }

    public function get_user($id)
    {
        $query = $this->db->query("SELECT * FROM user WHERE user_id=$id");
        return $query->getResult();
        // getRow()
    }

    public function create_user($data)
    {
        // var_dump($data)
        // $sql = "INSERT INTO user (name, email, type) VALUES ($data->name, $data->email, $data->type)"
        $query = $this->db->query("INSERT INTO user (name , email , type) VALUES ('$data->name', '$data->email', $data->type)");
        return $query;
    }
}