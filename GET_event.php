
<?php
        
//need to add incoming event_id from server (line 15)
//need to merge string encoding part(line 57)

$conn = new mysqli("localhost", "root", "", "hr");

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

echo "Connected to the Database";

        //POST ID FROM HTTP REQUEST OR WHATEVER HERE..
        $idd=1;
                  
        //SELECT NEEDED VARIABLES 
        $allrows=$conn->query("select eventt.event_name AS e_name,
         
                         day.dayDate AS d_date,
                         shift.shift_number AS sh_number, 
                         shift.shift_start AS sh_start,
                         shift.shift_end AS sh_end,
                         session.id AS si_id,
                         session.name AS si_name,
                         session.notes AS si_notes,
                         session.reporting AS si_reporting,
                         session.pr AS si_pr,
                         session.shift_id AS si_shi_id
              from `eventt`
              INNER JOIN `day` ON day.event_id= eventt.event_id
              INNER JOIN `shift` ON shift.day_id= day.id
              INNER JOIN `session` ON session.shift_id= shift.shift_id
              where eventt.event_id = $idd");
        
        //STEP2: EXTARCT ALL VARIABLES
       
                while($row = $allrows->fetch_assoc()){
                    
                    $e_name=$row["e_name"];
                    echo 'this is try => '.$e_name.'<br>';
                    $d_date=$row["d_date"];
                    $sh_number=$row["sh_number"];
                    $sh_start=$row["sh_start"];
                    $sh_end=$row["sh_end"];
                    $si_id=$row["si_id"];
                    $si_name=$row["si_name"];
                    echo 'this is try => '.$si_name.'<br>';
                    $si_notes=$row["si_notes"];
                    $si_reporting=$row["si_reporting"];
                    $si_pr=$row["si_pr"];
                    $si_shi_id=$row["si_shi_id"];
                        
                }

//STEP3: STRING ENCODING
        
        ?>
