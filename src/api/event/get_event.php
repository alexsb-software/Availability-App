<?php
include '../db.php';


function get_event($event_id, $get_users) {
$grid_hash = array();

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
$result = execute_query_ret_arr($days_query);
$days = $result;

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
	// var_dump($day);
	$day_hash['id'] = $day->{'id'};
	$day_hash['dayDate'] = $day->{'dayDate'};

	$shift_query = "SELECT * FROM `shift` WHERE `day_id` = " . $day->{'id'};
	// mysqli_stmt_bind_param($shift_query, 'i', $day[0]);
	// $shift_query->execute();
	$result = execute_query_ret_arr($shift_query);
	$shifts = $result;

	$shifts_array = [];
	foreach ($shifts as $shift){
		$shift_hash = array();
		// var_dump($shift);
		$shift_hash['number'] = $shift->{'shift_number'};

		$session_query = "SELECT * FROM `session` WHERE `shift_id` = " . $shift->{'shift_id'};
		// mysqli_stmt_bind_param($session_query, 'i', $shift[0]);
		// $session_query->execute();
		$result = execute_query_ret_arr($session_query);
		$sessions = $result;

		$session_array = [];
		foreach ($sessions as $session) {
			$session_hash = array();
			// var_dump($session);
			$session_hash['name'] = $session->{'name'};
			$session_hash['notes'] = $session->{'notes'};
			$session_hash['reporting'] = $session->{'reporting'};
			$session_hash['pr'] = $session->{'pr'};
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
	$member_query .= "WHERE member_shift_committee.event_id = $event_id";
	// $member_query = mysqli_prepare($conn, $member_query);
	// if (!$member_query) {
	//     http_response_code(500);
	//     die('mysqli error: '.mysqli_error($conn));
	// }

	// mysqli_stmt_bind_param($member_query, 'i', $event_id);
	// $member_query->execute();
	$result = execute_query_ret_arr($member_query);
	$member_avail = $result;

	$member_array = [];
	foreach ($member_avail as $member)
	{
		$member_hash = array();
		// var_dump($member);
		$member_hash['member_id'] = $member->{'member_id'};
		$member_hash['member_name'] = $member->{'name'};
		$member_hash['day_id'] = $member->{'day_id'};
		$member_hash['committees'] = $member->{'committees'};
		$member_hash['shiftnumber'] = $member->{'shift_number'};
		array_push($member_array, $member_hash);
	}

	$grid_hash['members'] = $member_array;
}

return $grid_hash;
}