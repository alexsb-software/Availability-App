
<?php
       
//need to add incoming event_date from server (line 17)
//need to merge string encoding part(line 54)

$conn = new mysqli("localhost", "root", "", "hr");

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

echo "Connected to the Database";

//GET ALL

//POST ID FROM HTTP REQUEST OR WHATEVER HERE..
//NONE of these are working in PHP, though they're fine in SQL. (gives events although it should give none)
       //form
       $idd="2017-02-15";
       //$iddd=2017-02-15;
       $idd='2018-02-15';
      
        $allrowss=$conn->query("select eventt.event_id AS idd from `eventt` where eventt.event_date > '2018-02-15'");
        while($roww = $allrowss->fetch_assoc()){
                    
                    $rr=$roww["idd"];
                    
                    //iddd=$roww["idd"];    
                    //echo "********".$rr."<br>";
 
                
        //STEP2: VARIABLES
        
                while($roww = $allrowss->fetch_assoc()){
                    
                    $e_namee=$roww["e_name"];
                    echo 'this is try => '.$e_namee.'<br>';
                    $d_date=$roww["d_date"];
                    $sh_number=$roww["sh_number"];
                    $sh_start=$roww["sh_start"];
                    $sh_end=$roww["sh_end"];
                    $si_id=$roww["si_id"];
                    $si_name=$roww["si_name"];
                    echo 'this is try => '.$si_name.'<br>';
                    $si_notes=$roww["si_notes"];
                    $si_reporting=$roww["si_reporting"];
                    $si_pr=$roww["si_pr"];
                    $si_shi_id=$roww["si_shi_id"];
                    
                }
                }
                
                //json STRING back to server
                     
        ?>









