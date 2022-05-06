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
    public function get_comment($id)
    {
        $query = $this->db->query("SELECT * FROM comment WHERE comment_id = $id");
        return $query->getResult();
    }

    public function get_all_comments()
    {
        $query = $this->db->query('SELECT * FROM comment');
        return $query->getResult();
    }

    public function get_post_comments($post_id)
    {
        $data = array();
        $query = $this->db->query("SELECT comment.*,
        user.user_id, user.image, user.name 
        FROM comment
        
        -- INNER JOIN (SELECT user_id, image FROM user) ON comment.user_id = user.user_id 
        INNER JOIN user ON comment.user_id = user.user_id 
        
        WHERE comment.post_id=$post_id 
        ORDER BY comment_id ASC"); 

        foreach ($query->getResult() as $comment) {
            $comment->reactions = array();
            $query2 = $this->db->query("SELECT * FROM reaction WHERE comment_id = $comment->comment_id");
            $comment->reactions = $query2->getResult();

            $comment->images = array();
            $query3 = $this->db->query("SELECT name FROM image WHERE comment_id = $comment->comment_id");
            $comment->images = $query3->getResult();

            // $data[] = $comment;
        }
        return $query->getResult();
    }

    public function create_comment($data)
    {
        $query = $this->db->query("INSERT INTO comment (post_id, user_id, text, time) VALUES ($data[post_id], $data[user_id], '$data[text]', '$data[time]')");
        
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