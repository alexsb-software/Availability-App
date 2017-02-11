<?php
// include 'auth/authenticate.php';
include 'get_event.php';

$event_id = intval($_GET['id']);

if (!$event_id)
    die("Invalid Event Id");

print_r(json_encode(get_event($event_id, true)));


//$grid_hash = array();
//
//$event_query = mysqli_prepare($conn, "SELECT * FROM `eventt` WHERE `event_id` = ?");
//if(!$event_query) {
//    http_response_code(500);
//    die('mysqli error2: '.mysqli_error($conn));
//}
//mysqli_stmt_bind_param($event_query, 'i', $event_id);
//$event_query->execute();
//$result = $event_query->get_result();
//$event = $result->fetch_assoc();
//
//$grid_hash['event'] = $event;
//
//$days_query = mysqli_prepare($conn, "SELECT * FROM `day` WHERE `event_id` = ?");
//
//if (!$days_query) {
//    http_response_code(500);
//    die('mysqli error1: '.mysqli_error($conn));
//}
//
//mysqli_stmt_bind_param($days_query, 'i', $event_id);
//$days_query->execute();
//$result = $days_query->get_result();
//$days = $result->fetch_all();
//
//$shift_query = mysqli_prepare($conn, "SELECT * FROM `shift` WHERE `day_id` = ?");
//
//if (!$shift_query) {
//    http_response_code(500);
//    die('mysqli error: '.mysqli_error($conn));
//}
//
//
//$session_query = mysqli_prepare($conn, "SELECT * FROM `session` WHERE `shift_id` = ?");
//
//if (!$session_query) {
//    http_response_code(500);
//    die('mysqli error: '.mysqli_error($conn));
//}
//
//$event_days = [];
//
//foreach ($days as $day) {
//
//    $day_hash = array();
//    $day_hash['dayDate'] = $day[1];
//
//    mysqli_stmt_bind_param($shift_query, 'i', $day[0]);
//    $shift_query->execute();
//    $result = $shift_query->get_result();
//    $shifts = $result->fetch_all();
//    $shifts_array = [];
//    foreach ($shifts as $shift){
//        $shift_hash = array();
//        $shift_hash['number'] = $shift[4];
//
//        mysqli_stmt_bind_param($session_query, 'i', $shift[0]);
//        $session_query->execute();
//        $result = $session_query->get_result();
//        $sessions = $result->fetch_all();
//
//        $session_array = [];
//        foreach ($sessions as $session) {
//            $session_hash = array();
//            $session_hash['name'] = $session[1];
//            $session_hash['notes'] = $session[2];
//            $session_hash['reporting'] = $session[3];
//            $session_hash['pr'] = $session[4];
//            array_push($session_array, $session_hash);
//        }
//        $shift_hash['sessions'] = $session_array;
//        array_push($shifts_array, $shift_hash);
//    }
//
//    $day_hash['shifts'] = $shifts_array;
//    array_push($event_days, $day_hash);
//}
//
//$grid_hash['event_days'] = $event_days;
//
//print_r(json_encode($grid_hash));