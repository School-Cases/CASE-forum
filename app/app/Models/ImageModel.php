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

class ImageModel extends Model
{
    protected $db;

    public function __construct()
    {
        $this->db = db_connect();
    }

    public function get_all_images()
    {
        $query = $this->db->query('SELECT * FROM image');
        return $query->getResult();
    }

    public function get_post_images($post_id)
    {
        $query = $this->db->query("SELECT * FROM image WHERE post_id = $post_id");
        return $query->getResult();
    }

    public function get_comment_images($comment_id)
    {
        $query = $this->db->query("SELECT * FROM image WHERE comment_id = $comment_id");
        return $query->getResult();
    }

    public function get_image($id)
    {
        $query = $this->db->query("SELECT * FROM image WHERE image_id=$id");
        return $query->getResult();
    }

    public function get_image_by_name($name)
    {
        $query = $this->db->query("SELECT * FROM image WHERE name='$name'");
        return $query->getResult();
    }

    public function create_image($data)
    {
        $query = $this->db->query("INSERT INTO image (name, post_id, comment_id) VALUES ('$data[name]', $data[post_id], $data[comment_id])");

        // $query = $this->db->query("INSERT INTO image (name, post_id, comment_id) VALUES ('$data->name', $data->post_id, $data->comment_id)");

        if ($query) {
            $id = $this->db->insertid();
        };

        return $id;
    }

    public function delete_all_images()
    {
        $query = $this->db->query('DELETE FROM image');
        return $query;
    }
}