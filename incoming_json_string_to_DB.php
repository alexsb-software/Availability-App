
<?php

//need to merge insertions (line 54)

$conn = new mysqli("localhost", "root", "", "hr");

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

echo "Connected to the Database";

//PARSE AND ACCESS STRING

echo "<br><br>";

$string = '[{
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
                                    "sessions":
                                    [{
                                      
                                       "id": 1,
                                       "name": "First session",
                                       "notes": "some notes",
                                       "reporting": 1,
                                       "pr": 1,
                                       "shift_id": 1
                                       
                                    }]
                                    
                                }]
                            
                        }]

                }
            }]';
 

//$json_o=json_decode($string);
//echo 'new=>'.  print_r($json_o);

//MERGE WITH: INSERTATION OF EACH OF THE FOLLOWING VARIABLES IN DB WITHIN LOOPS

//EXTRACT DATA INTO VARIABLES
$result=json_decode($string,TRUE);
foreach ($result as $resultt) {
    
    $id = $resultt["id"];
    echo 'this is try => '.$id.'<br>';
    
    $eventName = $resultt["event"]["eventName"];
    echo 'this is another try => '.$eventName.'<br>';
    
    //loop before day?
    
    foreach($resultt["event"]["eventDays"] as $count){
    $dayDate = $count["dayDate"];
    echo 'this is another try => '.$dayDate.'<br>';
    
    foreach($count["shifts"] as $count2){
     $shifts_number = $count2["number"];
    echo 'this is another try => '.$shifts_number.'<br>';
    }
    
    foreach($count["shifts"] as $count2){
     $shifts_start = $count2["startDate"];
    echo 'this is another try => '.$shifts_start.'<br>';
    }
    
    foreach($count["shifts"] as $count2){
     $shifts_end = $count2["endDate"];
    echo 'this is another try => '.$shifts_end.'<br>';
    }   
    
    foreach($count2["sessions"] as $count3){
     $sessions_id = $count3["id"];
    echo 'this is another try => '.$sessions_id.'<br>';     
    
    $sessions_name = $count3["name"];
    echo 'this is another try => '.$sessions_name.'<br>';
   
    $sessions_notes = $count3["notes"];
    echo 'this is another try => '.$sessions_notes.'<br>';
      
    $sessions_reporting = $count3["reporting"];
    echo 'this is another try => '.$sessions_reporting.'<br>';
   
    $sessions_pr = $count3["pr"];
    echo 'this is another try => '.$sessions_pr.'<br>';
    
    $sessions_shift_id = $count3["shift_id"];
    echo 'this is another try => '.$sessions_shift_id.'<br>';
       
    }
    
    }
    }
    

    
    
             
         
  /*    
      
      
      $CU=$CU->fetch_assoc();
      $CU=$CU['user_id'];
      $CUnotifications=$conn->query("SELECT * FROM `notifications` WHERE `owner_id` = $CU ORDER BY `id` DESC");
*/

                /*
                 
$numberoflikes=$conn->query("select * from `likes` where post_id=$postid");
        $count_number_of_likes= $numberoflikes->num_rows;


$result = $conn->query($ev_id);


*/
    
    ?>