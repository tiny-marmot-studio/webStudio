-- CREATE TABLE IF NOT EXISTS password (
--     pid SERIAL PRIMARY KEY,
--     password_hash VARCHAR(255) NOT NULL,
--     salt VARCHAR(255) NOT NULL
-- );
-- CREATE TABLE IF NOT EXISTS logininfo (
--     uid SERIAL PRIMARY KEY,
--     username VARCHAR(255) NOT NULL,
--     pid INTEGER REFERENCES password(pid),
--     activation BOOLEAN NOT NULL
-- );


-- CREATE TABLE IF NOT EXISTS sessions (
--     sid SERIAL PRIMARY KEY,
--     uid INTEGER REFERENCES logininfo(uid),
--     session_token VARCHAR(255) NOT NULL,
--     session_expire_date TIMESTAMP NOT NULL,
--     session_active_date TIMESTAMP NOT NULL,
--     session_status BOOLEAN NOT NULL,
--     _username VARCHAR(255) NOT NULL
-- );

-- INSERT INTO logininfo (username,  activation) VALUES
--     ('user1',  true),
--     ('user2', false),
--     ('user3',  true);


-- INSERT INTO password (password_hash, salt) VALUES
--     ('2c8837852748903a8f7b7bb165cd695385af037a4b73512a943e40ffd65cceaf', 'P2$^,:/s02jeuvv'),
--     ('54afccbca5427396bde6e25320000dacfd8513bdf24a699b343b6a0bf948e637', 'P2$^,:/s02jeuvv'),
--     ('151a92562343617bf348614fb27a075ff1900c32def9f6b37c203055c221a8f0', 'P2$^,:/s02jeuvv');

-- UPDATE logininfo SET pid = 1 WHERE uid = 4;
-- UPDATE logininfo SET pid = 2 WHERE uid = 5;
-- UPDATE logininfo SET pid = 3 WHERE uid = 6;

DROP TABLE modelinfo;

CREATE TABLE modelInfo(
    model_id INTEGER PRIMARY KEY, 
    users VARCHAR(255),
    created_time DATE,
    user_comment VARCHAR(1000)
);

INSERT INTO modelINFO (model_id, users, created_time, user_comment)
VALUES (1, 'jll', '2003-08-08', 'new comment');

INSERT INTO modelINFO (model_id, users, created_time, user_comment)
VALUES (2, 'wei', '2002-01-01', 'wei"s comment');

