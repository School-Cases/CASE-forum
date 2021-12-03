<?php

namespace App\Models;

use CodeIgniter\Model;

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
}