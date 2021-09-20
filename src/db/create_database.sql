DROP TABLE IF EXISTS programs;
DROP TABLE IF EXISTS runs;

CREATE TABLE programs (
  id varchar(255) NOT NULL,
  program_name varchar(45) not null,
  scheduled_start_time time not null,
  zone_1_duration integer not null,
  zone_2_duration integer not null,
  zone_3_duration integer not null,
  zone_4_duration integer not null,
  days varchar(30) not null,
  active boolean not null,
  running boolean not null,
  primary key(id)
);

CREATE TABLE runs (
  id varchar(255) NOT NULL,
  initiated_by varchar(45) NOT NULL,
  zone tinyint not null,
  start_date_time datetime not null,
  scheduled_end_date_time datetime not null,
  actual_end_date_time datetime,
  primary key(id)
);