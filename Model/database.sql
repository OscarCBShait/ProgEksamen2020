CREATE TABLE IF NOT EXISTS users (
  id int(11) NOT NULL,
  username varchar(50) NOT NULL,
  password varchar(255) NOT NULL,
  email varchar(100) NOT NULL, 
  gender varchar(255) NOT NULL, 
  bio varchar(255) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS matchlist (
  id int(11) NOT NULL,
  user_id int NOT NULL,
  match_user_id int NOT NULL,
  is_a_match int NOT NULL,
  user_name varchar(45) NOT NULL,
  match_user_name varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;


Se ligeledes bilag 6, hvor jeg lavet mit ER-diagram




