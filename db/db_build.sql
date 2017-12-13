BEGIN ;

DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS posts CASCADE;

CREATE TABLE users (

user_id SERIAL PRIMARY KEY ,
user_name VARCHAR(100) NOT NULL UNIQUE ,
password VARCHAR(100) NOT NULL ,
rights VARCHAR(100) NOT NULL SET DEFAULT 'user',
email TEXT NOT NULL UNIQUE,
dob DATE NOT NULL,
added_date DATE DEFAULT now()
);

CREATE TABLE posts(
  post_id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL ,
  title VARCHAR(100) NOT NULL,
  content TEXT NOT NULL,
  image bytea,
  added_date DATE DEFAULT now()
);

INSERT INTO users(user_name , password , rights , email , dob) VALUES
('hawk' , 'haitham' , 'user' , 'haith@gmail.com' ,'1992-11-03' );

INSERT INTO posts(user_id,title,content) VALUES (1,'goCompare','the most ammoying commercial in the UK
  that is running for over a decade');

COMMIT;
