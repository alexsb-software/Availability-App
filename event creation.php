
<?php

//DB place

$conn = new mysqli("localhost", "root", "", "availability_app");

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

echo "Connected to the Database";

//parse	and access

$json = '{
        "id": 1,
        "event": {
                    "eventName": "First Event",
                    "eventDays": 
                        [{ 
                            "dayDate": "10/10/2017",
                            "shifts":
                                [{
                                    "number": 1,
                                    "startDate": "12:00 10/10/2017",
                                    "endDate": "13:00 10/10/2017",
                                    "sessions": [{
                                    	"notes": "notes..."
										"reporting": 1
										"pr":  2
										"shift": 1

                                    }
                                    ]
                                }]  
                        }]
                }
   				}';

//var_dump(json_decode($json));

//post

//$event_id = $_POST['id'];

//event date will be entered when the table is created
//$event_date = $_POST['Event.dayDate'];



$event = $_POST['event']
$event_name = $event['eventName']
//$event_name = $event[0]

// TODO Query insert event

//event id and date assigned in table.. null here
//variables

INSERT INTO eventt (event_id, event_date, event_name) VALUES (,'','event_name');

// GET id
//event_name
$ev_id = "SELECT event_id FROM eventt WHERE event_name ='event_name' ";



$days = $_POST['eventDays']

for ($i=0; $i < count($days); $i++)
{ 

// id of day

$day_date = $days[$i]['dayDate']

// insert day

//day from given
//day i
INSERT INTO eventt_day (day_date, event_id, day_id) VALUES ('day_date',ev_id,  i+1);

$day_shift = $days[$i]['shifts']

$num = $day_shift['number']

for ($j=0; $j < count($day_shift); $j++) { 

// id
$shift_id = $day_shift[$j]['number']
$shift_start = $day_shift[$j]['startDate']
$shift_end = $day_shift[$j]['endDate']


// insert shift point to day

INSERT INTO shift (event_id, day_id, shift_id, shift_start, shift_end) VALUES (ev_id, i+1,shift_id, 'shift_start', 'shift_end');

$sessions = $day_shift['sessions']

for ($k=0; $k < count('sessions'); $k++) { 

//ids
// insert session point to shift

//chech variable names..
//and write up
//remove ' for int'
//shift id same as shift no.	
//no need to post..

//$session_id = $sessions[$k]['name']

$session_name = $_POST['name'];
$rnp_session_id = $_POST['‘reporting’'];
$pr_session_id = $_POST['pr'];
$notes = $_POST['notes'];

INSERT INTO shift (event_id, day_id, shift_id, session_id, session_name, rnp_session_id, pr_session_id, notes) VALUES (ev_id, i+1,shift_id,session_id, 'session_name', rnp_session_id, pr_session_id, 'notes');


}
}
}

//DB

$result = $conn->query($ev_id);

?>
