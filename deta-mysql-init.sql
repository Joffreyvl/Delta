use delta;
create user delta@localhost identified by 'delta@test123';
grant all privileges on node.* to delta@localhost;
ALTER USER 'delta'@localhost IDENTIFIED WITH mysql_native_password BY 'delta@test123'