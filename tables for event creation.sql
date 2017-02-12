
--shift and day ids shouldn't be keys..
--date time
--shift name

CREATE TABLE eventt (

event_id int,
event_date date NOW(),
event_name varchar(30),

;



CREATE TABLE eventt_day (

--day_date date NOW(),
day_date date,
event_id int, 
day_id int,
CONSTRAINT PK_eventt_day PRIMARY KEY (event_id,day_id)

);

ALTER TABLE eventt_day ADD FOREIGN KEY (event_id) REFERENCES eventt(event_id);



CREATE TABLE shift (

event_id int,
day_id int,
--shift_name varchar(30),
shift_id int,
shift_start datetime,
shift_end datetime,
CONSTRAINT PK_shift PRIMARY KEY (event_id,day_id,shift_id)

);

ALTER TABLE shift ADD FOREIGN KEY (event_id) REFERENCES eventt(event_id);
ALTER TABLE shift ADD FOREIGN KEY (day_id) REFERENCES eventt_day(day_id);



CREATE TABLE session (

event_id int,
day_id int,
shift_id int,
--session_id int,
session_name varchar(30),
rnp_session_id int,
pr_session_id int,
notes varchar(100)

--CONSTRAINT PK_session PRIMARY KEY (event_id,day_id,shift_id,session_id)
CONSTRAINT PK_session PRIMARY KEY (event_id,day_id,shift_id)

);

ALTER TABLE session ADD FOREIGN KEY (event_id) REFERENCES eventt(event_id);
ALTER TABLE session ADD FOREIGN KEY (day_id) REFERENCES eventt_day(day_id);
ALTER TABLE session ADD FOREIGN KEY (shift_id) REFERENCES shift(shift_id);