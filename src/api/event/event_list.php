<?php
/**
 * Created by PhpStorm.
 * User: Memo
 * Date: 2/14/2017
 * Time: 12:41 AM
 */
include '../auth/config.php';
include 'get_event.php';

$get_event_ids_query = mysqli_prepare($conn, "SELECT `event_id` FROM `eventt` ORDER BY `event_id` DESC");
if(!$get_event_ids_query) {
    http_response_code(500);
    die('mysqli error: '.mysqli_error($conn));
}

$get_event_ids_query->execute();
$result = $get_event_ids_query->get_result();
$event_ids = $result->fetch_all();

$event_list = [];

foreach ($event_ids as $id) {
    $event = get_event($id[0], false);
    array_push($event_list, $event);
}

echo json_encode($event_list);
