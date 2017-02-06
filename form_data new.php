
<?php

//data entered and insert statement will depend on how it's at the front

$conn = new mysqli("localhost", "root", "", "availability_app");

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

echo "Connected to the Database";

//assuming that member, event, shift and committee IDs are assigned at front end (otherwise assign here)
//shift and session clash handling?

$member_name = $_POST['Members.name'];
$member_id = $_POST['Members.id'];
	

$event_id = $_POST['Event.id'];
$event_name = $_POST['Event.name'];
$event_date = $_POST['Event.dayDate'];

//$day_id = $_POST['day_id'];

$committee_name = $_POST['committee_name'];
$committee_id = $_POST['committee_id'];

$shift_id = $_POST['shifts.id'];
$shift_name = $_POST['shifts.name'];
$shift_start = $_POST['shift.start'];
$shift_end = $_POST['shift.end'];
//$shift_type = $_POST['shift_type'];

$session_id = $_POST['session.id'];
$session_name = $_POST['session.name'];

$rnp_session_id = $_POST['rnp_session.id'];
$pr_session_id = $_POST['pr_session.name'];
$notes = $_POST['notes.value'];

$availablity = $_POST['availablity.value'];

//entry all at once?

$sql = "SELECT member_name, member_id, event_id, event_name, event_date, committee_name, committee_id, hift_id, shift_name, shift_start, shift_end session_id, session_name, rnp_session_id, pr_session_id, notes, availablity FROM member WHERE member_id='".$member_id."' AND shift_id='".$shift_id."' ";

$result = $conn->query($sql);

?>
