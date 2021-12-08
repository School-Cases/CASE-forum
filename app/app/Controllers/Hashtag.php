<?php

namespace App\Controllers;


// Header('Access-Control-Allow-Origin: *'); //for allow any domain, insecure
// Header('Access-Control-Allow-Headers: *'); //for allow any headers, insecure
// Header('Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE'); //method allowed
// Header('Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE');

// public function consoleLog($msg) 
// {
//     echo '<script type="text/javascript">' .
//     'console.log(' . $msg . ');</script>';
// }

class Hashtag extends BaseController
{
    public function __construct()
    {
        if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: POST, GET, DELETE, PUT, PATCH, OPTIONS');
        header('Access-Control-Allow-Headers: token, Content-Type');
        header('Access-Control-Max-Age: 1728000');
        header('Content-Length: 0');
        header('Content-Type: text/plain');
        die();
        }

        header('Access-Control-Allow-Origin: *');
        header('Content-Type: application/json');

    }

    public function get_all_hashtags()
    {
        $hashtag_model = model('HashtagModel');

        $data = [
            'hashtags' => $hashtag_model->get_all_hashtags()
        ];

        // echo view('show_users', $data);
        return $this->response->setJSON($data);
    }

    public function get_certain_hashtags()
    {
        $hashtag_model = model('HashtagModel');
        if (isset($_GET['input'])) {
            $content = $_GET['input'];
        } else {
            echo "bajs";
        }

        $data = [
            'hashtags' => $hashtag_model->get_certain_hashtags($content)
        ];

        return $this->response->setJSON($data);
    }

    public function handle_hashtag()
    {
        $hashtag_model = model('HashtagModel');

        $json = file_get_contents('php://input');
        $data = json_decode($json);

        $hashtag_exists = $hashtag_model->check_if_hashtag_exists($data->content);

        if (!$hashtag_exists) {
            echo "true";
            $hashtag_response_id = $hashtag_model->create_hashtag($data);
            $hashtag_id = $hashtag_response_id;
        } else {
            $hashtag_id = $hashtag_exists[0]->hashtag_id;
            $hashtag_updated_int = $hashtag_model->update_hashtag_interactions($hashtag_id);
        }

        $post_hashtag_exists = $hashtag_model->check_if_posthashtag_exists($hashtag_id, $data->post_id);

        if (!$post_hashtag_exists) {
            $post_hashtag = $hashtag_model->create_post_hashtag($hashtag_id, $data->post_id);
            print_r($post_hashtag);
        }

        $user_hashtag_exists = $hashtag_model->check_if_userhashtag_exists($hashtag_id, $data->user_id);

        if (!$user_hashtag_exists) {
            $user_hashtag = $hashtag_model->create_user_hashtag($hashtag_id, $data->user_id);
            print_r($user_hashtag);
        } else {
            $user_hashtag_updated_int = $hashtag_model->update_user_hashtag_interactions($hashtag_id, $data->user_id);
            print_r($user_hashtag_updated_int);
        };
    }

    public function delete_all_hashtags()
    {
        $hashtag_model = model('HashtagModel');

        $hashtag_model->delete_all_hashtags();
        return $this->response->setJSON($data);
    }

    public function get_all_post_hashtags()
    {
        $hashtag_model = model('HashtagModel');

        $data = [
            'post_hashtags' => $hashtag_model->get_all_post_hashtags()
        ];

        // echo view('show_users', $data);
        return $this->response->setJSON($data);
    }

    public function get_all_user_hashtags()
    {
        $hashtag_model = model('HashtagModel');

        $data = [
            'user_hashtags' => $hashtag_model->get_all_user_hashtags()
        ];

        // echo view('show_users', $data);
        return $this->response->setJSON($data);
    }
}
