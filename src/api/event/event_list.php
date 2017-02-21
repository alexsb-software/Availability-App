<?php
/**
 * Created by PhpStorm.
 * User: Memo
 * Date: 2/14/2017
 * Time: 12:41 AM
 */
// include '../db.php';
include 'get_event.php';

$get_event_ids_query = "SELECT `event_id` FROM `eventt` ORDER BY `event_id` DESC";
// if(!$get_event_ids_query) {
//     http_response_code(500);
//     die('mysqli error: '.mysqli_error($conn));
// }

// $get_event_ids_query->execute();
$result = execute_query_ret_arr($get_event_ids_query);
$event_ids = $result;

$event_list = [];

foreach ($event_ids as $id) {
    // var_dump($id);
    $event = get_event($id->{'event_id'}, false);
    array_push($event_list, $event);
}

echo json_encode($event_list);
