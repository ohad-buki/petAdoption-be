create table if not exists users (
user_id int AUTO_INCREMENT,
password varchar(100) not null ,
phone varchar(11) ,
name varchar(30) ,
description varchar(250), 
age varchar(3) ,
photo_url varchar(300) ,
email varchar(100) ,
is_admin boolean default false,
primary key(user_id)
);