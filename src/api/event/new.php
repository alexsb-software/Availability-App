<?php
include '../auth/config.php';

$input = file_get_contents('php://input');
$requestParams = json_decode($input);
//print_r($requestParams);
if (!$requestParams) {
    die("invalid params");
}

$new_event_query = mysqli_prepare($conn, "INSERT INTO `eventt`(`event_name`) VALUES (?)");
$new_day_query = mysqli_prepare($conn, "INSERT INTO `day`(`dayDate`, `event_id`) VALUES (?, ?)");
$new_shift_query = mysqli_prepare($conn, "INSERT INTO `shift`(`shift_number`, `shift_start`, `shift_end`, `day_id`) VALUES (?,?,?,?)");
$new_session_query = mysqli_prepare($conn, "INSERT INTO `session`(`name`,`notes`,`reporting`,`pr`,`shift_id`) VALUES (?,?,?,?,?) ");


if (!$new_event_query or !$new_day_query or !$new_shift_query or !$new_session_query) {
    http_response_code(500);
    die('mysqli error: '.mysqli_error($conn));
}
mysqli_stmt_bind_param($new_event_query, 's', $requestParams->{'eventName'});
if (!$new_event_query->execute()) {
    http_response_code(500);
}

$event_id = mysqli_insert_id($conn);

$days = $requestParams->{'eventDays'};


foreach ($days as $day) {
//    print_r($day->{'dayDate'});
    mysqli_stmt_bind_param($new_day_query, 'si', $day->{'dayDate'}, $event_id);
    if (!$new_day_query->execute())
    {
        http_response_code(500);
        die('mysqli error: '.mysqli_error($conn));
    }
    $day_id = mysqli_insert_id($conn);
    $shifts = $day->{'shifts'};
    foreach ($shifts as $shift) {
        $shift_number = intval($shift->{'number'});
        mysqli_stmt_bind_param($new_shift_query, 'issi', $shift_number, $shift->{'startDate'}, $shift->{'endDate'}
        ,$day_id);
        if (!$new_shift_query->execute()){
            http_response_code(500);
            die('mysqli error: '.mysqli_error($conn));
        }
        $shift_id = mysqli_insert_id($conn);
        $sessions = $shift->{'sessions'};
        foreach ($sessions as $session) {
            $pr = intval($session->{'pr'});
            $reporting = intval($session->{'reporting'});
            mysqli_stmt_bind_param($new_session_query, 'ssiii', $session->{'name'}, $session->{'notes'},
                $reporting, $pr, $shift_id);
            if (!$new_session_query->execute()){
                http_response_code(500);
                die('mysqli error: '.mysqli_error($conn));
            }
        }
    }
}

http_response_code(201);
