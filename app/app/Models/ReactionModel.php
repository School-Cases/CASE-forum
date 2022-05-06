<?php

namespace App\Models;

use CodeIgniter\Model;

class ReactionModel extends Model
{
    protected $db;

    public function __construct()
    {
        $this->db = db_connect();
    }

    public function get_reaction($id)
    {
        $query = $this->db->query("SELECT * FROM reaction WHERE reaction_id = $id");
        return $query->getResult();
    }

    public function get_all_reactions()
    {
        $query = $this->db->query('SELECT * FROM reaction');
        return $query->getResult();
    }

    public function get_post_reactions($post_id)
    {
        $query = $this->db->query("SELECT * FROM reaction WHERE post_id=$post_id");
        return $query->getResult();
    }

    public function create_reaction($data)
    {
        $query = $this->db->query("INSERT INTO reaction (post_id, user_id, type, comment_id, reaction) VALUES ($data->post_id, $data->user_id, $data->type, $data->comment_id, $data->reaction)");
        
        if ($query) {
            $id = $this->db->insertid();
        };

        return $id;
    }
}