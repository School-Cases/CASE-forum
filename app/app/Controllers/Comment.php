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
        $post_model = model('PostModel');

        $user_model = model('UserModel');
        $reaction_model = model('ReactionModel');

        $image_model = model('ImageModel');

        $datadata = array();

        $post_id = $_POST['post_id'];
        $user_id = $_POST['user_id'];
        $text = $_POST['text'];
        $time = $_POST['time'];
        // $hashtags = $_POST['hashtags'];
        $hashtags = json_decode($_POST['hashtags']);
        $no_interaction_upd = $_POST['noInteractionUpd'];

        // $file = $this->request->getFile('image');
        // if (!$file) {
        //     $newName = null;
        // } else {
        //     if (! $file->isValid()) {
        //         throw new \RuntimeException($file->getErrorString().'('.$file->getError().')');
        //     };
        //     $newName = $file->getRandomName();
        //     $file->move(WRITEPATH.'../public/static/media', $newName);
        // }
        $images = array();



        // print_r($files);

        // if ($imagefile = $this->request->getFiles()) {
            // foreach($imagefile['images'] as $file) {
                if ($this->request->getFiles()) {
        $files = $this->request->getFiles()['images'];

        foreach($files as $file) {
            // print_r($file);
            if (! $file->isValid()) {
                throw new \RuntimeException($file->getErrorString().'('.$file->getError().')');
            };
            $newName = $file->getRandomName();
            $file->move(WRITEPATH.'../public/static/media', $newName);
            array_push($images, $newName);
            
        };
         }
        

        array_push($datadata, ['post_id' => $post_id, 'user_id' => $user_id, 'text' => $text, 'time' => $time, 'hashtags' => $hashtags]);

        $comment_id = $comment_model->create_comment($datadata[0]);

        if ($comment_id) {


            foreach ($images as $img) {
                $img_data = array();
                array_push($img_data, ['name' => $img, 'post_id' => "null", 'comment_id' => $comment_id]);
                // print_r($img_data);
                $create_img = $image_model->create_image($img_data[0]);
            }

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

            // $post_hashtags = $hashtag_model->get_post_hashtags($post_id);
            // $Hashtags = array();
            // foreach ($post_hashtags as $ph) {
            //     array_push($Hashtags, $hashtag_model->get_hashtag($ph->hashtag_id)[0]);
            // };
            $resComment = array();

            // reaction
            $reactions = $reaction_model->get_post_reactions($post_id);

            $resComment = $comment_model->get_comment($comment_id)[0];

            // $datadata = array();

            $resComment->user_id = $user_model->get_user($resComment->user_id)[0]->user_id;



            $resComment->image = $user_model->get_user($resComment->user_id)[0]->image;
            $resComment->images = $image_model->get_comment_images($comment_id);
            $resComment->reactions = $reactions;
            $resComment->fail = false;

            // array_push($resComment, (object)['comment' => $comment_model->get_comment($comment_id)[0], 'user' => $user_id, 'reactions' => $reaction_model->get_post_reactions($post_id),'images' => $images, 'fail' => false]);

            
            // return $this->response->setJSON($datadata[0]);
            return $this->response->setJSON($resComment);
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
