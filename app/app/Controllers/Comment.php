<?php

namespace App\Controllers;

// if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
//         header('Access-Control-Allow-Origin: *');
//         header('Access-Control-Allow-Methods: POST, GET, DELETE, PUT, PATCH, OPTIONS');
//         header('Access-Control-Allow-Headers: token, Content-Type');
//         header('Access-Control-Max-Age: 1728000');
//         header('Content-Length: 0');
//         header('Content-Type: text/plain');
//         die();
//     }

//     header('Access-Control-Allow-Origin: *');
//     header('Content-Type: application/json');

// Header('Access-Control-Allow-Origin: *'); //for allow any domain, insecure
// Header('Access-Control-Allow-Headers: *'); //for allow any headers, insecure
// Header('Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE'); //method allowed
// Header('Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE');

// public function consoleLog($msg) 
// {
//     echo '<script type="text/javascript">' .
//     'console.log(' . $msg . ');</script>';
// }

class Comment extends BaseController
{
    public function __construct()
    {
        header('Access-Control-Allow-Origin: *');
        header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method, Authorization");
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
        $method = $_SERVER['REQUEST_METHOD'];
        if ($method == "OPTIONS") {
            die();
        }

    // if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    //     header('Access-Control-Allow-Origin: *');
    //     header('Access-Control-Allow-Methods: POST, GET, DELETE, PUT, PATCH, OPTIONS');
    //     header('Access-Control-Allow-Headers: token, Content-Type');
    //     header('Access-Control-Max-Age: 1728000');
    //     header('Content-Length: 0');
    //     header('Content-Type: text/plain');
    //     die();
    // }

    // header('Access-Control-Allow-Origin: *');
    // header('Content-Type: application/json');
    }

    public function get_all_comments()
    {
        $comment_model = model('CommentModel');
        $data = [
            'comments' => $comment_model->get_all_comments()
        ];
        return $this->response->setJSON($data);
    }

    public function get_post_comments()
    {
        $comment_model = model('CommentModel');
       
        if (isset($_GET['post'])) {
            $post_id = $_GET['post'];
            // $user_id = explode("-", $_GET['data'])[1];
        } else {
            echo "bajs";
        };

        $data = [
            'comments' => $comment_model->get_post_comments($post_id)
        ];
        return $this->response->setJSON($data);
    }

    // public function create_comment()
    // {
    //     $comment_model = model('CommentModel');
    //     $hashtag_model = model('HashtagModel');

    //     $json = file_get_contents('php://input');
    //     $data = json_decode($json);

    //     $result = $comment_model->create_comment($data);

    //     if ($result) {
    //         if (!$data->hasCommented) {
    //             foreach ($data->hashtags as $hashtag) {
    //                 $user_hashtag_exists = $hashtag_model->check_if_userhashtag_exists($hashtag->hashtag_id, $data->user_id);

    //                 if (!$user_hashtag_exists) {
    //                     $user_hashtag = $hashtag_model->create_user_hashtag($hashtag->hashtag_id, $data->user_id);
    //                 } else {
    //                     $user_hashtag_updated_int = $hashtag_model->update_user_hashtag_interactions($hashtag->hashtag_id, $data->user_id);
    //                 };
    //             }
    //         }

    //         return $this->response->setJSON($result);
    //     } 
    // }

