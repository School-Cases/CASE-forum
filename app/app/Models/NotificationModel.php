<?php

namespace App\Models;

use CodeIgniter\Model;

class NotificationModel extends Model
{
    protected $db;

    public function __construct()
    {
        $this->db = db_connect();
    }

    public function get_all_notifications()
    {
        $query = $this->db->query('SELECT * FROM notification');
        return $query->getResult();
    }

    // public function get_user_notifications($user_id)
    // {
    //     $query = $this->db->query("SELECT notification.*, post.text FROM notification 
    //     LEFT JOIN post
    //     ON notification.post_id = post.post_id 
    //     WHERE notification.user_id = $user_id AND notification.new = 0
    //     -- ORDER BY notification.notification_id DESC
    //     GROUP BY notification.post_id, notification.type 
    //     ");
    //     return $query->getResult();
    // }

    // ********* WORKS
    // public function get_user_notifications($user_id)
    // {
        
    //     $query = $this->db->query("SELECT notification.*, post.text, COUNT(notification.post_id AND notification.type) AS NrOfDub FROM notification 
    //     LEFT JOIN post
    //     ON notification.post_id = post.post_id 
    //     -- LEFT JOIN comment
    //     -- ON notification.comment_id = comment.comment_id 
    //     WHERE notification.user_id = $user_id AND notification.new = 0
        
    //     GROUP BY notification.post_id, notification.type 
    //     ORDER BY notification.notification_id DESC
    //     ");
    //     return $query->getResult();
    // }


    // works also ******************'
    public function get_user_notifications($user_id)
    {
        // $data2 = array();
        $query = $this->db->query("SELECT notification.*, post.text, COUNT(notification.post_id AND notification.type) AS NrOfDub FROM notification 
        LEFT JOIN post
        ON notification.post_id = post.post_id 
        WHERE notification.user_id = $user_id AND notification.new = 0 
        AND notification.post_id <> 'null'
        GROUP BY notification.post_id, notification.type 
        ORDER BY notification.notification_id DESC
        ");

        $query2 = $this->db->query("SELECT notification.*, comment.text, COUNT(notification.comment_id AND notification.type) AS NrOfDub FROM notification 
        LEFT JOIN comment
        ON notification.comment_id = comment.comment_id 
        WHERE notification.user_id = $user_id AND notification.new = 0 
        AND notification.comment_id <> 'null'
        GROUP BY notification.comment_id, notification.type 
        ORDER BY notification.notification_id DESC
        -- LIMIT 0, 10
        ");
        // $data = array();
        $data = array_merge($query2->getResult(), $query->getResult());

        usort($data, function($a, $b) {
            return strcmp($b->notification_id, $a->notification_id);
        });

        foreach ($data as $noti) {
            $noti->post = array();
            $query3 = $this->db->query("SELECT post.*, user.name FROM post
            LEFT JOIN user ON user.user_id = post.user_id 
            WHERE post_id = $noti->origin");
            $noti->post = $query3->getResult()[0];
        }

        return $data;
        // return $query2->getResult();
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

    public function create_notification($user_id, $data)
    {
        $query = $this->db->query("INSERT INTO notification (user_id, post_id, comment_id, type, time, post_user, origin) VALUES ($user_id, $data->post_id, $data->comment_id, $data->type, '$data->time', '$data->post_user', $data->origin)");

        if ($query) {
            $id = $this->db->insertid();
        };

        return $id;
    }

    public function delete_all_notifications()
    {
        $query = $this->db->query('DELETE FROM notification');
        return $query;
    }

    public function delete_notification($compost, $compost_id, $type)
    {
        {
        $query = $this->db->query("DELETE FROM notification WHERE $compost=$compost_id AND type=$type");
        return $query;
    }
    }
}