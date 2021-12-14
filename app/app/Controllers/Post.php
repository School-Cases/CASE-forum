<?php

namespace App\Controllers;

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

        $posts = $post_model->get_all_posts();

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
        return $this->response->setJSON($data);
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
        } else {
            echo "bajs";
        }
        // get hastags where hashtag Content
        $hashtag = $hashtag_model->get_certain_hashtags($post_filter);
        // get post_hashtags
        $post_hashtagses = $hashtag_model->get_certain_post_hashtags($hashtag[0]->hashtag_id);

        // $data = array();
        $posts = array();
        foreach ($post_hashtagses as $postHash) {
            array_push($posts, $post_model->get_post($postHash->post_id));
        }

        $data = array();
        foreach ($posts as $post) {
            // hashtag
            $post_hashtags = $hashtag_model->get_post_hashtags($post[0]->post_id);
            $hashtags = array();
            foreach ($post_hashtags as $ph) {
                $thisHash = $hashtag_model->get_hashtag($ph->hashtag_id)[0];
                if (in_array($thisHash, $hashtag)) {
                    $thisHash->searched = true;
                }
                array_push($hashtags, $thisHash);
            };
            // comment
            $comments = $comment_model->get_post_comments($post[0]->post_id);
            // reaction
            $reactions = $reaction_model->get_post_reactions($post[0]->post_id);

            array_push($data, (object)['post' => $post[0], 'hashtags' => $hashtags, 'user' => $user_model->get_user($post[0]->user_id)[0], 'comments' => $comments, 'reactions' => $reactions]);
        };
        return $this->response->setJSON($data);
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

    public function create_post()
    {
        $post_model = model('PostModel');
        $hashtag_model = model('HashtagModel');
        $user_model = model('UserModel');
        $comment_model = model('CommentModel');
        $reaction_model = model('ReactionModel');

        $json = file_get_contents('php://input');
        $data = json_decode($json);
        print_r($data);

        $post_id = $post_model->create_post($data);
        if ($post_id) {
            // return $this->response->setJSON($result);
            foreach ($data->hashtags as $hashtag) {
                print_r($hashtag);
                $hashtag_exists = $hashtag_model->check_if_hashtag_exists($hashtag);

                if (!$hashtag_exists) {
                    echo "true";
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

                $user_hashtag_exists = $hashtag_model->check_if_userhashtag_exists($hashtag_id, $data->user_id);

                if (!$user_hashtag_exists) {
                    $user_hashtag = $hashtag_model->create_user_hashtag($hashtag_id, $data->user_id);
                    print_r($user_hashtag);
                } else {
                    $user_hashtag_updated_int = $hashtag_model->update_user_hashtag_interactions($hashtag_id, $data->user_id);
                    print_r($user_hashtag_updated_int);
                };
            }
        } 

        
    }

    public function delete_all_posts()
    {
        $post_model = model('PostModel');

        $post_model->delete_all_posts();
        return $this->response->setJSON($data);
    }
}
