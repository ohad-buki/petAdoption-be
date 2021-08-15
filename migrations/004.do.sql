create table if not exists likes (
    like_id int  AUTO_INCREMENT,
user_id int,
pet_id int,
FOREIGN KEY (user_id) REFERENCES users(user_id),
primary key(like_id)
);