<?php
include '../db.php';


function get_event($event_id, $get_users) {
$grid_hash = array();
global $conn;

$event_query = "SELECT * FROM `eventt` WHERE `event_id` = $event_id";
// if(!$event_query) {
// 	http_response_code(500);
// 	die('mysqli error2: '.mysqli_error($conn));
// }
// mysqli_stmt_bind_param($event_query, 'i', $event_id);
// $event_query->execute();
$result = execute_query($event_query);
$event = $result->fetch_assoc();

$grid_hash['event'] = $event;

$days_query = "SELECT * FROM `day` WHERE `event_id` = $event_id";
// if (!$days_query) {
// 	http_response_code(500);
// 	die('mysqli error1: '.mysqli_error($conn));
// }
// mysqli_stmt_bind_param($days_query, 'i', $event_id);
// $days_query->execute();
$result = execute_query($days_query);
$days = $result->fetch_all();

// $shift_query = "SELECT * FROM `shift` WHERE `day_id` = $event_id";
// if (!$shift_query) {
// 	http_response_code(500);
// 	die('mysqli error: '.mysqli_error($conn));
// }

// $session_query = "SELECT * FROM `session` WHERE `shift_id` = $event_id";
// if (!$session_query) {
// http_response_code(500);
// die('mysqli error: '.mysqli_error($conn));
// }

$event_days = [];

foreach ($days as $day) 
{
	$day_hash = array();
	$day_hash['id'] = $day[0];
	$day_hash['dayDate'] = $day[1];

	$shift_query = "SELECT * FROM `shift` WHERE `day_id` = $day[0]";
	// mysqli_stmt_bind_param($shift_query, 'i', $day[0]);
	// $shift_query->execute();
	$result = execute_query($shift_query);
	$shifts = $result->fetch_all();

	$shifts_array = [];
	foreach ($shifts as $shift){
		$shift_hash = array();
		$shift_hash['number'] = $shift[4];

		$session_query = "SELECT * FROM `session` WHERE `shift_id` = $shift[0]";
		// mysqli_stmt_bind_param($session_query, 'i', $shift[0]);
		// $session_query->execute();
		$result = execute_query($session_query);
		$sessions = $result->fetch_all();

		$session_array = [];
		foreach ($sessions as $session) {
			$session_hash = array();
			$session_hash['name'] = $session[1];
			$session_hash['notes'] = $session[2];
			$session_hash['reporting'] = $session[3];
			$session_hash['pr'] = $session[4];
			array_push($session_array, $session_hash);	
		}
		$shift_hash['sessions'] = $session_array;
		array_push($shifts_array, $shift_hash);
	}

	$day_hash['shifts'] = $shifts_array;
	array_push($event_days, $day_hash);
}

$grid_hash['event_days'] = $event_days;

if ($get_users) {
	$member_query = "SELECT member_shift_committee.member_id, members.name, member_shift_committee.day_id, members.committees, ";
	$member_query .= "shift.shift_number FROM member_shift_committee INNER JOIN shift ON member_shift_committee.shift_id=";
	$member_query .= "shift.shift_id INNER JOIN members ON member_shift_committee.member_id = members.id ";
	$member_query .= "WHERE member_shift_committee.event_id = ?";
	// $member_query = mysqli_prepare($conn, $member_query);
	// if (!$member_query) {
	//     http_response_code(500);
	//     die('mysqli error: '.mysqli_error($conn));
	// }

	// mysqli_stmt_bind_param($member_query, 'i', $event_id);
	// $member_query->execute();
	$result = execute_query($member_query);
	$member_avail = $result->fetch_all();

	$member_array = [];
	foreach ($member_avail as $member)
	{
		$member_hash = array();
		$member_hash['member_id'] = $member[0];
		$member_hash['member_name'] = $member[1];
		$member_hash['day_id'] = $member[2];
		$member_hash['committees'] = $member[3];
		$member_hash['shiftnumber'] = $member[4];
		array_push($member_array, $member_hash);
	}

	$grid_hash['members'] = $member_array;
}

return $grid_hash;
}