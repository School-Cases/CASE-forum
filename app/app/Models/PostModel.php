<?php

namespace App\Models;

use CodeIgniter\Model;

class PostModel extends Model
{
    protected $db;

    public function __construct()
    {
        $this->db = db_connect();
    }

    public function get_all_posts()
    {
        $query = $this->db->query('SELECT * FROM post');
        return $query->getResult();
    }

    // public function get_certain_posts($data)
    // {
    //     $query = $this->db->query('SELECT * FROM post WHERE');
    //     return $query->getResult();
    // }

    public function get_post($id)
    {
        $query = $this->db->query("SELECT * FROM post WHERE post_id=$id");
        return $query->getResult();
    }

    public function create_post($data)
    {
        $query = $this->db->query("INSERT INTO post (user_id , text , time) VALUES ($data->user_id, '$data->text', '$data->time')");

        if ($query) {
            $id = $this->db->insertid();
        };

        return $id;
    }

    public function delete_all_posts()
    {
        $query = $this->db->query('DELETE FROM post');
        return $query;
    }
}