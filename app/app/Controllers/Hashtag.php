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

    public function create_hashtag()
    {
        $hashtag_model = model('HashtagModel');
        $json = file_get_contents('php://input');
        $data = json_decode($json);

        $res = $hashtag_model->create_hashtag($data->content);

        return $this->response->setJSON($res);
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
            $hashtag_response_id = $hashtag_model->create_hashtag($data);
            $hashtag_id = $hashtag_response_id;
        } else {
            $hashtag_id = $hashtag_exists[0]->hashtag_id;
            $hashtag_updated_int = $hashtag_model->update_hashtag_interactions($hashtag_id);
        }

        $post_hashtag_exists = $hashtag_model->check_if_posthashtag_exists($hashtag_id, $data->post_id);

        if (!$post_hashtag_exists) {
            $post_hashtag = $hashtag_model->create_post_hashtag($hashtag_id, $data->post_id);
        }

        $user_hashtag_exists = $hashtag_model->check_if_userhashtag_exists($hashtag_id, $data->user_id);

        if (!$user_hashtag_exists) {
            $user_hashtag = $hashtag_model->create_user_hashtag($hashtag_id, $data->user_id);
        } else {
            $user_hashtag_updated_int = $hashtag_model->update_user_hashtag_interactions($hashtag_id, $data->user_id);
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

    public function get_user_main_hashtags()
    {
        $hashtag_model = model('HashtagModel');
        $user_model = model('UserModel');

        if (isset($_GET['user_id'])) {
            $user_id = $_GET['user_id'];
        } else {
            echo "bajs";
        }
        $main_hashtags = array();

        $user = $user_model->get_user($user_id)[0];

        if ($user->type === "0") {
            $type_hashtag = $hashtag_model->get_certain_hashtags("#deltagare")[0];
            $course_hashtag = $hashtag_model->get_certain_hashtags($user->course)[0];
            $main_hashtags[] = $type_hashtag;
            $main_hashtags[] = $course_hashtag;
        } else {
            $type_hashtag = $hashtag_model->get_certain_hashtags("#personal")[0];
            $main_hashtags[] = $type_hashtag;
        }

        $hashtags = $hashtag_model->get_user_main_hashtags($user_id);

        // print_r($hashtags);

        $fav_hashtags = array();
        foreach ($hashtags as $hashtag) {
            $hash = $hashtag_model->get_hashtag($hashtag->hashtag_id);
            // print_r($hash);
            array_push($fav_hashtags, $hash[0]);
        }

        // print_r($main_hashtags);
        $data = [
            'fav_hashtags' => $fav_hashtags,
            'main_hashtags' => $main_hashtags
        ];

        return $this->response->setJSON($data);
    }
}
