<?php
include '../db.php';

$input = file_get_contents('php://input');
$requestParams = json_decode($input);
//print_r($requestParams);
if (!$requestParams) {
    die("invalid params");
}

$new_event_query = "INSERT INTO `eventt`(`event_name`) VALUES (". $requestParams->{'eventName'} .")";
// $new_day_query = "INSERT INTO `day`(`dayDate`, `event_id`) VALUES (?, ?)";
// $new_shift_query = "INSERT INTO `shift`(`shift_number`, `shift_start`, `shift_end`, `day_id`) VALUES (?,?,?,?)";
// $new_session_query = "INSERT INTO `session`(`name`,`notes`,`reporting`,`pr`,`shift_id`) VALUES (?,?,?,?,?)";


// if (!$new_event_query or !$new_day_query or !$new_shift_query or !$new_session_query) {
//     http_response_code(500);
//     die('mysqli error: '.mysqli_error($conn));
// }
// mysqli_stmt_bind_param($new_event_query, 's', $requestParams->{'eventName'});
// if (!$new_event_query->execute()) {
//     http_response_code(500);
// }
$event_id = execute_query_return_id($new_event_query);
$days = $requestParams->{'eventDays'};


foreach ($days as $day) {
//    print_r($day->{'dayDate'});

    $new_day_query = "INSERT INTO `day`(`dayDate`, `event_id`) VALUES (" . $day->{'dayDate'} . ", $event_id)";

    // mysqli_stmt_bind_param($new_day_query, 'si', $day->{'dayDate'}, $event_id);
    // if (!$new_day_query->execute())
    // {
    //     http_response_code(500);
    //     die('mysqli error: '.mysqli_error($conn));
    // }
    $day_id = execute_query_return_id($new_day_query);
    $shifts = $day->{'shifts'};


    foreach ($shifts as $shift) {
        $shift_number = intval($shift->{'number'});

        $new_shift_query = "INSERT INTO `shift`(`shift_number`, `shift_start`, `shift_end`, `day_id`) VALUES ($shift_number,". $shift->{'startDate'} .",". $shift->{'endDate'} .",$day_id)";
        // mysqli_stmt_bind_param($new_shift_query, 'issi', $shift_number, $shift->{'startDate'}, $shift->{'endDate'}
        // ,$day_id);
        // if (!$new_shift_query->execute()){
        //     http_response_code(500);
        //     die('mysqli error: '.mysqli_error($conn));
        // }
        $shift_id = execute_query_return_id($new_shift_query);
        $sessions = $shift->{'sessions'};

        foreach ($sessions as $session) {
            $pr = intval($session->{'pr'});
            $reporting = intval($session->{'reporting'});
            $new_session_query = "INSERT INTO `session`(`name`,`notes`,`reporting`,`pr`,`shift_id`) VALUES (". $session->{'name'} .",". $session->{'notes'} .",$reporting, $pr, $shift_id)";

            // mysqli_stmt_bind_param($new_session_query, 'ssiii', $session->{'name'}, $session->{'notes'},
            //     $reporting, $pr, $shift_id);
            // if (!$new_session_query->execute()){
            //     http_response_code(500);
            //     die('mysqli error: '.mysqli_error($conn));
            // }

            execute_query($new_session_query);
        }
    }
}

http_response_code(201);
