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

class Post extends BaseController
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

    public function get_all_posts()
    {
        $post_model = model('PostModel');
        $data = [
            'posts' => $post_model->get_all_posts()
        ];
        return $this->response->setJSON($data);
    }

    public function get_posts_data()
    {
        $post_model = model('PostModel');
        $hashtag_model = model('HashtagModel');
        $user_model = model('UserModel');
        $comment_model = model('CommentModel');
        $reaction_model = model('ReactionModel');

        if (isset($_GET['page'])) {
            $page = $_GET['page'];
        } else {
            echo "bajs";
        }

        $originalPage = $page;
        
        if ($page != 0) {
            $page = $page * 10;
        }

        $posts = $post_model->get_all_posts($page);

        $nextPageExists = false;
        $nextPage = $post_model->get_all_posts(($originalPage + 1) * 10);
        // print_r($nextPage);
        if (count($nextPage)) {
            $nextPageExists = true;
            // print_r("next p true");
        }

        $resData = array();
        $data = array();
        foreach ($posts as $post) {
            // hashtag
            $post_hashtags = $hashtag_model->get_post_hashtags($post->post_id);
            $hashtags = array();
            foreach ($post_hashtags as $ph) {
                array_push($hashtags, $hashtag_model->get_hashtag($ph->hashtag_id)[0]);
            };

            // comment
            $comments = $comment_model->get_post_comments($post->post_id);

            // reaction
            $reactions = $reaction_model->get_post_reactions($post->post_id);

            array_push($data, (object)['post' => $post, 'hashtags' => $hashtags, 'user' => $user_model->get_user($post->user_id)[0], 'comments' => $comments, 'reactions' => $reactions]);
            
        };
        array_push($resData, (object)['posts' => $data], (object)['nextPage' => $nextPageExists]);
        return $this->response->setJSON($resData);
    }

    public function get_certain_posts_data()
    {
        $post_model = model('PostModel');
        $hashtag_model = model('HashtagModel');
        $user_model = model('UserModel');
        $comment_model = model('CommentModel');
        $reaction_model = model('ReactionModel');

        if (isset($_GET['input'])) {
            $post_filter = $_GET['input'];
            $page = $_GET['page'];
        } else {
            echo "bajs";
        }
        $originalPage = $page;
        if ($page != 0) {
            $page = $page * 10;
        }
        $hashtag = $hashtag_model->get_certain_hashtags($post_filter);
        $posts = $post_model->get_certain_posts($hashtag[0]->hashtag_id, $page);
        $nextPageExists = false;
        $nextPage = $post_model->get_certain_posts($hashtag[0]->hashtag_id, ($originalPage + 1) * 10);
        if (count($nextPage)) {
            $nextPageExists = true;
        }

        $resData = array();
        $data = array();
        foreach ($posts as $post) {
            // hashtag
            $post_hashtags = $hashtag_model->get_post_hashtags($post->post_id);
            // print_r($post_hashtags);
            $hashtags = array();
            foreach ($post_hashtags as $ph) {
                $thisHash = $hashtag_model->get_hashtag($ph->hashtag_id)[0];
                if (in_array($thisHash, $hashtag)) {
                    $thisHash->searched = true;
                }
                array_push($hashtags, $thisHash);
            };
            // comment
            $comments = $comment_model->get_post_comments($post->post_id);
            // reaction
            $reactions = $reaction_model->get_post_reactions($post->post_id);

            array_push($data, (object)['post' => $post, 'hashtags' => $hashtags, 'user' => $user_model->get_user($post->user_id)[0], 'comments' => $comments, 'reactions' => $reactions]);
            
        };
        array_push($resData, (object)['posts' => $data], (object)['nextPage' => $nextPageExists]);
        return $this->response->setJSON($resData);
    }

    public function get_post()
    {
        $post_model = model('PostModel');
        $hashtag_model = model('HashtagModel');

        if (isset($_GET['post'])) {
            $post_id = $_GET['post'];
        } else {
            echo "bajs";
        }

        $data = [
            'post' => $post_model->get_post($post_id),
            'hashtags' => $hashtag_model->get_post_hashtags($post_id)
        ];

        return $this->response->setJSON($data);
    }

    public function get_post_data_and_delete_noti()
    {
        $post_model = model('PostModel');
        $hashtag_model = model('HashtagModel');
        $user_model = model('UserModel');
        $comment_model = model('CommentModel');
        $reaction_model = model('ReactionModel');
        $notification_model = model('NotificationModel');

        if (isset($_GET['id'])) {
            $post_id = $_GET['id'];
            $compost = $_GET['compost'];
            $compost_id = $_GET['compost_id'];
            $type = $_GET['type'];
        } else {
            echo "bajs";
        }

        $notification_model->delete_notification($compost,$compost_id, $type);

        $data = array();

        $post = $post_model->get_post($post_id)[0];
        // get hastags where hashtag Content
        $post_hashtags = $hashtag_model->get_post_hashtags($post_id);
        $hashtags = array();
        foreach ($post_hashtags as $ph) {
            array_push($hashtags, $hashtag_model->get_hashtag($ph->hashtag_id)[0]);
        };

        // comment
        $comments = $comment_model->get_post_comments($post_id);

        // reaction
        $reactions = $reaction_model->get_post_reactions($post_id);

        array_push($data, (object)['post' => $post, 'hashtags' => $hashtags, 'user' => $user_model->get_user($post->user_id)[0], 'comments' => $comments, 'reactions' => $reactions]);
        return $this->response->setJSON($data);
    }


    // public function create_post()
    // {
    //     $post_model = model('PostModel');
    //     $hashtag_model = model('HashtagModel');
    //     $user_model = model('UserModel');
    //     $comment_model = model('CommentModel');
    //     $reaction_model = model('ReactionModel');

    //     $json = file_get_contents('php://input');
    //     $data = json_decode($json);
    //     print_r($data);

    //     $post_id = $post_model->create_post($data);
    //     if ($post_id) {
    //         // return $this->response->setJSON($result);
    //         foreach ($data->hashtags as $hashtag) {
    //             print_r($hashtag);
    //             $hashtag_exists = $hashtag_model->check_if_hashtag_exists($hashtag);

    //             if (!$hashtag_exists) {
    //                 echo "true";
    //                 $hashtag_response_id = $hashtag_model->create_hashtag($hashtag);
    //                 $hashtag_id = $hashtag_response_id;
    //             } else {
    //                 $hashtag_id = $hashtag_exists[0]->hashtag_id;
    //                 $hashtag_updated_int = $hashtag_model->update_hashtag_interactions($hashtag_id);
    //             }

    //             $post_hashtag_exists = $hashtag_model->check_if_posthashtag_exists($hashtag_id, $post_id);

    //             if (!$post_hashtag_exists) {
    //                 $post_hashtag = $hashtag_model->create_post_hashtag($hashtag_id, $post_id);
    //                 print_r($post_hashtag);
    //             }

    //             $user_hashtag_exists = $hashtag_model->check_if_userhashtag_exists($hashtag_id, $data->user_id);

    //             if (!$user_hashtag_exists) {
    //                 $user_hashtag = $hashtag_model->create_user_hashtag($hashtag_id, $data->user_id);
    //                 print_r($user_hashtag);
    //             } else {
    //                 $user_hashtag_updated_int = $hashtag_model->update_user_hashtag_interactions($hashtag_id, $data->user_id);
    //                 print_r($user_hashtag_updated_int);
    //             };
    //         }
    //     } 

        
    // }

    public function create_post()
    {
        $post_model = model('PostModel');
        $hashtag_model = model('HashtagModel');
        $user_model = model('UserModel');
        $comment_model = model('CommentModel');
        $reaction_model = model('ReactionModel');

        $user_id = $_POST['user_id'];
        $text = $_POST['text'];
        $time = $_POST['time'];
        // $hashtags = $_POST['hashtags'];
        $hashtags = json_decode($_POST['hashtags']);


        $data = array();

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

        // $data += ['user_id' => $user_id, 'text' => $text, 'time' => $time, 'hashtags' => $hashtags, 'image' => $newName];
        array_push( $data, ['user_id' => $user_id, 'text' => $text, 'time' => $time, 'hashtags' => $hashtags, 'image' => $newName]);
        
        print_r($data[0]['user_id']);

        $post_id = $post_model->create_post($data[0]);
        if ($post_id) {
            // return $this->response->setJSON($result);
            // foreach ($data[0]['hashtags'] as $hashtag) {
            //     print_r($hashtag);
            foreach ($hashtags as $hashtag) {
                $hashtag_exists = $hashtag_model->check_if_hashtag_exists($hashtag);

                if (!$hashtag_exists) {
                    $hashtag_response_id = $hashtag_model->create_hashtag($hashtag);
                    $hashtag_id = $hashtag_response_id;
                } else {
                    $hashtag_id = $hashtag_exists[0]->hashtag_id;
                    $hashtag_updated_int = $hashtag_model->update_hashtag_interactions($hashtag_id);
                }

                $post_hashtag_exists = $hashtag_model->check_if_posthashtag_exists($hashtag_id, $post_id);

                if (!$post_hashtag_exists) {
                    $post_hashtag = $hashtag_model->create_post_hashtag($hashtag_id, $post_id);
                    print_r($post_hashtag);
                }

                $user_hashtag_exists = $hashtag_model->check_if_userhashtag_exists($hashtag_id, $user_id);

                if (!$user_hashtag_exists) {
                    $user_hashtag = $hashtag_model->create_user_hashtag($hashtag_id, $user_id);
                    print_r($user_hashtag);
                } else {
                    $user_hashtag_updated_int = $hashtag_model->update_user_hashtag_interactions($hashtag_id, $user_id);
                    print_r($user_hashtag_updated_int);
                };
            }
        } 

        
    }

    public function delete_post()
    {
        $post_model = model('PostModel');

        if (isset($_GET['id'])) {
            $post_id = $_GET['id'];
        } else {
            echo "bajs";
        }

        $res = $post_model->delete_post($post_id);
        return $this->response->setJSON($res);
    }

    public function delete_all_posts()
    {
        $post_model = model('PostModel');

        $post_model->delete_all_posts();
        return $this->response->setJSON($data);
    }
}
