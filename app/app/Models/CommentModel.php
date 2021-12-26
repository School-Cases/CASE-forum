<?php

namespace App\Models;

use CodeIgniter\Model;

class CommentModel extends Model
{
    protected $db;

    public function __construct()
    {
        $this->db = db_connect();
    }

    public function get_all_comments()
    {
        $query = $this->db->query('SELECT * FROM comment');
        return $query->getResult();
    }

    public function get_post_comments($post_id)
    {
        $data = array();
        $query = $this->db->query("SELECT * FROM comment 
        INNER JOIN user ON comment.user_id = user.user_id 
        WHERE comment.post_id=$post_id");

        foreach ($query->getResult() as $comment) {
            $comment->reactions = array();
            $query2 = $this->db->query("SELECT * FROM reaction WHERE comment_id = $comment->comment_id");
            $comment->reactions = $query2->getResult();
            $data[] = $comment;
        }
        return $query->getResult();
    }

    public function create_comment($data)
    {
        $query = $this->db->query("INSERT INTO comment (post_id, user_id, text, time, comment_image) VALUES ($data[post_id], $data[user_id], '$data[text]', '$data[time]', '$data[image]')");
        
        if ($query) {
            $id = $this->db->insertid();
        };

        return $id;
    }

    public function delete_comment($id)
    {
        $query = $this->db->query("DELETE FROM comment WHERE comment_id=$id");
        return $query;
    }

        public function delete_all_comments()
    {
        $query = $this->db->query('DELETE FROM comment');
        return $query;
    }
}