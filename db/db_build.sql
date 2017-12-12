BEGIN ;

DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users (

user_id SERIAL PRIMARY KEY ,
user_name VARCHAR(100) NOT NULL UNIQUE ,
password VARCHAR(100) NOT NULL ,
rights VARCHAR(100) NOT NULL DEFAULT 'user',
email TEXT NOT NULL UNIQUE,
dob DATE NOT NULL,
added_date DATE DEFAULT now()
);

INSERT INTO users(user_name , password , rights , email , dob) VALUES
('hawk' , 'haitham' , 'user' , 'haith@gmail.com' ,'1992-11-03' );

COMMIT;
