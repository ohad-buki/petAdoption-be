create table if not exists pets (
pet_id int AUTO_INCREMENT,
type varchar(15) not null,
name varchar(20) ,
color varchar(30) ,
height int, 
age varchar(3) ,
photo_url varchar(300) ,
weight int ,
dietary_restrictions varchar(100),
hypoallergenic boolean default false,
user_id int ,
FOREIGN KEY (user_id) REFERENCES users(user_id),
primary key(pet_id)
);