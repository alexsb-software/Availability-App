<?php
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Headers: Authorization");
header("Access-Control-Expose-Headers: Authorization");


if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
}

else if ($_SERVER['REQUEST_METHOD'] === 'POST')
{
include '../auth/authenticate.php';

$input = file_get_contents('php://input');
$requestParams = json_decode($input);
if (!$requestParams) {
    die("invalid params");
}

// GET Event
$event_query = "SELECT event_id FROM `eventt` WHERE `event_id` = ". $requestParams->{'eventId'};
// if ( !$event_query ) {
//     http_response_code(500);
//     die('mysqli error: '.mysqli_error($conn));
// }
// mysqli_stmt_bind_param($event_query, 'i', $requestParams->{'eventId'});

// $event_query->execute();
$result = execute_query($event_query);
$event = $result->fetch_assoc();

if (!$event) {
    http_response_code(404);
    die("Invalid Event ID");
}

$days_query = "SELECT id FROM `day` WHERE `event_id` = $event[event_id]";

// mysqli_stmt_bind_param($days_query, 'i', $event['event_id']);

// $days_query->execute();
$result = execute_query_ret_arr($days_query);
$days = $result;

// $add_avail_query = "INSERT INTO `member_shift_committee`(`member_id`,`shift_id`,`day_id`, `event_id`) VALUES (?,?,?,?)";
// $get_shifts_query = "SELECT `shift_id` FROM `shift` WHERE `day_id` = ?";

// if (!$add_avail_query or !$get_shifts_query) {
//     http_response_code(500);
//     die('mysqli error: '.mysqli_error($conn));
// }

foreach ($requestParams->{'avalHash'} as $i => $day)
{
    foreach ($day as $j => $shift)
    {
        $day = $days[$i];
        // var_dump($day);

        $get_shifts_query = "SELECT `shift_id` FROM `shift` WHERE `day_id` = " . $day->{'id'};
        // mysqli_stmt_bind_param($get_shifts_query, 'i', $day[0]);
        // $get_shifts_query->execute();
        $result = execute_query_ret_arr($get_shifts_query);
        if (!$result) {
            die("No Shifts for this day");
        }
        $shifts = $result;

        // print_r($shifts);
        echo $event['event_id'] . "\n";

        if($shift)
        {
            $shift = $shifts[$j];
            // var_dump($shift);
            // var_dump($user);

            $add_avail_query = "INSERT INTO `member_shift_committee`(`member_id`,`shift_id`,`day_id`, `event_id`) VALUES (" . $user->{'id'} . " , " . $shift->{'shift_id'} . ", " . $day->{'id'} . ",". $event['event_id'] .")";
            echo($add_avail_query);
            // mysqli_stmt_bind_param($add_avail_query, 'iiii', $user['id'], $shift[0], $day[0], $event['event_id']);
            // if(!$add_avail_query->execute()) {
            //     http_response_code(500);
            //     die('mysqli error: '.mysqli_error($conn));
            // }
            if (!execute_query($add_avail_query))
            {
                http_response_code(500);
                die("mysqli error");
            }
        }
    }
}

http_response_code(200);
} else {
    http_response_code(403);
}