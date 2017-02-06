

--assume event_id, committee_id, member_id are assigned in the HR system


CREATE TABLE member (

--assume member_id assigned in HR system
member_id int(5) not null PRIMARY KEY,
member_name varchar(40) not null,
--committee_id int(3)

);

--ALTER TABLE member ADD FOREIGN KEY (committee_id) REFERENCES committee(committee_id);





--shift handling via start & end time plus shift type
CREATE TABLE shift (

shift_id int(3) not null PRIMARY KEY AUTO_INCREMENT,
shift_start time,
shift_end time,
--to differentiate shift(1) & session(0)...
shift_type boolean
member

--member shift and committee in one table or 2
--CREATE TABLE member_committee






CREATE TABLE committee (

--assume dept_id assigned in HR system
committee_id int(3) not null PRIMARY KEY , 
committee_name varchar(10) not null,
--member_id int(5) not null,

);

--ALTER TABLE committee ADD FOREIGN KEY (member_id) REFERENCES member(member_id);





CREATE TABLE eventt (

--event id & name saved somewhere, or new one everytime
event_id int(3) not null, 
event_name varchar(20) not null,
event_date date PRIMARY KEY,
--day 1, 2, etc
day_id int,
--CONSTRAINT PK_event PRIMARY KEY (event_id,event_date,day_id)
);



--no event day and id; just date
CREATE TABLE member_shift_committee (

member_id int(5) not null,
shift_id int(3) not null,
committee_id int(3) not null,
event_date date,
--day_id int,
CONSTRAINT PK_member_shift_committee PRIMARY KEY (member_id,shift_id,committee_id,event_date)

);

ALTER TABLE member_shift_committee ADD FOREIGN KEY (member_id) REFERENCES member(member_id);
ALTER TABLE member_shift_committee ADD FOREIGN KEY (shift_id) REFERENCES shift(shift_id);
ALTER TABLE member_shift_committee ADD FOREIGN KEY (committee_id) REFERENCES committee(committee_id);
ALTER TABLE member_shift_committee ADD FOREIGN KEY (event_date) REFERENCES eventt(event_date);