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

    public function get_certain_posts($hashtag, $page)
    
    {

        // $hashtags = implode("', '", $hashtag);
        // print_r($hashtag);
        $query = $this->db->query("
        SELECT * FROM post WHERE post_id IN (
        SELECT post_id FROM post_hashtag WHERE hashtag_id IN($hashtag)
        ) ORDER BY post_id DESC LIMIT $page, 10");
        return $query->getResult();
    }

    public function get_all_posts($page)
    {
        // $query = $this->db->query("SELECT * FROM post LIMIT $page, 10");
        $query = $this->db->query("SELECT * FROM post ORDER BY post_id DESC LIMIT $page, 10");
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

    public function get_post_text($id)
    {
        $query = $this->db->query("SELECT text FROM post WHERE post_id=$id");
        return $query->getResult();
    }

    // public function create_post($data)
    // {
    //     $query = $this->db->query("INSERT INTO post (user_id , text , time) VALUES ($data->user_id, '$data->text', '$data->time')");

    //     if ($query) {
    //         $id = $this->db->insertid();
    //     };

    //     return $id;
    // }

    public function create_post($data)
    {
        print_r($data);
        // $query = $this->db->query("INSERT INTO post (user_id , text , time, image) VALUES ($data[user_id], '$data[text]', '$data[time]', '$data[image]')");
        $query = $this->db->query("INSERT INTO post (user_id , text , time, image) VALUES ($data[user_id], '$data[text]', '$data[time]', '$data[image]')");

        if ($query) {
            $id = $this->db->insertid();
        };

        return $id;
    }

    public function delete_post($id)
    {
        $query = $this->db->query("DELETE FROM post WHERE post_id=$id");
        return $query;
    }

    public function delete_all_posts()
    {
        $query = $this->db->query('DELETE FROM post');
        return $query;
    }
}