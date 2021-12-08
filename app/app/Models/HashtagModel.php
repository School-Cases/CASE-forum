<?php

namespace App\Models;

use CodeIgniter\Model;

class HashtagModel extends Model
{
    protected $db;

    public function __construct()
    {
        $this->db = db_connect();
    }

    public function get_all_hashtags()
    {
        $query = $this->db->query('SELECT * FROM hashtag');
        return $query->getResult();
    }

    public function get_hashtag($hashtag_id)
    {
        $query = $this->db->query("SELECT * FROM hashtag WHERE hashtag_id=$hashtag_id");
        return $query->getResult();
    }

    public function get_certain_hashtags($content)
    {
        $query = $this->db->query("SELECT * FROM hashtag WHERE content LIKE '%$content%'");
        return $query->getResult();
    }

    public function check_if_hashtag_exists($content)
    {
        $query = $this->db->query("SELECT * FROM hashtag WHERE content = '$content'");
        return $query->getResult();
    }

    public function create_hashtag($data)
    {
        $query = $this->db->query("INSERT INTO hashtag (content) VALUES ('$data->content')");
        
        if ($query) {
            $id = $this->db->insertid();
        };

        return $id;
    }

    public function delete_all_hashtags()
    {
        $query = $this->db->query('DELETE FROM hashtag');
        return $query;
    }

    public function update_hashtag_interactions($hashtag_id)
    {
        $query = $this->db->query("UPDATE hashtag SET interactions = interactions + 1 WHERE hashtag_id = $hashtag_id");
        return $query;
    }
    

    // post_hashtag

    public function check_if_posthashtag_exists($hashtag_id, $post_id)
    {
        $query = $this->db->query("SELECT * FROM post_hashtag WHERE hashtag_id = $hashtag_id AND post_id = $post_id");
        return $query->getResult();
    }

    public function create_post_hashtag($hashtag_id, $post_id)
    {
        $query = $this->db->query("INSERT INTO post_hashtag (hashtag_id, post_id) VALUES ($hashtag_id, $post_id)");
        return $query;
    }

    public function get_all_post_hashtags()
    {
        $query = $this->db->query('SELECT * FROM post_hashtag');
        return $query->getResult();
    }

    public function get_post_hashtags($post_id)
    {
        $query = $this->db->query("SELECT * FROM post_hashtag WHERE post_id = $post_id");
        return $query->getResult();
    }

    // user_hashtag

    public function check_if_userhashtag_exists($hashtag_id, $user_id)
    {
        $query = $this->db->query("SELECT * FROM user_hashtag WHERE user_id = $user_id AND hashtag_id = $hashtag_id");
        return $query->getResult();
    }

    public function create_user_hashtag($hashtag_id, $user_id)
    {
        $query = $this->db->query("INSERT INTO user_hashtag (user_id, hashtag_id) VALUES ($user_id, $hashtag_id)");
        return $query;
    }

    public function get_all_user_hashtags()
    {
        $query = $this->db->query('SELECT * FROM user_hashtag');
        return $query->getResult();
    }

    public function update_user_hashtag_interactions($hashtag_id, $user_id)
    {
        $query = $this->db->query("UPDATE user_hashtag SET interactions = interactions + 1 WHERE hashtag_id = $hashtag_id AND user_id = $user_id");
        return $query;
    }
}