    public function create_comment()
    {
        $comment_model = model('CommentModel');
        $hashtag_model = model('HashtagModel');

        $datadata = array();

        $post_id = $_POST['post_id'];
        $user_id = $_POST['user_id'];
        $text = $_POST['text'];
        $time = $_POST['time'];
        // $hashtags = $_POST['hashtags'];
        $hashtags = json_decode($_POST['hashtags']);
        $no_interaction_upd = $_POST['noInteractionUpd'];

        $file = $this->request->getFile('image');
        if (!$file) {
            $newName = null;
        } else {
            if (! $file->isValid()) {
                throw new \RuntimeException($file->getErrorString().'('.$file->getError().')');
            };
            $newName = $file->getRandomName();
            $file->move(WRITEPATH.'../public/static/media', $newName);
        }
        

        array_push($datadata, ['post_id' => $post_id, 'user_id' => $user_id, 'text' => $text, 'time' => $time, 'hashtags' => $hashtags, 'image' => $newName]);

        $result = $comment_model->create_comment($datadata[0]);

        if ($result) {
            if (!$no_interaction_upd) {
                foreach ($hashtags as $hashtag) {
                    $user_hashtag_exists = $hashtag_model->check_if_userhashtag_exists($hashtag, $user_id);

                    if (!$user_hashtag_exists) {
                        $user_hashtag = $hashtag_model->create_user_hashtag($hashtag, $user_id);
                    } else {
                        $user_hashtag_updated_int = $hashtag_model->update_user_hashtag_interactions($hashtag, $user_id);
                    };
                }
            }
            
            return $this->response->setJSON($result);
        } 

        // if ($result) {
        //     if (!$has_commented) {
        //         foreach ($hashtags as $hashtag) {
        //             $user_hashtag_exists = $hashtag_model->check_if_userhashtag_exists($hashtag->hashtag_id, $user_id);

        //             if (!$user_hashtag_exists) {
        //                 $user_hashtag = $hashtag_model->create_user_hashtag($hashtag->hashtag_id, $user_id);
        //             } else {
        //                 $user_hashtag_updated_int = $hashtag_model->update_user_hashtag_interactions($hashtag->hashtag_id, $user_id);
        //             };
        //         }
        //     }

        //     return $this->response->setJSON($result);
        // } 
    }

    public function delete_comment()
    {
        $comment_model = model('CommentModel');

        if (isset($_GET['id'])) {
            $comment_id = $_GET['id'];
        } else {
            echo "bajs";
        }

        $res = $comment_model->delete_comment($comment_id);
        return $this->response->setJSON($res);
    }

    // public function get_post_hashtags_and_user()
    // {
    //     $post_model = model('PostModel');
    //     $hashtag_model = model('HashtagModel');
    //     $user_model = model('UserModel');
    //     // if (isset($_GET['data'])) {
    //     //     $post_id = explode("-", $_GET['data'])[0];
    //     //     $user_id = explode("-", $_GET['data'])[1];
    //     // } else {
    //     //     echo "bajs";
    //     // }
    //     $posts = $post_model->get_all_posts();

    //     $arr = array();
    //     foreach ($posts as $post) {
    //         $post_hashtags = $hashtag_model->get_post_hashtags($post->post_id);
    //         $hashtags = array();
    //         foreach ($post_hashtags as $ph) {
    //             array_push($hashtags, $hashtag_model->get_hashtag($ph->hashtag_id)[0]);
    //         };
    //         array_push($arr, (object)['post' => $post, 'hashtags' => $hashtags, 'user' => $user_model->get_user($post->user_id)[0]]);
    //     };
    //     return $this->response->setJSON($arr);
    // }

    // public function get_post()
    // {
    //     $post_model = model('PostModel');
    //     $hashtag_model = model('HashtagModel');

    //     if (isset($_GET['post'])) {
    //         $post_id = $_GET['post'];
    //     } else {
    //         echo "bajs";
    //     }

    //     $data = [
    //         'post' => $post_model->get_post($post_id),
    //         'hashtags' => $hashtag_model->get_post_hashtags($post_id)
    //     ];

    //     return $this->response->setJSON($data);
    // }

    // public function create_post()
    // {
    //     $post_model = model('PostModel');

    //     $json = file_get_contents('php://input');
    //     $data = json_decode($json);

    //     $result = $post_model->create_post($data);
    //     if ($result) {
    //         return $this->response->setJSON($result);
    //     } 
    // }

    // public function delete_all_posts()
    // {
    //     $post_model = model('PostModel');

    //     $post_model->delete_all_posts();
    //     return $this->response->setJSON($data);
    // }

    public function delete_all_comments()
    {
        $comment_model = model('CommentModel');

        $comment_model->delete_all_comments();
        return $this->response->setJSON($data);
    }
}
