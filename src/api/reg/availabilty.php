<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST')
{
include '../auth/authenticate.php';

$input = file_get_contents('php://input');
$requestParams = json_decode($input);
if (!$requestParams) {
    die("invalid params");
}

// GET Event
$event_query = mysqli_prepare($conn, "SELECT event_id FROM `eventt` WHERE `event_id` = ?");

if ( !$event_query ) {
    http_response_code(500);
    die('mysqli error: '.mysqli_error($conn));
}

mysqli_stmt_bind_param($event_query, 'i', $requestParams->{'eventId'});

$event_query->execute();
$result = $event_query->get_result();
$event = $result->fetch_assoc();

if (!$event) {
    http_response_code(404);
    die("Invalid Event ID");
}

$days_query = mysqli_prepare($conn, "SELECT id FROM `day` WHERE `event_id` = ?");

mysqli_stmt_bind_param($days_query, 'i', $event['event_id']);

$days_query->execute();
$result = $days_query->get_result();
$days = $result->fetch_all();

$add_avail_query = mysqli_prepare($conn, "INSERT INTO `member_shift_committee`(`member_id`,`shift_id`,`day_id`, `event_id`) VALUES (?,?,?,?)");
$get_shifts_query = mysqli_prepare($conn, "SELECT `shift_id` FROM `shift` WHERE `day_id` = ?");

if (!$add_avail_query or !$get_shifts_query) {
    http_response_code(500);
    die('mysqli error: '.mysqli_error($conn));
}

foreach ($requestParams->{'avalHash'} as $i => $day)
{
    foreach ($day as $j => $shift)
    {
        $day = $days[$i];
        mysqli_stmt_bind_param($get_shifts_query, 'i', $day[0]);
        $get_shifts_query->execute();
        $result = $get_shifts_query->get_result();
        if (!$result) {
            die("No Shifts for this day");
        }
        $shifts = $result->fetch_all();

        print_r($shifts);
        echo $event['event_id'];

        if($shift)
        {
            $shift = $shifts[$j];
            mysqli_stmt_bind_param($add_avail_query, 'iiii', $user['id'], $shift[0], $day[0], $event['event_id']);
            if($add_avail_query->execute()) {

            }
            else
            {
                http_response_code(500);
                die('mysqli error: '.mysqli_error($conn));
            }
        }
    }
}

http_response_code(200);
} else {
    http_response_code(403);
}