
<?php

//data entered and insert statement will depend on how it's at the front

$conn = new mysqli("localhost", "root", "", "availability_app");

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

echo "Connected to the Database";

//assuming that member, event, shift and committee IDs are assigned at front end (otherwise assign here)
//shift and session clash handling?

$member_name = $_POST['member_name'];
$member_id = $_POST['member_id'];

$event_id = $_POST['event_id'];
$event_name = $_POST['event_name'];
$event_date = $_POST['event_date'];

$day_id = $_POST['day_id'];

$committee_name = $_POST['committee_name'];
$committee_id = $_POST['committee_id'];

//all committees minus RnP & PR
$shift_id = $_POST['shift_id'];
$shift_start = $_POST['shift_start'];
$shift_end = $_POST['shift_end'];
$shift_type = $_POST['shift_type'];

//RnP & PR
//$session_id = $_POST['session_id'];





//entry all at once?

$sql = "SELECT member_name, member_id, event_id, event_name, event_date, day_id, committee_name, committee_id, shift_id, shift_start, shift_end, shift_type FROM member WHERE member_id='".$member_id."' AND shift_id='".$shift_id."' ";

$result = $conn->query($sql);

?>