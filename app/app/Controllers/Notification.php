<?php

namespace App\Controllers;

class Notification extends BaseController
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

    public function get_all_notifications()
    {
        $notification_model = model('NotificationModel');
        $data = [
            'notifications' => $notification_model->get_all_notifications()
        ];
        return $this->response->setJSON($data);
    }

    public function get_user_notifications()
    {
        $notification_model = model('NotificationModel');
        $post_model = model('PostModel');
        $user_model = model('UserModel');

        if (isset($_GET['user'])) {
            $user_id = $_GET['user'];
            // $page = $_GET['page'];
        } else {
            echo "bajs";
        }

        // $originalPage = $page;
        
        // if ($page != 0) {
        //     $page = $page * 10;
        // }

        // $user_notis = $notification_model->get_user_notifications($user_id, $page);

        // $nextPageExists = false;
        // $nextPage = $notification_model->get_user_notifications($user_id, ($originalPage + 1) * 10);
        // if (count($nextPage)) {
        //     $nextPageExists = true;
        // }

        $user_notis = $notification_model->get_user_notifications($user_id);

        // print_r($user_notis);

        // $data = [
        //     'notifications' => $user_notis
        // ];
        // return $this->response->setJSON($data);

    //     function DeDupeArrayOfObjectsByProps($objects, $props) {
    //     if (empty($objects) || empty($props))
    //         return $objects;
    //     $results = array();
    //     // $dub = array();
    //     foreach ($objects as $object) {
    //         $matched = false;
    //         foreach ($results as $result) {
    //             $matchs = 0;
    //             foreach ($props as $prop) {
    //                 if ($object->$prop == $result->$prop) {
    //                     $matchs++;
                        
    //                 }

    //             }
    //             if ($matchs == count($props)) {
    //                 $matched = true;
    //                 // $dub[] = [$object, $result];
    //                 break;
    //             }
    //         }
    //         if (!$matched) {
    //             $results[] = $object;
    //             // $dub[] = $object;
    //         }
    //     }
    //     return $results;
    //     // return $dub;
    // }
    // $user_notis = DeDupeArrayOfObjectsByProps($user_notis, ['post_id', 'type']);

    // $resData = array();
    // array_push($resData, (object)['notifications' => $user_notis], (object)['nextPage' => $nextPageExists]);
    // return $this->response->setJSON($resData);

        $data = [
            'notifications' => $user_notis
        ];
        return $this->response->setJSON($data);

        // foreach ($user_notis as $noti) {

        // }

        // $data = [
        //     'notifications' => $notification_model->get_user_notifications($user_id)
        // ];
        
    }

    public function create_notification()
    {
        $user_model = model('UserModel');
        $notification_model = model('NotificationModel');

        $json = file_get_contents('php://input');
        $data = json_decode($json);

        foreach ($data->notiUsers as $user_id) {
            if ($user_id == $data->post_user && $data->type == 2) {
                $temp_data = $data;
                $temp_data->type = 0;
                $res = $notification_model->create_notification($user_id, $temp_data);
            } else {
                $res = $notification_model->create_notification($user_id, $data);
            }
        }

        return $this->response->setJSON($res);

        // print_r($data->post_user != false);

        // if ($data->post_user && $data->type == 2) {
        //     $data->type = 0;
        //     $notification_model->create_notification($data->post_user, $data);
        // }
    }

    public function delete_all_notifications()
    {
        $notification_model = model('NotificationModel');

        return $notification_model->delete_all_notifications();
    }
}
