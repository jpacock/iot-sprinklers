DROP TABLE IF EXISTS programs;

CREATE TABLE programs (
  id varchar(255) NOT NULL,
  display_name varchar(45) not null,
  start_hours TINYINT,
  start_minutes TINYINT,
  start_days_of_week varchar(15),
  active boolean not null,
  run_times json,
  run_time_unit varchar(15),
  primary key(id)
);

INSERT INTO programs (id, display_name, start_hours, start_minutes, start_days_of_week, active, run_times) 
  VALUES ('FAKE_ID_1','SCHEDULE_ID_1', 13, 50, '2', true, '[{"id":"R1","zoneId":"1","duration":5},{"id":"R2","zoneId":"2","duration":5},{"id":"R3","zoneId":"3","duration":5},{"id":"R4","zoneId":"4","duration":5}]');

